import React, { useState } from 'react';
import { X, Pencil } from 'lucide-react';



// Functional component for the User Profile Pop-up with custom styling
const UserProfilePopUpCustom = ({ show, handleClose }) => {
   // Using the image URL that closely matches the screenshot
const [avatarImage, setAvatarImage] = useState('https://i.imgur.com/YDSdE8x.png');
const [status, setStatus] = useState('Inactive');

   // Function to handle file upload
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

 

  const handleStatusToggle = () => {
    setStatus((prevStatus) => (prevStatus === 'Active' ? 'Inactive' : 'Active'));
  };

//   setStatus('Inactive');
  // Function to handle save button click (placeholder)
  const handleSave = () => {
    console.log('Save button clicked!');
    // Add your save logic here
    handleClose(); // Close the modal after saving (optional)
  };


  if (!show) {
    return null;
  }

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="custom-modal-header">
          <h5 className="custom-modal-title">User Profile</h5>
          <span className="close-btn" onClick={handleClose}>
              <X size={18} />
            </span>
        </div>
        <div className="custom-modal-body">
          <div className="avatar-section-custom">
             <div className="avatar-container-custom">
                <img
                  src={avatarImage}
                  alt="User Avatar"
                  className="avatar-image-custom"
                />
                 {/* Pencil Icon Overlay */}
                <label htmlFor="avatarUploadCustom" className="avatar-edit-icon-custom">
                    {/* Using Lucide React Pencil icon */}
                   <Pencil size={20} color="white" /> {/* Adjusted Lucide Pencil icon size */}
                   {/* Hidden file input */}
                   <input type="file" id="avatarUploadCustom" accept="image/*" onChange={handleImageUpload} />
                </label>
             </div>
             <div className="toggleStatusContainer" onClick={handleStatusToggle}>
                <div className={`toggleStatus ${status === 'Active' ? '' : 'active'}`}>
                  <span className="toggleCircle"></span>
                  <span className="toggleText">{status === 'Active' ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
          </div>
          <div className="form-section-custom">
            <div className="form-group-custom">
              <label htmlFor="nameCustom" className="form-label-custom">Name</label>
              <input type="text" className="form-control-custom" id="nameCustom" defaultValue="Taha Elraje" />
            </div>
            <div className="form-group-custom">
              <label htmlFor="emailCustom" className="form-label-custom">Email</label>
              <input type="email" className="form-control-custom" id="emailCustom" defaultValue="tahaelraje8@gmail.com" />
            </div>
            <div className="form-group-custom">
              <label htmlFor="phoneCustom" className="form-label-custom">Phone</label>
              <input type="text" className="form-control-custom" id="phoneCustom" defaultValue="+218 1235 54456" />
            </div>
            <div className="form-group-custom">
              <label htmlFor="addressCustom" className="form-label-custom">Permanent Address</label>
              <input type="text" className="form-control-custom" id="addressCustom" defaultValue="Madinty, New Cairo" />
            </div>
            <div className="form-group-custom">
              <label htmlFor="dobCustom" className="form-label-custom">Date of Birth</label>
              <input type="date" className="form-control-custom" id="dobCustom" defaultValue="2002-05-10" />
            </div>
            <div className="form-group-custom">
              <label htmlFor="roleCustom" className="form-label-custom">Role</label>
              <select className="form-select-custom" id="roleCustom" defaultValue="Investor">
                <option value="Investor">Investor</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <div className="form-group-custom">
              <label htmlFor="nationalIdCustom" className="form-label-custom">National ID</label>
              <input type="text" className="form-control-custom" id="nationalIdCustom" defaultValue="AB212121212" />
            </div>
            <div className="form-group-custom">
              <label htmlFor="educationCustom" className="form-label-custom">Education</label>
              <input type="text" className="form-control-custom" id="educationCustom" defaultValue="AASTMT" />
            </div>
            <div className="form-group-custom">
              <label htmlFor="experienceCustom" className="form-label-custom">Experience</label>
              <input type="text" className="form-control-custom" id="experienceCustom" defaultValue="2 years" />
            </div>
            <div className="form-group-custom">
              <label htmlFor="biographyCustom" className="form-label-custom">Biography</label>
              <textarea className="form-control-custom" id="biographyCustom" rows="3" defaultValue="USA"></textarea>
            </div>
          </div>
        </div>
        {/* Footer with Save button */}
        <div className="custom-modal-footer">
          <button type="button" className="save-button-custom" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

// Parent component to render the custom pop-up
const AppCustom = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      {/* Custom styles are now in App.css */}
      {/* <style>{customStyles}</style> */}

      {/* Button to open the modal */}
      <button type="button" style={{ margin: '20px' }} onClick={handleShowModal}>
        Open User Profile Pop-up (Custom)
      </button>

      {/* Render the custom pop-up component */}
      <UserProfilePopUpCustom show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default AppCustom;
