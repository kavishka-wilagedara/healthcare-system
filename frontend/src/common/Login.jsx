import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import Swal from "sweetalert2";

const Login = () => {
  const [loginType, setLoginType] = useState("patient");
  const [patientForm, setPatientForm] = useState({ email: "", password: "" });
  const [doctorForm, setDoctorForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleDoctorLogin = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctor/login",
        doctorForm
      );
      setUser(response.data);
      console.log(response.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
        background: "#f8f9fa",
      });

      navigate("/doc-dashboard");
      window.location.reload();
    } catch (error) {
      console.log("error while login : ", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.message ||
          "An error occurred during registration",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        position: "center",
      });
    }
  };

  const handlePatientLogin = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/patients/login",
        patientForm
      );
      setUser(response.data);
      console.log(response.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
        background: "#f8f9fa",
      });

      navigate("/patient/dashboard");
      window.location.reload();
    } catch (error) {
      console.log("error while login : ", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.message ||
          "An error occurred during registration",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        position: "center",
      });
    }
  };

  const handleTypeChange = (type) => {
    setLoginType(type);
    setErrors({});
  };

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

  const validateForm = (form) => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePatientSubmit = () => {
    if (validateForm(patientForm)) {
      console.log("Patient Login:", patientForm);
      alert("Patient login submitted successfully!");
    }
  };

  const handleDoctorSubmit = () => {
    if (validateForm(doctorForm)) {
      console.log("Doctor Login:", doctorForm);
      alert("Doctor login submitted successfully!");
    }
  };

  return (
    <div className="container py-5">
      <h3 className="display-5 fw-bold text-teal mb-5 text-center">Login</h3>
      <div className="row g-4 justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm healthcare-card">
            <div className="card-header healthcare-card-header">
              <h4 className="mb-0 text-white">Select Login Type</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-center mb-4">
                <button
                  className={`btn ${
                    loginType === "patient" ? "btn-teal" : "btn-outline-teal"
                  } healthcare-btn me-2`}
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
              </div>

              {loginType === "patient" ? (
                <>
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
                      placeholder="example@email.com"
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
                    className="btn btn-teal healthcare-btn w-100 mb-3"
                    onClick={handlePatientLogin}
                  >
                    Login as Patient
                  </button>
                  <p className="text-center">
                    Not registered?{" "}
                    <Link to="/patient-register" className="text-teal">
                      Register here
                    </Link>
                  </p>
                </>
              ) : (
                <>
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
                      placeholder="example@email.com"
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
                    className="btn btn-teal healthcare-btn w-100 mb-3"
                    onClick={handleDoctorLogin}
                  >
                    Login as Doctor
                  </button>
                  <p className="text-center">
                    Not registered?{" "}
                    <Link to="/register" className="text-teal">
                      Register here
                    </Link>
                  </p>
                </>
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
        }
        .healthcare-card:hover {
          transform: translateY(-5px);
        }
        .healthcare-card-header {
          background: linear-gradient(135deg, #17a2b8, #138496);
          border-radius: 12px 12px 0 0;
          padding: 1.5rem;
        }
        .card-body {
          background-color: #e9ecef;
          border-radius: 0 0 12px 12px;
        }
        .btn-teal {
          background-color: #17a2b8;
          border-color: #17a2b8;
          color: #ffffff;
          transition: all 0.3s ease;
        }
        .btn-teal:hover {
          background-color: #138496;
          border-color: #138496;
          transform: translateY(-2px);
        }
        .btn-outline-teal {
          border-color: #17a2b8;
          color: #17a2b8;
          transition: all 0.3s ease;
        }
        .btn-outline-teal:hover {
          background-color: #17a2b8;
          color: #ffffff;
          transform: translateY(-2px);
        }
        .form-floating > .form-control:focus,
        .form-floating > .form-control:not(:placeholder-shown) {
          padding-top: 1.625rem;
          padding-bottom: 0.625rem;
        }
        .form-floating > label {
          color: #6c757d;
        }
        .form-control:focus {
          border-color: #17a2b8;
          box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.25);
        }
        @media (max-width: 767px) {
          .btn {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
