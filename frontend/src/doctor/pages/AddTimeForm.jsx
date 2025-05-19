import React, { useContext, useState } from "react";
import { UserContext } from "../../common/UserContext";
import axios from "axios";

const AddTimeForm = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    inTime: "",
    outTime: "",
    day: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        id: user.doctor.id,
        inTime: formData.inTime,
        outTime: formData.outTime,
        day: formData.day,
      };
      const response = await axios.post(
        `http://localhost:5000/api/doctor/time`,
        requestBody
      );
      console.log(response.data);
      // Clear form after successful submission
      setFormData({
        inTime: "",
        outTime: "",
        day: "",
      });
      alert("Time slot added successfully!");
    } catch (error) {
      console.log(error);
      alert("Error adding time slot. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <h3 className="display-6 fw-bold text-primary mb-4 text-center">
        Add Time
      </h3>
      <div className="d-flex justify-content-center">
        <div className="card shadow-sm w-100 w-md-50">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="inTime" className="form-label fw-medium">
                  In Time
                </label>
                <input
                  type="time"
                  id="inTime"
                  name="inTime"
                  className="form-control"
                  value={formData.inTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="outTime" className="form-label fw-medium">
                  Out Time
                </label>
                <input
                  type="time"
                  id="outTime"
                  name="outTime"
                  className="form-control"
                  value={formData.outTime}
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

              <button
                type="submit"
                className="btn btn-primary healthcare-btn w-100"
              >
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