import React, { useState } from "react";
import api from "../api"; // axios instance

const Register = ({ switchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/register", {
        name: username,  // ✅ backend expects `name`
        email,
        password,
      });

      console.log("Registration successful", res.data);
      switchToLogin(); // ✅ Switch to login page after success
    } catch (error) {
      console.log("❌ Registration error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleRegister}>
        <input
          className="form-control"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="form-control"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-pink w-100">
          Register
        </button>
      </form>
      {/* <p>
        Already have an account?{" "}
        <span className="link" onClick={switchToLogin}>
          Login here
        </span>
      </p> */}
    </div>
  );
};

export default Register;
