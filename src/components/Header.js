import React from 'react';
import { Link } from 'react-router-dom';

// Header now receives searchTerm and setSearchTerm from App.js
const Header = ({ cartItemCount, searchTerm, setSearchTerm }) => {
  const user = localStorage.getItem("user");

  return (
    <header 
      className="sticky-header" 
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#fff",
        borderBottom: "1px solid #eee",
        padding: "0.5rem 0",
        marginBottom: "2rem",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: 'wrap', // Allows items to wrap on mobile
          gap: '1rem', // Adds space between wrapped items
          padding: "0 1rem",
        }}
      >
        <Link
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "1.7rem",
            color: "#7c1c4b",
            textDecoration: "none",
            letterSpacing: "1px",
          }}
        >
          DaaruWala
        </Link>

        {/* --- Search Bar is now part of the Header --- */}
        {/* 'order: 3' makes it appear on the second line on mobile */}
        <div style={{ flexGrow: 1, minWidth: '250px', maxWidth: '400px', order: 3, width: '100%', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "10px", 
              borderRadius: "20px", /* Pill shape */
              border: "1px solid #ddd",
              fontSize: '1rem'
            }}
          />
        </div>
        
        {/* 'order: 2' keeps the navigation on the right on desktop */}
        <nav 
          className="header-nav"
          style={{
            display: "flex",
            gap: "1.2rem",
            alignItems: "center",
            order: 2
          }}
        >
          <Link
            to="/cart"
            style={{
              color: "#222",
              textDecoration: "none",
              position: "relative",
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            🛒
            {cartItemCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-12px",
                  background: "#a21caf",
                  color: "#fff",
                  borderRadius: "50%",
                  fontSize: "0.8rem",
                  padding: "2px 6px",
                  fontWeight: "bold",
                }}
              >
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link
            to="/"
            style={{
              color: "#222",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "1.1rem",
            }}
          >
            Home
          </Link>
          {user ? (
            <>
              <Link
                to="/order-history"
                style={{
                  color: "#222",
                  textDecoration: "none",
                  fontWeight: "500",
                  fontSize: "1.1rem",
                }}
              >
                Order History
              </Link>
              <Link
                to="/profile"
                style={{
                  color: "#222",
                  textDecoration: "none",
                  fontWeight: "500",
                  fontSize: "1.1rem",
                }}
              >
                Profile
              </Link>
              <Link
                to="/login"
                style={{
                  color: "#222",
                  textDecoration: "none",
                  fontWeight: "500",
                  fontSize: "1.1rem",
                }}
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                color: "#222",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "1.1rem",
              }}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;