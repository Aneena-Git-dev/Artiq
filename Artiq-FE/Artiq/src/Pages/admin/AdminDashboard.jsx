// src/components/admin/AdminDashboard.jsx
import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  // Example mock data
  const userData = [
    { month: "Jan", users: 20, artworks: 10 },
    { month: "Feb", users: 40, artworks: 30 },
    { month: "Mar", users: 60, artworks: 25 },
    { month: "Apr", users: 80, artworks: 50 },
    { month: "May", users: 100, artworks: 70 },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📊 Admin Dashboard</h2>

      <div className="row">
        {/* Line Chart */}
        <div className="col-md-6 mb-4">
          <div className="card shadow p-3">
            <h5>User Growth</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="col-md-6 mb-4">
          <div className="card shadow p-3">
            <h5>Artworks Uploaded</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="artworks" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
