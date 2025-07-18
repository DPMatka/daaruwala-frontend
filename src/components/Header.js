import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartItemCount }) => {
  const user = localStorage.getItem("user");

  return (
    // CHANGE #1: Add className="sticky-header"
    <header 
      className="sticky-header" 
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#18181b",
        borderBottom: "1px solid #232946",
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
          padding: "0 1rem",
        }}
      >
        <Link
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "1.7rem",
            color: "#eebbc3",
            textDecoration: "none",
            letterSpacing: "1px",
          }}
        >
          DaaruWala
        </Link>

        {/* CHANGE #2: Add className="header-nav" */}
        <nav 
          className="header-nav"
          style={{
            display: "flex",
            gap: "1.2rem",
            alignItems: "center",
          }}
        >
          {/* Cart FIRST for easy access */}
          <Link
            to="/cart"
            style={{
              color: "#eebbc3",
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
              color: "#eebbc3",
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
                  color: "#eebbc3",
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
                  color: "#eebbc3",
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
                  color: "#eebbc3",
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
                color: "#eebbc3",
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