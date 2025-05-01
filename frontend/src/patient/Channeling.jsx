import React from "react";
import "./Channeling.css";
import {
  FaCheckCircle,
  FaUserMd,
  FaCalendarAlt,
  FaSyncAlt,
} from "react-icons/fa";

function Channeling() {
  return (
    <div className="channeling-info-card">
      <h1>Your Wellness Journey Starts Here</h1>
      <p>
        Welcome to our doctor channeling platform. Easily book appointments with
        your preferred specialists. Choose a doctor, pick a convenient date and
        time, and confirm your visit with just a few clicks.
      </p>
      <ul className="custom-list">
        <strong>
          <li>
            <FaCalendarAlt className="list-icon" /> Book appointments quickly
            and securely
          </li>
          <li>
            <FaUserMd className="list-icon" /> Access to top specialists and
            consultants
          </li>
          <li>
            <FaCheckCircle className="list-icon" /> Real-time availability and
            instant confirmation
          </li>
          <li>
            <FaSyncAlt className="list-icon" /> Easy rescheduling and
            cancellation options
          </li>
        </strong>
      </ul>

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
