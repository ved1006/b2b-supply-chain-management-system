import React from "react";

function Dashboard() {
  return (
    <div className="page">
      <h2>Dashboard Overview</h2>
      <div className="stats">
        <div className="card">
          <h3>Total Products</h3>
          <p>45</p>
        </div>
        <div className="card">
          <h3>Total Orders</h3>
          <p>18</p>
        </div>
        <div className="card">
          <h3>Suppliers</h3>
          <p>7</p>
        </div>
      </div>
      <p className="info">
        Welcome to your B2B Supply Chain Management System.
        Use the navigation bar to manage suppliers, products, and track orders.
      </p>
    </div>
  );
}

export default Dashboard;
