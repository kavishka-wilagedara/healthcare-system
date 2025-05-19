import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../common/UserContext'
import axios from 'axios';

export default function DoctorProfile() {
    const { user } = useContext(UserContext);
    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [appointmentsLoading, setAppointmentsLoading] = useState(true);

    const doctorId = user?.doctor.id;

    useEffect(() => {
        getDoctorById();
        getDoctorAppointments();
    }, []);

    const getDoctorById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/doctor/${doctorId}`);
            setDoctor(response.data);
            setLoading(false);
        } catch (error) {
            console.log('Error while fetching doctor data:', error);
            setLoading(false);
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

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body text-center">
                            <img 
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" 
                                alt="avatar"
                                className="rounded-circle img-fluid" 
                                style={{ width: '150px' }}
                            />
                            <h5 className="my-3">{doctor?.fullName || 'Doctor Name'}</h5>
                            <p className="text-muted mb-1">{doctor?.specialization || 'Specialization'}</p>
                            <p className="text-muted mb-4">ID: {doctor?.doctorId || 'N/A'}</p>
                            <div className="d-flex justify-content-center mb-2">
                                <button type="button" className="btn btn-primary me-2">Edit Profile</button>
                                <button type="button" className="btn btn-outline-secondary">Change Photo</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Full Name</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{doctor?.fullName || 'N/A'}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Email</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{doctor?.email || 'N/A'}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Phone</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{doctor?.contactNumber || 'N/A'}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Specialization</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{doctor?.specialization || 'N/A'}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Account Status</p>
                                </div>
                                <div className="col-sm-9">
                                    <span className="badge bg-success">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-4 shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Doctor's Appointments</h5>
                        </div>
                        <div className="card-body">
                            {appointmentsLoading ? (
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : appointments.length === 0 ? (
                                <p className="text-muted">No appointments found</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Patient</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Status</th>
                                                <th>Completed</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map((appointment) => (
                                                <tr key={appointment._id}>
                                                    <td>
                                                        {appointment.patient.fullName}
                                                        <br />
                                                        <small className="text-muted">{appointment.patient.nic}</small>
                                                    </td>
                                                    <td>{appointment.appointment.date}</td>
                                                    <td>
                                                        {appointment.appointment.inTime} - {appointment.appointment.outTime}
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${
                                                            appointment.booked === 'confirmed' ? 'bg-success' : 'bg-warning'
                                                        }`}>
                                                            {appointment.booked}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {appointment.completed ? (
                                                            <span className="badge bg-success">Yes</span>
                                                        ) : (
                                                            <span className="badge bg-secondary">No</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}