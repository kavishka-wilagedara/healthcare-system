import React from 'react';

const Notifications = () => {
  const notifications = [
    { title: 'General Checkup', date: '2025-05-10' },
    { title: 'Dental Appointment', date: '2025-05-12' },
    { title: 'Eye Specialist Consultation', date: '2025-05-15' },
    { title: 'Blood Test Follow-up', date: '2025-05-18' },
    { title: 'Orthopedic Review', date: '2025-05-20' },
    { title: 'Vaccination Appointment', date: '2025-05-22' },
    { title: 'ENT Checkup', date: '2025-05-24' },
    { title: 'Skin Allergy Review', date: '2025-05-26' },
    { title: 'Diabetes Clinic', date: '2025-05-28' },
    { title: 'Mental Health Session', date: '2025-05-30' }
  ];

  return (
    <div className="container py-5">
      <h3 className="display-5 fw-bold text-teal mb-4 text-center">Appointment Notifications</h3>
      <div className="row g-3">
        {notifications.map((note, index) => (
          <div className="col-12" key={index}>
            <div className="card notif-card shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1 text-teal">{note.title}</h5>
                  <small className="text-muted">Appointment Date: {note.date}</small>
                </div>
                <span className="badge bg-warning text-light">Reminder</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .text-teal {
          color: #17b87e;
        }
        .notif-card {
          border-radius: 12px;
          background-color: #fff;
          transition: transform 0.3s ease;
        }
        .notif-card:hover {
          transform: translateY(-3px);
        }
        .card-body {
          background-color: #f8f9fa;
          border-radius: 0 0 12px 12px;
        }
      `}</style>
    </div>
  );
};

export default Notifications;
