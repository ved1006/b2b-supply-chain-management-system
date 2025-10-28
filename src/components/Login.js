import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  // Store email and password entered by user
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Update values as user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST request to your Node.js backend
      const res = await axios.post("http://localhost:5000/login", formData);

      if (res.status === 200) {
        alert("Login successful!");
        navigate("/dashboard"); // Go to dashboard
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed! Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn login-btn">
            Login
          </button>
        </form>
        <p>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")} className="link">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
