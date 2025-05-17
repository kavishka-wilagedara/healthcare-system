import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./Services.css";
import {
  MdOutlineDateRange,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import {
  FaAmbulance,
  FaHospitalSymbol,
  FaUserNurse,
  FaStethoscope,
} from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { UserContext } from "../common/UserContext";
import axios from "axios";

const Services = () => {
  const { user } = useContext(UserContext);

  const serviceFeatureCards = [
    {
      title: "24/7 Emergency Ambulance Service",
      icon: <FaAmbulance className="feature-icon" />,
    },
    {
      title: "Multi-Specialty Healthcare Services",
      icon: <FaHospitalSymbol className="feature-icon" />,
    },
    {
      title: "Professional Nursing Assistance",
      icon: <FaUserNurse className="feature-icon" />,
    },
    {
      title: "Comprehensive Health Checkups",
      icon: <FaStethoscope className="feature-icon" />,
    },
  ];

  const [showForm, setShowForm] = useState(false);
  const [showServices, setShowServices] = useState([]);
  const [showHeader, setShowHeader] = useState(true);

  const patientId = user?.id;

  useEffect(() => {
    getAllServiceByPatientId();
  }, []);

  const getAllServiceByPatientId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/services/patient/${patientId}`
      );
      console.log(response.data);
      setShowServices(response.data?.data);
      setShowForm(false);
      setShowHeader(false);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } catch (error) {
      console.log("Error while getting all admins", error);
    }
  };

  const handleNewServiceClick = () => {
    setShowForm(true);
    setShowHeader(false);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleInputChange = () => {};

  const handleFormSubmit = () => {};

  const handleCloseForm = () => {
    setShowForm(false);
    setShowHeader(true);
  };

  const handleBackButton = () => {
    setShowForm(false);
    // setShowServices(false);
    setShowHeader(true);
  };

  return (
    <div className="service-container">
      {showHeader && (
        <>
          <div className="title-section">
            <h1>Diagnostic & Lab Services</h1>
            <p>
              We offer fast, accurate diagnostic and lab services including
              blood tests, scans, and health checkups, All under one roof,
              Ensuring timely results and trusted care for your peace of mind.
            </p>

            <Row className="feature-section">
              {serviceFeatureCards.map((card, index) => (
                <Col md={3} sm={6} className="mb-4" key={index}>
                  <Card className="service-feature-card">
                    <Card.Body className="text-center">
                      <Card.Title className="service-feature-title">
                        <span className="service-feature-icon me-2">
                          {card.icon}
                        </span>
                        <span>{card.title}</span>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="buttons">
              <button className="add-btn" onClick={handleNewServiceClick}>
                Add New Service
              </button>
              <button
                className="view-service-btn"
                onClick={getAllServiceByPatientId}
              >
                View My Service
              </button>
            </div>
          </div>
        </>
      )}

      <div className="view-appointments-section">
        <IoArrowBackCircleSharp
          className="back-btn"
          onClick={handleBackButton}
        />
        {console.log("-----------------------------------------")}
        {console.log(showServices.length)}
        {console.log("-----------------------------------------")}

        {showServices.length > 0 ? (
          <>
            <h3>My Appointments</h3>
            <div className="service-card-wrapper">
              {showServices.map((service) => (
                <div className="service-card" key={service._id}>
                  {/* Card header */}
                  <div className="card-header">
                    <h4>{service.name}</h4>
                  </div>
                  {/* Card body */}
                  <div className="card-body">
                    <p>
                      <MdOutlineFormatListNumbered className="icon" />
                      <strong>Appointment No:</strong>&nbsp;
                      <span>{service._id}</span>
                    </p>
                    <p>
                      <IoPersonOutline className="icon" />
                      <strong>Patient Name:</strong>&nbsp;
                      <span>{service.patient?.fullName}</span>
                    </p>
                    <p>
                      <MdOutlineDateRange className="icon" />
                      <strong>Date:</strong>&nbsp;<span>{service.date}</span>
                    </p>
                    <p>
                      <IoTimeOutline className="icon" />
                      <strong>Time:</strong>&nbsp;<span>{service.time}</span>
                    </p>
                    <p>
                      <IoLocationOutline className="icon" />
                      <strong>Clinical Room:</strong>&nbsp;
                      <span>{service.roomNum}</span>
                    </p>
                  </div>
                  <div className="service-actions">
                    <button className="service-action-btn reschedule">
                      Reschedule
                    </button>
                    <button className="service-action-btn cancel">
                      Cancel
                    </button>
                    <button className="service-action-btn details">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-appointments">
            <div className="empty-state">
              <FaCalendarAlt className="empty-icon" />
              <h4>No Appointments Found</h4>
              <p>You don't have any scheduled appointments at the moment.</p>
              <button
                className="channeling-btn"
                onClick={handleNewServiceClick}
              >
                Book Your First Appointment
              </button>
            </div>
          </div>
        )}
      </div>

      {/*New service Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Service</h3>
            <form onSubmit={handleFormSubmit} className="service-form">
              <div className="form-group">
                <label htmlFor="testType">Test Type</label>
                <select
                  id="testType"
                  name="name"
                  onChange={handleInputChange}
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a test
                  </option>
                  <option value="Blood Test">Blood Test</option>
                  <option value="X-Ray">X-Ray</option>
                  <option value="MRI Scan">MRI Scan</option>
                  <option value="CT Scan">CT Scan</option>
                  <option value="Urine Test">Urine Test</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="patientName">Patient Name</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  placeholder="Enter patient name"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="service-buttons">
                <button type="submit" className="service-submit-btn">
                  Add Service
                </button>
                <button
                  type="submit"
                  className="service-cancel-btn"
                  onClick={handleCloseForm}
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
