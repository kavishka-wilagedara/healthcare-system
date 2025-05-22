import React, { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial load - this will ensure notifications are loaded when the context is initialized
  useEffect(() => {
    // Get user from localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user?.patient?.patientId) {
          fetchUserNotifications(user.patient.patientId);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  const fetchUserNotifications = async (userId) => {
    try {
      setLoading(true);
      // Fetch appointments for the user
      const response = await axios.get('http://localhost:5000/api/appointments/');
      
      const today = new Date().toISOString().split('T')[0];
      const filterData = response?.data?.data?.filter(
        item => item.patient._id === userId && 
        item.booked === "confirmed" && 
        item.appointment?.date === today
      );

      // Convert appointments to notifications
      const newNotifs = filterData?.map(item => ({
        id: `appt-${item?._id}`,
        appointmentNum: item?.appointment?.appointmentNum,
        type: 'reminder',
        title: 'Appointment Today',
        message: `You have an appointment with Dr. ${item?.appointment?.doctorName} at ${item?.appointment?.date}.`,
        date: item?.appointment?.date,
        time: item?.appointment?.inTime,
        read: false,
        sender: 'Appointment System'
      }));

      setNotifications(newNotifs || []);
      setFilteredNotifications(newNotifs || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUnreadCount = () => {
    return filteredNotifications?.filter((notification) => !notification.read).length;
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        getUnreadCount,
        setNotifications,
        loading,
        setLoading,
        filteredNotifications,
        setFilteredNotifications,
        fetchUserNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
