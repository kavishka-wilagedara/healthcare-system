import React, { useState, useEffect ,useContext} from "react";
import {
  FaBell,
  FaCalendarCheck,
  FaFileMedical,
  FaCheck,
  FaSearch,
  FaFilter,
  FaTrash,
  FaCheckDouble,
  FaRegClock,
} from "react-icons/fa";
import "./Notification.css";
import { useNotification } from "./context/NotificationContext";
import axios from 'axios';
import { UserContext } from "../common/UserContext";


function Notification(props) {
  // const [notifications, setNotifications] = useState([]);
  // const [filteredNotifications, setFilteredNotifications] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRead, setFilterRead] = useState("all");
  const {user} = useContext(UserContext);
  const [data, setData] = useState([]);
  const [notifyData, setNotifyData] = useState([]);

  const {
    notifications,
    getUnreadCount,
    setNotifications,
    loading,
    filteredNotifications,
    setFilteredNotifications,
  } = useNotification();

    //get all doctor available times
  const fetchAppointments = async () => {
    //user id
    const userId = user?.patient.patientId

    try {
      const response = await axios.get('http://localhost:5000/api/appointments/');  

      const filterData = response?.data?.data?.filter(item => item.patient._id === userId && item.booked === "confirmed");
      
      setData(filterData);
      
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };
  
  const notifyUser = () =>{
    const today = new Date().toISOString().split('T')[0];
    const filterDate = data?.filter(item => item.appointment.date === today);
    setNotifyData(filterDate);

    const newNotifs = filterDate?.map(item => ({
    id: `appt-${item._id}`,                       // unique id
    appointmentNum: item.appointment.appointmentNum,
    type: 'reminder',                            // or whatever
    title: 'Appointment Today',
    message: `You have an appointment with Dr. ${item.appointment.doctorName} at ${item.appointment.date}.`,
    date: item.appointment.date,
    time: item.appointment.inTime,
    read: false,
    sender: 'Appointment System'
  }));

  setNotifications(newNotifs)
  }

  // Apply filters by search term or filter options change
  useEffect(() => {
    fetchAppointments();
    notifyUser();
  }, []);

  useEffect(() => {
    notifyUser();
  }, [data]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterType, filterRead, notifications]);


  // Filter notifications based on search term and filter options
  const applyFilters = () => {
    let filtered = [...notifications];

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter(
        (notification) => notification.type === filterType
      );
    }

    // Filter by read status
    if (filterRead !== "all") {
      const isRead = filterRead === "read";
      filtered = filtered.filter(
        (notification) => notification.read === isRead
      );
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered?.filter(
        (notification) =>
          notification.appointmentNum.toLowerCase().includes(term) ||
          notification.title.toLowerCase().includes(term) ||
          notification.message.toLowerCase().includes(term) ||
          notification.sender.toLowerCase().includes(term)
      );
    }

    // Sort by date (newest dates first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredNotifications(filtered);
  };

  // Mark notification as read
  const markAsRead = (id) => {};

  // Delete notification
  const handleDeleteNotification = (id) => {
      setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
    setFilteredNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {};

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment":
        return <FaCalendarCheck />;
      case "lab":
        return <FaFileMedical />;
      case "reminder":
        return <FaRegClock />;
      default:
        return <FaBell />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    // Today
    if (date?.toDateString() === now.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    // Yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    // Within the last week
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    if (date > oneWeekAgo) {
      const options = { weekday: "long" };
      return `${date.toLocaleDateString(
        [],
        options
      )} at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    // Older dates
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString([], options);
  };

  console.log(notifyData,"fill")
  console.log(notifications,"filled")
  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="notifications-title">
          <h1>
            Notifications
            {getUnreadCount() > 0 && (
              <span className="notification-badge">{getUnreadCount()}</span>
            )}
          </h1>
          <p className="notifications-subtitle">
            Stay updated with your medical appointments, lab results, and
            important messages
          </p>
        </div>

        <div className="notifications-actions">
          <button
            className="notification-action-btn"
            onClick={markAllAsRead}
            title="Mark all as read"
          >
            <FaCheckDouble />
            <span>Mark all read</span>
          </button>
          <button
            className="notification-action-btn danger"
            onClick={clearAllNotifications}
            title="Clear all notifications"
          >
            <FaTrash />
            <span>Clear all</span>
          </button>
        </div>
      </div>

      <div className="notifications-filters">
        <div className="notification-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <div className="notification-filter">
            <FaFilter className="filter-icon" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="appointment">Channeling</option>
              <option value="lab">Lab Results</option>
              <option value="reminder">Reminders</option>
            </select>
          </div>

          <div className="notification-filter">
            <FaCheck className="filter-icon" />
            <select
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </div>

      <div className="notifications-list">
        {loading ? (
          <div className="loading-notifications">
            <div className="loading-spinner"></div>
            <p>Loading notifications...</p>
          </div>
        ) : filteredNotifications?.length > 0 ? (
          filteredNotifications?.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                notification.read ? "read" : "unread"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>

              <div className="notification-content">
                <div className="notification-header">
                  <h4 className="notification-title">{notification.title}</h4>
                  <span className="notification-time">
                    {notification.date}
                  </span>
                </div>

                <p className="notification-message">{notification.message}</p>

                <div className="notification-footer">
                  <span className="notification-sender">
                    {notification.sender}
                  </span>
                </div>
              </div>

              <button
                className="notification-delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNotification(notification.id);
                }}
                title="Delete notification"
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <div className="empty-notifications">
            <div className="empty-icon">
              <FaBell />
            </div>
            <h4>No notifications found</h4>
            <p>
              {notifications?.length > 0
                ? "Try changing your search or filter settings"
                : "You don't have any notifications at the moment"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;
