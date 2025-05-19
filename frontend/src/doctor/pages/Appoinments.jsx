import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../common/UserContext";

const Appointments = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);

  const doctorId = user?.doctor?.id;

  //get all apppoinments times
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments/"
      );
      // filter by doctorId
      setData((preData) =>
        response.data.data.filter(
          (appointment) => appointment.appointment?.doctorId === doctorId
        )
      );
      console.log(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (appointmentId, newStatus) => {
    try {
      if (newStatus === "confirmed") {
        const response = await axios.put(
          `http://localhost:5000/api/appointments/${appointmentId}`,
          { booked: "confirmed" }
        );
      } else {
        const response = await axios.put(
          `http://localhost:5000/api/appointments/${appointmentId}`,
          { booked: "cancelled" }
        );
      }
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }

    fetchAppointments();
  };

  return (
    <div className="container py-5">
      <h3 className="display-6 fw-bold text-primary mb-4">
        Pending Appointments
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment._id}</td>
                    <td>{appointment.patient.fullName}</td>
                    <td>{appointment.appointment.date}</td>
                    <td>{appointment.patient.mobileNumber}</td>
                    <td>{appointment.patient.email}</td>
                    <td>
                      {appointment.booked === "confirmed" ? (
                        <span className="text-success fw-bold">Confirmed</span>
                      ) : appointment.booked === "cancelled" ? (
                        <span className="text-danger fw-bold">Cancelled</span>
                      ) : (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2 healthcare-btn-success"
                            onClick={() =>
                              updateStatus(appointment._id, "confirmed")
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger btn-sm healthcare-btn-danger"
                            onClick={() =>
                              updateStatus(appointment._id, "cancelled")
                            }
                          >
                            Reject
                          </button>
                        </>
                      )}
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
        .healthcare-btn-danger {
          transition: all 0.3s ease;
        }
        .healthcare-btn-danger:hover {
          background-color: #c82333;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default Appointments;
