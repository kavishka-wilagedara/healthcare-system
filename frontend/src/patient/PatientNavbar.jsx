import React from "react";
import { Nav, Navbar, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle, FaBell } from "react-icons/fa";
import "./PatientNavbar.css";
import { useNotification } from "./context/NotificationContext";

const PatientNavbar = () => {
  const { getUnreadCount } = useNotification();

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="patient-navbar px-4 shadow-sm"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/patient/dashboard" className="fw-bold">
          <span className="navbar-title">Health Care</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/patient/dashboard/channeling"
              className="mx-1 nav-link-custom"
            >
              Channeling
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/patient/dashboard/clinical-services"
              className="mx-1 nav-link-custom"
            >
              Clinical Services
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/patient/dashboard/my-history"
              className="mx-1 nav-link-custom"
            >
              Medical Records
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/patient/dashboard/notification"
              className="mx-1 nav-link-custom"
            >
              <FaBell className="me-1" />
              {getUnreadCount() > 0 && (
                <span className="nav-notification-badge">{getUnreadCount()}</span>
              )}
            </Nav.Link>
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                id="dropdown-profile"
                className="nav-link-custom text-white"
              >
                <FaUserCircle className="me-1" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-light">
                <Dropdown.Item as={Link} to="/patient/dashboard/profile">
                  View Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/" className="">
                  <FaSignOutAlt className="text-danger me-2" /> Logout
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
