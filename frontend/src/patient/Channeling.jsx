import React, { useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import "./Channeling.css";
import {
  FaCheckCircle,
  FaUserMd,
  FaCalendarAlt,
  FaSyncAlt,
} from "react-icons/fa";

function Channeling() {
  const [showForm, setShowForm] = useState(false);

  const featureCards = [
    {
      title: "Quick & Secure Appointment Booking",
      icon: <FaCalendarAlt className="feature-icon" />,
    },
    {
      title: "Connect with Leading Specialists",
      icon: <FaUserMd className="feature-icon" />,
    },
    {
      title: "Instant Availability & Confirmation",
      icon: <FaCheckCircle className="feature-icon" />,
    },
    {
      title: "Easy rescheduling and cancellation options",
      icon: <FaSyncAlt className="feature-icon" />,
    },
  ];

  const handleBookClick = () => {
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="channeling-info-card">
      <h1>Your Wellness Journey Starts Here</h1>
      <p>
        Welcome to our doctor channeling platform. Easily book appointments with
        your preferred specialists. Choose a doctor, pick a convenient date and
        time, and confirm your visit with just a few clicks.
      </p>

      <Row className="features-section">
        {featureCards.map((card, index) => (
          <Col md={3} sm={6} className="mb-4" key={index}>
            <Card className="channeling-feature-card">
              <Card.Body className="text-center">
                <Card.Title className="feature-title">
                  <span className="feature-icon me-2">{card.icon}</span>
                  <span>{card.title}</span>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="channeling-buttons">
        <button className="channeling-btn" onClick={handleBookClick}>
          📅 Book New Channeling
        </button>
        <button className="channeling-btn outline">
          👨‍⚕️ View My Channelings
        </button>
      </div>

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

            <div className="form-submit-container">
              <button type="submit" className="channeling-btn primary">
                Confirm Booking
              </button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}

export default Channeling;
