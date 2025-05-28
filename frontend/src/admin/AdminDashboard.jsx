import React, { useState } from 'react';
import { FaUserMd, FaUserInjured, FaCalendarAlt, FaHospital, FaBars } from 'react-icons/fa';
import Patients from './components/Patients';
import Doctors from './components/Doctors';
import Appointments from './components/Appointments';
import MedicalServices from './components/MedicalServices';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('patients');
  const [collapsed, setCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'patients':
        return <Patients />;
      case 'doctors':
        return <Doctors />;
      case 'appointments':
        return <Appointments />;
      case 'services':
        return <MedicalServices />;
      default:
        return <Patients />;
    }
  };

  return (
    <div className="admin-wrapper d-flex">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center px-3">
          {!collapsed && <h4>Admin Panel</h4>}
          <button className="btn btn-sm btn-outline-light toggle-btn" onClick={() => setCollapsed(!collapsed)}>
            <FaBars />
          </button>
        </div>
        <ul className="nav flex-column px-2">
          <li className={`nav-item ${activeTab === 'patients' ? 'active' : ''}`}>
            <button className="nav-link" onClick={() => setActiveTab('patients')}>
              <FaUserInjured className="me-2" /> {!collapsed && 'Patients'}
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'doctors' ? 'active' : ''}`}>
            <button className="nav-link" onClick={() => setActiveTab('doctors')}>
              <FaUserMd className="me-2" /> {!collapsed && 'Doctors'}
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`}>
            <button className="nav-link" onClick={() => setActiveTab('appointments')}>
              <FaCalendarAlt className="me-2" /> {!collapsed && 'Appointments'}
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'services' ? 'active' : ''}`}>
            <button className="nav-link" onClick={() => setActiveTab('services')}>
              <FaHospital className="me-2" /> {!collapsed && 'Services'}
            </button>
          </li>
        </ul>
      </div>

      <div className="content p-4 flex-grow-1">
        {renderContent()}
      </div>

      <style>{`
        .admin-wrapper {
          min-height: 100vh;
          background-color: #f0f2f5;
        }
        .sidebar {
          width: 250px;
          background-color: #1f2937;
          color: white;
          transition: width 0.3s;
        }
        .sidebar.collapsed {
          width: 70px;
        }
        .sidebar h4 {
          color: white;
          margin: 1rem 0;
        }
        .nav-link {
          width: 100%;
          text-align: left;
          padding: 10px 15px;
          color: #cbd5e1;
          border-radius: 8px;
          margin: 5px 0;
          background-color: transparent;
          transition: background-color 0.3s ease;
        }
        .nav-item.active .nav-link,
        .nav-link:hover {
          background-color: #3b82f6;
          color: white;
        }
        .toggle-btn {
          background-color: #334155;
          border: none;
          color: white;
        }
        .content {
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
