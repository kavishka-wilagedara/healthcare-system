import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../common/UserContext";

const ScheduledAppointments = () => {
  const { user } = useContext(UserContext);
  const [pendingDoctorAppointments, setPendingDoctorAppointments] = useState(
    []
  );

  const doctorId = user?.doctor?.id;

  const getAllAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments/"
      );

      setPendingDoctorAppointments((preData) =>
        response.data.data.filter(
          (appointment) =>
            appointment?.appointment?.doctorId === doctorId &&
            appointment?.booked === "confirmed"
        )
      );
      console.log(pendingDoctorAppointments);
    } catch (error) {
      console.log("Error fetching appointments", error);
      setPendingDoctorAppointments([]);
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  // const updateStatus = (appointmentId, newStatus) => {
  //   const updatedAppointments = pendingDoctorAppointments.map((appointment) =>
  //     appointment._id === appointmentId
  //       ? { ...appointment, completed: newStatus }
  //       : appointment
  //   );
  //   Swal.fire({
  //     position: "center",
  //     icon: "success",
  //     title: "Appointment Successfully Completed!",
  //     showConfirmButton: false,
  //     background: "#f8f9fa",
  //   });
  //   setPendingDoctorAppointments(updatedAppointments);
  // };

  return (
    <div className="container py-5">
      <h3 className="display-6 fw-bold text-primary mb-4">
        Scheduled Appointments
      </h3>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>Appointment ID</th>
                  <th>Patient Name</th>
                  <th>Day</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>NIC</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingDoctorAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment._id}</td>
                    <td>{appointment.patient?.fullName}</td>
                    <td>{appointment.appointment?.date}</td>
                    <td>{appointment.patient?.mobileNumber}</td>
                    <td>{appointment.patient?.email}</td>
                    <td>{appointment.patient?.nic}</td>
                    <td>
                      {/* <button
                        className="btn btn-success btn-sm me-2 healthcare-btn-success"
                        onClick={() => updateStatus(appointment._id, true)}
                      >
                        Complete
                      </button> */}
                      <Link to={`/doc-appointment-details/${appointment._id}`}>
                        <button className="btn btn-info btn-sm healthcare-btn-info">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .card {
          border: none;
          border-radius: 10px;
          background-color: #f8f9fa;
        }
        .table-primary {
          background-color: #e6f0fa;
        }
        .healthcare-btn-success {
          transition: all 0.3s ease;
        }
        .healthcare-btn-success:hover {
          background-color: #28a745;
          transform: translateY(-2px);
        }
        .healthcare-btn-info {
          margin-left: 20px;
          transition: all 0.3s ease;
        }
        .healthcare-btn-info:hover {
          background-color: #138496;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default ScheduledAppointments;
