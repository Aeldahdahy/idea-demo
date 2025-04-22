import React, { useState } from "react";
import { X, Pencil } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { closeClientData } from "../../redux/ClientDataSlice";
import { useFunctions } from "../../useFunctions";

const EmployeeClientDataPopUp = () => {
  const dispatch = useDispatch();
  const { isOpenClient, typeClient, initialClientData } = useSelector((state) => state.clientData);
  const { updateUsers } = useFunctions();

  // Initialize state with Redux data
  const [avatarImage, setAvatarImage] = useState(initialClientData.image || "https://i.imgur.com/YDSdE8x.png");
  const [status, setStatus] = useState(initialClientData.status || "Inactive");
  const [formData, setFormData] = useState({
    fullName: initialClientData.fullName || "",
    email: initialClientData.email || "",
    phone: initialClientData.phone || "",
    address: initialClientData.address || "",
    dob: initialClientData.dob || "",
    role: initialClientData.role || "Investor",
    nationalId: initialClientData.nationalId || "",
    education: initialClientData.education || "",
    experience: initialClientData.experience || "",
    biography: initialClientData.biography || "",
  });

  // Handle file upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarImage(e.target.result);
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
    try {
      const updatedData = {
        status,
        image: avatarImage,
        ...formData,
      };

      await updateUsers(initialClientData._id, status, updatedData);
      dispatch(closeClientData());
    } catch (err) {
      console.error("Failed to update user:", err);
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
              <label htmlFor="nameCustom" className="form-label-custom">Name</label>
              <input
                type="text"
                className="form-control-custom"
                id="nameCustom"
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
              <label htmlFor="dobCustom" className="form-label-custom">Date of Birth</label>
              <input
                type="date"
                className="form-control-custom"
                id="dobCustom"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group-custom">
              <label htmlFor="roleCustom" className="form-label-custom">Role</label>
              <select
                className="form-select-custom"
                id="roleCustom"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="Investor">Investor</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <div className="form-group-custom">
              <label htmlFor="nationalIdCustom" className="form-label-custom">National ID</label>
              <input
                type="text"
                className="form-control-custom"
                id="nationalIdCustom"
                value={formData.nationalId}
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
          <button type="button" className="save-button-custom" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeClientDataPopUp;