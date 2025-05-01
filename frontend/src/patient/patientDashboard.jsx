import React from "react";
import PatientNavbar from "./PatientNavbar";
import { Outlet } from "react-router-dom";

const PatientDashboard = () => {
  return (
    <div>
      <PatientNavbar />
      <Outlet />
    </div>
  );
};

export default PatientDashboard;
