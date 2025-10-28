import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Orders.css"; // optional but recommended for clean UI

function Orders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    product_id: "",
    supplier_id: "",
    quantity: "",
    total_price: "",
  });

  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // ✅ Fetch all data on component load
  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
    fetchOrders();
  }, []);

  // 📦 Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      alert("Failed to fetch products.");
    }
  };

  // 🚚 Fetch all suppliers
  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/suppliers");
      setSuppliers(res.data);
    } catch (err) {
      console.error("❌ Error fetching suppliers:", err);
      alert("Failed to fetch suppliers.");
    }
  };

  // 🧾 Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
      alert("Failed to fetch orders.");
    }
  };

  // 💾 Handle input change
  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  // ➕ Add a new order
  const addOrder = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!newOrder.product_id || !newOrder.supplier_id || !newOrder.quantity || !newOrder.total_price) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/add-order", newOrder);
      alert("✅ Order added successfully!");
      setNewOrder({
        product_id: "",
        supplier_id: "",
        quantity: "",
        total_price: "",
      });
      fetchOrders(); // refresh the table
    } catch (err) {
      console.error("❌ Error adding order:", err);
      alert("Failed to add order. Check backend logs.");
    }
  };

  return (
    <div className="page">
      <h2>📦 Orders</h2>

      {/* Add Order Form */}
      <form className="form" onSubmit={addOrder}>
        {/* Product Dropdown */}
        <select
          name="product_id"
          value={newOrder.product_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Supplier Dropdown */}
        <select
          name="supplier_id"
          value={newOrder.supplier_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Supplier</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Quantity */}
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newOrder.quantity}
          onChange={handleChange}
          required
        />

        {/* Total Price */}
        <input
          type="number"
          name="total_price"
          placeholder="Total Price (₹)"
          value={newOrder.total_price}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Order</button>
      </form>

      {/* Orders Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Total Price (₹)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((o, i) => (
              <tr key={i}>
                <td>{o.product_name}</td>
                <td>{o.supplier_name}</td>
                <td>{o.quantity}</td>
                <td>{o.total_price}</td>
                <td>{new Date(o.order_date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No orders yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
