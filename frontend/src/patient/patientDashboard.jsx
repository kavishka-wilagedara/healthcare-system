import React from "react";
import PatientSidebar from "./PatientSidebar";
import { Outlet } from "react-router-dom";

const PatientDashboard = () => {
  return (
    <div>
      <PatientSidebar />
      <div className="flex-grow-1 p-4" style={{ marginLeft: "250px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default PatientDashboard;
