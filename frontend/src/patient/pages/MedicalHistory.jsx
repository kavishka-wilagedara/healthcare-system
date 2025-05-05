import React from 'react';

const MedicalHistory = () => {
  const medicalRecords = [
    {
      date: '2023-12-10',
      condition: 'Hypertension',
      treatment: 'Prescribed Amlodipine 5mg daily',
      doctor: 'Dr. Saman Silva',
      notes: 'Patient advised to monitor blood pressure daily.'
    },
    {
      date: '2023-06-22',
      condition: 'Type 2 Diabetes',
      treatment: 'Started on Metformin 500mg twice daily',
      doctor: 'Dr. Nirosha Fernando',
      notes: 'Scheduled for follow-up in 3 months.'
    },
    {
      date: '2022-11-05',
      condition: 'Knee Pain (Osteoarthritis)',
      treatment: 'Physiotherapy and NSAIDs',
      doctor: 'Dr. Anura Jayasinghe',
      notes: 'Suggested mild exercise and diet control.'
    }
  ];

  return (
    <div className="container py-5">
      <h3 className="display-5 fw-bold text-teal mb-5 text-center">Medical Record History</h3>
      <div className="row g-4">
        {medicalRecords.map((record, index) => (
          <div className="col-12" key={index}>
            <div className="card long-card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-teal mb-2">{record.condition}</h5>
                <p className="mb-1"><strong>Date:</strong> {record.date}</p>
                <p className="mb-1"><strong>Treatment:</strong> {record.treatment}</p>
                <p className="mb-1"><strong>Doctor:</strong> {record.doctor}</p>
                <p><strong>Notes:</strong> {record.notes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .text-teal {
          color: #17b87e;
        }
        .long-card {
          border-left: 8px solid #17b87e;
          border-radius: 12px;
          background-color: #ffffff;
          transition: transform 0.3s ease;
        }
        .long-card:hover {
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

export default MedicalHistory;
