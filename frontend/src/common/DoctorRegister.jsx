import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DoctorRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    contact: "",
    specialization: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const handleRegistration = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:5000/api/doctor/register",
        formData
      );
      console.log(response.data);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 1500,
        background: "#f8f9fa",
      });

      navigate("/");
    } catch (error) {
      console.log("error while doctor registration : ", error);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
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

  const validate = () => {
    const newErrors = {};
    if (!formData.employeeId) newErrors.employeeId = "Employee ID is required";
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.contact || !/^\+94\d{9}$/.test(formData.contact))
      newErrors.contact = "Valid contact number is required";
    if (!formData.specialization)
      newErrors.specialization = "Specialization is required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.terms) newErrors.terms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Doctor Registered:", formData);
      alert("Doctor registered successfully!");
      navigate("/");
    }
  };

  return (
    <div className="container py-5">
      <h3 className="display-5 fw-bold text-teal mb-5 text-center">
        Doctor Registration
      </h3>
      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow-sm healthcare-card">
            <div className="card-header healthcare-card-header">
              <h4 className="mb-0 text-white">Registration Form</h4>
            </div>
            <div className="card-body">
              {[
                { label: "Employee ID", name: "employeeId" },
                { label: "Full Name", name: "fullName" },
                { label: "Email", name: "email", type: "email" },
                {
                  label: "Contact Number",
                  name: "contact",
                  placeholder: "+94XXXXXXXXX",
                },
                { label: "Specialization", name: "specialization" },
              ].map(({ label, name, type = "text", placeholder }) => (
                <div className="form-floating mb-3" key={name}>
                  <input
                    type={type}
                    className={`form-control ${
                      errors[name] ? "is-invalid" : ""
                    }`}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder || label}
                  />
                  <label htmlFor={name}>{label}</label>
                  {errors[name] && (
                    <div className="invalid-feedback">{errors[name]}</div>
                  )}
                </div>
              ))}
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <label htmlFor="password">Password</label>
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className={`form-check-input ${
                      errors.terms ? "is-invalid" : ""
                    }`}
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="terms">
                    I agree to the Terms and Conditions
                  </label>
                  {errors.terms && (
                    <div className="invalid-feedback">{errors.terms}</div>
                  )}
                </div>
              </div>
              <button
                className="btn btn-teal healthcare-btn mt-2"
                onClick={handleRegistration}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .text-teal { color: #17a2b8; }
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
        .form-floating > .form-control:focus,
        .form-floating > .form-control:not(:placeholder-shown) {
          padding-top: 1.625rem;
          padding-bottom: 0.625rem;
        }
        .form-floating > label { color: #6c757d; }
        .form-control:focus,
        .form-select:focus {
          border-color: #17a2b8;
          box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.25);
        }
        .form-check-group.is-invalid .form-check-input { border-color: #dc3545; }
        .form-check-group .invalid-feedback { display: block; }
        @media (max-width: 767px) {
          .form-check-inline { margin-bottom: 0.5rem; }
        }
      `}</style>
    </div>
  );
};

export default DoctorRegister;
