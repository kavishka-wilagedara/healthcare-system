import React, { useEffect, useState, useContext } from "react";
import "./Doctors.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import doctorImg from "../assets/images/doctor-image.jpg";
import axios from "axios";
import { UserContext } from "../common/UserContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState({});

  // Get all doctor available times
  const fetchDocAvailableTimes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/doctor/time/all"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching doctor times:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load doctor availability. Please try again.",
      });
    }
  };

  useEffect(() => {
    fetchDocAvailableTimes();
  }, []);

  const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const isTimeWithinSlot = (patientTime, doctorInTime, doctorOutTime) => {
    const patientMinutes = timeToMinutes(patientTime);
    const inTimeMinutes = timeToMinutes(doctorInTime);
    const outTimeMinutes = timeToMinutes(doctorOutTime);

    return patientMinutes >= inTimeMinutes && patientMinutes <= outTimeMinutes;
  };

  const handleTimeChange = (doctorId, time) => {
    setSelectedTimes((prev) => ({
      ...prev,
      [doctorId]: time,
    }));
  };

  const validateTime = (doctor, selectedTime) => {
    if (!selectedTime) {
      return { isValid: false, message: "Please select a preferred time" };
    }

    const isValid = isTimeWithinSlot(
      selectedTime,
      doctor.inTime,
      doctor.outTime
    );

    if (!isValid) {
      return {
        isValid: false,
        message: `Selected time must be between ${doctor.inTime} and ${doctor.outTime}`,
      };
    }

    return { isValid: true, message: "Time slot is available" };
  };

  const handleBooking = async (doctor) => {
    const selectedTime = selectedTimes[doctor._id];
    const timeValidation = validateTime(doctor, selectedTime);

    if (!timeValidation.isValid) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Time Selection",
        text: timeValidation.message,
      });
      return;
    }

    Swal.fire({
      icon: "question",
      title: "Booking Confirmation",
      html: `
        <div>
          <p>Are you sure you want to book an appointment with <strong>Dr. ${doctor.doctorName}</strong>?</p>
          <p><strong>Date:</strong> ${doctor.date}</p>
          <p><strong>Your preferred time:</strong> ${selectedTime}</p>
          <p><strong>Doctor's available hours:</strong> ${doctor.inTime} - ${doctor.outTime}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const userId = user.patient.patientId;

        try {
          const requestBody = {
            appointment: doctor._id,
            patientTime: selectedTime,
            booked: "pending",
            completed: false,
            medicine: "",
            advice: "",
          };

          const response = await axios.post(
            `http://localhost:5000/api/appointments/${userId}`,
            requestBody
          );

          Swal.fire({
            icon: "success",
            title: "Booking Successful!",
            html: `
              <div>
                <p>You have successfully booked an appointment with <strong>Dr. ${doctor?.doctorName}</strong></p>
                <p><strong>Date:</strong> ${doctor?.date}</p>
                <p><strong>Your appointment time:</strong> ${selectedTime}</p>
                <p><strong>Status:</strong> Pending confirmation</p>
              </div>
            `,
          }).then(() => {
            setSelectedTimes((prev) => ({
              ...prev,
              [doctor._id]: "",
            }));
          });
        } catch (error) {
          console.error("Booking error:", error);
          Swal.fire({
            icon: "error",
            title: "Booking Failed",
            text: error.response?.data?.message || "Something went wrong. Please try again.",
          });
        }
      }
    });
  };

  const generateTimeOptions = (inTime, outTime) => {
    const options = [];
    const startMinutes = timeToMinutes(inTime);
    const endMinutes = timeToMinutes(outTime);

    for (let minutes = startMinutes; minutes <= endMinutes; minutes += 30) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const timeStr = `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
      options.push(timeStr);
    }

    return options;
  };

  return (
    <div className="doctors-page">
      <div className="view-doctors-section">
        <h3 className="section-title text-center mb-5">Our Specialists</h3>
        {data?.length > 0 ? (
          <div className="doctors-container">
            {data?.map((doctor) => {
              const selectedTime = selectedTimes[doctor._id] || "";
              const timeValidation = selectedTime ? validateTime(doctor, selectedTime) : null;

              return (
                <div className="doctor-card" key={doctor?._id}>
                  <div className="doctor-header">
                    {doctor?.imgUrl ? (
                      <img
                        className="doctor-image"
                        src={doctor?.imgUrl}
                        alt={`Dr. ${doctor?.doctorName}`}
                      />
                    ) : (
                      <img
                        className="doctor-image"
                        src={doctorImg}
                        alt={`Dr. ${doctor?.doctorName}`}
                      />
                    )}
                  </div>

                  <div className="doctor-details">
                    <h4>Dr. {doctor?.doctorName}</h4>
                    <p className="doctor-specialty">{doctor?.specialization}</p>
                  </div>

                  <div className="doctor-availability">
                    <span className="available-date">📅 {doctor?.date}</span>
                    <span className="available-time">
                      🕒 {doctor?.inTime} - {doctor?.outTime}
                    </span>
                  </div>

                  <div className="time-selection">
                    <label htmlFor={`time-${doctor._id}`} className="time-label">
                      Select your preferred time:
                    </label>
                    <select
                      id={`time-${doctor._id}`}
                      className="time-select"
                      value={selectedTime}
                      onChange={(e) => handleTimeChange(doctor._id, e.target.value)}
                    >
                      <option value="">Select time</option>
                      {generateTimeOptions(doctor.inTime, doctor.outTime).map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>

                    {timeValidation && (
                      <div className={`time-validation ${timeValidation.isValid ? "valid" : "invalid"}`}>
                        {timeValidation.message}
                      </div>
                    )}
                  </div>

                  <div className="booking-buttons">
                    <button
                      className={`booking-button ${!selectedTime || timeValidation?.isValid === false ? "disabled" : ""}`}
                      onClick={() => handleBooking(doctor)}
                      disabled={!selectedTime || timeValidation?.isValid === false}
                    >
                      {!selectedTime ? "Select Time to Book" : "Book Appointment"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <h4>No Doctors Available</h4>
            <p>Please check back later for available appointments.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;