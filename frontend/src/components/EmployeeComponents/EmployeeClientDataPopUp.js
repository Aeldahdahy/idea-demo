import React, { useState } from "react";
import { X, Pencil } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { closeClientData } from "../../redux/ClientDataSlice";
import { useFunctions } from "../../useFunctions";
import defaultImage from "../../assets/img-0.35.png";

function EmployeeClientDataPopUp() {
  const dispatch = useDispatch();
  const { isOpenClient, typeClient, initialClientData } = useSelector((state) => state.clientData);
  const { updateUsers, API_BASE_URL } = useFunctions();

  const imagePath = initialClientData?.image;
  const [avatarImage, setAvatarImage] = useState(
    imagePath ? `${API_BASE_URL}/Uploads/user_images/${imagePath}` : defaultImage
  );
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState(initialClientData.status || "Inactive");
  const [formData, setFormData] = useState({
    fullName: initialClientData.fullName || "",
    email: initialClientData.email || "",
    phone: initialClientData.phone || "",
    address: initialClientData.address || "",
    date_of_birth: formatDateForInput(initialClientData.date_of_birth || initialClientData.dob),
    role: initialClientData.role || "",
    national_id: initialClientData.national_id || "",
    education: initialClientData.education || "",
    experience: initialClientData.experience || "",
    biography: initialClientData.biography || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function formatDateForInput(isoDate) {
    if (!isoDate) return "";
    try {
      const date = new Date(isoDate);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    } catch {
      return "";
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStatusToggle = () => {
    setStatus((prevStatus) => (prevStatus === "Active" ? "Inactive" : "Active"));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace("Custom", "")]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const updatedData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        date_of_birth: formData.date_of_birth,
        role: formData.role,
        national_id: formData.national_id,
        education: formData.education,
        experience: formData.experience,
        biography: formData.biography,
        status,
      };

      await updateUsers(initialClientData._id, updatedData, imageFile);
      dispatch(closeClientData());
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      console.error("Failed to update user:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    dispatch(closeClientData());
  };

  if (!isOpenClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">User Profile ({typeClient})</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {error && (
            <div className="bg-red-100 text-red-800 text-sm p-2 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <img
                src={avatarImage}
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
              <label
                htmlFor="avatarUpload"
                className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
                <input
                  type="file"
                  id="avatarUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <div
                className="inline-flex items-center cursor-pointer"
                onClick={handleStatusToggle}
                role="switch"
                aria-checked={status === "Active"}
              >
                <div
                  className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ease-in-out ${
                    status === "Active" ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute left-0 inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${
                      status === "Active" ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </div>
                <span className="ml-2 text-sm text-gray-600">{status}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Permanent Address
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                id="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="national_id" className="block text-sm font-medium text-gray-700 mb-1">
                National ID
              </label>
              <input
                type="text"
                id="national_id"
                value={formData.national_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                Education
              </label>
              <input
                type="text"
                id="education"
                value={formData.education}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Experience
              </label>
              <input
                type="text"
                id="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-1">
                Biography
              </label>
              <textarea
                id="biography"
                rows="3"
                value={formData.biography}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeClientDataPopUp;