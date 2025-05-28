import React, { useContext, useEffect } from "react";
import { Nav, Navbar, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle, FaBell } from "react-icons/fa";
import "./PatientNavbar.css";
import { useNotification } from "./context/NotificationContext";
import { UserContext } from "../common/UserContext";

const PatientNavbar = () => {
  const { getUnreadCount, notifications, loading } = useNotification();
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Calculate if notifications badge should be shown
  const showNotificationBadge = !loading && notifications && notifications.length > 0 && getUnreadCount() > 0;

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="patient-navbar px-4 shadow-sm"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/patient/dashboard" className="fw-bold">
            <img
              src="/health-care.png" 
              alt="SereneCare Logo"
              width="35"
              height="35"
              className="d-inline-block align-top me-2"
            />
          <span className="navbar-title">SereneCare</span>
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
              className="mx-1 nav-link-custom position-relative"
            >
              <FaBell className="me-1" />
              {showNotificationBadge && (
                <span className="nav-notification-badge">
                  {getUnreadCount()}
                </span>
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
                <Dropdown.Item onClick={handleLogout}>
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
