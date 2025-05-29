import React, { useState, useEffect } from 'react';

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
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/services');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setServices(data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err.message);
      // Show user-friendly error notification
      showNotification('error', 'Error Loading Services', err.message);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, title, message) => {
    // Simple notification system - you can replace this with your preferred notification library
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <strong>${title}</strong>
        <p>${message}</p>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  };

  const showConfirmation = (title, message, onConfirm) => {
    if (window.confirm(`${title}\n\n${message}`)) {
      onConfirm();
    }
  };

  const handleAccept = async (serviceId, serviceName) => {
    showConfirmation(
      'Accept Service?',
      `Are you sure you want to accept "${serviceName}"?`,
      async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/services/accept/${serviceId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          
          // Update the service in the local state
          setServices(services.map(service => 
            service._id === serviceId ? data.data : service
          ));
          
          showNotification('success', 'Service Accepted!', 'The service has been successfully accepted.');
        } catch (err) {
          console.error('Error accepting service:', err);
          showNotification('error', 'Error', err.message);
        }
      }
    );
  };

  const handleDelete = async (service) => {
    showConfirmation(
      'Delete Service?',
      `Are you sure you want to delete this service?\n\nService: ${service.name}\nPatient: ${service.patient?.fullName || 'N/A'}\nDate: ${service.date}`,
      async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/services/${service._id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // Remove the service from local state
          setServices(services.filter(s => s._id !== service._id));
          
          showNotification('success', 'Deleted!', 'The service has been successfully deleted.');
        } catch (err) {
          console.error('Error deleting service:', err);
          showNotification('error', 'Error', err.message);
        }
      }
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'status-pending', text: 'Pending', icon: '⏳' },
      accepted: { class: 'status-accepted', text: 'Accepted', icon: '✓' },
      completed: { class: 'status-completed', text: 'Completed', icon: '✓' },
      cancelled: { class: 'status-cancelled', text: 'Cancelled', icon: '✕' }
    };
    
    const config = statusConfig[status] || { class: 'status-default', text: status, icon: '•' };
    
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
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading medical services...</p>
      </div>
    );
  }

  if (error && services.length === 0) {
    return (
      <div className="error-container">
        <div className="error-content">
          <svg className="error-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          <h3 className="error-title">Failed to Load Services</h3>
          <p className="error-description">{error}</p>
          <button className="retry-btn" onClick={fetchServices}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="medical-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="dashboard-title">Medical Services</h1>
            <p className="dashboard-subtitle">Manage patient service requests and appointments</p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{services.length}</div>
              <div className="stat-label">Total Services</div>
            </div>
            <div className="stat-card pending">
              <div className="stat-value">{services.filter(s => s.status === 'pending').length}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-card accepted">
              <div className="stat-value">{services.filter(s => s.status === 'accepted').length}</div>
              <div className="stat-label">Accepted</div>
            </div>
            <div className="stat-card completed">
              <div className="stat-value">{services.filter(s => s.status === 'completed').length}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <div className="search-wrapper">
          <div className="search-input-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search services, patients, or NIC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="filter-wrapper">
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Services Content */}
      <div className="services-content">
        {filteredServices.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h4m-6-6h18m0 0v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <h3 className="empty-title">No Services Found</h3>
            <p className="empty-description">
              {searchTerm || filterStatus !== 'all' 
                ? 'No services match your current filters.' 
                : 'No medical services have been registered yet.'}
            </p>
          </div>
        ) : (
          <div className="services-table">
            <div className="table-header">
              <div className="header-cell service-col">Service</div>
              <div className="header-cell patient-col">Patient Information</div>
              <div className="header-cell schedule-col">Schedule</div>
              <div className="header-cell room-col">Room</div>
              <div className="header-cell status-col">Status</div>
              <div className="header-cell actions-col">Actions</div>
            </div>
            
            <div className="table-body">
              {filteredServices.map((service) => (
                <div key={service._id} className="table-row">
                  <div className="table-cell service-col">
                    <div className="service-info">
                      <span className="service-name">{service.name}</span>
                      <span className="service-id">ID: {service._id}</span>
                    </div>
                  </div>
                  
                  <div className="table-cell patient-col">
                    <div className="patient-info">
                      <span className="patient-name">{service.patient?.fullName || 'N/A'}</span>
                      {service.patient?.nic && (
                        <span className="patient-nic">NIC: {service.patient.nic}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="table-cell schedule-col">
                    <div className="schedule-info">
                      <span className="schedule-date">{service.date}</span>
                      <span className="schedule-time">{service.time}</span>
                    </div>
                  </div>
                  
                  <div className="table-cell room-col">
                    <span className="room-number">{service.roomNum || 'Not assigned'}</span>
                  </div>
                  
                  <div className="table-cell status-col">
                    {getStatusBadge(service.status)}
                  </div>
                  
                  <div className="table-cell actions-col">
                    <div className="action-buttons">
                      {service.status === 'pending' && (
                        <button
                          className="btn btn-accept"
                          onClick={() => handleAccept(service._id, service.name)}
                        >
                          Accept
                        </button>
                      )}
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(service)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .medical-dashboard {
          min-height: 100vh;
          background-color: #f8fafc;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        /* Header Section */
        .dashboard-header {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
        }

        .title-section {
          flex: 1;
        }

        .dashboard-title {
          font-size: 2rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 0.5rem 0;
        }

        .dashboard-subtitle {
          color: #64748b;
          font-size: 1rem;
          margin: 0;
          font-weight: 400;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          min-width: 400px;
        }

        .stat-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
          transition: all 0.2s ease;
        }

        .stat-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }

        .stat-card.pending {
          border-color: #fbbf24;
          background: #fefbf3;
        }

        .stat-card.accepted {
          border-color: #10b981;
          background: #f0fdf4;
        }

        .stat-card.completed {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Controls Section */
        .controls-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          align-items: center;
        }

        .search-wrapper {
          flex: 1;
          max-width: 400px;
        }

        .search-input-container {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 0.75rem 0.75rem 2.5rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
          background: white;
          color: #1f2937;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .filter-wrapper {
          min-width: 180px;
        }

        .filter-select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.875rem;
          background: white;
          color: #1f2937;
          cursor: pointer;
          transition: border-color 0.2s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* Services Content */
        .services-content {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
        }

        .empty-icon {
          color: #9ca3af;
          margin-bottom: 1rem;
        }

        .empty-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin: 0 0 0.5rem 0;
        }

        .empty-description {
          color: #6b7280;
          margin: 0;
        }

        /* Table Styles */
        .services-table {
          width: 100%;
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 2fr 1.5fr 1fr 1fr 1.5fr;
          gap: 1rem;
          padding: 1rem 1.5rem;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .header-cell {
          font-size: 0.75rem;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .table-body {
          max-height: 600px;
          overflow-y: auto;
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 2fr 1.5fr 1fr 1fr 1.5fr;
          gap: 1rem;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          transition: background-color 0.2s ease;
        }

        .table-row:hover {
          background-color: #f8fafc;
        }

        .table-cell {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
        }

        .service-info {
          display: flex;
          flex-direction: column;
        }

        .service-name {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .service-id {
          font-size: 0.75rem;
          color: #64748b;
        }

        .patient-info {
          display: flex;
          flex-direction: column;
        }

        .patient-name {
          font-weight: 500;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .patient-nic {
          font-size: 0.75rem;
          color: #64748b;
        }

        .schedule-info {
          display: flex;
          flex-direction: column;
        }

        .schedule-date {
          font-weight: 500;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .schedule-time {
          font-size: 0.75rem;
          color: #64748b;
        }

        .room-number {
          font-weight: 500;
          color: #1e293b;
          padding: 0.25rem 0.5rem;
          background: #f1f5f9;
          border-radius: 4px;
          font-size: 0.75rem;
        }

        /* Status Badges */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
          border: 1px solid #fcd34d;
        }

        .status-accepted {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #6ee7b7;
        }

        .status-completed {
          background: #dbeafe;
          color: #1e40af;
          border: 1px solid #93c5fd;
        }

        .status-cancelled {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }

        .status-default {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .status-icon {
          font-size: 0.75rem;
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .btn-accept {
          background: #10b981;
          color: white;
        }

        .btn-accept:hover {
          background: #059669;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
        }

        .btn-delete {
          background: #ef4444;
          color: white;
        }

        .btn-delete:hover {
          background: #dc2626;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);
        }

        /* Loading State */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 1rem;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #e5e7eb;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-text {
          color: #6b7280;
          font-size: 0.875rem;
        }

        /* Error State */
        .error-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f8fafc;
          padding: 2rem;
        }

        .error-content {
          text-align: center;
          background: white;
          padding: 3rem 2rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          max-width: 400px;
        }

        .error-icon {
          color: #ef4444;
          margin-bottom: 1rem;
        }

        .error-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin: 0 0 0.5rem 0;
        }

        .error-description {
          color: #6b7280;
          margin: 0 0 2rem 0;
          line-height: 1.5;
        }

        .retry-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .retry-btn:hover {
          background: #2563eb;
        }

        /* Notification Styles */
        .notification {
          position: fixed;
          top: 1rem;
          right: 1rem;
          max-width: 400px;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
        }

        .notification-success {
          background: #d1fae5;
          border: 1px solid #6ee7b7;
          color: #065f46;
        }

        .notification-error {
          background: #fee2e2;
          border: 1px solid #fca5a5;
          color: #991b1b;
        }

        .notification-content strong {
          display: block;
          margin-bottom: 0.25rem;
          font-weight: 600;
        }

        .notification-content p {
          margin: 0;
          font-size: 0.875rem;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .header-content {
            flex-direction: column;
            align-items: stretch;
          }

          .stats-grid {
            min-width: auto;
            grid-template-columns: repeat(2, 1fr);
          }

          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .table-cell {
            padding: 0.5rem 0;
            border-bottom: 1px solid #f1f5f9;
          }

          .table-cell:last-child {
            border-bottom: none;
          }

          .header-cell::before,
          .table-cell::before {
            content: attr(data-label);
            font-weight: 600;
            color: #374151;
            display: block;
            margin-bottom: 0.25rem;
          }
        }

        @media (max-width: 768px) {
          .medical-dashboard {
            padding: 1rem;
          }

          .dashboard-header {
            padding: 1.5rem;
          }

          .dashboard-title {
            font-size: 1.5rem;
          }

          .controls-section {
            flex-direction: column;
            align-items: stretch;
          }

          .search-wrapper,
          .filter-wrapper {
            max-width: none;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default MedicalServices;