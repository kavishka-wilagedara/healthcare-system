import React, { createContext, useState, useEffect, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
     

      setNotifications(notifications);
      setFilteredNotifications(notifications);
      setLoading(false);
    }, 1000);
  }, []);

  console.log(filteredNotifications,"notifications")
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
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
