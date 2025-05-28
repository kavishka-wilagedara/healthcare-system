import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTimeForm from "./doctor/pages/AddTimeForm";
import Dashboard from "./doctor/pages/dashboard";
import Appointments from "./doctor/pages/Appoinments";
import ScheduledAppointments from "./doctor/pages/ScheduledAppointments";
import AppointmentHistory from "./doctor/pages/AppointmentHistory";
import AppointmentDetailsPage from "./doctor/pages/AppointmentDetailsPage";
import ViewAppointmentDetailsPage from "./doctor/pages/ViewAppointmentDetailsPage";
import DocNavbar from "./doctor/components/DocNavbar";
// Patient
import PatientDashboard from "./patient/PatientDashboard";
import Homepage from "./patient/Homepage";
import Channeling from "./patient/Channeling";
import Services from "./patient/Services";
import Notification from "./patient/Notification";
import Profile from "./patient/Profile";
import MyHistory from "./patient/MyHistory";

//common
import Register from "./common/Register";
import Login from "./common/Login";
import DoctorRegister from "./common/DoctorRegister";
import { NotificationProvider } from "./patient/context/NotificationContext";
import Doctors from "./patient/Doctors";
import { UserProvider } from "./common/UserContext";
import DoctorProfile from "./doctor/pages/DoctorProfile";
import AdminDashboard from "./admin/AdminDashboard";
import PatientDetailsPage from "./admin/components/PatientDetailsModal";

const Layout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname.startsWith("/doc");

  return (
    <>
      {showNavbar && <DocNavbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<DoctorRegister />} />
            <Route path="/patient-register" element={<Register />} />
            <Route path="/doc-home" element={<Dashboard />} />
            <Route path="/doc-dashboard" element={<Dashboard />} />
            <Route path="/doc-patient-profile/:id" element={<Profile />} />
            <Route path="/doc-add-time" element={<AddTimeForm />} />
            <Route path="/doc-appointments" element={<Appointments />} />
            <Route path="/doc-profile" element={<DoctorProfile />} />
            <Route
              path="/doc-scheduledAppointments"
              element={<ScheduledAppointments />}
            />
            <Route
              path="/doc-appointmentHistory"
              element={<AppointmentHistory />}
            />
            <Route
              path="/doc-appointment/:id"
              element={<AppointmentDetailsPage />}
            />
            <Route
              path="/doc-appointment-details/:id"
              element={<ViewAppointmentDetailsPage />}
            />

            {/* Patient Routes */}
            <Route
              path="/patient/dashboard"
              element={
                <NotificationProvider>
                  <PatientDashboard />
                </NotificationProvider>
              }
            >
              <Route index element={<Homepage />} />
              <Route path="channeling" element={<Channeling />} />
              <Route path="clinical-services" element={<Services />} />
              <Route path="my-history" element={<MyHistory />} />
              <Route path="notification" element={<Notification />} />
              <Route path="profile" element={<Profile />} />
              <Route path="view-all-doctors" element={<Doctors />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
            <Route path="/admin/patient/:id" element={<PatientDetailsPage />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;
