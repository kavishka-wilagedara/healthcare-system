import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/medical-services.css';

const MedicalServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error Loading Services',
        text: err.response?.data?.message || err.message,
        confirmButtonColor: '#2563eb'
      });
    }
  };

  const handleAccept = async (serviceId, serviceName) => {
    const result = await Swal.fire({
      title: 'Accept Service?',
      text: `Are you sure you want to accept "${serviceName}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Accept',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.put(`http://localhost:5000/api/services/accept/${serviceId}`);
        setServices(services.map(service => 
          service._id === serviceId ? response.data.data : service
        ));
        
        Swal.fire({
          icon: 'success',
          title: 'Service Accepted!',
          text: 'The service has been successfully accepted.',
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response?.data?.message || err.message,
          confirmButtonColor: '#ef4444'
        });
      }
    }
  };

  const handleDelete = async (service) => {
    const result = await Swal.fire({
      title: 'Delete Service?',
      html: `
        <div class="delete-confirmation">
          <p>Are you sure you want to delete this service?</p>
          <div class="service-details">
            <strong>Service:</strong> ${service.name}<br>
            <strong>Patient:</strong> ${service.patient?.fullName || 'N/A'}<br>
            <strong>Date:</strong> ${service.date}
          </div>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/services/${service._id}`);
        setServices(services.filter(s => s._id !== service._id));
        
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The service has been successfully deleted.',
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response?.data?.message || err.message,
          confirmButtonColor: '#ef4444'
        });
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'status-pending', text: 'Pending', icon: '⏳' },
      accepted: { class: 'status-accepted', text: 'Accepted', icon: '✅' },
      completed: { class: 'status-completed', text: 'Completed', icon: '🏁' },
      cancelled: { class: 'status-cancelled', text: 'Cancelled', icon: '❌' }
    };
    
    const config = statusConfig[status] || { class: 'status-default', text: status, icon: '📋' };
    
    return (
      <span className={`status-badge ${config.class}`}>
        <span className="status-icon">{config.icon}</span>
        {config.text}
      </span>
    );
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.patient?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.patient?.nic?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="medical-loader">
          <div className="pulse-ring"></div>
          <div className="pulse-ring"></div>
          <div className="pulse-ring"></div>
          <div className="medical-cross">+</div>
        </div>
        <p className="loading-text">Loading Medical Services...</p>
      </div>
    );
  }

  return (
    <div className="medical-services-container">
      <div className="header-section">
        <div className="header-content">
          <div className="title-section">
            <h1 className="page-title">
              <span className="title-icon">🏥</span>
              Medical Services Management
            </h1>
            <p className="page-subtitle">Manage and monitor medical service requests</p>
          </div>
          
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{services.length}</span>
              <span className="stat-label">Total Services</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{services.filter(s => s.status === 'pending').length}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{services.filter(s => s.status === 'accepted').length}</span>
              <span className="stat-label">Accepted</span>
            </div>
          </div>
        </div>
      </div>

      <div className="controls-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by service name, patient name, or NIC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="filter-container">
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        {filteredServices.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No Services Found</h3>
            <p>
              {searchTerm || filterStatus !== 'all' 
                ? 'No services match your current filters.' 
                : 'No medical services have been registered yet.'}
            </p>
          </div>
        ) : (
          <div className="services-grid">
            {filteredServices.map((service, index) => (
              <div key={service._id} className="service-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="service-header">
                  <h3 className="service-name">{service.name}</h3>
                  {getStatusBadge(service.status)}
                </div>
                
                <div className="service-details">
                  <div className="detail-row">
                    <span className="detail-icon">👤</span>
                    <div className="detail-content">
                      <span className="detail-label">Patient</span>
                      <span className="detail-value">{service.patient?.fullName || 'N/A'}</span>
                      {service.patient?.nic && (
                        <span className="detail-subtext">NIC: {service.patient.nic}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-icon">📅</span>
                    <div className="detail-content">
                      <span className="detail-label">Schedule</span>
                      <span className="detail-value">{service.date} at {service.time}</span>
                    </div>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-icon">🏠</span>
                    <div className="detail-content">
                      <span className="detail-label">Room</span>
                      <span className="detail-value">{service.roomNum || 'Not assigned'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="service-actions">
                  {service.status === 'pending' && (
                    <button
                      className="action-btn accept-btn"
                      onClick={() => handleAccept(service._id, service.name)}
                    >
                      <span className="btn-icon">✅</span>
                      Accept Service
                    </button>
                  )}
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(service)}
                  >
                    <span className="btn-icon">🗑️</span>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalServices;