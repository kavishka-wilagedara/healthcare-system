import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../common/UserContext";

const DocNavbar = () => {
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark healthcare-navbar shadow-sm">
      <div className="container-fluid px-3 px-md-4">
        <Link className="navbar-brand fw-bold text-white" to="/doc-dashboard">
          <img
                src="/health-care.png" 
                alt="SereneCare Logo"
                width="35"
                height="35"
                className="d-inline-block align-top me-2"
              />
          <span className="d-none d-sm-inline">SereneCare</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMobileMenu}
          aria-controls="navbarNav"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${mobileMenuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto me-3">
            <li className="nav-item">
              <Link
                className={`nav-link px-3 py-2 ${
                  location.pathname === "/doc-appointments" ? "active" : ""
                }`}
                to="/doc-appointments"
                onClick={closeMobileMenu}
              >
                <i className="fas fa-calendar-check d-lg-none me-2"></i>
                Appointments
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link px-3 py-2 ${
                  location.pathname === "/doc-scheduledAppointments"
                    ? "active"
                    : ""
                }`}
                to="/doc-scheduledAppointments"
                onClick={closeMobileMenu}
              >
                <i className="fas fa-clock d-lg-none me-2"></i>
                <span className="d-none d-md-inline">
                  Scheduled Appointments
                </span>
                <span className="d-inline d-md-none">Scheduled</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link px-3 py-2 ${
                  location.pathname === "/doc-appointmentHistory"
                    ? "active"
                    : ""
                }`}
                to="/doc-appointmentHistory"
                onClick={closeMobileMenu}
              >
                <i className="fas fa-history d-lg-none me-2"></i>
                <span className="d-none d-md-inline">Channeled History</span>
                <span className="d-inline d-md-none">History</span>
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center mt-3 mt-lg-0">
            <div className="dropdown">
              <button
                className="btn btn-link nav-link dropdown-toggle d-flex align-items-center p-2 border rounded-pill"
                onClick={toggleDropdown}
                style={{
                  color: "white",
                  textDecoration: "none",
                  borderColor: "rgba(255, 255, 255, 0.3) !important",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <div
                  className="rounded-circle bg-white d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: "28px",
                    height: "28px",
                    color: "#007bff",
                  }}
                >
                  <i
                    className="fas fa-user"
                    style={{ fontSize: "0.75rem" }}
                  ></i>
                </div>
                <div className="d-flex flex-column align-items-start d-none d-lg-block">
                  <span
                    className="fw-bold"
                    style={{ fontSize: "0.85rem", lineHeight: "1.2" }}
                  >
                    {user?.doctor?.fullName || "Doctor"}
                  </span>
                
                </div>
                <div className="d-block d-lg-none ms-1">
                  <span className="fw-bold" style={{ fontSize: "0.9rem" }}>
                    {user?.doctor?.fullName?.split(" ")[0] || "Doctor"}
                  </span>
                </div>
              </button>

              <ul
                className={`dropdown-menu dropdown-menu-end ${
                  dropdownOpen ? "show" : ""
                }`}
              >
                <li className="d-block d-lg-none">
                  <div className="dropdown-item-text text-center py-2">
                    <div className="fw-bold">
                      {user?.doctor?.fullName || "Doctor"}
                    </div>
                    <small className="text-muted">
                      {user?.doctor?.specialization || "Doctor"}
                    </small>
                  </div>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/doc-profile"
                    onClick={closeMobileMenu}
                  >
                    <i className="fas fa-user-circle me-3"></i>
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center w-100"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt me-3"></i>
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .healthcare-navbar {
          background: linear-gradient(90deg, #007bff, #138496);
          min-height: 60px;
        }
        
        .navbar-brand {
          font-size: 1.3rem;
        }
        
        @media (max-width: 576px) {
          .navbar-brand {
            font-size: 1.1rem;
          }
        }
        
        .nav-link {
          color: #ffffff !important;
          transition: all 0.3s ease;
          border-radius: 0.375rem;
          margin: 0.25rem 0;
        }
        
        .nav-link:hover {
          color: #e6f0fa !important;
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }
        
        .nav-link.active {
          color: #ffffff !important;
          font-weight: bold;
          background-color: rgba(255, 255, 255, 0.2);
          border-bottom: none;
        }
        
        @media (min-width: 992px) {
          .nav-link.active {
            border-bottom: 2px solid #ffffff;
            background-color: transparent;
          }
        }
        
        .navbar-toggler {
          padding: 0.25rem 0.5rem;
          font-size: 1rem;
        }
        
        .navbar-toggler:focus {
          box-shadow: none;
        }
        
        .dropdown-menu {
          border: none;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          min-width: 180px;
        }
        
        .dropdown-item {
          transition: all 0.2s ease;
          padding: 0.5rem 1rem;
        }
        
        .dropdown-item:hover {
          background-color: #f8f9fa;
          padding-left: 1.5rem;
        }
        
        .dropdown-item-text {
          padding: 0.5rem 1rem;
          margin-bottom: 0;
        }
        
        @media (max-width: 991.98px) {
          .navbar-nav {
            margin-top: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .nav-link {
            padding: 0.75rem 1rem !important;
            margin: 0.125rem 0;
          }
          
          .dropdown-menu {
            position: static !important;
            transform: none !important;
            box-shadow: none;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background-color: rgba(255, 255, 255, 0.95);
            margin-top: 0.5rem;
          }
          
          .dropdown-menu.show {
            display: block;
          }
        }
        
        @media (max-width: 576px) {
          .container-fluid {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          
          .nav-link {
            font-size: 0.9rem;
          }
        }
        
        /* Smooth collapse animation */
        .navbar-collapse {
          transition: all 0.3s ease-in-out;
        }
        
        /* Mobile menu backdrop */
        @media (max-width: 991.98px) {
          .navbar-collapse.show {
            background-color: rgba(0, 123, 255, 0.95);
            margin: 0.5rem -1rem -1rem -1rem;
            padding: 1rem;
            border-radius: 0 0 0.5rem 0.5rem;
          }
        }
        
        /* Ensure proper spacing on all screen sizes */
        .navbar-nav .nav-item {
          margin: 0 0.25rem;
        }
        
        @media (min-width: 992px) {
          .navbar-nav .nav-item {
            margin: 0 0.5rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default DocNavbar;
