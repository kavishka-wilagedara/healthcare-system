import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const PatientDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients/');
        const found = response.data.data.find(p => p._id === id);
        setPatient(found);
        setFormData(found);
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };
    fetchPatient();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/patients/update/${id}`, formData);
      Swal.fire('Success', 'Patient updated successfully', 'success');
      setEditMode(false);
      setPatient(formData);
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire('Error', 'Failed to update patient', 'error');
    }
  };

  if (!patient) {
    return <div>Loading patient data...</div>;
  }

  const renderField = (label, name) => (
    <Form.Group className="mb-2">
      <Form.Label><strong>{label}</strong></Form.Label>
      <Form.Control
        type="text"
        name={name}
        value={formData[name] || ''}
        onChange={handleInputChange}
        disabled={!editMode}
      />
    </Form.Group>
  );

  return (
    <div className="container mt-4">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        ← Back
      </Button>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-success">Patient Profile - {patient.fullName}</h3>
        <div>
          {!editMode ? (
            <Button variant="success" onClick={() => setEditMode(true)}>
              <i className="fas fa-edit me-1"></i>Edit
            </Button>
          ) : (
            <Button variant="success" onClick={handleUpdate}>
              <i className="fas fa-save me-1"></i>Save
            </Button>
          )}
        </div>
      </div>

      <Row className="g-4">
        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <Card.Title className="text-primary">Personal Info</Card.Title>
            <Card.Body>
              {renderField('Full Name', 'fullName')}
              {renderField('NIC', 'nic')}
              {renderField('Date of Birth', 'dob')}
              {renderField('Gender', 'gender')}
              {renderField('Marital Status', 'maritalStatus')}
              {renderField('Blood Type', 'bloodType')}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <Card.Title className="text-primary">Contact Info</Card.Title>
            <Card.Body>
              {renderField('Email', 'email')}
              {renderField('Mobile Number', 'mobileNumber')}
              {renderField('Alternative Phone', 'alternativePhone')}
              {renderField('Preferred Contact', 'preferredContact')}
              {renderField('City', 'residentialCity')}
              {renderField('Province', 'residentialProvince')}
              {renderField('Postal Code', 'residentialPostal')}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <Card.Title className="text-primary">Medical Info</Card.Title>
            <Card.Body>
              {renderField('Allergies', 'allergyList')}
              {renderField('Chronic Conditions', 'chronicList')}
              {renderField('Medications', 'currentMedications')}
              {renderField('Surgeries', 'previousSurgeries')}
              {renderField('Family Medical History', 'familyMedicalHistory')}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <Card.Title className="text-primary">Emergency & Insurance</Card.Title>
            <Card.Body>
              {renderField('Emergency Contact Name', 'emergencyName')}
              {renderField('Relationship', 'emergencyRelationship')}
              {renderField('Emergency Mobile', 'emergencyMobile')}
              {renderField('Insurance Provider', 'insuranceProvider')}
              {renderField('Policy Number', 'policyNumber')}
              {renderField('Policyholder Name', 'policyholderName')}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PatientDetailsPage;
