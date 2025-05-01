import React from "react";
import { Nav, Navbar, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "./PatientNavbar.css";

const PatientNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="patient-navbar px-4">
      <Container fluid>
        <Navbar.Brand as={Link} to="/patient/dashboard">
          <span className="navbar-title">Health Care</span>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Left-align the Nav items */}
            <Nav.Link as={Link} to="/patient/dashboard/channeling">
              Channeling
            </Nav.Link>
            <Nav.Link as={Link} to="/patient/dashboard/clinical-services">
              Clinical Services
            </Nav.Link>
            <Nav.Link as={Link} to="/patient/dashboard/pharmacy">
              Pharmacy
            </Nav.Link>
            <Nav.Link as={Link} to="/patient/dashboard/notification">
              Notification
            </Nav.Link>
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="dropdown-profile">
                Profile
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/patient/dashboard/profile">
                  View Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/logout">
                  <FaSignOutAlt className="icon" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PatientNavbar;
