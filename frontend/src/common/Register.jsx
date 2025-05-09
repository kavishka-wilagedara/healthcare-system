import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    nic: '',
    dob: '',
    gender: '',
    bloodType: '',
    maritalStatus: '',
    mobileNumber: '',
    alternativePhone: '',
    email: '',
    preferredContact: '',
    residentialStreet: '',
    residentialCity: '',
    residentialProvince: '',
    residentialPostal: '',
    sameMailingAddress: 'yes',
    mailingAddress: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyMobile: '',
    emergencyAlternative: '',
    allergies: 'no',
    allergyList: '',
    chronicConditions: 'no',
    chronicList: '',
    currentMedications: '',
    previousSurgeries: '',
    familyMedicalHistory: '',
    insurance: 'no',
    insuranceProvider: '',
    policyNumber: '',
    policyholderName: '',
    username: '',
    password: '',
    securityQuestion: '',
    securityAnswer: '',
    consent: false,
    notifications: false,
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const validatePage = (currentPage) => {
    const newErrors = {};
    if (currentPage === 1) {
      // if (!formData.fullName) newErrors.fullName = 'Full name is required';
      // if (!formData.nic || !/^\d{9}[vV]|\d{12}$/.test(formData.nic))
      //   newErrors.nic = 'Valid NIC number is required';
      // if (!formData.dob) newErrors.dob = 'Date of birth is required';
      // if (!formData.gender) newErrors.gender = 'Gender is required';
    } else if (currentPage === 2) {
      // if (!formData.mobileNumber || !/^\+94\d{9}$/.test(formData.mobileNumber))
      //   newErrors.mobileNumber = 'Valid mobile number is required';
      // if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      //   newErrors.email = 'Valid email is required';
      // if (!formData.preferredContact)
      //   newErrors.preferredContact = 'Preferred contact method is required';
      // if (!formData.residentialStreet)
      //   newErrors.residentialStreet = 'Street address is required';
      // if (!formData.residentialCity)
      //   newErrors.residentialCity = 'City is required';
    } else if (currentPage === 3) {
      // if (!formData.emergencyName)
      //   newErrors.emergencyName = 'Emergency contact name is required';
      // if (!formData.emergencyMobile || !/^\+94\d{9}$/.test(formData.emergencyMobile))
      //   newErrors.emergencyMobile = 'Valid mobile number is required';
    } else if (currentPage === 4) {
      // if (formData.allergies === 'yes' && !formData.allergyList)
      //   newErrors.allergyList = 'Please list allergies';
      // if (formData.chronicConditions === 'yes' && !formData.chronicList)
      //   newErrors.chronicList = 'Please list chronic conditions';
    } else if (currentPage === 5) {
      // if (formData.insurance === 'yes' && !formData.insuranceProvider)
      //   newErrors.insuranceProvider = 'Insurance provider is required';
      // if (formData.insurance === 'yes' && !formData.policyNumber)
      //   newErrors.policyNumber = 'Policy number is required';
    } else if (currentPage === 6) {
      // if (!formData.username) newErrors.username = 'Username is required';
      // if (
      //   !formData.password ||
      //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      //     formData.password
      //   )
      // )
      //   newErrors.password =
      //     'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
      // if (!formData.securityQuestion)
      //   newErrors.securityQuestion = 'Security question is required';
      // if (!formData.securityAnswer)
      //   newErrors.securityAnswer = 'Security answer is required';
      // if (!formData.consent) newErrors.consent = 'Consent is required';
      // if (!formData.terms) newErrors.terms = 'Terms agreement is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleNext = () => {
    if (validatePage(page)) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (validatePage(page)) {
      console.log('Form Data:', formData);
      alert('Registration submitted successfully!');
      navigate('/'); 
    }
  };
  

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <div className="card shadow-sm healthcare-card">
            <div className="card-header healthcare-card-header">
              <h4 className="mb-0 text-white">Personal Information</h4>
            </div>
            <div className="card-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
                <label htmlFor="fullName">Full Name</label>
                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.nic ? 'is-invalid' : ''}`}
                  id="nic"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  placeholder="NIC Number"
                />
                <label htmlFor="nic">NIC Number</label>
                {errors.nic && <div className="invalid-feedback">{errors.nic}</div>}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                <label htmlFor="dob">Date of Birth</label>
                {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Gender</label>
                <div className={`form-check-group ${errors.gender ? 'is-invalid' : ''}`}>
                  {['Male', 'Female', 'Other'].map((option) => (
                    <div className="form-check form-check-inline" key={option}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id={`gender${option}`}
                        value={option}
                        checked={formData.gender === option}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={`gender${option}`}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Blood Type</label>
                <select
                  className="form-select"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                >
                  <option value="">Select Blood Type</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Marital Status</label>
                <div className="form-check-group">
                  {['Single', 'Married', 'Divorced', 'Widowed'].map((status) => (
                    <div className="form-check form-check-inline" key={status}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="maritalStatus"
                        id={`marital${status}`}
                        value={status}
                        checked={formData.maritalStatus === status}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={`marital${status}`}>
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="card shadow-sm healthcare-card">
            <div className="card-header healthcare-card-header">
              <h4 className="mb-0 text-white">Contact Information</h4>
            </div>
            <div className="card-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="+94 XX XXX XXX"
                />
                <label htmlFor="mobileNumber">Mobile Number</label>
                {errors.mobileNumber && (
                  <div className="invalid-feedback">{errors.mobileNumber}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="alternativePhone"
                  name="alternativePhone"
                  value={formData.alternativePhone}
                  onChange={handleChange}
                  placeholder="+94 XX XXX XXX"
                />
                <label htmlFor="alternativePhone">Alternative Phone</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
                <label htmlFor="email">Email Address</label>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Preferred Contact Method</label>
                <div className={`form-check-group ${errors.preferredContact ? 'is-invalid' : ''}`}>
                  {['Mobile', 'Email', 'SMS'].map((method) => (
                    <div className="form-check form-check-inline" key={method}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="preferredContact"
                        id={`contact${method}`}
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={`contact${method}`}>
                        {method}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.preferredContact && (
                  <div className="invalid-feedback">{errors.preferredContact}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Residential Address</label>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${errors.residentialStreet ? 'is-invalid' : ''}`}
                    id="residentialStreet"
                    name="residentialStreet"
                    value={formData.residentialStreet}
                    onChange={handleChange}
                    placeholder="Street Address"
                  />
                  <label htmlFor="residentialStreet">Street Address</label>
                  {errors.residentialStreet && (
                    <div className="invalid-feedback">{errors.residentialStreet}</div>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${errors.residentialCity ? 'is-invalid' : ''}`}
                    id="residentialCity"
                    name="residentialCity"
                    value={formData.residentialCity}
                    onChange={handleChange}
                    placeholder="City"
                  />
                  <label htmlFor="residentialCity">City</label>
                  {errors.residentialCity && (
                    <div className="invalid-feedback">{errors.residentialCity}</div>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="residentialProvince"
                    name="residentialProvince"
                    value={formData.residentialProvince}
                    onChange={handleChange}
                    placeholder="Province"
                  />
                  <label htmlFor="residentialProvince">Province</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="residentialPostal"
                    name="residentialPostal"
                    value={formData.residentialPostal}
                    onChange={handleChange}
                    placeholder="Postal Code"
                  />
                  <label htmlFor="residentialPostal">Postal Code</label>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Is your mailing address the same as your residential address?
                </label>
                <div className="form-check-group">
                  {['yes', 'no'].map((option) => (
                    <div className="form-check form-check-inline" key={option}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="sameMailingAddress"
                        id={`sameMailing${option}`}
                        value={option}
                        checked={formData.sameMailingAddress === option}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={`sameMailing${option}`}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {formData.sameMailingAddress === 'no' && (
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="mailingAddress"
                    name="mailingAddress"
                    value={formData.mailingAddress}
                    onChange={handleChange}
                    placeholder="Mailing Address"
                    style={{ height: '100px' }}
                  />
                  <label htmlFor="mailingAddress">Mailing Address</label>
                </div>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="card shadow-sm healthcare-card">
            <div className="card-header healthcare-card-header">
              <h4 className="mb-0 text-white">Emergency Contact</h4>
            </div>
            <div className="card-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.emergencyName ? 'is-invalid' : ''}`}
                  id="emergencyName"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
                <label htmlFor="emergencyName">Full Name</label>
                {errors.emergencyName && (
                  <div className="invalid-feedback">{errors.emergencyName}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="emergencyRelationship"
                  name="emergencyRelationship"
                  value={formData.emergencyRelationship}
                  onChange={handleChange}
                  placeholder="Relationship to Patient"
                />
                <label htmlFor="emergencyRelationship">Relationship to Patient</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.emergencyMobile ? 'is-invalid' : ''}`}
                  id="emergencyMobile"
                  name="emergencyMobile"
                  value={formData.emergencyMobile}
                  onChange={handleChange}
                  placeholder="+94 XX XXX XXX"
                />
                <label htmlFor="emergencyMobile">Mobile Number</label>
                {errors.emergencyMobile && (
                  <div className="invalid-feedback">{errors.emergencyMobile}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="emergencyAlternative"
                  name="emergencyAlternative"
                  value={formData.emergencyAlternative}
                  onChange={handleChange}
                  placeholder="+94 XX XXX XXX"
                />
                <label htmlFor="emergencyAlternative">Alternative Phone</label>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="card shadow-sm healthcare-card">
            <div className="card-header healthcare-card-header">
              <h4 className="mb-0 text-white">Medical Information</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Do you have any known allergies?</label>
                <div className="form-check-group">
                  {['yes', 'no'].map((option) => (
                    <div className="form-check form-check-inline" key={option}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="allergies"
                        id={`allergies${option}`}
                        value={option}
                        checked={formData.allergies === option}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={`allergies${option}`}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {formData.allergies === 'yes' && (
                <div className="form-floating mb-3">
                  <textarea
                    className={`form-control ${errors.allergyList ? 'is-invalid' : ''}`}
                    id="allergyList"
                    name="allergyList"
                    value={formData.allergyList}
                    onChange={handleChange}
                    placeholder="List allergies"
                    style={{ height: '100px' }}
                  />
                  <label htmlFor="allergyList">List Allergies</label>
                  {errors.allergyList && (
                    <div className="invalid-feedback">{errors.allergyList}</div>
                  )}
                </div>
              )}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Do you have any chronic medical conditions?
                </label>
                <div className="form-check-group">
                  {['yes', 'no'].map((option) => (
                    <div className="form-check form-check-inline" key={option}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="chronicConditions"
                        id={`chronic${option}`}
                        value={option}
                        checked={formData.chronicConditions === option}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={`chronic${option}`}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {formData.chronicConditions === 'yes' && (
                <div className="form-floating mb-3">
                  <textarea
                    className={`form-control ${errors.chronicList ? 'is-invalid' : ''}`}
                    id="chronicList"
                    name="chronicList"
                    value={formData.chronicList}
                    onChange={handleChange}
                    placeholder="List chronic conditions"
                    style={{ height: '100px' }}
                  />
                  <label htmlFor="chronicList">List Chronic Conditions</label>
                  {errors.chronicList && (
                    <div className="invalid-feedback">{errors.chronicList}</div>
                  )}
                </div>
              )}
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="currentMedications"
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  placeholder="Current Medications"
                  style={{ height: '100px' }}
                />
                <label htmlFor="currentMedications">Current Medications</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="previousSurgeries"
                  name="previousSurgeries"
                  value={formData.previousSurgeries}
                  onChange={handleChange}
                  placeholder="Previous Surgeries"
                  style={{ height: '100px' }}
                />
                <label htmlFor="previousSurgeries">Previous Surgeries</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="familyMedicalHistory"
                  name="familyMedicalHistory"
                  value={formData.familyMedicalHistory}
                  onChange={handleChange}
                  placeholder="Family Medical History"
                  style={{ height: '100px' }}
                />
                <label htmlFor="familyMedicalHistory">Family Medical History</label>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="card shadow-sm healthcare-card">
            <div className="card-header healthcare-card-header">
              <h4 className="mb-0 text-white">Insurance Information</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Do you have health insurance?</label>
                <div className="form-check-group">
                  {['yes', 'no'].map((option) => (
                    <div className="form-check form-check-inline" key={option}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="insurance"
                        id={`insurance${option}`}
                        value={option}
                        checked={formData.insurance === option}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={`insurance${option}`}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {formData.insurance === 'yes' && (
                <>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${errors.insuranceProvider ? 'is-invalid' : ''}`}
                      id="insuranceProvider"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleChange}
                      placeholder="Insurance Provider"
                    />
                    <label htmlFor="insuranceProvider">Insurance Provider</label>
                    {errors.insuranceProvider && (
                      <div className="invalid-feedback">{errors.insuranceProvider}</div>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${errors.policyNumber ? 'is-invalid' : ''}`}
                      id="policyNumber"
                      name="policyNumber"
                      value={formData.policyNumber}
                      onChange={handleChange}
                      placeholder="Policy/Member Number"
                    />
                    <label htmlFor="policyNumber">Policy/Member Number</label>
                    {errors.policyNumber && (
                      <div className="invalid-feedback">{errors.policyNumber}</div>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="policyholderName"
                      name="policyholderName"
                      value={formData.policyholderName}
                      onChange={handleChange}
                      placeholder="Policyholder Name"
                    />
                    <label htmlFor="policyholderName">Policyholder Name</label>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="card shadow-sm healthcare-card">
            <div className="card-header healthcare-card-header">
              <h4 className="mb-0 text-white">Account Setup & Consent</h4>
            </div>
            <div className="card-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
                <label htmlFor="username">Username</label>
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <label htmlFor="password">Password</label>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="form-floating mb-3">
                <select
                  className={`form-select ${errors.securityQuestion ? 'is-invalid' : ''}`}
                  id="securityQuestion"
                  name="securityQuestion"
                  value={formData.securityQuestion}
                  onChange={handleChange}
                >
                  <option value="">Select Security Question</option>
                  <option value="pet">What is the name of your first pet?</option>
                  <option value="school">What is the name of your primary school?</option>
                  <option value="city">In which city were you born?</option>
                </select>
                <label htmlFor="securityQuestion">Security Question</label>
                {errors.securityQuestion && (
                  <div className="invalid-feedback">{errors.securityQuestion}</div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.securityAnswer ? 'is-invalid' : ''}`}
                  id="securityAnswer"
                  name="securityAnswer"
                  value={formData.securityAnswer}
                  onChange={handleChange}
                  placeholder="Security Answer"
                />
                <label htmlFor="securityAnswer">Security Answer</label>
                {errors.securityAnswer && (
                  <div className="invalid-feedback">{errors.securityAnswer}</div>
                )}
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className={`form-check-input ${errors.consent ? 'is-invalid' : ''}`}
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="consent">
                    I confirm that the information provided is accurate and complete.
                  </label>
                  {errors.consent && <div className="invalid-feedback">{errors.consent}</div>}
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notifications"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="notifications">
                    I agree to receive notifications about appointments and prescriptions.
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="terms">
                    I have read and agree to the Terms and Conditions and Privacy Policy.
                  </label>
                  {errors.terms && <div className="invalid-feedback">{errors.terms}</div>}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container py-5">
      <h3 className="display-5 fw-bold text-teal mb-5 text-center">Patient Registration</h3>
      <div className="row g-4">
        <div className="col-12">{renderPage()}</div>
      </div>
      <div className="d-flex justify-content-between mt-4">
        {page > 1 && (
          <button className="btn btn-teal healthcare-btn" onClick={handlePrevious}>
            Previous
          </button>
        )}
        <div className="ms-auto">
          {page < 6 ? (
            <button className="btn btn-teal healthcare-btn" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className="btn btn-teal healthcare-btn" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>

      <style>{`
        .text-teal {
          color: #0d6efd;
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
          background: linear-gradient(135deg, #0d6efd,rgb(19, 150, 117));
          border-radius: 12px 12px 0 0;
          padding: 1.5rem;
        }
        .card-body {
          background-color: #e9ecef;
          border-radius: 0 0 12px 12px;
        }
        .btn-teal {
          background-color: #0d6efd;
          border-color: #0d6efd;
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
        .form-floating > label {
          color: #6c757d;
        }
        .form-control:focus,
        .form-select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.25);
        }
        .form-check-group.is-invalid .form-check-input {
          border-color: #dc3545;
        }
        .form-check-group .invalid-feedback {
          display: block;
        }
        @media (max-width: 767px) {
          .form-check-inline {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;