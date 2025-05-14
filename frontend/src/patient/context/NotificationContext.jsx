import React, { createContext, useState, useEffect, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const sampleNotifications = [
        {
          id: 1,
          appointmentNum: "App-001",
          type: "appointment",
          title: "Appointment Confirmed",
          message:
            "Your appointment with Dr. Sarah Williams has been confirmed for May 10, 2025 at 10:00 AM.",
          date: "2025-05-01",
          time: "9.00 AM",
          read: false,
          sender: "Appointment System",
        },
        {
          id: 2,
          appointmentNum: "App-001",
          type: "reminder",
          title: "Upcoming Appointment Reminder",
          message:
            "This is a reminder for your appointment with Dr. Michael Chen tomorrow at 2:30 PM.",
          date: "2025-05-04",
          time: "9.00 AM",
          read: false,
          sender: "Reminder System",
        },
        {
          id: 4,
          appointmentNum: "App-001",
          type: "lab",
          title: "Lab Results Available",
          message:
            "Your recent lab test results are now available. Please check your health portal or contact your doctor.",
          date: "2025-05-02",
          time: "9.00 AM",
          read: false,
          sender: "Laboratory Department",
        },

        {
          id: 6,
          appointmentNum: "App-002",
          type: "appointment",
          title: "Appointment Rescheduled",
          message:
            "Your appointment with Dr. Emily Rodriguez has been rescheduled to May 15, 2025 at 3:45 PM.",
          date: "2025-05-04",
          time: "9.00 AM",
          read: true,
          sender: "Appointment System",
        },
      ];

      setNotifications(sampleNotifications);
      setFilteredNotifications(sampleNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  const getUnreadCount = () => {
    return notifications.filter((notification) => !notification.read).length;
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
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
