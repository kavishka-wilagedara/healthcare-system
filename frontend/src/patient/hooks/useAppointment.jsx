import axios from "axios";

export const fetchAppointmentsByUserId = async (userId) => {
  const backendUrl=process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await axios.get(`${backendUrl}/appointments/`);
    const allAppointments = response.data.data;
    return allAppointments.filter((app) => app?.patient?._id === userId);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};
