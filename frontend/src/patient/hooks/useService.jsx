import axios from "axios";

export const fetchServicesByUserId = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/services/`);
    const allServices = response.data.data;
    return allServices.filter((service) => service?.patient?._id === userId);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};
