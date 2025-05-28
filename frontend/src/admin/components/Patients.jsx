import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const defaultPatientImage = 'https://cdn-icons-png.flaticon.com/512/1533/1533506.png';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients/');
      setPatients(response.data.data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete Patient?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/patients/delete/${id}`);
        Swal.fire('Deleted!', 'Patient has been removed.', 'success');
        fetchPatients();
      } catch (error) {
        console.error('Delete failed:', error);
        Swal.fire('Error', 'Failed to delete patient.', 'error');
      }
    }
  };

  return (
    <div>
      <h3 className="text-success mb-4">Manage Patients</h3>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {patients.map((patient) => (
          <Col key={patient._id}>
            <Card className="shadow-sm h-100 border-0">
              <Card.Img
                variant="top"
                src={defaultPatientImage}
                alt="patient avatar"
                style={{ height: '160px', objectFit: 'contain', padding: '1rem' }}
              />
              <Card.Body>
                <h5 className="card-title">{patient.fullName}</h5>
                <p className="card-text mb-1"><strong>NIC:</strong> {patient.nic}</p>
                <p className="card-text mb-1"><strong>Gender:</strong> {patient.gender}</p>
                <p className="card-text"><strong>Blood Type:</strong> {patient.bloodType}</p>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between px-3 pb-3">
                <Button variant="success" size="sm" onClick={() => navigate(`/admin/patient/${patient._id}`)}>
                  <i className="fas fa-eye me-1"></i> View
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(patient._id)}>
                  <i className="fas fa-trash me-1"></i> Delete
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Patients;
