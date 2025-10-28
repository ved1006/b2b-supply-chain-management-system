import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Suppliers.css"; // optional CSS styling file

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact_email: "",
    phone: "",
  });

  // ✅ Fetch suppliers from backend on mount
  useEffect(() => {
    fetchSuppliers();
  }, []);

  // 📦 Fetch all suppliers
  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/suppliers");
      setSuppliers(res.data);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
      alert("Failed to fetch suppliers!");
    }
  };

  // 💾 Handle input change
  const handleChange = (e) => {
    setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
  };

  // ➕ Add a new supplier
  const addSupplier = async (e) => {
    e.preventDefault();

    if (!newSupplier.name || !newSupplier.contact_email) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/add-supplier", newSupplier);
      alert("Supplier added successfully!");
      setNewSupplier({ name: "", contact_email: "", phone: "" });
      fetchSuppliers(); // refresh the table
    } catch (err) {
      console.error("Error adding supplier:", err);
      alert("Failed to add supplier!");
    }
  };

  return (
    <div className="page">
      <h2>Suppliers</h2>

      {/* 🧾 Add Supplier Form */}
      <form className="form" onSubmit={addSupplier}>
        <input
          type="text"
          name="name"
          placeholder="Supplier Name"
          value={newSupplier.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="contact_email"
          placeholder="Contact Email"
          value={newSupplier.contact_email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={newSupplier.phone}
          onChange={handleChange}
        />
        <button type="submit">Add Supplier</button>
      </form>

      {/* 📋 Supplier Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((s, i) => (
              <tr key={i}>
                <td>{s.name}</td>
                <td>{s.contact_email}</td>
                <td>{s.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No suppliers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Suppliers;
