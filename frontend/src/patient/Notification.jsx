import { FaBell } from "react-icons/fa";
import "./Notification.css";

function Notification() {
  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="notifications-title">
          <h2>
            <FaBell className="notification-title-icon" />
            Notifications
          </h2>
          <p className="notifications-subtitle">
            Stay updated with your medical appointments, lab results, and
            important messages
          </p>
        </div>
      </div>
    </div>
  );
}

export default Notification;
