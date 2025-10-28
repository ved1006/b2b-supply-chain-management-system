const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "abc123",
  database: "b2b_chain",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database (b2b_chain)");
  }
});


// ===============================
// 🔐 AUTH ROUTES (Signup & Login)
// ===============================

// 📝 Signup route
app.post("/signup", async (req, res) => {
  const { full_name, email, password } = req.body;
  if (!full_name || !email || !password)
    return res.status(400).json({ message: "All fields are required!" });

  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length > 0)
      return res.status(400).json({ message: "User already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery =
      "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";
    db.query(insertQuery, [full_name, email, hashedPassword], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json({ message: "User registered successfully!" });
    });
  });
});

// 🔐 Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "User not found!" });

    const user = result[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid credentials!" });

    res.status(200).json({ message: "Login successful!", user });
  });
});


// ===============================
// 🛒 PRODUCTS ROUTES
// ===============================

// ➕ Add new product
app.post("/add-product", (req, res) => {
  const { name, category, price, stock } = req.body;
  const query = "INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)";
  db.query(query, [name, category, price, stock], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: "Product added successfully!" });
  });
});

// 📄 Get all products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(result);
  });
});


// ===============================
// 🧾 SUPPLIERS ROUTES
// ===============================

// ➕ Add supplier
app.post("/add-supplier", (req, res) => {
  const { name, contact_email, phone } = req.body;
  const query = "INSERT INTO suppliers (name, contact_email, phone) VALUES (?, ?, ?)";
  db.query(query, [name, contact_email, phone], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: "Supplier added successfully!" });
  });
});

// 📄 Get all suppliers
app.get("/suppliers", (req, res) => {
  db.query("SELECT * FROM suppliers", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(result);
  });
});


// ===============================
// 📦 ORDERS ROUTES
// ===============================

// ➕ Add order
app.post("/add-order", (req, res) => {
  const { product_id, supplier_id, quantity, total_price } = req.body;
  const query = "INSERT INTO orders (product_id, supplier_id, quantity, total_price) VALUES (?, ?, ?, ?)";
  db.query(query, [product_id, supplier_id, quantity, total_price], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: "Order added successfully!" });
  });
});

// 📄 Get all orders (with product & supplier names)
app.get("/orders", (req, res) => {
  const query = `
    SELECT 
      o.id, 
      p.name AS product_name, 
      s.name AS supplier_name, 
      o.quantity, 
      o.total_price, 
      o.order_date
    FROM orders o
    JOIN products p ON o.product_id = p.id
    JOIN suppliers s ON o.supplier_id = s.id
    ORDER BY o.order_date DESC;
  `;
  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(result);
  });
});


// 🚀 Start server (on port 5000)
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
