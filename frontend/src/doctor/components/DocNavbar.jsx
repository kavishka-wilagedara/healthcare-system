import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../common/UserContext";

const DocNavbar = () => {
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark healthcare-navbar shadow-sm">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold text-white" to="/doc-dashboard">
          Doctor Panel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto" style={{marginLeft: "700px"}}>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/doc-appointments" ? "active" : ""
                }`}
                to="/doc-appointments"
              >
                Appointments
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/doc-scheduledAppointments"
                    ? "active"
                    : ""
                }`}
                to="/doc-scheduledAppointments"
              >
                Scheduled Appointments
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/doc-appointmentHistory"
                    ? "active"
                    : ""
                }`}
                to="/doc-appointmentHistory"
              >
                Channeled History
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <div className="dropdown">
              <button
                className="btn btn-link nav-link dropdown-toggle d-flex align-items-center"
                onClick={toggleDropdown}
                style={{ color: "white", textDecoration: "none" }}
              >
                <div className="me-2 d-flex flex-column align-items-end">
                  <span className="fw-bold">
                    {user?.doctor?.fullName || "Doctor"}
                  </span>
                  <small
                    className="text-white-50"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {user?.doctor?.specialization || "Doctor"}
                  </small>
                </div>
                <div
                  className="rounded-circle bg-white d-flex align-items-center justify-content-center"
                  style={{ width: "36px", height: "36px", color: "#007bff" }}
                >
                  <i className="fas fa-user"></i>
                </div>
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end ${
                  dropdownOpen ? "show" : ""
                }`}
              >
                <li>
                  <Link className="dropdown-item" to="/doc-profile">
                    <i className="fas fa-user-circle me-2"></i>Profile
                  </Link>
                </li>
                {/* <li>
                  <Link className="dropdown-item" to="/doc-settings">
                    <i className="fas fa-cog me-2"></i>Settings
                  </Link>
                </li> */}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
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
        }
        .nav-link {
          color: #ffffff !important;
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          color: #e6f0fa !important;
          transform: translateY(-1px);
        }
        .nav-link.active {
          color: #ffffff !important;
          font-weight: bold;
          border-bottom: 2px solid #ffffff;
        }
        .navbar-brand {
          font-size: 1.5rem;
        }
        .dropdown-menu {
          border: none;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
        .dropdown-item {
          transition: all 0.2s ease;
        }
        .dropdown-item:hover {
          background-color: #f8f9fa;
          padding-left: 1.5rem;
        }
      `}</style>
    </nav>
  );
};

export default DocNavbar;
