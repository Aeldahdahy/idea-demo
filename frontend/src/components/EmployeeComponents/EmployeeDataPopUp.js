import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, Pen } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { closeStaffData } from '../../redux/staffDataSlice';
import { useFunctions } from '../../useFunctions';
import { toast } from 'react-toastify';
import defaultImage from '../../assets/img-0.35.png';

function EmployeeDataPopUp({ typeStaff = 'Add', initialStaffData = {} }) {
  const dispatch = useDispatch();
  const { createStaff, updateStaff, API_BASE_URL } = useFunctions();

  const allPermissions = [
    'Manage Staff',
    'Manage Projects',
    'Schedule Meetings',
    'Manage Contracts',
    'Manage Support Requests',
    'Manage Users',
    'Manage Web & App',
    'Manage Advertisements',
  ];

  const roleOptions = ['Admin', 'Auditor', 'Cs', 'Employee'];

  const [formData, setFormData] = useState({
    fullName: initialStaffData.fullName || '',
    userName: initialStaffData.userName || '',
    email: initialStaffData.email || '',
    phone: initialStaffData.phone || '',
    role: initialStaffData.role || 'Employee',
    password: '',
    confirmPassword: '',
    permissions: initialStaffData.permissions || [],
  });
  const [status, setStatus] = useState(initialStaffData.status || 'Inactive');
  const [isClosing, setIsClosing] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    initialStaffData.image ? `${API_BASE_URL}/${initialStaffData.image}` : defaultImage
  );
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (typeStaff === 'Edit' && initialStaffData._id) {
      setFormData({
        fullName: initialStaffData.fullName || '',
        userName: initialStaffData.userName || '',
        email: initialStaffData.email || '',
        phone: initialStaffData.phone || '',
        role: initialStaffData.role || 'Employee',
        password: '',
        confirmPassword: '',
        permissions: Array.isArray(initialStaffData.permissions) ? initialStaffData.permissions : [],
      });
      setStatus(initialStaffData.status || 'Inactive');
      setImagePreview(
        initialStaffData.image ? `${API_BASE_URL}/${initialStaffData.image}` : defaultImage
      );
    }
  }, [typeStaff, initialStaffData, API_BASE_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, permissions: [...prev.permissions, value] };
      } else {
        return { ...prev, permissions: prev.permissions.filter((perm) => perm !== value) };
      }
    });
  };

  const handleSelectAllChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      permissions: checked ? [...allPermissions] : [],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const updatedDataObject = {
      fullName: formData.fullName,
      username: formData.userName,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      ...(formData.password && { password: formData.password }),
      permissions: formData.permissions,
      status,
      image,
    };

    console.log('Permissions being sent:', formData.permissions);

    const updatedData = new FormData();
    Object.keys(updatedDataObject).forEach((key) => {
      if (key === 'permissions') {
        updatedData.append(key, JSON.stringify(updatedDataObject[key]));
      } else if (key === 'image' && updatedDataObject[key]) {
        updatedData.append(key, updatedDataObject[key]);
      } else if (updatedDataObject[key] !== undefined && updatedDataObject[key] !== null) {
        updatedData.append(key, updatedDataObject[key]);
      }
    });

    try {
      if (typeStaff === 'Edit' && initialStaffData._id) {
        await updateStaff(initialStaffData._id, updatedData);
      } else {
        await createStaff(updatedData);
      }
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.message || 'An error occurred while submitting the form.');
    }
  };

  const allPermissionsSelected = allPermissions.every((perm) =>
    formData.permissions.includes(perm)
  );

  const handleStatusToggle = () => {
    setStatus((prevStatus) => (prevStatus === 'Active' ? 'Inactive' : 'Active'));
  };

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setFormData({
        fullName: '',
        userName: '',
        email: '',
        phone: '',
        role: 'Employee',
        password: '',
        confirmPassword: '',
        permissions: [],
      });
      setStatus('Inactive');
      setImage(null);
      setImagePreview(defaultImage);
      dispatch(closeStaffData());
      setIsClosing(false);
    }, 300);
  }, [dispatch]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleClose]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden ${
        isClosing ? 'opacity-0 transition-opacity duration-300' : 'opacity-100'
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {typeStaff === 'Add' ? 'Add User' : 'Edit User'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Section: Avatar, Status, Form Inputs */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt={formData.fullName || 'User Avatar'}
                  className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Edit avatar"
                >
                  <Pen className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <div
                  className="inline-flex items-center cursor-pointer"
                  onClick={handleStatusToggle}
                  role="switch"
                  aria-checked={status === 'Active'}
                >
                  <div
                    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ease-in-out ${
                      status === 'Active' ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute left-0 inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${
                        status === 'Active' ? 'translate-x-6' : 'translate-x-1'
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
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={typeStaff === 'Add'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={typeStaff === 'Add'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Right Section: Permissions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-base font-medium text-gray-900 mb-3">Permissions</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={allPermissionsSelected}
                  onChange={handleSelectAllChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">All Permissions</span>
              </label>
              {allPermissions.map((permission) => (
                <label key={permission} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={permission}
                    checked={formData.permissions.includes(permission)}
                    onChange={handlePermissionChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{permission}</span>
                </label>
              ))}
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
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            {typeStaff === 'Add' ? 'Add' : 'Edit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeDataPopUp;