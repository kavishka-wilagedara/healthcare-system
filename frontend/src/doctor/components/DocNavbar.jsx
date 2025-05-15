import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from "../../common/UserContext";

const DocNavbar = () => {
  const location = useLocation();

  const {user , setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () =>{
   setUser(null);
   navigate("/");
  }

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
          <ul className="navbar-nav ms-auto">
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
                  location.pathname === "/doc-scheduledAppointments" ? "active" : ""
                }`}
                to="/doc-scheduledAppointments"
              >
                Scheduled Appointments
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/doc-appointmentHistory" ? "active" : ""
                }`}
                to="/doc-appointmentHistory"
              >
                Channeled History
              </Link>
            </li>

             
          </ul>

          <button  onClick={handleLogout}>Logout</button>
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
      `}</style>
    </nav>
  );
};

export default DocNavbar;