import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientChannelHistory = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments/');
        // Filter appointments by patient ID and completed status
        const filteredAppointments = response.data.data.filter(
          (appointment) => 
            appointment.patient?._id === patientId && 
            appointment.completed === true
        );
        setAppointments(filteredAppointments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to fetch appointments');
        setLoading(false);
      }
    };

    getAllAppointments();
  }, [patientId]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-teal" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading appointment history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="container py-5">
        <h5 className="text-muted">No completed appointments found for this patient.</h5>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h3 className="display-5 fw-bold text-teal mb-5 text-center">Channel History</h3>
      <div className="row g-4">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="col-12">
            <div className="card shadow-sm healthcare-card">
              <div className="card-header healthcare-card-header">
                <h4 className="mb-0 text-white">Appointment Details</h4>
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-sm-4 fw-semibold">Appointment ID</dt>
                  <dd className="col-sm-8">{appointment._id}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Doctor</dt>
                  <dd className="col-sm-8">{appointment.appointment?.doctorName}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Specialization</dt>
                  <dd className="col-sm-8">{appointment.appointment?.specialization}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Date</dt>
                  <dd className="col-sm-8">{new Date(appointment.appointment?.date).toLocaleDateString()}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Time</dt>
                  <dd className="col-sm-8">{appointment.appointment?.inTime} - {appointment.appointment?.outTime}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Medicine</dt>
                  <dd className="col-sm-8">{appointment.medicine || 'N/A'}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Medical Advice</dt>
                  <dd className="col-sm-8">{appointment.advice || 'N/A'}</dd>
                </dl>
              </div>
              <div className="card-footer text-muted">
                Last updated: {new Date(appointment.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .text-teal {
          color: #17a2b8;
        }
        .healthcare-card {
          border: none;
          border-radius: 12px;
          background-color: #ffffff;
          transition: transform 0.3s ease;
        }
        .healthcare-card:hover {
          transform: translateY(-5px);
        }
        .healthcare-card-header {
          background: linear-gradient(135deg, #17a2b8, #138496);
          border-radius: 12px 12px 0 0;
          padding: 1.5rem;
        }
        .card-body {
          background-color: #f8f9fa;
          border-radius: 0;
        }
        .card-footer {
          background-color: #e9ecef;
          border-radius: 0 0 12px 12px;
        }
        .row.mb-0 > dt, .row.mb-0 > dd {
          margin-bottom: 0.75rem;
        }
        dt.fw-semibold {
          color: #343a40;
        }
        @media (max-width: 767px) {
          .row.mb-0 > dt {
            margin-bottom: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PatientChannelHistory;