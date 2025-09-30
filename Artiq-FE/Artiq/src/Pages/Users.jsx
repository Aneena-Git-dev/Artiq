import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../Styles/Users.css";

const Users = () => {
  const { users, user, setUser } = useContext(GlobalContext) || { users: [] };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
  };

  return (
    <div className="users-page">
      <div className="container users-container">
        <h2 className="users-title">Registered Users</h2>

        {user && (
          <div className="mb-3">
            <p>
              Logged in as: <strong>{user.name}</strong>
            </p>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}

        {users && users.length > 0 ? (
          <div className="row">
            {users.map((userItem, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card user-card">
                  <div className="card-body user-card-body">
                    <FaUserCircle size={40} className="user-icon" />
                    <h5>
                      {user && user.email === userItem.email
                        ? `${userItem.name} (You)`
                        : userItem.name || `User ${index + 1}`}
                    </h5>
                    <p className="text-muted">
                      {userItem.email || "user@example.com"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
