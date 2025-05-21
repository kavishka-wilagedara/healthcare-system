import React, { use, useContext } from "react";
import "./Homepage.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaCalendarCheck, FaFileMedical } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { RiFileHistoryFill } from "react-icons/ri";
import doctorPatientImg from "../assets/images/doctor-patient.png";
import medicalBackgroundImg from "../assets/images/medical-background.jpg";
import healthTipImg from "../assets/images/health-tip.jpg";
import axios from 'axios';
import { UserContext } from "../common/UserContext";

function Homepage() {
  const {user} = useContext(UserContext);
console.log(user,"user")
  const data = {
    name: user?.patient?.fullName,
    pendingClinicalService: [
      {
        appointmentId: "ClI-0001",
        name: "Blood Test",
        appointmentDate: "2025-09-10",
        appointmentTime: "9.00 AM",
        clinicRomm: "4th Floor, Room-0029",
      },
    ],
    pendingDoctorAppoinments: [
      {
        appointmentId: "APT-0001",
        doctorName: "Dr. Kavindya Perera",
        specialization: "Cardiologist",
        appointmentDate: "2025-09-20",
        appointmentTime: "10:30 AM",
        consultationRoom: "4th Floor, Room-0029",
      },
    ],
  };

  const quickAccessCards = [
    {
      title: "Schedule Appointment",
      icon: <FaCalendarCheck className="feature-icon" />,
      description: "Book your next consultation with our specialists",
      buttonText: "Book Now",
      link: "/patient/dashboard/channeling",
    },
    {
      title: "Medical Records",
      icon: <RiFileHistoryFill className="feature-icon" />,
      description: "Access your health records securely anytime",
      buttonText: "View Medical Records",
      link: "/patient/dashboard/my-history",
    },
    {
      title: "Diagnostic & Lab Services",
      icon: <FaFileMedical className="feature-icon" />,
      description:
        "Schedule lab appointments and manage your medical diagnostics",
      buttonText: "View Services",
      link: "/patient/dashboard/clinical-services",
    },
    {
      title: "Consultation",
      icon: <FaUserDoctor className="feature-icon" />,
      description: "Get professional health advice from certified doctors",
      buttonText: "View Doctors",
      link: "/patient/dashboard/view-all-doctors",
    },
  ];

  return (
    <div className="homepage">
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${medicalBackgroundImg})` }}
      >
        <Container>
          <Row>
            <Col md={6} className="hero-text">
              <h1>
                Welcome, <span className="patient-name">{data?.name}</span>
              </h1>
              <p className="hero-subtitle">
                You're one step closer to feeling your best , Let's make today
                count!
              </p>
            </Col>
            <Col md={6} className="hero-image-container">
              <div className="hero-image">
                <img
                  src={doctorPatientImg}
                  alt="Doctor with patient"
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt-4">
        <Row className="upcoming-section">
          <Col md={8} className="mb-4">
            <Card className="shadow-sm upcoming-card">
              <Card.Body>
                <h3 className="card-title">Your Upcoming Appointment</h3>
                {data?.pendingDoctorAppoinments.length > 0 ? (
                  <>
                    <div className="appointment-details">
                      <div className="appointment-calendar">
                        <div className="calendar-date">
                          <span className="date-number">
                            {new Date(
                              data.pendingDoctorAppoinments[
                                data.pendingDoctorAppoinments.length - 1
                              ].appointmentDate
                            )
                              .getDate()
                              .toString()
                              .padStart(2, "0")}
                          </span>
                          <span className="date-month">
                            {new Date(
                              data.pendingDoctorAppoinments[
                                data.pendingDoctorAppoinments.length - 1
                              ].appointmentDate
                            ).toLocaleString("default", {
                              month: "short",
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="appointment-info">
                        <div className="appointment-infor-with-btn">
                          <p className="appointment-time">
                            {
                              data.pendingDoctorAppoinments[
                                data.pendingDoctorAppoinments.length - 1
                              ].appointmentDate
                            }{" "}
                            at{" "}
                            {
                              data.pendingDoctorAppoinments[
                                data.pendingDoctorAppoinments.length - 1
                              ].appointmentTime
                            }
                          </p>
                          <p>
                            <strong className="appointment-doctor">
                              With{" "}
                              {
                                data.pendingDoctorAppoinments[
                                  data.pendingDoctorAppoinments.length - 1
                                ].doctorName
                              }
                            </strong>
                          </p>
                          <Button variant="outline-primary" className="mt-0">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="new-appoinment">
                    <p>
                      No pending doctor appointments at the moment. Please book
                      one!
                    </p>
                    <Button
                      variant="outline-primary"
                      className="mt-0"
                      href="/patient/dashboard/view-all-doctors"
                    >
                      View Doctors
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="shadow-sm notification-card">
              <Card.Body>
                <h3 className="upcoming-card-title">Your Notifications</h3>
                {data.pendingClinicalService.length +
                  data.pendingDoctorAppoinments.length >
                0 ? (
                  <>
                    <div className="notification-item">
                      <div className="notification-count pending-results">
                        {data.pendingClinicalService.length}
                      </div>
                      <p>Clinical Service Appoinments</p>
                    </div>
                    <div className="notification-item">
                      <div className="notification-count active-prescriptions">
                        {data.pendingDoctorAppoinments.length}
                      </div>
                      <p>Doctor Channeling</p>
                    </div>
                    <Button
                      variant="link"
                      className="view-all-link"
                      href="/patient/dashboard/notification"
                    >
                      View All
                    </Button>
                  </>
                ) : (
                  <p>
                    You're all caught up , No pending appointments at the moment
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <h2 className="section-title">Quick Access</h2>
        <Row className="features-section">
          {quickAccessCards?.map((card, index) => (
            <Col md={3} sm={6} className="mb-4" key={index}>
              <Card className="feature-card shadow-sm h-100">
                <Card.Body className="text-center">
                  {card.icon}
                  <Card.Title className="feature-title">
                    {card.title}
                  </Card.Title>
                  <Card.Text className="feature-description">
                    {card.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white border-0 text-center pb-3">
                  <Button variant="primary" href={card.link}>
                    {card.buttonText}
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="health-tips">
          <Row>
            <Col md={12}>
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <h3 className="card-title">Health Tip of the Day</h3>
                  <div className="tip-content">
                    <div className="tip-image">
                      <img
                        src={healthTipImg}
                        alt="Health tip"
                        className="img-fluid"
                      />
                    </div>
                    <div className="tip-text">
                      <strong>Stay Hydrated:</strong>
                      <p>
                        Drinking enough water each day is crucial for many
                        reasons: It regulates body temperature, keeps joints
                        lubricated, prevents infections, delivers nutrients to
                        cells, and keeps organs functioning properly. Being
                        well-hydrated also improves sleep quality, cognition,
                        and mood.
                      </p>
                      <Button variant="outline-primary" size="sm">
                        More Health Tips
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Homepage;
