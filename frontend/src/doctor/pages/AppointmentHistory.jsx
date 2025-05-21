import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import appointmentsData from '../data/appointments.json';
import axios from 'axios';
import { UserContext } from "../../common/UserContext";

const AppointmentHistory = () => {
  const {user} = useContext(UserContext);
  const [data,setData] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);

  

  const getAllAppointments = async () => {

    const doctor = user?.doctor?.id

    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments/"
      );

      setPendingAppointments((preData) =>
        response.data.data.filter(
          (appointment) =>
            appointment?.appointment?.doctorId == doctor && appointment?.completed === true
        )
      );
      
    } catch (error) {
      console.log("Error fetching appointments", error);
      setPendingAppointments([]);
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  console.log(pendingAppointments,"ppppppppppp");

  // useEffect(() => {
  //   const filteredAppointments = appointmentsData.filter(
  //     appointment => appointment.status === 'completed'
  //   );
  //   setPendingAppointments(filteredAppointments);
  // }, []);

  const updateStatus = (appointment_ID, newStatus) => {
    const updatedAppointments = pendingAppointments?.map(appointment =>
      appointment.appointment_ID === appointment_ID
        ? { ...appointment, status: newStatus }
        : appointment
    );
    setPendingAppointments(updatedAppointments);
  };

  return (
    <div className="container py-5">
      <h3 className="display-6 fw-bold text-primary mb-4">Channeled History</h3>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>Appointment ID</th>
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>NIC</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingAppointments.map((appointment) => (
                  <tr key={appointment?._id}>
                    <td>{appointment?._id}</td>
                    <td>{appointment?.patient?.fullName}</td>
                    <td>{appointment?.appointment?.date}</td>
                    <td>{appointment?.patient?.mobileNumber}</td>
                    <td>{appointment?.patient?.email}</td>
                    <td>{appointment?.patient?.nic}</td>
                    <td>
                      <Link to={`/doc-appointment/${appointment?._id}`}>
                        <button className="btn btn-info btn-sm healthcare-btn-info">View</button>
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
        .healthcare-btn-info {
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

export default AppointmentHistory;