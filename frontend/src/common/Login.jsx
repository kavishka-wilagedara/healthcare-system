import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import Swal from "sweetalert2";

const Login = () => {
  const [loginType, setLoginType] = useState("patient");
  const [patientForm, setPatientForm] = useState({ email: "", password: "" });
  const [doctorForm, setDoctorForm] = useState({ email: "", password: "" });
  const [adminForm, setAdminForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // Handle doctor login
  const handleDoctorLogin = async (e) => {
    e.preventDefault();
    if (!validateForm(doctorForm)) return;
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctor/login",
        doctorForm
      );
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/doc-dashboard");
    } catch (error) {
      handleLoginError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle patient login
  const handlePatientLogin = async (e) => {
    e.preventDefault();
    if (!validateForm(patientForm)) return;
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/patients/login",
        patientForm
      );
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/patient/dashboard");
    } catch (error) {
      handleLoginError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle admin login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!validateForm(adminForm)) return;
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        adminForm
      );
      Swal.fire(
        {
        position: "center",
        icon: "success",
        title: "Admin Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin/dashboard");
    } catch (error) {
      handleLoginError(error, "Admin");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login errors
  const handleLoginError = (error, userType = "") => {
    console.error(`Error while ${userType.toLowerCase()} login:`, error);
    Swal.fire({
      icon: "error",
      title: `${userType || "Login"} Failed`,
      text: error.response?.data?.message || "An error occurred during login",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      position: "center",
    });
  };

  // Handle type change
  const handleTypeChange = (type) => {
    setLoginType(type);
    setErrors({});
  };

  // Form change handlers
  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatientForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDoctorChange = (e) => {
    const { name, value } = e.target;
    setDoctorForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Form validation
  const validateForm = (form) => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    
    // Basic email validation
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="container py-5">
      <h3 className="display-5 fw-bold text-teal mb-5 text-center">Login</h3>
      <div className="row g-4 justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm healthcare-card">
            <div className="card-header healthcare-card-header">
              <h4 className="mb-0 text-white">Select Login Type</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
                <button
                  className={`btn ${
                    loginType === "patient" ? "btn-teal" : "btn-outline-teal"
                  } healthcare-btn`}
                  onClick={() => handleTypeChange("patient")}
                >
                  Patient Login
                </button>
                <button
                  className={`btn ${
                    loginType === "doctor" ? "btn-teal" : "btn-outline-teal"
                  } healthcare-btn`}
                  onClick={() => handleTypeChange("doctor")}
                >
                  Doctor Login
                </button>
                <button
                  className={`btn ${
                    loginType === "admin" ? "btn-teal" : "btn-outline-teal"
                  } healthcare-btn`}
                  onClick={() => handleTypeChange("admin")}
                >
                  Admin Login
                </button>
              </div>

              {loginType === "patient" ? (
                <form onSubmit={handlePatientLogin}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="patientEmail"
                      name="email"
                      value={patientForm.email}
                      onChange={handlePatientChange}
                      placeholder="patient@example.com"
                    />
                    <label htmlFor="patientEmail">Email Address</label>
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="patientPassword"
                      name="password"
                      value={patientForm.password}
                      onChange={handlePatientChange}
                      placeholder="Password"
                    />
                    <label htmlFor="patientPassword">Password</label>
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-teal healthcare-btn w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      "Login as Patient"
                    )}
                  </button>
                  <p className="text-center">
                    Not registered?{" "}
                    <Link to="/patient-register" className="text-teal">
                      Register here
                    </Link>
                  </p>
                </form>
              ) : loginType === "doctor" ? (
                <form onSubmit={handleDoctorLogin}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="doctorEmail"
                      name="email"
                      value={doctorForm.email}
                      onChange={handleDoctorChange}
                      placeholder="doctor@example.com"
                    />
                    <label htmlFor="doctorEmail">Email Address</label>
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="doctorPassword"
                      name="password"
                      value={doctorForm.password}
                      onChange={handleDoctorChange}
                      placeholder="Password"
                    />
                    <label htmlFor="doctorPassword">Password</label>
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-teal healthcare-btn w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      "Login as Doctor"
                    )}
                  </button>
                  <p className="text-center">
                    Not registered?{" "}
                    <Link to="/register" className="text-teal">
                      Register here
                    </Link>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleAdminLogin}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="adminEmail"
                      name="email"
                      value={adminForm.email}
                      onChange={handleAdminChange}
                      placeholder="admin@example.com"
                    />
                    <label htmlFor="adminEmail">Admin Email</label>
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="adminPassword"
                      name="password"
                      value={adminForm.password}
                      onChange={handleAdminChange}
                      placeholder="Password"
                    />
                    <label htmlFor="adminPassword">Password</label>
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-teal healthcare-btn w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      "Login as Admin"
                    )}
                  </button>
                  <p className="text-center text-muted small">
                    Admin access is restricted to authorized personnel only
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .text-teal {
          color: #17a2b8;
        }
        .healthcare-card {
          border: none;
          border-radius: 12px;
          background-color: #ffffff;
          transition: transform 0.3s ease;
          overflow: hidden;
        }
        .healthcare-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .healthcare-card-header {
          background: linear-gradient(135deg, #17a2b8, #138496);
          border-radius: 12px 12px 0 0 !important;
          padding: 1.5rem;
        }
        .healthcare-btn {
          padding: 0.5rem 1.5rem;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        .btn-teal {
          background-color: #17a2b8;
          border-color: #17a2b8;
          color: #ffffff;
        }
        .btn-teal:hover, .btn-teal:focus {
          background-color: #138496;
          border-color: #138496;
          color: #ffffff;
        }
        .btn-outline-teal {
          border-color: #17a2b8;
          color: #17a2b8;
        }
        .btn-outline-teal:hover, .btn-outline-teal:focus {
          background-color: #17a2b8;
          color: #ffffff;
        }
        .form-control:focus {
          border-color: #17a2b8;
          box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.25);
        }
        .invalid-feedback {
          font-size: 0.85rem;
        }
        @media (max-width: 576px) {
          .healthcare-btn {
            width: 100%;
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;