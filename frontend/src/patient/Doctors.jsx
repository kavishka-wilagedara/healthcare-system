import React, { useEffect, useState ,useContext} from "react";
import "./Doctors.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import doctorImg from "../assets/images/doctor-image.jpg";
import axios from 'axios';
import { UserContext } from "../common/UserContext";

const Doctors = () => {
  const navigate = useNavigate();
  const {user , setUser} = useContext(UserContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);


  //get all doctor available times
  const fetchDocAvailableTimes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctor/time/all');  
      setData(response.data);
      // setFilteredData(response.data.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };
  
  useEffect(() => {
      fetchDocAvailableTimes();
    }, []);
  

    console.log(data,"date")
  const handleBooking = (doctor) => {
    Swal.fire({
      icon: "question",
      title: "Booking Confirmation",
      text: `Are you sure you want to book an appointment with ${doctor.doctorName}?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "booking-swal-popup",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
          const userId = user.patient.patientId;
    try {
      const requestBody = {
        "appointment": doctor._id, 
        "booked": "pending",
        "completed": false,
        "medicine": "",
        "advice": ""
      };
      const response = await axios.post(
        `http://localhost:5000/api/appointments/${userId}`,
        requestBody
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

        // Show success message after confirmation
        Swal.fire({
          icon: "success",
          title: "Booking Successful!",
          text: `You have successfully booked an appointment with ${doctor.doctorName} on ${doctor.day} at ${doctor.inTime}`,
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
        {data?.length > 0 ? (
          <div className="doctors-container">
            {data?.map((doctor) => (
              <div className="doctor-card" key={doctor._id}>
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
                  <h4>{doctor.doctorName}</h4>
                  <p className="doctor-specialty">{doctor.specialization}</p>
                </div>

                <div className="doctor-availability">
                  <span className="available-date">{doctor.date}</span>
                  <span className="available-time">{doctor.inTime} - {doctor.outTime} </span>
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
