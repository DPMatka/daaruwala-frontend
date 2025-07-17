import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = "https://daaruwala-backend-5i6g.onrender.com/api/auth";

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "", phone: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    try {
      const endpoint = isLogin ? "/user-login" : "/register";
      const res = await fetch(API_URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      if (isLogin) {
        localStorage.setItem("user", JSON.stringify(data));
        setMessage("Login successful!");
        if (onLogin) onLogin(); // <-- This will trigger App.js to re-render and show the homepage
        setTimeout(() => {
          navigate("/"); // Redirect to home after login
        }, 500);
      } else {
        setMessage("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#232946"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 2px 12px #0002",
        minWidth: "320px"
      }}>
        <div style={{ display: "flex", marginBottom: "1.5rem" }}>
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: "0.7rem",
              background: isLogin ? "#7c1c4b" : "#eee",
              color: isLogin ? "#fff" : "#7c1c4b",
              border: "none",
              borderRadius: "8px 0 0 8px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: "0.7rem",
              background: !isLogin ? "#7c1c4b" : "#eee",
              color: !isLogin ? "#fff" : "#7c1c4b",
              border: "none",
              borderRadius: "0 8px 8px 0",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Register
          </button>
        </div>
        {!isLogin && (
          <>
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </div>
          </>
        )}
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.7rem", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#7c1c4b",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.7rem",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {isLogin ? "Login" : "Register"}
        </button>
        {message && (
          <div style={{ marginTop: "1rem", color: message.includes("success") ? "green" : "red", textAlign: "center" }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;