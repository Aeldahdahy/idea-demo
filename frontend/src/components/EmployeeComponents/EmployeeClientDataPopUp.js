import React, { useState } from "react";
import { X, Pencil } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { closeClientData } from "../../redux/ClientDataSlice";
import { useFunctions } from "../../useFunctions";
import defaultImage from "../../assets/img-0.35.png"; // Default image path

function EmployeeClientDataPopUp() {
  const dispatch = useDispatch();
  const { isOpenClient, typeClient, initialClientData } = useSelector((state) => state.clientData);
  const { updateUsers, API_BASE_URL } = useFunctions();
  

  // Initialize state with Redux data
  const imagePath = initialClientData?.image;
  const [avatarImage, setAvatarImage] = useState(
    imagePath ? `${API_BASE_URL}/uploads/user_images/${imagePath}` : defaultImage
  );

  const formatDateForInput = (isoDate) => {
    if (!isoDate) return "";
    try {
      const date = new Date(isoDate);
      if (isNaN(date.getTime())) return ""; // Invalid date
      return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
    } catch {
      return "";
    }
  };

  const [imageFile, setImageFile] = useState(null); // Store the file for upload
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

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Store file for FormData
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarImage(e.target.result); // Preview image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle status toggle
  const handleStatusToggle = () => {
    setStatus((prevStatus) => (prevStatus === "Active" ? "Inactive" : "Active"));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace("Custom", "")]: value,
    }));
  };

  // Handle save
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

      // Call updateUsers with user ID, updated data, and image file
      await updateUsers(initialClientData._id, updatedData, imageFile);

      // Close popup on success
      dispatch(closeClientData());
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      console.error("Failed to update user:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle close
  const handleClose = () => {
    dispatch(closeClientData());
  };

  if (!isOpenClient) {
    return null;
  }

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="custom-modal-header">
          <h5 className="custom-modal-title">User Profile ({typeClient})</h5>
          <span className="close-btn" onClick={handleClose}>
            <X size={18} />
          </span>
        </div>
        <div className="custom-modal-body">
          {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}
          <div className="avatar-section-custom">
            <div className="avatar-container-custom">
              <img src={avatarImage} alt="User Avatar" className="avatar-image-custom" />
              <label htmlFor="avatarUploadCustom" className="avatar-edit-icon-custom">
                <Pencil size={20} color="white" />
                <input
                  type="file"
                  id="avatarUploadCustom"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <div className="toggleStatusContainer" onClick={handleStatusToggle}>
              <div className={`toggleStatus ${status === "Active" ? "" : "active"}`}>
                <span className="toggleCircle"></span>
                <span className="toggleText">{status}</span>
              </div>
            </div>
          </div>
          <div className="form-section-custom">
            <div className="form-group-custom">
              <label htmlFor="fullNameCustom" className="form-label-custom">Name</label>
              <input
                type="text"
                className="form-control-custom"
                id="fullNameCustom"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group-custom">
              <label htmlFor="emailCustom" className="form-label-custom">Email</label>
              <input
                type="email"
                className="form-control-custom"
                id="emailCustom"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group-custom">
              <label htmlFor="phoneCustom" className="form-label-custom">Phone</label>
              <input
                type="text"
                className="form-control-custom"
                id="phoneCustom"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group-custom">
              <label htmlFor="addressCustom" className="form-label-custom">Permanent Address</label>
              <input
                type="text"
                className="form-control-custom"
                id="addressCustom"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group-custom">
              <label htmlFor="date_of_birthCustom" className="form-label-custom">Date of Birth</label>
              <input
                type="date"
                className="form-control-custom"
                id="date_of_birthCustom"
                value={formData.date_of_birth}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group-custom">
              <label htmlFor="roleCustom" className="form-label-custom">Role</label>
              <input
                type="text"
                className="form-control-custom"
                id="roleCustom"
                value={formData.role}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group-custom">
              <label htmlFor="national_idCustom" className="form-label-custom">National ID</label>
              <input
                type="text"
                className="form-control-custom"
                id="national_idCustom"
                value={formData.national_id}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group-custom">
              <label htmlFor="educationCustom" className="form-label-custom">Education</label>
              <input
                type="text"
                className="form-control-custom"
                id="educationCustom"
                value={formData.education}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group-custom">
              <label htmlFor="experienceCustom" className="form-label-custom">Experience</label>
              <input
                type="text"
                className="form-control-custom"
                id="experienceCustom"
                value={formData.experience}
                onChange={handleInputChange}
               />
            </div>
            <div className="form-group-custom">
              <label htmlFor="biographyCustom" className="form-label-custom">Biography</label>
              <textarea
                className="form-control-custom"
                id="biographyCustom"
                rows="3"
                value={formData.biography}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="custom-modal-footer">
          <button
            type="button"
            className="save-button-custom"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeClientDataPopUp;