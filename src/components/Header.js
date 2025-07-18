import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartItemCount }) => {
  const user = localStorage.getItem("user");

  return (
    // The className "sticky-header" will handle the white background and sticky position
    <header 
      className="sticky-header" 
      style={{
        // These inline styles are kept as you had them
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#fff", // CHANGED from #18181b to white
        borderBottom: "1px solid #eee", // CHANGED from #232946 to light grey
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
            color: "#7c1c4b", // CHANGED from #eebbc3 to dark red/purple
            textDecoration: "none",
            letterSpacing: "1px",
          }}
        >
          DaaruWala
        </Link>

        {/* The className "header-nav" makes the links wrap on mobile */}
        <nav 
          className="header-nav"
          style={{
            display: "flex",
            gap: "1.2rem",
            alignItems: "center",
          }}
        >
          <Link
            to="/cart"
            style={{
              color: "#222", // CHANGED from #eebbc3 to dark text
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
              color: "#222", // CHANGED from #eebbc3 to dark text
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
                  color: "#222", // CHANGED from #eebbc3 to dark text
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
                  color: "#222", // CHANGED from #eebbc3 to dark text
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
                  color: "#222", // CHANGED from #eebbc3 to dark text
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
                color: "#222", // CHANGED from #eebbc3 to dark text
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