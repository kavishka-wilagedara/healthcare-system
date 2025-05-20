import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../common/UserContext'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import '../css/DoctorProfile.css';

export default function DoctorProfile() {
    const { user } = useContext(UserContext);
    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [appointmentsLoading, setAppointmentsLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        specialization: ''
    });
    const [stats, setStats] = useState({
        total: 0,
        confirmed: 0,
        pending: 0,
        completed: 0
    });

    const doctorId = user?.doctor.id;

    useEffect(() => {
        getDoctorById();
        getDoctorAppointments();
    }, []);

    useEffect(() => {
        if (appointments.length > 0) {
            calculateStats();
        }
    }, [appointments]);

    const calculateStats = () => {
        const total = appointments.length;
        const confirmed = appointments.filter(app => app.booked === 'confirmed').length;
        const pending = appointments.filter(app => app.booked !== 'confirmed').length;
        const completed = appointments.filter(app => app.completed).length;

        setStats({ total, confirmed, pending, completed });
    };

    const getDoctorById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/doctor/${doctorId}`);
            setDoctor(response.data);
            setFormData({
                fullName: response.data.fullName,
                email: response.data.email,
                contactNumber: response.data.contactNumber,
                specialization: response.data.specialization
            });
            setLoading(false);
        } catch (error) {
            console.log('Error while fetching doctor data:', error);
            setLoading(false);
        }
    }

    const handleAppointmentDelete = async (appointmentId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`);
            console.log(response.data);
            alert('Appointment deleted successfully');
            window.location.reload();
        } catch (error) {
            console.log('Error while deleting appointment:', error);
        }
    }

    const getDoctorAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/appointments/');
            const doctorAppointments = response.data.data.filter(
                appointment => appointment.appointment.doctorId === doctorId
            );
            setAppointments(doctorAppointments);
            setAppointmentsLoading(false);
        } catch (error) {
            console.log('Error while fetching appointments:', error);
            setAppointmentsLoading(false);
        }
    }

    const handleEditProfile = () => {
        setShowEditModal(true);
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedDoctor = {
                ...formData,
                _id: doctor._id,
                doctorId: doctor.doctorId,
                password: doctor.password
            };

            const response = await axios.put(
                `http://localhost:5000/api/doctor/${doctor._id}`,
                updatedDoctor
            );
            
            setDoctor(response.data);
            setShowEditModal(false);
            alert('Profile updated successfully');
            window.location.reload();
        } catch (error) {
            console.log('Error while updating doctor profile:', error);
            alert('Failed to update profile');
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="loading-text">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="doctor-profile-container">
            <div className="profile-header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h1 className="welcome-text">Welcome back, Dr. {doctor?.fullName.split(' ')[0]}</h1>
                            <p className="subtitle">Manage your profile and appointments</p>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <button className="btn btn-outline-light" onClick={handleEditProfile}>
                                <i className="fas fa-edit me-2"></i> Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container main-content">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="profile-card">
                            <div className="profile-banner"></div>
                            <div className="profile-avatar">
                                <img 
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" 
                                    alt="doctor avatar"
                                    className="rounded-circle img-fluid"
                                />
                                <div className="badge-status">
                                    <span className="status-indicator"></span> Online
                                </div>
                            </div>
                            <div className="profile-info">
                                <h2>{doctor?.fullName || 'Doctor Name'}</h2>
                                <span className="specialization-badge">{doctor?.specialization || 'Specialization'}</span>
                                <p className="doctor-id"><i className="fas fa-id-card me-2"></i>ID: {doctor?.doctorId || 'N/A'}</p>
                                
                                <hr className="divider" />
                                
                                <div className="contact-info">
                                    <div className="info-item">
                                        <i className="fas fa-envelope"></i>
                                        <p>{doctor?.email || 'email@example.com'}</p>
                                    </div>
                                    <div className="info-item">
                                        <i className="fas fa-phone"></i>
                                        <p>{doctor?.contactNumber || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="stats-card">
                            <h3>Your Statistics</h3>
                            <div className="row stats-container">
                                <div className="col-6 mb-3">
                                    <div className="stat-item stat-total">
                                        <div className="stat-icon">
                                            <i className="fas fa-calendar-check"></i>
                                        </div>
                                        <div className="stat-info">
                                            <h4>{stats.total}</h4>
                                            <p>Total</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <div className="stat-item stat-confirmed">
                                        <div className="stat-icon">
                                            <i className="fas fa-check-circle"></i>
                                        </div>
                                        <div className="stat-info">
                                            <h4>{stats.confirmed}</h4>
                                            <p>Confirmed</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="stat-item stat-pending">
                                        <div className="stat-icon">
                                            <i className="fas fa-clock"></i>
                                        </div>
                                        <div className="stat-info">
                                            <h4>{stats.pending}</h4>
                                            <p>Pending</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="stat-item stat-completed">
                                        <div className="stat-icon">
                                            <i className="fas fa-flag-checkered"></i>
                                        </div>
                                        <div className="stat-info">
                                            <h4>{stats.completed}</h4>
                                            <p>Completed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-8">
                        <div className="appointments-card">
                            <div className="card-header">
                                <h3><i className="fas fa-calendar-alt me-2"></i>Your Appointments</h3>
                                <div className="header-actions">
                                    <div className="dropdown">
                                        <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                            Filter
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                                            <li><a className="dropdown-item" href="#">All Appointments</a></li>
                                            <li><a className="dropdown-item" href="#">Confirmed Only</a></li>
                                            <li><a className="dropdown-item" href="#">Pending Only</a></li>
                                            <li><a className="dropdown-item" href="#">Completed Only</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="card-body">
                                {appointmentsLoading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-2">Loading appointments...</p>
                                    </div>
                                ) : appointments.length === 0 ? (
                                    <div className="empty-appointments">
                                        <div className="empty-icon">
                                            <i className="fas fa-calendar-times"></i>
                                        </div>
                                        <h4>No Appointments Found</h4>
                                        <p>You currently don't have any appointments scheduled.</p>
                                    </div>
                                ) : (
                                    <div className="appointments-list">
                                        {appointments.map((appointment) => (
                                            <div className="appointment-item" key={appointment._id}>
                                                <div className="appointment-date">
                                                    <div className="date-box">
                                                        <span className="month">{formatDate(appointment.appointment.date).split(' ')[0]}</span>
                                                        <span className="day">{formatDate(appointment.appointment.date).split(' ')[1].replace(',', '')}</span>
                                                    </div>
                                                    <div className="time">
                                                        {appointment.appointment.inTime} - {appointment.appointment.outTime}
                                                    </div>
                                                </div>
                                                
                                                <div className="appointment-content">
                                                    <div className="patient-info">
                                                        <h4>{appointment.patient.fullName}</h4>
                                                        <p className="patient-id">ID: {appointment.patient.nic}</p>
                                                    </div>
                                                    
                                                    <div className="appointment-status">
                                                        <span className={`status-badge ${
                                                            appointment.booked === 'confirmed' ? 'confirmed' : 'pending'
                                                        }`}>
                                                            {appointment.booked}
                                                        </span>
                                                        
                                                        <span className={`completion-badge ${
                                                            appointment.completed ? 'completed' : 'not-completed'
                                                        }`}>
                                                            {appointment.completed ? 'Completed' : 'Not Completed'}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="appointment-actions">
                                                        <button 
                                                            className="btn btn-sm btn-outline-danger" 
                                                            onClick={() => handleAppointmentDelete(appointment._id)}
                                                        >
                                                            <i className="fas fa-trash-alt me-1"></i> Cancel
                                                        </button>
                                                        {!appointment.completed && (
                                                            <button className="btn btn-sm btn-outline-success">
                                                                <i className="fas fa-check me-1"></i> Mark Complete
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showEditModal} onHide={handleCloseEditModal} className="profile-edit-modal">
                <Modal.Header closeButton>
                    <Modal.Title><i className="fas fa-user-edit me-2"></i>Edit Your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contact Number</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-phone"></i></span>
                                <Form.Control
                                    type="text"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Specialization</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-stethoscope"></i></span>
                                <Form.Control
                                    type="text"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </Form.Group>

                        <div className="d-flex justify-content-end mt-4">
                            <Button variant="secondary" onClick={handleCloseEditModal} className="me-2">
                                <i className="fas fa-times me-1"></i> Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                <i className="fas fa-save me-1"></i> Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}