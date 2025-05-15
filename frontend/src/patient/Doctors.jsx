import React from "react";
import "./Doctors.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import doctorImg from "../assets/images/doctor-image.jpg";

const Doctors = () => {
  const navigate = useNavigate();
  const doctors = [
    {
      id: "1",
      name: "Dr. Kavindra Perera",
      speciality: "Cardiologist",
      availableDate: "2025-05-18",
      availableTime: "09:00 - 12:00",
      imgUrl:
        "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "2",
      name: "Dr. Nadeesha Fernando",
      speciality: "Dermatologist",
      availableDate: "2025-05-19",
      availableTime: "13:00 - 16:00",
      imgUrl:
        "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "3",
      name: "Dr. Ruwan Jayasuriya",
      speciality: "Orthopedic Surgeon",
      availableDate: "2025-05-20",
      availableTime: "10:00 - 14:00",
      imgUrl:
        "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "4",
      name: "Dr. Maleesha Wijeratne",
      speciality: "Pediatrician",
      availableDate: "2025-05-21",
      availableTime: "08:00 - 11:30",
      imgUrl:
        "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "5",
      name: "Dr. Hashan Karunaratne",
      speciality: "Neurologist",
      availableDate: "2025-05-22",
      availableTime: "14:00 - 17:00",
      imgUrl: "",
    },
  ];

  const handleBooking = (doctor) => {
    Swal.fire({
      icon: "question",
      title: "Booking Confirmation",
      text: `Are you sure you want to book an appointment with ${doctor.name}?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "booking-swal-popup",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Show success message after confirmation
        Swal.fire({
          icon: "success",
          title: "Booking Successful!",
          text: `You have successfully booked an appointment with ${doctor.name} on ${doctor.availableDate} at ${doctor.availableTime}`,
          customClass: {
            popup: "booking-swal-popup",
          },
          showConfirmButton: true,
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/patient/dashboard/view-all-doctors");
        });
      }
    });
  };

  return (
    <div className="doctors-page">
      <div className="view-doctors-section">
        <h3 className="section-title text-center mb-5">Our Specialists</h3>
        {doctors.length > 0 ? (
          <div className="doctors-container">
            {doctors.map((doctor) => (
              <div className="doctor-card" key={doctor.id}>
                <div className="doctor-header">
                  {doctor.imgUrl ? (
                    <img
                      className="doctor-image"
                      src={doctor.imgUrl}
                      alt="doctor-name"
                    />
                  ) : (
                    <img
                      className="doctor-image"
                      src={doctorImg}
                      alt="doctor-name"
                    />
                  )}
                </div>

                <div className="doctor-details">
                  <h4>{doctor.name}</h4>
                  <p className="doctor-specialty">{doctor.speciality}</p>
                </div>

                <div className="doctor-availability">
                  <span className="available-date">{doctor.availableDate}</span>
                  <span className="available-time">{doctor.availableTime}</span>
                </div>

                <div className="booking-buttons">
                  <button
                    className="booking-button"
                    onClick={() => handleBooking(doctor)}
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h4>No Doctors Found</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
