import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:4000/api", // Backend URL
});

// Request interceptor (attach token automatically if exists)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // If sending FormData, let axios set Content-Type automatically
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
