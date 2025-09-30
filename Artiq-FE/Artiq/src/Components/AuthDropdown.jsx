// src/Components/AuthDropdown.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AuthDropdown = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogin = () => {
    navigate("/auth"); // go to auth page
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // redirect to home
    window.location.reload(); // reload to update navbar
  };

  return (
    <div className="auth-dropdown">
      {isLoggedIn ? (
        <button className="dropdown-item" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <button className="dropdown-item" onClick={handleLogin}>
            Login / Register
          </button>
        </>
      )}
    </div>
  );
};

export default AuthDropdown;
