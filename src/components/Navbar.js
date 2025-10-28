import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate("/dashboard")}>
        <h1 className="navbar-logo">
          B2B<span>Chain</span>
        </h1>
      </div>

      <ul className="navbar-links">
        <li>
          <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? "active" : "")}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/products" className={({ isActive }) => (isActive ? "active" : "")}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/orders" className={({ isActive }) => (isActive ? "active" : "")}>
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/suppliers" className={({ isActive }) => (isActive ? "active" : "")}>
            Suppliers
          </NavLink>
        </li>
      </ul>

      <div className="navbar-right">
        <button className="nav-btn" onClick={() => navigate("/login")}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
