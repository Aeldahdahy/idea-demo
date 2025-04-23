import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { useFunctions } from "../../useFunctions";
import defaultImage from "../../assets/img-0.35.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Add useSelector
import { openClientData } from "../../redux/ClientDataSlice";

function EmployeeManageUsers() {
  const [search, setSearch] = useState("");
  const { loading, error, getAllUsers, updateUsers, API_BASE_URL } = useFunctions();
  const users = useSelector((state) => state.users.users || []);
  // console.log("Users from Redux:", users); // Log the users from Redux store
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/employee-portal/manageUsers") {
      getAllUsers(); // Fetch users to update Redux store
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

  // Handle status toggle
  const handleStatusToggle = async (user) => {
    const newStatus = user.status === "Active" ? "Inactive" : "Active";
    const updatedData = {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      date_of_birth: user.date_of_birth || "",
      role: user.role,
      national_id: user.national_id || "",
      education: user.education || "",
      experience: user.experience || "",
      biography: user.biography || "",
      status: newStatus,
    };

    try {
      await updateUsers(user._id, updatedData, null); // No image change
    } catch (err) {
      console.error("Failed to toggle user status:", err);
    }
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
          image: user.image || "",
          address: user.address || "",
          date_of_birth: user.date_of_birth || "",
          national_id: user.national_id || "",
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
                    src={user.image ? `${API_BASE_URL}/uploads/user_images/${user.image}` : defaultImage}
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
                  <div className="toggleStatusContainer" onClick={() => handleStatusToggle(user)}>
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