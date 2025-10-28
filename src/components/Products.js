import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css"; // optional if you have styling

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  // ✅ Fetch all products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("Failed to load products.");
    }
  };

  // ✅ Load products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // ✅ Add product to DB
  const addProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.category) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/add-product", newProduct);
      alert("Product added successfully!");
      setNewProduct({ name: "", category: "", price: "", stock: "" });
      fetchProducts(); // refresh table
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Error adding product!");
    }
  };

  return (
    <div className="page">
      <h2>📦 Products</h2>

      <form className="form" onSubmit={addProduct}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price (₹)</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
