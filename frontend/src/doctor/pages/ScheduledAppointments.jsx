import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import appointmentsData from '../data/appointments.json';

const ScheduledAppointments = () => {
  const [pendingAppointments, setPendingAppointments] = useState([]);

  useEffect(() => {
    const filteredAppointments = appointmentsData.filter(
      appointment => appointment.status === 'accept'
    );
    setPendingAppointments(filteredAppointments);
  }, []);

  const updateStatus = (appointment_ID, newStatus) => {
    const updatedAppointments = pendingAppointments.map(appointment =>
      appointment.appointment_ID === appointment_ID
        ? { ...appointment, status: newStatus }
        : appointment
    );
    setPendingAppointments(updatedAppointments);
  };

  return (
    <div className="container py-5">
      <h3 className="display-6 fw-bold text-primary mb-4">Scheduled Appointments</h3>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>Appointment ID</th>
                  <th>Patient Name</th>
                  <th>Day</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>NIC</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingAppointments.map((appointment) => (
                  <tr key={appointment.appointment_ID}>
                    <td>{appointment.appointment_ID}</td>
                    <td>{appointment.name}</td>
                    <td>{appointment.day}</td>
                    <td>{appointment.phone}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.nic}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2 healthcare-btn-success"
                        onClick={() => updateStatus(appointment.appointment_ID, 'complete')}
                      >
                        Complete
                      </button>
                      <Link to={`/doc-appointment-details/${appointment.appointment_ID}`}>
                        <button className="btn btn-info btn-sm healthcare-btn-info">View</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .card {
          border: none;
          border-radius: 10px;
          background-color: #f8f9fa;
        }
        .table-primary {
          background-color: #e6f0fa;
        }
        .healthcare-btn-success {
          transition: all 0.3s ease;
        }
        .healthcare-btn-success:hover {
          background-color: #28a745;
          transform: translateY(-2px);
        }
        .healthcare-btn-info {
          transition: all 0.3s ease;
        }
        .healthcare-btn-info:hover {
          background-color: #138496;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default ScheduledAppointments;