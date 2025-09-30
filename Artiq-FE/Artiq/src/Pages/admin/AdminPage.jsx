import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/AdminPage.css";
import ManageArtworks from "../../Pages/admin/ManageArtworks";
import ManageUsers from "../../Pages/admin/ManageUsers";
import SystemSetting from "../../Pages/admin/SystemSetting";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const AdminPage = () => {
  const [active, setActive] = useState("dashboard");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token"); // make sure login saves this
        const { data } = await axios.get("http://localhost:4000/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) {
    return <p className="p-4">Loading admin dashboard...</p>;
  }

  const COLORS = ["#ff69b4", "#ff1493", "#ffb6c1"];

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Admin Panel</h3>
        <ul>
          <li className={active === "dashboard" ? "active" : ""} onClick={() => setActive("dashboard")}>
            Dashboard
          </li>
          <li className={active === "artworks" ? "active" : ""} onClick={() => setActive("artworks")}>
            Manage Artworks
          </li>
          <li className={active === "users" ? "active" : ""} onClick={() => setActive("users")}>
            Manage Users
          </li>
          <li className={active === "settings" ? "active" : ""} onClick={() => setActive("settings")}>
            System Settings
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        {active === "dashboard" && (
          <div>
            <h2>Dashboard</h2>

            {/* Pie Chart */}
            <h4>Overview</h4>
            <PieChart width={400} height={300}>
              <Pie
                data={[
                  { name: "Artworks", value: stats.totalArtworks },
                  { name: "Users", value: stats.totalUsers },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>

            {/* Bar Chart - Categories */}
            <h4>Artworks by Category</h4>
            <BarChart width={500} height={300} data={stats.categories}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ff69b4" />
            </BarChart>

            {/* Line Chart - Monthly Uploads */}
            <h4>Monthly Uploads (last 6 months)</h4>
            <LineChart width={500} height={300} data={stats.monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#ff1493" strokeWidth={3} />
            </LineChart>
          </div>
        )}

        {active === "artworks" && <ManageArtworks />}
        {active === "users" && <ManageUsers />}
        {active === "settings" && <SystemSetting />}
      </main>
    </div>
  );
};

export default AdminPage;
