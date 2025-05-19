import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../common/UserContext'
import axios from 'axios';

export default function DoctorProfile() {
    const { user } = useContext(UserContext);
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    const doctorId = user?.doctor.id;

    useEffect(() => {
        getDoctorById();
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

                    <div className="row mt-4">
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Recent Activity</h5>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Today's Appointments
                                            <span className="badge bg-primary rounded-pill">5</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Pending Approvals
                                            <span className="badge bg-warning rounded-pill">2</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Total Patients
                                            <span className="badge bg-success rounded-pill">24</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Quick Actions</h5>
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-outline-primary">View Schedule</button>
                                        <button className="btn btn-outline-secondary">View Patients</button>
                                        <button className="btn btn-outline-info">View Reports</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}