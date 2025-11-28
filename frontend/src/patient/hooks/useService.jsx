import axios from "axios";

export const fetchServicesByUserId = async (userId) => {
  const backendUrl=process.env.REACT_APP_BACKEND_URL;

  try {
    const response = await axios.get(`${backendUrl}/services/`);
    const allServices = response.data.data;
    return allServices.filter((service) => service?.patient?._id === userId);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};
