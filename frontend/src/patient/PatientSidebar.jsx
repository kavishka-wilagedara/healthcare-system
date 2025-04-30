import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { MdMedicalServices } from "react-icons/md";
import "./PatientSidebar.css";
import profilePicture from "../assets/profile-picture.jpg";

const PatientSidebar = () => {
  return (
    <div className="sidebar d-flex flex-column p-3">
      <div className="sidebar-header text-center mb-4">
        <h2 className="title">Health Care</h2>
        <img src={profilePicture} alt="Profile" className="profile-picture" />
        <h5 className="profile-name">Ashan Vimod</h5>
      </div>
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/patient/dashboard/channeling"
          className="nav-item"
        >
          <FaCalendarCheck className="icon" /> Channeling
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/patient/dashboard/services"
          className="nav-item"
        >
          <MdMedicalServices className="icon" /> Services
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/patient/dashboard/pharmacy"
          className="nav-item"
        >
          <GiMedicines className="icon" /> Pharmacy
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/patient/dashboard/messages"
          className="nav-item"
        >
          <FaEnvelope className="icon" /> Messages{" "}
          <span className="badge">5</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/patient/dashboard/profile"
          className="nav-item"
        >
          <MdAccountCircle className="icon" /> Profile
        </Nav.Link>
        <Nav.Link as={Link} to="/logout" className="nav-item mt-auto">
          <FaSignOutAlt className="icon" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default PatientSidebar;
