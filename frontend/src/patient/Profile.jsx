import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PatientChannelHistory from "../doctor/components/PatientChannelHistory";
import { UserContext } from "../common/UserContext";
import axios from "axios";
import Swal from "sweetalert2";

function Profile() {
  const { id } = useParams();
  
  const [patient, setPatient] = useState({
    fullName: "",
    nic: "",
    dob: "",
    gender: "",
    bloodType: "",
    maritalStatus: "",
    mobileNumber: "",
    alternativePhone: "",
    email: "",
    preferredContact: "",
    residentialStreet: "",
    residentialCity: "",
    residentialProvince: "",
    residentialPostal: "",
    sameMailingAddress: "",
    mailingAddress: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyMobile: "",
    emergencyAlternative: "",
    allergies: "",
    allergyList: "",
    chronicConditions: "",
    chronicList: "",
    currentMedications: "",
    previousSurgeries: "",
    familyMedicalHistory: "",
    insurance: "",
    insuranceProvider: "",
    policyNumber: "",
    policyholderName: "",
    username: "",
    securityQuestion: "",
    securityAnswer: "",
    notifications: false
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUserById();
  }, []);

  const deletPatient = async (patientId) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/delete/${patientId}`);
      navigate("/");
    } catch (error) {
      console.log('error', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete patient?',
        confirmButtonColor: '#17a2b8'
      });
    }
  };

  const getUserById = async () => {
    try {
      if(user?.patient?.patientId==undefined){
        const response = await axios.get(`http://localhost:5000/api/patients/${id}`);
        setPatient(response.data);
        setLoading(false);
      }else{
        const response = await axios.get(`http://localhost:5000/api/patients/${user?.patient?.patientId}`);
        setPatient(response.data);
        setLoading(false);
      }
      
    } catch (error) {
      console.log('error', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load patient? data',
        confirmButtonColor: '#17a2b8'
      });
      setLoading(false);
    }
  };

  console.log(patient,"check pppppppp")

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPatient({
      ...patient,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/patients/update/${user?.patient?.patientId}`,
        patient
      );
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Profile updated successfully',
        confirmButtonColor: '#17a2b8'
      });
      setEditing(false);
      getUserById(); 
    } catch (error) {
      console.error('Error updating patient?:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update profile',
        confirmButtonColor: '#17a2b8'
      });
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const toggleEditing = () => {
    if (editing) {
      Swal.fire({
        title: 'Discard changes?',
        text: 'Are you sure you want to cancel editing? All unsaved changes will be lost.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#17a2b8',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, discard changes',
        cancelButtonText: 'No, keep editing'
      }).then((result) => {
        if (result.isConfirmed) {
          setEditing(false);
          getUserById(); 
        }
      });
    } else {
      setEditing(true);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading patient? data...</div>;
  }

  if (!patient) {
    return <div className="p-4 text-danger">Patient not found.</div>;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h3 className="display-5 fw-bold text-teal mb-0">Patient Profile</h3>
        <button 
          onClick={toggleEditing}
          className={`btn ${editing ? "btn-danger" : "btn-primary"}`}
        >
          {editing ? "Cancel Editing" : "Edit Profile"}
        </button>
        <button className="btn btn-danger" onClick={() => deletPatient(user.patient?.patientId)}>
          Delete
        </button>
      </div>

      {editing ? (
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-12">
              <div className="card shadow-sm healthcare-card">
                <div className="card-header healthcare-card-header">
                  <h4 className="mb-0 text-white">Personal Information</h4>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={patient?.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">NIC</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nic"
                        value={patient?.nic}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={patient?.dob ? patient?.dob.split('T')[0] : ''}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select"
                        name="gender"
                        value={patient?.gender}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Blood Type</label>
                      <select
                        className="form-select"
                        name="bloodType"
                        value={patient?.bloodType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label">Marital Status</label>
                      <select
                        className="form-select"
                        name="maritalStatus"
                        value={patient?.maritalStatus}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Mobile Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="mobileNumber"
                        value={patient?.mobileNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Alternative Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="alternativePhone"
                        value={patient?.alternativePhone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={patient?.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Preferred Contact</label>
                      <select
                        className="form-select"
                        name="preferredContact"
                        value={patient?.preferredContact}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Preferred Contact</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Email">Email</option>
                        <option value="Alternative Phone">Alternative Phone</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm healthcare-card">
                <div className="card-header healthcare-card-header">
                  <h4 className="mb-0 text-white">Residential Address</h4>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Street</label>
                    <input
                      type="text"
                      className="form-control"
                      name="residentialStreet"
                      value={patient?.residentialStreet}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="residentialCity"
                      value={patient?.residentialCity}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Province</label>
                      <input
                        type="text"
                        className="form-control"
                        name="residentialProvince"
                        value={patient?.residentialProvince}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Postal Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="residentialPostal"
                        value={patient?.residentialPostal}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm healthcare-card">
                <div className="card-header healthcare-card-header">
                  <h4 className="mb-0 text-white">Mailing Address</h4>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Same as Residential</label>
                    <select
                      className="form-select"
                      name="sameMailingAddress"
                      value={patient?.residentialStreet}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {patient?.sameMailingAddress === "No" && (
                    <div className="mb-3">
                      <label className="form-label">Mailing Address</label>
                      <textarea
                        className="form-control"
                        name="mailingAddress"
                        value={patient?.residentialStreet}
                        onChange={handleInputChange}
                        rows="3"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm healthcare-card">
                <div className="card-header healthcare-card-header">
                  <h4 className="mb-0 text-white">Emergency Contact</h4>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="emergencyName"
                      value={patient?.emergencyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Relationship</label>
                    <input
                      type="text"
                      className="form-control"
                      name="emergencyRelationship"
                      value={patient?.emergencyRelationship}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mobile</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="emergencyMobile"
                      value={patient?.emergencyMobile}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Alternative Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="emergencyAlternative"
                      value={patient?.emergencyAlternative}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm healthcare-card">
                <div className="card-header healthcare-card-header">
                  <h4 className="mb-0 text-white">Medical Information</h4>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Allergies</label>
                    <select
                      className="form-select mb-2"
                      name="allergies"
                      value={patient?.allergies}
                      onChange={handleInputChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                    {patient?.allergies === "Yes" && (
                      <input
                        type="text"
                        className="form-control"
                        name="allergyList"
                        value={patient?.allergyList}
                        onChange={handleInputChange}
                        placeholder="List allergies separated by commas"
                      />
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Chronic Conditions</label>
                    <select
                      className="form-select mb-2"
                      name="chronicConditions"
                      value={patient?.chronicConditions}
                      onChange={handleInputChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                    {patient?.chronicConditions === "Yes" && (
                      <input
                        type="text"
                        className="form-control"
                        name="chronicList"
                        value={patient?.chronicList}
                        onChange={handleInputChange}
                        placeholder="List chronic conditions separated by commas"
                      />
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Current Medications</label>
                    <textarea
                      className="form-control"
                      name="currentMedications"
                      value={patient?.currentMedications}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="List current medications"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Previous Surgeries</label>
                    <textarea
                      className="form-control"
                      name="previousSurgeries"
                      value={patient?.previousSurgeries}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="List previous surgeries"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Family Medical History</label>
                    <textarea
                      className="form-control"
                      name="familyMedicalHistory"
                      value={patient?.familyMedicalHistory}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="List family medical history"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="card shadow-sm healthcare-card">
                <div className="card-header healthcare-card-header">
                  <h4 className="mb-0 text-white">Insurance Information</h4>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Has Insurance</label>
                    <select
                      className="form-select mb-2"
                      name="insurance"
                      value={patient?.insurance}
                      onChange={handleInputChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                  {patient?.insurance === "Yes" && (
                    <>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Insurance Provider</label>
                          <input
                            type="text"
                            className="form-control"
                            name="insuranceProvider"
                            value={patient?.insuranceProvider}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Policy Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="policyNumber"
                            value={patient?.policyNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Policyholder Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="policyholderName"
                          value={patient?.policyholderName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="card shadow-sm healthcare-card">
                <div className="card-header healthcare-card-header">
                  <h4 className="mb-0 text-white">Account Information</h4>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={patient?.username}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Security Question</label>
                      <input
                        type="text"
                        className="form-control"
                        name="securityQuestion"
                        value={patient?.securityQuestion}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="notifications"
                      checked={patient?.notifications}
                      onChange={handleInputChange}
                      id="notificationsCheck"
                    />
                    <label className="form-check-label" htmlFor="notificationsCheck">
                      Receive Notifications
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary btn-lg">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="row g-4">
          <div className="col-12">
            <div className="card shadow-sm healthcare-card">
              <div className="card-header healthcare-card-header">
                <h4 className="mb-0 text-white">Personal Information</h4>
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-sm-4 fw-semibold">Full Name</dt>
                  <dd className="col-sm-8">{patient?.fullName || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">NIC</dt>
                  <dd className="col-sm-8">{patient?.nic || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Date of Birth</dt>
                  <dd className="col-sm-8">{patient?.dob ? new Date(patient?.dob).toLocaleDateString() : "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Age</dt>
                  <dd className="col-sm-8">{patient?.dob ? calculateAge(patient?.dob) : "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Gender</dt>
                  <dd className="col-sm-8">{patient?.gender || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Blood Type</dt>
                  <dd className="col-sm-8">{patient?.bloodType || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Marital Status</dt>
                  <dd className="col-sm-8">{patient?.maritalStatus || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Mobile Number</dt>
                  <dd className="col-sm-8">{patient?.mobileNumber || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Alternative Phone</dt>
                  <dd className="col-sm-8">{patient?.alternativePhone || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Email</dt>
                  <dd className="col-sm-8">{patient?.email || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Preferred Contact</dt>
                  <dd className="col-sm-8">{patient?.preferredContact || "N/A"}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm healthcare-card">
              <div className="card-header healthcare-card-header">
                <h4 className="mb-0 text-white">Residential Address</h4>
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-sm-4 fw-semibold">Street</dt>
                  <dd className="col-sm-8">{patient?.residentialStreet || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">City</dt>
                  <dd className="col-sm-8">{patient?.residentialCity || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Province</dt>
                  <dd className="col-sm-8">{patient?.residentialProvince || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Postal Code</dt>
                  <dd className="col-sm-8">{patient?.residentialPostal || "N/A"}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm healthcare-card">
              <div className="card-header healthcare-card-header">
                <h4 className="mb-0 text-white">Mailing Address</h4>
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-sm-4 fw-semibold">Same as Residential</dt>
                  <dd className="col-sm-8">{patient?.sameMailingAddress || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Address</dt>
                  <dd className="col-sm-8">{patient?.residentialStreet || "N/A"}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm healthcare-card">
              <div className="card-header healthcare-card-header">
                <h4 className="mb-0 text-white">Emergency Contact</h4>
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-sm-4 fw-semibold">Name</dt>
                  <dd className="col-sm-8">{patient?.emergencyName || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Relationship</dt>
                  <dd className="col-sm-8">{patient?.emergencyRelationship || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Mobile</dt>
                  <dd className="col-sm-8">{patient?.emergencyMobile || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Alternative Phone</dt>
                  <dd className="col-sm-8">{patient?.emergencyAlternative || "N/A"}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm healthcare-card">
              <div className="card-header healthcare-card-header">
                <h4 className="mb-0 text-white">Medical Information</h4>
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-sm-4 fw-semibold">Allergies</dt>
                  <dd className="col-sm-8">{patient?.allergies === "Yes" ? patient?.allergyList : "None"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Chronic Conditions</dt>
                  <dd className="col-sm-8">{patient?.chronicConditions === "Yes" ? patient?.chronicList : "None"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Current Medications</dt>
                  <dd className="col-sm-8">{patient?.currentMedications || "None"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Previous Surgeries</dt>
                  <dd className="col-sm-8">{patient?.previousSurgeries || "None"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Family Medical History</dt>
                  <dd className="col-sm-8">{patient?.familyMedicalHistory || "None"}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card shadow-sm healthcare-card">
              <div className="card-header healthcare-card-header">
                <h4 className="mb-0 text-white">Insurance Information</h4>
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-sm-4 fw-semibold">Has Insurance</dt>
                  <dd className="col-sm-8">{patient?.insurance || "N/A"}</dd>
                  
                  {patient?.insurance === "Yes" && (
                    <>
                      <dt className="col-sm-4 fw-semibold">Insurance Provider</dt>
                      <dd className="col-sm-8">{patient?.insuranceProvider || "N/A"}</dd>
                      
                      <dt className="col-sm-4 fw-semibold">Policy Number</dt>
                      <dd className="col-sm-8">{patient?.policyNumber || "N/A"}</dd>
                      
                      <dt className="col-sm-4 fw-semibold">Policyholder Name</dt>
                      <dd className="col-sm-8">{patient?.policyholderName || "N/A"}</dd>
                    </>
                  )}
                </dl>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card shadow-sm healthcare-card">
              <div className="card-header healthcare-card-header">
                <h4 className="mb-0 text-white">Account Information</h4>
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-sm-4 fw-semibold">Username</dt>
                  <dd className="col-sm-8">{patient?.username || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Security Question</dt>
                  <dd className="col-sm-8">{patient?.securityQuestion || "N/A"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Notifications</dt>
                  <dd className="col-sm-8">{patient?.notifications ? "Enabled" : "Disabled"}</dd>
                  
                  <dt className="col-sm-4 fw-semibold">Account Created</dt>
                  <dd className="col-sm-8">{patient?.createdAt ? new Date(patient?.createdAt).toLocaleString() : "N/A"}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}

      {patient?._id && <PatientChannelHistory patientId={patient?._id} />}

      <style>{`
        .text-teal {
          color: #3385d6;
        }
        .healthcare-card {
          border: none;
          border-radius: 12px;
          background-color: #ffffff;
          transition: transform 0.3s ease;
          margin-bottom: 20px;
        }
        .healthcare-card:hover {
          transform: translateY(-5px);
        }
        .healthcare-card-header {
          background: linear-gradient(135deg, #3385d6, #138496);
          border-radius: 12px 12px 0 0;
          padding: 1.5rem;
        }
        .card-body {
          background-color: #e9ecef;
          border-radius: 0 0 12px 12px;
        }
        .row.mb-0 > dt, .row.mb-0 > dd {
          margin-bottom: 0.75rem;
          padding: 0.5rem;
        }
        dt.fw-semibold {
          color: #343a40;
        }
        @media (max-width: 767px) {
          .row.mb-0 > dt {
            margin-bottom: 0.25rem;
          }
        }
        .form-label {
          font-weight: 500;
          color: #495057;
        }
      `}</style>
    </div>
  );
}

export default Profile;