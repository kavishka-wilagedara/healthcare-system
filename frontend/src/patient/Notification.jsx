import React, { useState, useEffect } from "react";
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

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRead, setFilterRead] = useState("all");

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
          read: true,
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
          read: true,
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

  // Apply filters by search term or filter options change
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
      filtered = filtered.filter(
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
  const handleDeleteNotification = (id) => {};

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
    if (date.toDateString() === now.toDateString()) {
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

  // Get unread count
  // const getUnreadCount = () => {
  //   return notifications.filter((notification) => !notification.read).length;
  // };

  const { getUnreadCount } = useNotification();

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
        ) : filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
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
                    {formatDate(notification.date)}
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
              {notifications.length > 0
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
