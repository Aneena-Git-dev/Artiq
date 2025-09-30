import React, { useEffect, useState } from "react";
import api from "../../api";
import "../../Styles/ManageUsers.css"

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get("/admin/users", { headers: { Authorization: `Bearer ${token}` } });
    setUsers(res.data);
  };

  const addUser = async () => {
    const token = localStorage.getItem("token");
    await api.post("/admin/users", newUser, { headers: { Authorization: `Bearer ${token}` } });
    setNewUser({ name: "", email: "", password: "" });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    await api.delete(`/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchUsers();
  };

  return (
    <div className="container py-4">
      <h3>Manage Users</h3>
      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          placeholder="Name"
          className="form-control"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button className="btn btn-primary" onClick={addUser}>
          Add
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(u._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
