import React, { useState, useEffect } from "react";
import { PenSquare, Plus } from "lucide-react";
import { useFunctions } from "../../useFunctions";
import defaultImage from "../../assets/img-0.35.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openStaffData } from "../../redux/staffDataSlice";

function EmployeeManageStaff() {
  const [search, setSearch] = useState("");
  const { error, updateStaff, getAllStaff, API_BASE_URL } = useFunctions();
  const { staff } = useSelector((state) => state.staff);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleStaffDataPopup = (typeStaff, staffData = {}) => {
    if (typeStaff === "Add") {
      dispatch(
        openStaffData({
          header: "Add New Staff",
          buttonText: "Add",
          typeStaff: "Add",
        })
      );
    } else if (typeStaff === "Edit" && staffData._id) {
      dispatch(
        openStaffData({
          header: "Edit Staff",
          buttonText: "Edit",
          typeStaff: "Edit",
          initialStaffData: {
            _id: staffData._id,
            fullName: staffData.fullName || "",
            userName: staffData.username || "",
            email: staffData.email || "",
            phone: staffData.phone || "",
            role: staffData.role || "Employee",
            permissions: staffData.permissions || [],
            status: staffData.status || "Inactive",
            image: staffData.image || null,
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

  const filteredStaff = Array.isArray(staff)
    ? staff.filter((staff) => {
        const searchTerm = search.toLowerCase();
        return (
          (staff.username?.toLowerCase() || "").includes(searchTerm) ||
          (staff.email?.toLowerCase() || "").includes(searchTerm) ||
          (staff.role?.toLowerCase() || "").includes(searchTerm) ||
          (staff.phone?.toLowerCase() || "").includes(searchTerm)
        );
      })
    : [];

  const handleUpdateStaff = (id, updatedData) => {
    const formData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    updateStaff(id, formData);
  };

  return (
    <div className="container mx-auto px-4 py-6 overflow-hidden">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search staff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <button
          onClick={() => handleStaffDataPopup("Add")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Staff
        </button>
      </div>
      {error && (
        <div className="text-red-600 bg-red-100 p-4 rounded-lg">{error}</div>
      )}
      {filteredStaff.length === 0 && !error ? (
        <div className="text-gray-600 text-center py-4">No staff found.</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg max-h-[500px] overflow-auto sm:overflow-x-hidden">
          <table className="min-w-[800px] w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.map((staff) => (
                <tr key={staff._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={staff.image ? `${API_BASE_URL}/${staff.image}` : defaultImage}
                      alt={staff.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {staff.fullName || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {staff.username || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {staff.phone || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {staff.role || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {staff.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div
                      className="inline-flex items-center cursor-pointer"
                      onClick={() =>
                        handleUpdateStaff(staff._id, {
                          status: staff.status === "Active" ? "Inactive" : "Active",
                        })
                      }
                      role="switch"
                      aria-checked={staff.status === "Active"}
                    >
                      <div
                        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ease-in-out ${
                          staff.status === "Active" ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute left-0 inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${
                            staff.status === "Active" ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{staff.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleStaffDataPopup("Edit", staff)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <PenSquare className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeManageStaff;