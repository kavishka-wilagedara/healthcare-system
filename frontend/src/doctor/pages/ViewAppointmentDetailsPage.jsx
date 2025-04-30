import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import appointmentsData from '../data/appointments.json';

const ViewAppointmentDetailsPage = () => {
  const { id } = useParams();
  const appointment = appointmentsData.find(a => a.appointment_ID === id);

  const [medicine, setMedicine] = useState('');
  const [description, setDescription] = useState('');

  if (!appointment) {
    return <div className="p-4 text-danger">Appointment not found.</div>;
  }

  const handleSubmit = () => {
    console.log("Medicine:", medicine);
    console.log("Description:", description);
    alert("Submitted successfully!");
  };

  return (
    <div className="container py-5">
      <h3 className="display-5 fw-bold text-teal mb-5 text-center">Appointment Details</h3>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm healthcare-card">
            <div className="card-header healthcare-card-header">
              <h4 className="mb-0 text-white">Appointment Information</h4>
            </div>
            <div className="card-body">
              <dl className="row mb-0">
                <dt className="col-sm-4 fw-semibold">Appointment ID</dt>
                <dd className="col-sm-8">{appointment.appointment_ID}</dd>
                <dt className="col-sm-4 fw-semibold">Name</dt>
                <dd className="col-sm-8">{appointment.name}</dd>
                <dt className="col-sm-4 fw-semibold">Age</dt>
                <dd className="col-sm-8">{appointment.age}</dd>
                <dt className="col-sm-4 fw-semibold">NIC</dt>
                <dd className="col-sm-8">{appointment.nic}</dd>
                <dt className="col-sm-4 fw-semibold">Phone</dt>
                <dd className="col-sm-8">{appointment.phone}</dd>
                <dt className="col-sm-4 fw-semibold">Email</dt>
                <dd className="col-sm-8">{appointment.email}</dd>
                <dt className="col-sm-4 fw-semibold">Day</dt>
                <dd className="col-sm-8">{appointment.day}</dd>
                <dt className="col-sm-4 fw-semibold">Time</dt>
                <dd className="col-sm-8">{appointment.intime} - {appointment.outtime}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm healthcare-card">
            <div className="card-header healthcare-card-header">
              <h4 className="mb-0 text-white">Add Prescription</h4>
            </div>
            <div className="card-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="medicine"
                  value={medicine}
                  onChange={(e) => setMedicine(e.target.value)}
                  placeholder="Enter prescribed medicine"
                />
                <label htmlFor="medicine">Prescribed Medicine</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="description"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter diagnosis or advice"
                  style={{ height: '120px' }}
                ></textarea>
                <label htmlFor="description">Diagnosis or Advice</label>
              </div>
              <button
                className="btn btn-teal healthcare-btn w-100"
                onClick={handleSubmit}
              >
                Submit Prescription
              </button>
            </div>
          </div>
        </div>
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
        .btn-teal {
          background-color: #17a2b8;
          border-color: #17a2b8;
          color: #ffffff;
          transition: all 0.3s ease;
        }
        .btn-teal:hover {
          background-color: #138496;
          border-color: #138496;
          transform: translateY(-2px);
        }
        .form-floating > .form-control:focus,
        .form-floating > .form-control:not(:placeholder-shown) {
          padding-top: 1.625rem;
          padding-bottom: 0.625rem;
        }
        .form-floating > label {
          color: #6c757d;
        }
        .form-control:focus {
          border-color: #17a2b8;
          box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.25);
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

export default ViewAppointmentDetailsPage;