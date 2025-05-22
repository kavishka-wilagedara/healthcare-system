import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import "./Services.css";
import {
  MdOutlineDateRange,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import {
  FaAmbulance,
  FaHospitalSymbol,
  FaUserNurse,
  FaStethoscope,
} from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { UserContext } from "../common/UserContext";
import axios from "axios";
import Swal from "sweetalert2";

const Services = () => {
  const { user } = useContext(UserContext);

  const serviceFeatureCards = [
    {
      title: "24/7 Emergency Ambulance Service",
      icon: <FaAmbulance className="feature-icon" />,
    },
    {
      title: "Multi-Specialty Healthcare Services",
      icon: <FaHospitalSymbol className="feature-icon" />,
    },
    {
      title: "Professional Nursing Assistance",
      icon: <FaUserNurse className="feature-icon" />,
    },
    {
      title: "Comprehensive Health Checkups",
      icon: <FaStethoscope className="feature-icon" />,
    },
  ];

  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState([]);
  const [showServices, setShowServices] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateService, setUpdateService] = useState({
    name: "",
    date: "",
    time: "",
    notes: "",
    roomNum: "",
    patientId: "",
  });
  const [newService, setNewservice] = useState({
    name: "",
    date: "",
    time: "",
    notes: "",
    roomNum: "",
    patientId: "",
  });

  const patientId = user?.patient?.patientId;
  const patientFullName = user?.patient?.fullName;

  const getAllServiceByPatientId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/services/patient/${patientId}`
      );
      console.log(response.data);

      const filterData = response?.data?.data.filter((data)=>data?.patient?._id === patientId)
      
      setServices(filterData);
      setShowServices(true);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } catch (error) {
      console.log("Error while getting all services", error);
      setServices([]);
    }
  };
  useEffect(() => {}, []);

  const handleViewServices = () => {
    setShowHeader(false);
    setShowServices(true);
    getAllServiceByPatientId();
  };

  const handleNewServiceClick = () => {
    setShowForm(true);
    setShowHeader(false);
    setShowServices(false);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewservice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", newService.name);
    data.append("date", newService.date);
    data.append("time", newService.time);
    data.append("notes", newService.notes);
    data.append("patientId", { patientId });

    // Generate random room number
    const randomRoomNumber = `Room ${Math.floor(Math.random() * 5) + 101}`;

    try {
      const payload = {
        ...newService,
        patientId: patientId,
        roomNum: randomRoomNumber,
      };
      const response = await axios.post(
        "http://localhost:5000/api/services/",
        payload
      );
      console.log(response.data);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Service Create Successful!",
        showConfirmButton: false,
        background: "#f8f9fa",
      });
      // Reset form after succesfully submission
      setNewservice({
        name: "",
        date: "",
        time: "",
        notes: "",
        roomNum: "",
        patientId: "",
      });
    } catch (error) {
      console.log("Error creating new service", error);
    }
  };

  const handleCloseForm = () => {
    const isFormUpdated =
      newService.name !== "" ||
      newService.date !== "" ||
      newService.time !== "" ||
      newService.notes !== "";
    // If not insert items into form then close silently without swalfire
    if (!isFormUpdated) {
      setShowForm(false);
      setShowServices(false);
      setShowHeader(true);
      return;
    }
    Swal.fire({
      title: "Discard Changes?",
      text: "You have unsaved changes. Are you sure you want to leave without saving?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, discard",
      cancelButtonText: "No, stay here",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setShowForm(false);
        setShowServices(false);
        setShowHeader(true);
      } else {
        setShowForm(true);
      }
    });
  };

  const handleBackButton = () => {
    setShowForm(false);
    setShowServices(false);
    setShowHeader(true);
  };

  const handleViewDetails = (service) => {
    setShowHeader(false);
    setShowServices(false);
    setSelectedService(service);
    setUpdateService({
      name: service.name,
      date: service.date,
      time: service.time,
      notes: service.notes,
      roomNum: service.roomNum,
      patientId: service.patientId,
    });
    setShowServiceDetails(true);
    setIsUpdating(false);
  };

  const handleStartUpdate = () => {
    setIsUpdating(true);
  };

  const handleCancelUpdate = () => {
    const isFormUpdated =
      updateService.name !== selectedService.name ||
      updateService.date !== selectedService.date ||
      updateService.time !== selectedService.time ||
      updateService.notes !== selectedService.notes;
    // If not update form close silently without swalfire
    if (!isFormUpdated) {
      setIsUpdating(false);
      setShowServiceDetails(true);
      return;
    }

    Swal.fire({
      title: "Discard Changes?",
      text: "You have unsaved changes. Are you sure you want to leave without saving?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, discard",
      cancelButtonText: "No, stay here",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsUpdating(false);
        setShowServiceDetails(true);
        // Reset form to original values
        setUpdateService({
          name: selectedService.name,
          date: selectedService.date,
          time: selectedService.time,
          notes: selectedService.notes,
          roomNum: selectedService.roomNum,
          patientId: selectedService.patientId,
        });
      } else {
        setIsUpdating(true);
      }
    });
  };

  const handleDelete = async (serviceId) => {
    Swal.fire({
      title: "Delete Service?",
      text: "Are you sure you want to delete this service? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:5000/api/services/${serviceId}`
          );
          console.log(response.data);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Service has been deleted!",
            showConfirmButton: true,
            confirmButtonColor: "#d33",
            background: "#f8f9fa",
          });
          // Get updated services
          getAllServiceByPatientId();
        } catch (error) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed to delete the service!",
            showConfirmButton: true,
            confirmButtonColor: "#d33",
            background: "#f8f9fa",
          });
          console.log("Error deleting service", error);
        }
      }
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...updateService,
        patientId: patientId,
      };

      const response = await axios.put(
        `http://localhost:5000/api/services/${selectedService._id}`,
        payload
      );
      console.log(response.data);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Service Updated Successfully!",
        showConfirmButton: false,
        background: "#f8f9fa",
      });

      // Close and refresh services
      setIsUpdating(false);
      setShowServiceDetails(false);
      getAllServiceByPatientId();
      setShowServices(true);
    } catch (error) {
      console.log("Error updating service", error);
    }
  };

  return (
    <div className="service-container">
      {showHeader && (
        <>
          <div className="title-section">
            <h1>Diagnostic & Lab Services</h1>
            <p>
              We offer fast, accurate diagnostic and lab services including
              blood tests, scans, and health checkups, All under one roof,
              Ensuring timely results and trusted care for your peace of mind.
            </p>

            <Row className="feature-section">
              {serviceFeatureCards?.map((card, index) => (
                <Col md={3} sm={6} className="mb-4" key={index}>
                  <Card className="service-feature-card">
                    <Card.Body className="text-center">
                      <Card.Title className="service-feature-title">
                        <span className="service-feature-icon me-2">
                          {card.icon}
                        </span>
                        <span>{card.title}</span>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="buttons">
              <button className="add-btn" onClick={handleNewServiceClick}>
                Add New Service
              </button>
              <button className="view-service-btn" onClick={handleViewServices}>
                View My Service
              </button>
            </div>
          </div>
        </>
      )}

      {showServices && (
        <div className="view-appointments-section">
          <IoArrowBackCircleSharp
            className="back-btn"
            onClick={handleBackButton}
          />

          {services.length > 0 ? (
            <>
              <h3>My Appointments</h3>
              <div className="service-card-wrapper">
                {services.map((service) => (
                  <div className="service-card" key={service?._id}>
                    {/* Card header */}
                    <div className="card-header">
                      <h4>{service?.name}</h4>
                    </div>
                    {/* Card body */}
                    <div className="card-body">
                      <p>
                        <MdOutlineFormatListNumbered className="icon" />
                        <strong>Appointment No:</strong>&nbsp;
                        <span>...{service._id.slice(-10)}</span>
                      </p>
                      <p>
                        <IoPersonOutline className="icon" />
                        <strong>Patient Name:</strong>&nbsp;
                        <span>{service?.patient?.fullName}</span>
                      </p>
                      <p>
                        <MdOutlineDateRange className="icon" />
                        <strong>Date:</strong>&nbsp;<span>{service?.date}</span>
                      </p>
                      <p>
                        <IoTimeOutline className="icon" />
                        <strong>Time:</strong>&nbsp;<span>{service?.time}</span>
                      </p>
                      <p>
                        <IoLocationOutline className="icon" />
                        <strong>Clinical Room:</strong>&nbsp;
                        <span>{service?.roomNum}</span>
                      </p>
                    </div>
                    <div className="service-actions">
                      <button
                        className="service-action-btn cancel"
                        onClick={() => {
                          handleDelete(service?._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="service-action-btn details"
                        onClick={() => {
                          handleViewDetails(service);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-appointments">
              <div className="empty-state">
                <FaCalendarAlt className="empty-icon" />
                <h4>No Appointments Found</h4>
                <p>You don't have any scheduled appointments at the moment.</p>
                <button
                  className="channeling-btn"
                  onClick={handleNewServiceClick}
                >
                  Book Your First Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showServiceDetails && (
        <div className="model-overlay">
          <div className="model-content">
            <h3 className="model-content-header">
              {isUpdating ? "Update Service" : "Service Details"}
            </h3>
            {selectedService && (
              <>
                {!isUpdating ? (
                  <div className="service-details">
                    <Row>
                      <Col md={6}>
                        <Card className="app-infor">
                          <Card.Header>
                            <h5>Appoinment Information</h5>
                          </Card.Header>
                          <Card.Body>
                            <div className="detail-items">
                              <MdOutlineFormatListNumbered className="detail-icon" />
                              <strong>Appointment No:</strong>
                              <span>{selectedService._id}</span>
                            </div>
                            <div className="detail-items">
                              <FaStethoscope className="detail-icon" />
                              <strong>Service Type:</strong>
                              <span>{selectedService.name}</span>
                            </div>
                            <div className="detail-items">
                              <MdOutlineDateRange className="detail-icon" />
                              <strong>Date:</strong>
                              <span>{selectedService.date}</span>
                            </div>
                            <div className="detail-items">
                              <IoTimeOutline className="detail-icon" />
                              <strong>Time:</strong>
                              <span>{selectedService.time}</span>
                            </div>
                            <div className="detail-items">
                              <IoLocationOutline className="detail-icon" />
                              <strong>Clinical Room:</strong>
                              <span>{selectedService.roomNum}</span>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6}>
                        <Card className="mb-3">
                          <Card.Header>
                            <h5>Patient Information</h5>
                          </Card.Header>
                          <Card.Body>
                            <div className="detail-item">
                              <IoPersonOutline className="detail-icon" />
                              <strong>Patient Name:</strong>
                              <span>{selectedService.patient?.fullName}</span>
                            </div>
                            <div className="detail-item">
                              <MdOutlineFormatListNumbered className="detail-icon" />
                              <strong>Patient ID:</strong>
                              <span>{selectedService.patient?._id}</span>
                            </div>
                          </Card.Body>
                        </Card>
                        <Card>
                          <Card.Header>
                            <h5>Additional Notes</h5>
                          </Card.Header>
                          <Card.Body>
                            <p className="notes-text">
                              {selectedService.notes ||
                                "No additional notes provided."}
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <Form onSubmit={handleUpdateSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="update-form mb-3">
                          <Form.Label>Test Type</Form.Label>
                          <Form.Select
                            name="name"
                            value={updateService.name}
                            onChange={handleUpdateInputChange}
                            required
                          >
                            <option value="">Select a test</option>
                            <option value="Blood Test">Blood Test</option>
                            <option value="X-Ray">X-Ray</option>
                            <option value="MRI Scan">MRI Scan</option>
                            <option value="CT Scan">CT Scan</option>
                            <option value="Urine Test">Urine Test</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="update-form mb-3">
                          <Form.Label>Patient Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={patientFullName}
                            readOnly
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Date</Form.Label>
                          <Form.Control
                            type="date"
                            name="date"
                            value={updateService.date}
                            onChange={handleUpdateInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Time</Form.Label>
                          <Form.Control
                            type="time"
                            name="time"
                            value={updateService.time}
                            onChange={handleUpdateInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Clinical Room</Form.Label>
                          <Form.Control
                            type="text"
                            name="roomNum"
                            value={updateService.roomNum}
                            readOnly
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Notes</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="notes"
                            value={updateService.notes}
                            onChange={handleUpdateInputChange}
                            placeholder="Describe your current health condition"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                )}
              </>
            )}
          </div>
          {!isUpdating ? (
            <>
              <button
                className="update-close-button me-5"
                onClick={() => {
                  setShowServiceDetails(false);
                  setShowServices(true);
                }}
              >
                Close
              </button>
              <button
                className="click-update-button"
                onClick={handleStartUpdate}
              >
                Update Service
              </button>
            </>
          ) : (
            <>
              <button
                className="update-close-button me-5"
                onClick={handleCancelUpdate}
              >
                Cancel
              </button>
              <button className="update-button" onClick={handleUpdateSubmit}>
                Save Changes
              </button>
            </>
          )}
        </div>
      )}

      {/*New service Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Service</h3>
            <form onSubmit={handleFormSubmit} className="service-form">
              <div className="form-group">
                <label htmlFor="testType">Test Type</label>
                <select
                  id="testType"
                  name="name"
                  value={newService.name}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select a test
                  </option>
                  <option value="Blood Test">Blood Test</option>
                  <option value="X-Ray">X-Ray</option>
                  <option value="MRI Scan">MRI Scan</option>
                  <option value="CT Scan">CT Scan</option>
                  <option value="Urine Test">Urine Test</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="patientName">Patient Name</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={patientFullName}
                  readOnly
                  className="readonly-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newService.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={newService.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="patientNotes">Notes</label>
                <input
                  type="text"
                  id="notes"
                  name="notes"
                  placeholder="Describe your current health condition"
                  value={newService.notes}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="service-buttons">
                <button type="submit" className="service-submit-btn">
                  Add Service
                </button>
                <button
                  type="button"
                  className="service-cancel-btn"
                  onClick={handleCloseForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
