import React from 'react';
import appointments from '../data/appointments.json';

const PatientChannelHistory = ({ patientId }) => {
  const completedAppointments = appointments.filter(
    (appointment) =>
      appointment.status === 'completed' &&
      String(appointment.patient_ID) === String(patientId)
  );

  if (completedAppointments.length === 0) {
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
        {completedAppointments.map((appointment) => (
          <div key={appointment.appointment_ID} className="col-12">
            <div className="card shadow-sm healthcare-card">
              <div className="card-header healthcare-card-header">
                <h4 className="mb-0 text-white">Appointment {appointment.appointment_ID}</h4>
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-sm-4 fw-semibold">Appointment ID</dt>
                  <dd className="col-sm-8">{appointment.appointment_ID}</dd>
                  <dt className="col-sm-4 fw-semibold">Medical History</dt>
                  <dd className="col-sm-8">
                    {appointment.medical_history?.length > 0
                      ? appointment.medical_history.join(', ')
                      : 'None'}
                  </dd>
                  <dt className="col-sm-4 fw-semibold">Medicine</dt>
                  <dd className="col-sm-8">{appointment.medicine || 'N/A'}</dd>
                  <dt className="col-sm-4 fw-semibold">Description</dt>
                  <dd className="col-sm-8">{appointment.description || 'N/A'}</dd>
                </dl>
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