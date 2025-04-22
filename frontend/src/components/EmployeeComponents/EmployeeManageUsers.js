import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { useFunctions } from "../../useFunctions";
import defaultImage from "../../assets/img-0.35.png";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux"; // Add useDispatch
import { openClientData } from "../../redux/ClientDataSlice"; // Import openClientData

function EmployeeManageUsers() {
  const [search, setSearch] = useState("");
  const { users = [], loading, error, updateUsers, getAllUsers } = useFunctions();
  const location = useLocation();
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    if (location.pathname === "/employee-portal/manageUsers") {
      getAllUsers();
    }
  }, [location.pathname, getAllUsers]);

  const filteredUsers = Array.isArray(users)
    ? users.filter((user) => {
        const searchTerm = search.toLowerCase();
        return (
          user.fullName.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          (user.phone?.toString() || "").includes(searchTerm) ||
          user.role.toLowerCase().includes(searchTerm) ||
          (user.createdAt?.toString() || "").includes(searchTerm)
        );
      })
    : [];

  const formatDate = (isoString) => {
    return isoString ? isoString.split("T")[0] : "N/A";
  };

  // Handle View button click
  const handleViewUser = (user) => {
    dispatch(
      openClientData({
        typeClient: "View",
        initialClientData: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone || "",
          role: user.role,
          status: user.status,
          image: user.image || defaultImage,
          address: user.address || "",
          dob: user.dob || "",
          nationalId: user.nationalId || "",
          education: user.education || "",
          experience: user.experience || "",
          biography: user.biography || "",
        },
      })
    );
  };

  return (
    <>
      <div className="dashboard-container-header">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && !loading && <p style={{ color: "red" }}>{error}</p>}
      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="dashboard-table">
          <thead className="dashboard-table-head">
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Created</th>
              <th style={{ textAlign: "center", paddingRight: 80 }}>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={user.image || defaultImage}
                    alt={user.fullName}
                    style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
                  />
                </td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phone || "N/A"}</td>
                <td>{user.role}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <div className="toggleStatusContainer" onClick={() => updateUsers(user._id, user.status)}>
                    <div className={`toggleStatus ${user.status === "Active" ? "" : "active"}`}>
                      <span className="toggleCircle"></span>
                      <span className="toggleText">{user.status === "Active" ? "Active" : "Inactive"}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleViewUser(user)}>
                    <Eye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default EmployeeManageUsers;