import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Patients = () => {
  const [data, setData] = useState([]);
  const [nicSearch, setNicSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  //get all patients
    const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');  
      setData(response.data.data);
      setFilteredData(response.data.data);
      console.log(response.data.data,"get all patients")
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setNicSearch(value);
    const filtered = data.filter((patient) =>
      patient.nic.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleView = (id) => {
    navigate(`/doc-patient-profile/${id}`);
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
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Medical History</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((patient) => (
                  <tr key={patient._id}>
                    <td>{patient._id}</td>
                    <td>{patient.fullName}</td>
                    <td>{patient.nic}</td>
                    <td>{patient.dob}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.mobileNumber}</td>
                    <td>{patient.email}</td>
                    <td>{patient.residentialStreet},{patient.residentialProvince},{patient.residentialCity}</td>
                    <td>
                      {patient?.familyMedicalHistory}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleView(patient.patient_ID)}
                      >
                        View
                      </button>
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
