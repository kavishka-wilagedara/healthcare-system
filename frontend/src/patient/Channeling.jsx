import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./Channeling.css";
import {
  FaCheckCircle,
  FaUserMd,
  FaCalendarAlt,
  FaSyncAlt,
} from "react-icons/fa";

function Channeling() {
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
        <button className="channeling-btn">📅 Book New Channeling</button>
        <button className="channeling-btn outline">
          👨‍⚕️ View My Channelings
        </button>
      </div>
    </div>
  );
}

export default Channeling;
