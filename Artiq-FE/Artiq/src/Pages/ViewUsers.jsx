import React, { useState, useEffect } from 'react';
import api from '../api';
import '../Styles/Users.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle role change
  const handleRoleChange = async (id, newRole) => {
    if (!window.confirm(`Are you sure you want to change the role?`)) return;
    try {
      const token = localStorage.getItem('token');
      await api.put(
        `/admin/users/${id}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map(user => user._id === id ? { ...user, role: newRole } : user));
    } catch (err) {
      console.error(err);
      setError('Failed to update role.');
    }
  };

  if (loading) return <p className="text-center py-4">Loading users...</p>;
  if (error) return <p className="text-danger text-center py-4">{error}</p>;

  return (
    <div className="users-page container py-4">
      <h2 className="users-title text-center mb-4">Registered Users</h2>

      <div className="users-container">
        {users.length === 0 ? (
          <p className="text-center">No users found.</p>
        ) : (
          users.map(user => (
            <div key={user._id} className="user-card mb-3">
              <div className="user-card-body">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="form-select mt-2"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="users-footer mt-4">Artiq Admin Panel</div>
    </div>
  );
};

export default ViewUsers;
