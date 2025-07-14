import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <div style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>You are not logged in.</div>;
  }

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", background: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 2px 12px #0002" }}>
      <h2 style={{ color: "#7c1c4b", marginBottom: "1.5rem" }}>My Profile</h2>
      <div><b>Name:</b> {user.user?.name || "N/A"}</div>
      <div><b>Email:</b> {user.user?.email || "N/A"}</div>
      <div><b>Phone:</b> {user.user?.phone || "N/A"}</div>
      {/* You can add more fields here */}
    </div>
  );
};

export default Profile;