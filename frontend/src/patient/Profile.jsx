import React from "react";
import { useParams } from "react-router-dom";
import patientsData from "../doctor/data/patients.json";
import PatientChannelHistory from "../doctor/components/PatientChannelHistory";

function Profile() {
  const { id } = useParams();
  const patient = patientsData.find(
    (p) => String(p.patient_ID) === String(id)
  );

  if (!patient) {
    return <div className="p-4 text-danger">Patient not found.</div>;
  }

  return (
    <div className="container py-5">
      <h3 className="display-5 fw-bold text-teal mb-5 text-center">Patient Profile</h3>
      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow-sm healthcare-card">
            <div className="card-header healthcare-card-header">
              <h4 className="mb-0 text-white">Patient Information</h4>
            </div>
            <div className="card-body">
              <dl className="row mb-0">
                <dt className="col-sm-4 fw-semibold">Patient ID</dt>
                <dd className="col-sm-8">{patient.patient_ID}</dd>
                <dt className="col-sm-4 fw-semibold">Name</dt>
                <dd className="col-sm-8">{patient.name}</dd>
                <dt className="col-sm-4 fw-semibold">NIC</dt>
                <dd className="col-sm-8">{patient.nic}</dd>
                <dt className="col-sm-4 fw-semibold">Age</dt>
                <dd className="col-sm-8">{patient.age}</dd>
                <dt className="col-sm-4 fw-semibold">Gender</dt>
                <dd className="col-sm-8">{patient.gender}</dd>
                <dt className="col-sm-4 fw-semibold">Phone</dt>
                <dd className="col-sm-8">{patient.phone}</dd>
                <dt className="col-sm-4 fw-semibold">Email</dt>
                <dd className="col-sm-8">{patient.email}</dd>
                <dt className="col-sm-4 fw-semibold">Address</dt>
                <dd className="col-sm-8">{patient.address}</dd>
                <dt className="col-sm-4 fw-semibold">Medical History</dt>
                <dd className="col-sm-8">
                  {patient.medical_history.length > 0
                    ? patient.medical_history.join(", ")
                    : "None"}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <PatientChannelHistory patientId={patient.patient_ID} />

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
}

export default Profile;