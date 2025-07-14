import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartItemCount }) => (
  <header style={{
    background: "#fff",
    borderBottom: "1px solid #eee",
    padding: "0.5rem 0",
    marginBottom: "2rem"
  }}>
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <Link to="/" style={{ fontWeight: "bold", fontSize: "1.7rem", color: "#7c1c4b", textDecoration: "none" }}>
        DaaruWala
      </Link>
      <nav style={{ display: "flex", gap: "2rem" }}>
        <Link to="/" style={{ color: "#222", textDecoration: "none" }}>Home</Link>
        <Link to="/order" style={{ color: "#222", textDecoration: "none" }}>Order Online</Link>
        <Link to="/login" style={{ color: "#222", textDecoration: "none" }}>Login</Link>
        <Link to="/cart" style={{ color: "#222", textDecoration: "none", position: "relative" }}>
          🛒
          {cartItemCount > 0 && (
            <span style={{
              position: "absolute", top: "-8px", right: "-12px",
              background: "#a21caf", color: "#fff", borderRadius: "50%",
              fontSize: "0.8rem", padding: "2px 6px"
            }}>{cartItemCount}</span>
          )}
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;