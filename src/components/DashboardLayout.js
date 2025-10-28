import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function DashboardLayout() {
  return (
    <div>
      <Navbar />
      <div className="content">
        <Outlet /> {/* Sub-routes render here */}
      </div>
    </div>
  );
}

export default DashboardLayout;
