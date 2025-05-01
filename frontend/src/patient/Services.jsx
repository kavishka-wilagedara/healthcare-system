import React, { useState } from "react";
import "./Services.css";
import { FcPlus } from "react-icons/fc";
import {
  MdOutlineDateRange,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

const Services = () => {
  const allServices = [
    {
      id: 1,
      name: "Blood Test",
      date: "May 3, 2025",
      time: "9.00 AM",
      roomNum: "ABC-001",
      instruction:
        "Fast for 8-12 hours, drink water, and avoid certain foods/drinks.",
    },
    {
      id: 2,
      name: "Urine Test",
      date: "May 5, 2025",
      time: "9.00 AM",
      roomNum: "ABC-002",
      instruction: "Provide a clean catch sample in the provided container.",
    },
    {
      id: 3,
      name: "X-Ray",
      date: "May 8, 2025",
      time: "9.00 AM",
      roomNum: "ABC-003",
      instruction: "Wear comfortable clothes and avoid jewelry.",
    },
    {
      id: 3,
      name: "X-Ray",
      date: "May 8, 2025",
      time: "9.00 AM",
      roomNum: "ABC-003",
      instruction: "Wear comfortable clothes and avoid jewelry.",
    },
  ];
  const [showModel, setShowModel] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    date: "",
    time: "",
  });

  const handleNewService = () => {
    setShowModel(true);
  };

  const handleCloseModel = () => {
    setShowModel(false);
    setNewService({ name: "", date: "", time: "" });
  };

  const handleInputChange = () => {};

  const handleFormSubmit = () => {};

  return (
    <div className="service-container">
      <div className="title-section">
        <h1>Diagnostic & Lab Services</h1>
        <button className="add-btn" onClick={handleNewService}>
          <FcPlus className="icon" />
          Add New Service
        </button>
      </div>

      <p className="subtitle">
        Here are your upcoming services. We’re with you every step of the way!
      </p>

      <div className="service-card-wrapper">
        {allServices.map((service) => (
          <div className="service-card" key={service.id}>
            {/* Card header */}
            <div className="card-header">
              <h3>{service.name}</h3>
            </div>
            {/* Card body */}
            <div className="card-body">
              <p>
                <MdOutlineFormatListNumbered className="icon" />
                <strong>Appointment No:</strong>&nbsp;{service.id}
              </p>
              <p>
                <IoPersonOutline className="icon" />
                <strong>Patient Name:</strong>&nbsp;{service.id}
              </p>
              <p>
                <MdOutlineDateRange className="icon" />
                <strong>Date:</strong>&nbsp;{service.date}
              </p>
              <p>
                <IoTimeOutline className="icon" />
                <strong>Time:</strong>&nbsp;{service.time}
              </p>
              <p>
                <IoLocationOutline className="icon" />
                <strong>Location:</strong>&nbsp;{service.roomNum}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/*New service Modal */}
      {showModel && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Service</h2>
            <form onSubmit={handleFormSubmit} className="service-form">
              <select
                name="name"
                placeholder="Select Test Type"
                onChange={handleInputChange}
                required
                defaultValue=""
              >
                <option value="Blood Test">Blood Test</option>
                <option value="X-Ray">X-Ray</option>
                <option value="MRI Scan">MRI Scan</option>
                <option value="CT Scan">CT Scan</option>
                <option value="Urine Test">Urine Test</option>
              </select>

              <input
                type="text"
                name="patientName"
                placeholder="Patient Name"
                // value={}
                onChange={handleInputChange}
                required
              />
              <input
                type="date"
                name="date"
                // value={}
                onChange={handleInputChange}
                required
              />
              <input
                type="time"
                name="time"
                // value={}
                onChange={handleInputChange}
                required
              />

              <div className="modal-buttons">
                <button type="submit" className="submit-btn">
                  Add Service
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCloseModel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
