import React, { useEffect, useState ,useContext } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useAsyncError, useNavigate } from "react-router-dom";
import "./Channeling.css";
import {
  FaCheckCircle,
  FaUserMd,
  FaCalendarAlt,
  FaSyncAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserCircle,
  FaPhoneAlt,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import axios from 'axios';
import { UserContext } from "../common/UserContext";



function Channeling() {
  const navigate = useNavigate();
  const {user , setUser} = useContext(UserContext);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [data,setData] = useState([]);

  const featureCards = [
    {
      title: "Quick & Secure Appointment Booking",
      icon: <FaCalendarAlt className="feature-icon" />,
    },
    {
      title: "Connect with Trusted Leading Specialists",
      icon: <FaUserMd className="feature-icon" />,
    },
    {
      title: "Swift Availability & Secured Confirmation",
      icon: <FaCheckCircle className="feature-icon" />,
    },
    {
      title: "Easy rescheduling and cancellation options",
      icon: <FaSyncAlt className="feature-icon" />,
    },
  ];


   //get all doctor available times
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments/');  
      setData(response.data.data);
      // setFilteredData(response.data.data);
      
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  //delete a appointment
  const deleteAppointment = async (appointmentId) => {
  try {
    await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`);
    // Update local state to remove deleted appointment
    setData(prevData => prevData.filter(item => item._id !== appointmentId));
    // If you're using filteredData, uncomment this:
    // setFilteredData(prevData => prevData.filter(item => item._id !== appointmentId));
  } catch (error) {
    console.error("Error deleting appointment:", error);
  }
};


  // //use Effect
  //  useEffect(() => {
  //     fetchAppointments();
  //   }, []);

    console.log(data?.map((e)=> e),"appointments")
  const handleBookClick = () => {
    navigate("/patient/dashboard/view-all-doctors");
  };

  const handleViewAppointmentsClick = () => {
    fetchAppointments();
    setShowAppointments(true);
    setShowHeader(false);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getStatusClass = (status) => {
   switch (status.toLowerCase()) {
      case "confirmed":
        return "status-confirmed";
      case "pending":
        return "status-pending";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  const handleBackButton = () => {
    setShowAppointments(false);
    setShowHeader(true);
  };

  return (
    <div className="channeling-info-card">
      {showHeader && (
        <>
          <h1>Your Wellness Journey Starts Here</h1>
          <p>
            Welcome to our doctor channeling platform. Easily book appointments
            with your preferred specialists. Choose a doctor, pick a convenient
            date and time, and confirm your visit with just a few clicks.
          </p>

          <Row className="channeling-features-section">
            {featureCards?.map((card, index) => (
              <Col md={3} sm={6} className="mb-4" key={index}>
                <Card className="channeling-feature-card">
                  <Card.Body className="text-center">
                    <Card.Title className="channeling-feature-title">
                      <span className="channeling-feature-icon me-2">
                        {card.icon}
                      </span>
                      <span>{card.title}</span>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="channeling-buttons">
            <button className="channeling-btn" onClick={handleBookClick}>
              Book New Channeling
            </button>
            <button
              className="channeling-btn outline"
              onClick={handleViewAppointmentsClick}
            >
              View My Channelings
            </button>
          </div>
        </>
      )}

      {showAppointments && (
        <div className="view-appointments-section">
          <IoArrowBackCircleSharp
            className="back-btn"
            onClick={handleBackButton}
          />

          <h3>My Channeling Appointments</h3>
          {data?.length > 0 ? (
            <div className="appointments-container">
              {data?.map((appt) => (
                <div className="appointment-card" key={appt?._id}>
                  <div className="appointment-header">
                    <div className="appointment-doctor-info">
                      <h4>
                        <FaUserMd className="icon-md" /> {appt?.appointment?.doctorName}
                      </h4>
                      <p className="specialty">{appt?.appointment?.specialization}</p>
                    </div>
                    <div
                      className={`appointment-status ${getStatusClass(
                        appt?.booked
                      )}`}
                    >
                      {appt?.booked}
                    </div>
                  </div>

                  <div className="appointment-details">
                    <div className="detail-item">
                      <FaUserCircle className="detail-icon" />
                      <span>Patient:</span>
                      <span className="value">{appt?.patient?.fullName}</span>
                    </div>

                    <div className="detail-item">
                      <FaPhoneAlt className="detail-icon" />
                      <span>Contact:</span>
                      <span className="value">{appt?.appointment?.contactNumber}</span>
                    </div>

                    <div className="detail-item">
                      <FaRegCalendarCheck className="detail-icon" />
                      <span>Date:</span>
                      <span className="value">{formatDate(appt?.createdAt)}</span>
                    </div>

                    <div className="detail-item">
                      <FaClock className="detail-icon" />
                      <span>Time:</span>
                      <span className="value">{appt?.appointment?.inTime} - {appt?.appointment?.outTime}</span>
                    </div>

                    {/* <div className="detail-item full-width">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span>Location:</span>
                      <span className="value">{appt.location}</span>
                    </div> */}
                  </div>

                  <div className="appointment-actions">
                    {/* <button className="action-btn reschedule">
                      Reschedule
                    </button> */}
                    <button className="action-btn cancel" onClick={() => deleteAppointment(appt._id)}>Cancel</button>
                    <button className="action-btn details">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-appointments">
              <div className="empty-state">
                <FaCalendarAlt className="empty-icon" />
                <h4>No Appointments Found</h4>
                <p>You don't have any scheduled appointments at the moment.</p>
                <button className="channeling-btn" onClick={handleBookClick}>
                  Book Your First Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Channeling;
