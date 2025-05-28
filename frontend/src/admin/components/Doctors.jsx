import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Card, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const defaultImage = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png'; // Common doctor image

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    doctorId: '',
    fullName: '',
    email: '',
    contactNumber: '',
    specialization: '',
    password: '',
  });

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowAddModal = () => {
    setFormData({
      doctorId: '',
      fullName: '',
      email: '',
      contactNumber: '',
      specialization: '',
      password: '',
    });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEditClick = (doctor) => {
    setFormData(doctor);
    setSelectedDoctor(doctor);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete Doctor?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/doctor/delete/${id}`);
        fetchDoctors();
        Swal.fire('Deleted!', 'Doctor has been deleted.', 'success');
      } catch (error) {
        console.error('Delete failed:', error);
        Swal.fire('Error', 'Failed to delete doctor.', 'error');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/doctor/${selectedDoctor._id}`, formData);
        Swal.fire('Updated!', 'Doctor updated successfully.', 'success');
      } else {
        await axios.post('http://localhost:5000/api/doctor/register', formData);
        Swal.fire('Added!', 'Doctor added successfully.', 'success');
      }
      setShowModal(false);
      fetchDoctors();
    } catch (error) {
      console.error('Submit failed:', error);
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-success">Manage Doctors</h3>
        <Button variant="success" onClick={handleShowAddModal}>
          <i className="fas fa-plus me-2"></i>Add Doctor
        </Button>
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {doctors.map((doc) => (
          <Col key={doc._id}>
            <Card className="shadow-sm h-100 border-0">
              <Card.Img
                variant="top"
                src={defaultImage}
                alt="doctor avatar"
                style={{ height: '160px', objectFit: 'contain', padding: '1rem' }}
              />
              <Card.Body>
                <h5 className="card-title">{doc.fullName}</h5>
                <p className="card-text mb-1"><strong>ID:</strong> {doc.doctorId}</p>
                <p className="card-text mb-1"><strong>Email:</strong> {doc.email}</p>
                <p className="card-text mb-1"><strong>Phone:</strong> {doc.contactNumber}</p>
                <p className="card-text"><strong>Specialization:</strong> {doc.specialization}</p>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between px-3 pb-3">
                <Button
                  variant="success"
                  size="sm"
                  className="d-flex align-items-center gap-1 px-3"
                  onClick={() => handleEditClick(doc)}
                >
                  <i className="fas fa-pen"></i>
                  <span>Edit</span>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="d-flex align-items-center gap-1 px-3"
                  onClick={() => handleDeleteClick(doc._id)}
                >
                  <i className="fas fa-trash"></i>
                  <span>Remove</span>
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Doctor' : 'Add New Doctor'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Doctor ID</Form.Label>
              <Form.Control type="text" name="doctorId" value={formData.doctorId} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" name="password" value={formData.password} onChange={handleInputChange} required={!editMode} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              {editMode ? 'Update Doctor' : 'Add Doctor'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Doctors;
