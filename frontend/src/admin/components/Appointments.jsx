import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/appointments/')
      .then(response => {
        if (response.data.status) {
          setAppointments(response.data.data);
        }
      })
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  const categorizeAppointments = (status, completed) => {
    return appointments.filter(
      app => app.booked === status && app.completed === completed
    );
  };

  const renderAppointmentCards = (filteredAppointments) => (
    <Row>
      {filteredAppointments.map((app, idx) => (
        <Col md={6} key={idx}>
          <Card className="shadow-sm mb-3 border-start border-4 border-success">
            <Card.Body>
              <Card.Title className="text-dark fw-bold">{app.patient.fullName}</Card.Title>
              <p className="mb-1"><strong>NIC:</strong> {app.patient.nic}</p>
              <p className="mb-1"><strong>Email:</strong> {app.patient.email}</p>
              <p className="mb-1"><strong>Doctor:</strong> {app.appointment.doctorName} ({app.appointment.specialization})</p>
              <p className="mb-1"><strong>Date:</strong> {app.appointment.date}</p>
              <p className="mb-1"><strong>Time:</strong> {app.appointment.inTime} - {app.appointment.outTime}</p>
              <p className="mb-1"><strong>Status:</strong> {app.booked}</p>
              <p className="mb-3"><strong>Completed:</strong> {app.completed ? 'Yes' : 'No'}</p>
              {app.completed && (
                <div className="p-3 rounded bg-light border">
                  <p className="mb-2 text-success fw-bold">
                    <strong>Medicine:</strong><br />
                    <span className="ms-2">{app.medicine}</span>
                  </p>
                  <p className="mb-0 text-primary fw-bold">
                    <strong>Advice:</strong><br />
                    <span className="ms-2">{app.advice}</span>
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <div className="container py-4">
      <h3 className="text-secondary mb-4">Appointments Management</h3>

      <Accordion defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Confirmed & Completed</Accordion.Header>
          <Accordion.Body>
            {renderAppointmentCards(categorizeAppointments('confirmed', true))}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Confirmed & Not Completed</Accordion.Header>
          <Accordion.Body>
            {renderAppointmentCards(categorizeAppointments('confirmed', false))}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Pending Appointments</Accordion.Header>
          <Accordion.Body>
            {renderAppointmentCards(categorizeAppointments('pending', false))}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Cancelled Appointments</Accordion.Header>
          <Accordion.Body>
            {renderAppointmentCards(categorizeAppointments('cancelled', false))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <style>{`
        .card {
          border-radius: 10px;
          background-color: #ffffff;
        }
        .accordion-button:not(.collapsed) {
          background-color: #e9f5ec;
          color: #1e4620;
        }
        .accordion-button {
          font-weight: 500;
        }
        .accordion-button:focus {
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default Appointments;
