import React, { useState } from 'react';
import Patients from '../components/Patients';
import AddTimeForm from './AddTimeForm'; 
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddTimeClick = () => {
    setShowForm(!showForm); 
  };

  return (
    <div className="container py-5">
      <div className=" d-flex justify-content-end">
        <Link to="/doc-add-time">
          <button className="btn btn-primary healthcare-btn shadow-sm">
            Add Time
          </button>
        </Link>
      </div>

      {showForm && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <AddTimeForm />
          </div>
        </div>
      )}

      <Patients />

      <style>{`
        .healthcare-btn {
          background-color: #007bff;
          border-color: #007bff;
          transition: all 0.3s ease;
        }
        .healthcare-btn:hover {
          background-color: #0056b3;
          border-color: #0056b3;
          transform: translateY(-2px);
        }
        .card {
          border: none;
          border-radius: 10px;
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;