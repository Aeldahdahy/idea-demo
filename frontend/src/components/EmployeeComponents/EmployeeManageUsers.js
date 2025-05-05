import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { useFunctions } from "../../useFunctions";
import defaultImage from "../../assets/img-0.35.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openClientData } from "../../redux/ClientDataSlice";

function EmployeeManageUsers() {
  const [search, setSearch] = useState("");
  const { loading, error, getAllUsers, updateUsers, API_BASE_URL } = useFunctions();
  const users = useSelector((state) => state.users.users || []);
  const location = useLocation();
  const dispatch = useDispatch();

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
      await updateUsers(user._id, updatedData, null);
    } catch (err) {
      console.error("Failed to toggle user status:", err);
    }
  };

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
    <div className="container mx-auto px-4 py-6 overflow-hidden">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>
      {loading && (
        <div className="flex justify-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}
      {error && !loading && (
        <div className="text-red-600 bg-red-100 p-4 rounded-lg">{error}</div>
      )}
      {filteredUsers.length === 0 && !loading && !error ? (
        <div className="text-gray-600 text-center py-4">No users found.</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg max-h-[500px] overflow-auto sm:overflow-x-hidden">
          <table className="min-w-[800px] w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={user.image ? `${API_BASE_URL}/Uploads/user_images/${user.image}` : defaultImage}
                      alt={user.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(user.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div
                      className="inline-flex items-center cursor-pointer"
                      onClick={() => handleStatusToggle(user)}
                      role="switch"
                      aria-checked={user.status === "Active"}
                    >
                      <div
                        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ease-in-out ${
                          user.status === "Active" ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute left-0 inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${
                            user.status === "Active" ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewUser(user)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
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

export default EmployeeManageUsers;