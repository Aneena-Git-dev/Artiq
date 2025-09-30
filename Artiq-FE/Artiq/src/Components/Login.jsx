import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../Styles/AuthPage.css";

const Login = ({ switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handle login called");
    try {
      const res = await api.post("/users/login", { email, password });
      console.log("loginapitrigger");

      // Save token & user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ store full user

      // Redirect using user ID instead of email
      navigate(`/user/${res.data.user.id}`);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleLogin}>
        <input
          className="form-control"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-pink w-100"
          onClick={() => console.log("Button clicked")}
        >
          Login
        </button>
      </form>
      <p>
        <span className="link" onClick={switchToRegister}></span>
      </p>
    </div>
  );
};

export default Login;
