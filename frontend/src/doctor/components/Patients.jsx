import React, { useEffect, useState } from 'react';
import patientsData from '../data/patients.json';

const Patients = () => {
  const [data, setData] = useState([]);
  const [nicSearch, setNicSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setData(patientsData);
    setFilteredData(patientsData);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setNicSearch(value);
    const filtered = data.filter((patient) =>
      patient.nic.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="container py-5">
      <h2 className="display-6 fw-bold text-primary mb-1">Patient Records</h2>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="input-group mb-4 w-50">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              placeholder="Search by NIC"
              value={nicSearch}
              onChange={handleSearch}
              className="form-control border-start-0"
            />
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>Patient ID</th>
                  <th>Name</th>
                  <th>NIC</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Medical History</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((patient) => (
                  <tr key={patient.patient_ID}>
                    <td>{patient.patient_ID}</td>
                    <td>{patient.name}</td>
                    <td>{patient.nic}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.email}</td>
                    <td>{patient.address}</td>
                    <td>
                      {patient.medical_history.length > 0
                        ? patient.medical_history.join(', ')
                        : 'None'}
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
        .input-group-text {
          border-color: #ced4da;
        }
        .form-control:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Patients;