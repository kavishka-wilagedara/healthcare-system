import React, { useState } from 'react';

const AddTimeForm = () => {
  const [formData, setFormData] = useState({
    intime: '',
    outtime: '',
    day: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="container py-5">
      <h3 className="display-6 fw-bold text-primary mb-4 text-center">Add Time</h3>
      <div className="d-flex justify-content-center">
        <div className="card shadow-sm w-100 w-md-50">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="intime" className="form-label fw-medium">
                  In Time
                </label>
                <input
                  type="time"
                  id="intime"
                  name="intime"
                  className="form-control"
                  value={formData.intime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="outtime" className="form-label fw-medium">
                  Out Time
                </label>
                <input
                  type="time"
                  id="outtime"
                  name="outtime"
                  className="form-control"
                  value={formData.outtime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="day" className="form-label fw-medium">
                  Day
                </label>
                <select
                  id="day"
                  name="day"
                  className="form-select"
                  value={formData.day}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary healthcare-btn w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .card {
          border: none;
          border-radius: 10px;
          background-color: #f8f9fa;
        }
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
        .form-control:focus, .form-select:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
        @media (min-width: 768px) {
          .w-md-50 {
            max-width: 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default AddTimeForm;