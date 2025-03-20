import React, { useState, useEffect } from "react";
import { PenSquare, Plus } from "lucide-react";
import { useFunctions } from "../../useFunctions";
import defaultImage from "../../assets/img-0.35.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openStaffData } from "../../redux/staffDataSlice";

function EmployeeManageStaff() {
  const [search, setSearch] = useState("");
  const [selectedStaff, setSelectedStaff] = useState([]);
  const { loading, error, updateStaff, getAllStaff } = useFunctions();
  const { staff } = useSelector((state) => state.staff); // Get staff from Redux
  const location = useLocation();
  const dispatch = useDispatch();

  const handleStaffDataPopup = (type, staffData = {}) => {
    if (type === "Add") {
      dispatch(
        openStaffData({
          header: "Add New Staff",
          buttonText: "Add",
          type: "Add",
        })
      );
    } else if (type === "Edit" && staffData._id) {
      dispatch(
        openStaffData({
          header: "Edit Staff",
          buttonText: "Edit",
          type: "Edit",
          initialData: {
            _id: staffData._id,
            fullName: staffData.fullName || '',
            userName: staffData.username || '', // Map to userName
            email: staffData.email || '',
            phone: staffData.phone || '',
            role: staffData.role || 'Employee',
            permissions: staffData.permissions || [],
            status: staffData.status || 'Inactive',
          },
        })
      );
    }
  };

  useEffect(() => {
    if (location.pathname === "/employee-portal/manageStaff") {
      getAllStaff();
    }
  }, [location.pathname, getAllStaff]);

  const handleUserCheckbox = (id) => {
    setSelectedStaff((prev) =>
      prev.includes(id) ? prev.filter((staffId) => staffId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    setSelectedStaff(e.target.checked ? staff.map((staff) => staff._id) : []);
  };

  const filteredStaff = Array.isArray(staff)
    ? staff.filter((staff) => {
        const searchTerm = search.toLowerCase();
        return (
          staff.username.toLowerCase().includes(searchTerm) ||
          staff.email.toLowerCase().includes(searchTerm) ||
          staff.role.toLowerCase().includes(searchTerm)
        );
      })
    : [];

  const handleUpdateStaff = (id, updatedData) => {
    updateStaff(id, updatedData);
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
        <button className="add-btn" onClick={() => handleStaffDataPopup("Add")}>
          <Plus /> Add New Staff
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && !loading && <p style={{ color: "red" }}>{error}</p>}
      {filteredStaff.length === 0 ? (
        <p>No staff found.</p>
      ) : (
        <table className="dashboard-table">
          <thead className="dashboard-table-head">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedStaff.length === filteredStaff.length && filteredStaff.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th></th>
              <th>Name</th>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Email</th>
              <th style={{ textAlign: "center", paddingRight: 80 }}>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => (
              <tr key={staff._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStaff.includes(staff._id)}
                    onChange={() => handleUserCheckbox(staff._id)}
                  />
                </td>
                <td>
                  <img
                    src={staff.image || defaultImage}
                    alt={staff.fullName}
                    style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
                  />
                </td>
                <td>{staff.fullName || "N/A"}</td>
                <td>{staff.username || "N/A"}</td>
                <td>{staff.phone || "N/A"}</td>
                <td>{staff.role || "N/A"}</td>
                <td>{staff.email || "N/A"}</td>
                <td>
                  <div
                    className="toggleStatusContainer"
                    onClick={() =>
                      handleUpdateStaff(staff._id, {
                        status: staff.status === "Active" ? "Inactive" : "Active",
                      })
                    }
                  >
                    <div className={`toggleStatus ${staff.status === "Active" ? "" : "active"}`}>
                      <span className="toggleCircle"></span>
                      <span className="toggleText">
                        {staff.status === "Active" ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleStaffDataPopup("Edit", staff)}
                  >
                    <PenSquare />
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

export default EmployeeManageStaff;