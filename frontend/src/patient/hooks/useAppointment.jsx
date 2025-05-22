import axios from "axios";

export const fetchAppointmentsByUserId = async (userId) => {
  try {
    const response = await axios.get("http://localhost:5000/api/appointments/");
    const allAppointments = response.data.data;
    return allAppointments.filter((app) => app?.patient?._id === userId);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};
