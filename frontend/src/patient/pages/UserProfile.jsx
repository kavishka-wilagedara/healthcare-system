import React from 'react';

const UserProfile = () => {
  const userData = {
    fullName: 'Nimal Perera',
    nic: '199012345678',
    dob: '1990-03-12',
    gender: 'Male',
    bloodType: 'B+',
    maritalStatus: 'Married',
    mobileNumber: '+94771234567',
    alternativePhone: '+94772223344',
    email: 'nimal@example.com',
    preferredContact: 'Mobile',
    residentialStreet: '123 Galle Road',
    residentialCity: 'Colombo',
    residentialProvince: 'Western',
    residentialPostal: '00300',
    sameMailingAddress: 'yes',
    mailingAddress: '',
    emergencyName: 'Sunil Perera',
    emergencyRelationship: 'Brother',
    emergencyMobile: '+94775556677',
    emergencyAlternative: '+94778889900',
    allergies: 'yes',
    allergyList: 'Peanuts, Pollen',
    chronicConditions: 'yes',
    chronicList: 'Diabetes',
    currentMedications: 'Metformin',
    previousSurgeries: 'Appendectomy in 2010',
    familyMedicalHistory: 'Heart disease',
    insurance: 'yes',
    insuranceProvider: 'ABC Insurance',
    policyNumber: 'INS12345678',
    policyholderName: 'Nimal Perera',
    username: 'nimal90',
    securityQuestion: 'pet',
    securityAnswer: 'Tommy',
    consent: true,
    notifications: true,
    terms: true,
  };

  return (
    <div className="container py-5">
      <h3 className="display-5 fw-bold text-teal mb-5 text-center">User Profile</h3>
      <div className="card shadow-sm healthcare-card">
        <div className="card-header healthcare-card-header">
          <h4 className="mb-0 text-white">Patient Information</h4>
        </div>
        <div className="card-body">
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {Object.entries(userData).map(([key, value]) => (
              <div className="col" key={key}>
                <div className="border p-3 rounded bg-light">
                  <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value?.toString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .text-teal {
          color: #17b87e;
        }
        .healthcare-card {
          border: none;
          border-radius: 12px;
          background-color: #ffffff;
        }
        .healthcare-card-header {
          background: linear-gradient(135deg, #17b87e, rgb(19, 150, 117));
          border-radius: 12px 12px 0 0;
          padding: 1.5rem;
        }
        .card-body {
          background-color: #e9ecef;
          border-radius: 0 0 12px 12px;
        }
        .bg-light {
          background-color: #f8f9fa !important;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
