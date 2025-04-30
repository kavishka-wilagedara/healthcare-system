import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTimeForm from "./doctor/pages/AddTimeForm";
import Dashboard from "./doctor/pages/dashboard";
import Appointments from "./doctor/pages/Appoinments";
import ScheduledAppointments from "./doctor/pages/ScheduledAppointments";
import AppointmentHistory from "./doctor/pages/AppointmentHistory";
import AppointmentDetailsPage from "./doctor/pages/AppointmentDetailsPage";
import ViewAppointmentDetailsPage from "./doctor/pages/ViewAppointmentDetailsPage";
import DocNavbar from "./doctor/components/DocNavbar";


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
    <Router>
      <Layout>
        <Routes>
           <Route path="/doc-home" element={<Dashboard />} />
          <Route path="/doc-dashboard" element={<Dashboard />} />
          <Route path="/doc-add-time" element={<AddTimeForm />} />
          <Route path="/doc-appointments" element={<Appointments />} />
          <Route path="/doc-scheduledAppointments" element={<ScheduledAppointments />} />
          <Route path="/doc-appointmentHistory" element={<AppointmentHistory />} />
          <Route path="/doc-appointment/:id" element={<AppointmentDetailsPage />} />
          <Route path="/doc-appointment-details/:id" element={<ViewAppointmentDetailsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
