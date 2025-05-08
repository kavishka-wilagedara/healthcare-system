import React, { useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import "./Channeling.css";
import {
  FaCheckCircle,
  FaUserMd,
  FaCalendarAlt,
  FaSyncAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserCircle,
  FaPhoneAlt,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function Channeling() {
  const [showForm, setShowForm] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  const featureCards = [
    {
      title: "Quick & Secure Appointment Booking",
      icon: <FaCalendarAlt className="feature-icon" />,
    },
    {
      title: "Connect with Trusted Leading Specialists",
      icon: <FaUserMd className="feature-icon" />,
    },
    {
      title: "Instant Availability & Guaranteed Confirmation",
      icon: <FaCheckCircle className="feature-icon" />,
    },
    {
      title: "Easy rescheduling and cancellation options",
      icon: <FaSyncAlt className="feature-icon" />,
    },
  ];

  const bookedAppointments = [
    {
      id: 1,
      name: "Ashan Vimod",
      doctor: "Dr. Kavindya Perera",
      specialty: "Neurologist",
      date: "2025-05-14",
      time: "2:30 PM",
      location: "Clinical Room-001",
      status: "Pending",
      phone: "+94 77 123 4567",
      reason: "",
      diagnosis: "",
      recommendations: "",
    },
    {
      id: 2,
      name: "Ashan Vimod",
      doctor: "Dr. Isuru Perera",
      specialty: "Dental",
      date: "2025-05-14",
      time: "2:30 PM",
      location: "Clinical Room-001",
      status: "Confirmed",
      phone: "+94 77 123 4567",
      reason: "",
      diagnosis: "",
      recommendations: "",
    },
  ];

  const handleBookClick = () => {
    setShowForm(true);
    setShowAppointments(false);
    setShowHeader(false);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleViewAppointmentsClick = () => {
    setShowAppointments(true);
    setShowForm(false);
    setShowHeader(false);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "status-confirmed";
      case "pending":
        return "status-pending";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowHeader(true);
  };

  const handleBackButton = () => {
    setShowForm(false);
    setShowAppointments(false);
    setShowHeader(true);
  };

  return (
    <div className="channeling-info-card">
      {showHeader && (
        <>
          <h1>Your Wellness Journey Starts Here</h1>
          <p>
            Welcome to our doctor channeling platform. Easily book appointments
            with your preferred specialists. Choose a doctor, pick a convenient
            date and time, and confirm your visit with just a few clicks.
          </p>

          <Row className="channeling-features-section">
            {featureCards.map((card, index) => (
              <Col md={3} sm={6} className="mb-4" key={index}>
                <Card className="channeling-feature-card">
                  <Card.Body className="text-center">
                    <Card.Title className="channeling-feature-title">
                      <span className="channeling-feature-icon me-2">
                        {card.icon}
                      </span>
                      <span>{card.title}</span>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="channeling-buttons">
            <button className="channeling-btn" onClick={handleBookClick}>
              Book New Channeling
            </button>
            <button
              className="channeling-btn outline"
              onClick={handleViewAppointmentsClick}
            >
              View My Channelings
            </button>
          </div>
        </>
      )}

      {showForm && (
        <div className="channeling-form mt-5">
          <h3>New Channeling Appointment</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Doctor</Form.Label>
              <Form.Select>
                <option value="" disabled>
                  Select a Doctor
                </option>
                <option>Dr. John Smith</option>
                <option>Dr. Emily Brown</option>
                <option>Dr. Sarah Lee</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preferred Time</Form.Label>
              <Form.Control type="time" />
            </Form.Group>

            <div className="form-submit-container text-center">
              <div className="channel-submit-buttons">
                <button type="submit" className="channel-submit-btn">
                  Confirm Booking
                </button>
                <button
                  type="submit"
                  className="channel-cancel-btn"
                  onClick={handleCloseForm}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        </div>
      )}

      {showAppointments && (
        <div className="view-appointments-section">
          <IoArrowBackCircleSharp
            className="back-btn"
            onClick={handleBackButton}
          />

          <h3>My Channeling Appointments</h3>
          {bookedAppointments.length > 0 ? (
            <div className="appointments-container">
              {bookedAppointments.map((appt) => (
                <div className="appointment-card" key={appt.id}>
                  <div className="appointment-header">
                    <div className="appointment-doctor-info">
                      <h4>
                        <FaUserMd className="icon-md" /> {appt.doctor}
                      </h4>
                      <p className="specialty">{appt.specialty}</p>
                    </div>
                    <div
                      className={`appointment-status ${getStatusClass(
                        appt.status
                      )}`}
                    >
                      {appt.status}
                    </div>
                  </div>

                  <div className="appointment-details">
                    <div className="detail-item">
                      <FaUserCircle className="detail-icon" />
                      <span>Patient:</span>
                      <span className="value">{appt.name}</span>
                    </div>

                    <div className="detail-item">
                      <FaPhoneAlt className="detail-icon" />
                      <span>Contact:</span>
                      <span className="value">{appt.phone}</span>
                    </div>

                    <div className="detail-item">
                      <FaRegCalendarCheck className="detail-icon" />
                      <span>Date:</span>
                      <span className="value">{formatDate(appt.date)}</span>
                    </div>

                    <div className="detail-item">
                      <FaClock className="detail-icon" />
                      <span>Time:</span>
                      <span className="value">{appt.time}</span>
                    </div>

                    <div className="detail-item full-width">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span>Location:</span>
                      <span className="value">{appt.location}</span>
                    </div>
                  </div>

                  <div className="appointment-actions">
                    <button className="action-btn reschedule">
                      Reschedule
                    </button>
                    <button className="action-btn cancel">Cancel</button>
                    <button className="action-btn details">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-appointments">
              <div className="empty-state">
                <FaCalendarAlt className="empty-icon" />
                <h4>No Appointments Found</h4>
                <p>You don't have any scheduled appointments at the moment.</p>
                <button className="channeling-btn" onClick={handleBookClick}>
                  Book Your First Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Channeling;
