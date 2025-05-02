import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFunctions } from '../../useFunctions';
import { updateClientData } from '../../redux/clientAuthSlice'; // Adjust path to your clientAuthSlice
import { toast } from 'react-toastify'; // Assuming react-toastify is used for notifications

// Button Component (unchanged)
const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  const sizeStyles = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-6 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ImageUpload Component
const ImageUpload = ({ user, onSave, API_BASE_URL }) => {
  const [previewUrl, setPreviewUrl] = useState(user.image);
  const [isHovering, setIsHovering] = useState(false);

  // Handle image file selection and create preview URL
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Pass File object to onSave for backend upload
    onSave({ ...user, image: file });
  };

  // Cleanup preview URL on unmount to prevent memory leaks
  React.useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== user.image) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, user.image]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div 
        className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-md"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {previewUrl ? (
         <img
           src={previewUrl}
           alt={user.fullName}
           className="h-full w-full object-cover"
         />
       ) : user.image ? (
         <img
           src={`${API_BASE_URL}/Uploads/user_images/${user.image}`}
           alt={user.fullName}
           className="h-full w-full object-cover"
         />
       ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        )}
        {isHovering && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200">
            <label 
              htmlFor="profile-image" 
              className="cursor-pointer text-white flex flex-col items-center"
            >
              <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="text-xs">Change</span>
            </label>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              // className="hidden"
              onChange={handleImageChange}
            />
          </div>
        )}
      </div>
      
      <label 
        htmlFor="profile-image-btn" 
        className="block text-center visible"
        style={{ display: 'block', visibility: 'visible' }}
      >
        <Button variant="outline" size="sm" className="mt-2 !visible opacity-100">
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Photo
        </Button>
        <input
          id="profile-image-btn"
          type="file"
          accept="image/*"
          className="block"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

// ProfileHeader Component
const ProfileHeader = ({ user, isEditing, setIsEditing, onSave, API_BASE_URL, toggleRole }) => {
  
  // Provide fallback values to prevent undefined errors
  const fullName = user?.fullName || 'Unknown User';
  const email = user?.email || 'No email provided';
  const role = user?.role || 'investor';
  const status = user?.status || 'Inactive';
  const image = user?.image || null;

  return (
    <div className="bg-gradient-to-r to-indigo-300 from-blue-800 text-white p-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-4 md:mb-0 md:mr-6">
          {isEditing && console.log('ImageUpload is rendering')}
            {isEditing ? (
              // Pass necessary props to ImageUpload
              <ImageUpload 
                user={{ ...user, fullName, image }} 
                onSave={onSave} 
                API_BASE_URL={API_BASE_URL}
              />
            ) : (
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                {image ? (
                  <img 
                    src={typeof image === 'string' ? `${API_BASE_URL}/uploads/user_images/${image}` : image} 
                    alt={fullName} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl">
                    {fullName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">{fullName}</h1>
            <p className="text-blue-100">{email}</p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start mt-2 gap-2">
              <span className="px-3 py-1 bg-indigo-800 bg-opacity-50 rounded-full text-sm capitalize">
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </span>
              
              <span className={`px-3 py-1 rounded-full text-sm flex items-center ${
                status === 'Active' 
                  ? 'bg-green-500 bg-opacity-20 text-green-100' 
                  : 'bg-red-500 bg-opacity-20 text-red-100'
              }`}>
                {status === 'Active' ? (
                  <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {status}
              </span>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

// InvestorPreferenceSection Component
const InvestorPreferenceSection = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(
    user.investorPreference || {
      investorType: 'individual',
      minInvestment: 0,
      maxInvestment: 0,
      yearsOfExperience: '0-1',
      socialAccounts: [''],
      country: '',
      city: '',
      industries: ['', '', '']
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSocialAccountChange = (index, value) => {
    const updatedAccounts = [...formData.socialAccounts];
    updatedAccounts[index] = value;
    setFormData((prev) => ({ ...prev, socialAccounts: updatedAccounts }));
  };

  const addSocialAccount = () => {
    setFormData((prev) => ({
      ...prev,
      socialAccounts: [...prev.socialAccounts, '']
    }));
  };

  const removeSocialAccount = (index) => {
    if (formData.socialAccounts.length <= 1) return;
    
    const updatedAccounts = [...formData.socialAccounts];
    updatedAccounts.splice(index, 1);
    setFormData((prev) => ({ ...prev, socialAccounts: updatedAccounts }));
  };

  const handleIndustryChange = (index, value) => {
    const updatedIndustries = [...formData.industries];
    updatedIndustries[index] = value;
    setFormData((prev) => ({ ...prev, industries: updatedIndustries }));
  };

  const handleSubmit = () => {
    if (formData.industries.length !== 3 || formData.industries.some(ind => !ind.trim())) {
      toast.error('Please provide exactly 3 industries');
      return;
    }
    
    if (formData.socialAccounts.length === 0 || formData.socialAccounts.some(acc => !acc.trim())) {
      toast.error('Please provide at least one social account');
      return;
    }
    
    if (formData.minInvestment > formData.maxInvestment) {
      toast.error('Maximum investment must be greater than or equal to minimum investment');
      return;
    }

    const updatedUser = { 
      ...user, 
      investorPreference: formData 
    };
    onSave(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(
      user.investorPreference || {
        investorType: 'individual',
        minInvestment: 0,
        maxInvestment: 0,
        yearsOfExperience: '0-1',
        socialAccounts: [''],
        country: '',
        city: '',
        industries: ['', '', '']
      }
    );
    setIsEditing(false);
  };

  // Conditionally render based on lowercase role
  if (!user?.role || user.role.toLowerCase() !== 'investor') {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Investor Preferences</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="flex items-center"
          >
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              className="flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save
            </Button>
          </div>
        )}
      </div>

      {!isEditing ? (
        user.investorPreference ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Investor Type</p>
                <p className="text-gray-800 capitalize">{user.investorPreference.investorType}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Years of Experience</p>
                <p className="text-gray-800">{user.investorPreference.yearsOfExperience} years</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Minimum Investment</p>
                <p className="text-gray-800">{user.investorPreference.minInvestment.toLocaleString()} EGP</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Maximum Investment</p>
                <p className="text-gray-800">{user.investorPreference.maxInvestment.toLocaleString()} EGP</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-gray-800">{user.investorPreference.city}, {user.investorPreference.country}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Industries of Interest</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.investorPreference.industries.map((industry, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Social Accounts</p>
                <ul className="list-disc list-inside mt-1 text-gray-800">
                  {user.investorPreference.socialAccounts.map((account, index) => (
                    <li key={index}>{account}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">No investor preferences set.</p>
        )
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="investorType" className="block text-sm font-medium text-gray-700 mb-1">
                Investor Type
              </label>
              <select
                id="investorType"
                name="investorType"
                value={formData.investorType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="individual">Individual</option>
                <option value="company">Company</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <select
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="minInvestment" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Investment (EGP)
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <input
                  type="number"
                  id="minInvestment"
                  name="minInvestment"
                  value={formData.minInvestment}
                  onChange={handleNumberChange}
                  min="0"
                  max="1000000"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="maxInvestment" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Investment (EGP)
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <input
                  type="number"
                  id="maxInvestment"
                  name="maxInvestment"
                  value={formData.maxInvestment}
                  onChange={handleNumberChange}
                  min="0"
                  max="1000000"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industries of Interest (Select exactly 3)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[0, 1, 2].map((index) => (
                <div key={index} className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={formData.industries[index] || ''}
                    onChange={(e) => handleIndustryChange(index, e.target.value)}
                    placeholder={`Industry ${index + 1}`}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">You must select exactly 3 industries.</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Social Accounts
            </label>
            <div className="space-y-2">
              {formData.socialAccounts.map((account, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={account}
                    onChange={(e) => handleSocialAccountChange(index, e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeSocialAccount(index)}
                    disabled={formData.socialAccounts.length <= 1}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Button>
                </div>
              ))}
            </div>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSocialAccount}
              className="mt-2"
            >
              Add Social Account
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// SecuritySection Component
const SecuritySection = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    status: user.status,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    const updatedUser = { 
      ...user,
      status: formData.status,
      password: formData.password || user.password
    };
    
    onSave(updatedUser);
    setIsEditing(false);
    setFormData({
      password: '',
      confirmPassword: '',
      status: updatedUser.status,
    });
  };

  const handleCancel = () => {
    setFormData({
      password: '',
      confirmPassword: '',
      status: user.status,
    });
    setIsEditing(false);
    setShowPassword(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="flex items-center"
          >
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              className="flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save
            </Button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-4">
          <div className="flex items-center text-gray-800">
            <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Password: ••••••••</span>
          </div>
          
          <div className="flex items-center">
            <span className="mr-3">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              user.status === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {user.status}
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.79m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Password should be at least 8 characters long
            </p>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          
        </div>
      )}
    </div>
  );
};

// ContactInfoSection Component
const ContactInfoSection = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user.email,
    phone: user.phone || '',
    address: user.address || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const updatedUser = { ...user, ...formData };
    onSave(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      email: user.email,
      phone: user.phone || '',
      address: user.address || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="flex items-center"
          >
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              className="flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save
            </Button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-4">
          <div className="flex items-center text-gray-800">
            <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{user.email}</span>
          </div>
          
          <div className="flex items-center text-gray-800">
            <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{user.phone || 'Not provided'}</span>
          </div>
          
          <div className="flex items-start text-gray-800">
            <svg className="h-5 w-5 text-gray-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{user.address || 'Not provided'}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PersonalInfoSection = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    biography: user.biography || '',
    date_of_birth: user.date_of_birth || '',
    national_id: user.national_id || '',
    education: user.education || '',
    experience: user.experience || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const updatedUser = { ...user, ...formData };
    onSave(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName,
      biography: user.biography || '',
      date_of_birth: user.date_of_birth || '',
      national_id: user.national_id || '',
      education: user.education || '',
      experience: user.experience || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="flex items-center"
          >
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              className="flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save
            </Button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="text-gray-800">{user.fullName}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
              <p className="text-gray-800">
                {user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : 'Not provided'}
              </p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">National ID</p>
              <p className="text-gray-800">{user.national_id || 'Not provided'}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Education</p>
              <p className="text-gray-800">{user.education || 'Not provided'}</p>
            </div>
            
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500">Experience</p>
              <p className="text-gray-800">{user.experience || 'Not provided'}</p>
            </div>
            
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500">Biography</p>
              <p className="text-gray-800">{user.biography || 'Not provided'}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="national_id" className="block text-sm font-medium text-gray-700 mb-1">
                National ID
              </label>
              <input
                type="text"
                id="national_id"
                name="national_id"
                value={formData.national_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                Education
              </label>
              <input
                type="text"
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Experience
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-1">
                Biography
              </label>
              <textarea
                id="biography"
                name="biography"
                value={formData.biography}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// EntrepreneurPreferenceSection Component
const EntrepreneurPreferenceSection = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(
    user.entrepreneurPreference || {
      projectName: '',
      projectIndustry: '',
      pitch: '',
      fundingGoal: 0
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = () => {
    if (!formData.projectName.trim() || !formData.projectIndustry.trim()) {
      toast.error('Project name and industry are required');
      return;
    }
    const updatedUser = { 
      ...user, 
      entrepreneurPreference: formData 
    };
    onSave(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(
      user.entrepreneurPreference || {
        projectName: '',
        projectIndustry: '',
        pitch: '',
        fundingGoal: 0
      }
    );
    setIsEditing(false);
  };

  // Conditionally render based on lowercase role
  if (!user?.role || user.role.toLowerCase() !== 'entrepreneur') {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Entrepreneur Preferences</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="flex items-center"
          >
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              className="flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save
            </Button>
          </div>
        )}
      </div>

      {!isEditing ? (
        user.entrepreneurPreference ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Project Name</p>
                <p className="text-gray-800">{user.entrepreneurPreference.projectName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Industry</p>
                <p className="text-gray-800">{user.entrepreneurPreference.projectIndustry}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Funding Goal</p>
                <p className="text-gray-800">{user.entrepreneurPreference.fundingGoal.toLocaleString()} EGP</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Pitch</p>
                <p className="text-gray-800">{user.entrepreneurPreference.pitch || 'Not provided'}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">No entrepreneur preferences set.</p>
        )
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="projectIndustry" className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <input
                type="text"
                id="projectIndustry"
                name="projectIndustry"
                value={formData.projectIndustry}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="fundingGoal" className="block text-sm font-medium text-gray-700 mb-1">
                Funding Goal (EGP)
              </label>
              <input
                type="number"
                id="fundingGoal"
                name="fundingGoal"
                value={formData.fundingGoal}
                onChange={handleNumberChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="pitch" className="block text-sm font-medium text-gray-700 mb-1">
                Pitch
              </label>
              <textarea
                id="pitch"
                name="pitch"
                value={formData.pitch}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Profile Component
const Profile = () => {
  const { updateUsers, API_BASE_URL } = useFunctions();
  const [isHeaderEditing, setIsHeaderEditing] = useState(false);
  const clientData = useSelector((state) => state.clientAuth.clientData);
  const dispatch = useDispatch();

  // Initialize user state with Redux data or fallback
  const [user, setUser] = useState(clientData || {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    biography: '',
    date_of_birth: '',
    national_id: '',
    education: '',
    experience: '',
    role: 'investor', // Default to lowercase to match backend
    status: 'Active',
    password: '',
    image: null,
    investorPreference: null,
    entrepreneurPreference: null,
  });

  // Handle user updates and sync with backend
  const handleUserUpdate = (updatedUser) => {
    // Ensure _id exists before attempting update
    if (!clientData?._id) {
      toast.error('User ID is missing. Please log in again.');
      return;
    }

    // Dispatch update to backend via updateUsers
    updateUsers(clientData._id, updatedUser, updatedUser.image instanceof File ? updatedUser.image : null)
      .then(() => {
        // Update local state and Redux on successful backend update
        setUser(updatedUser);
        dispatch(updateClientData(updatedUser));
        // toast.success('Profile updated successfully!');
      })
      .catch((err) => {
        // Display error to user (as per comment)
        const errorMessage = err.response?.data?.message || 'Failed to update profile. Please try again.';
        console.error('Failed to update user:', err);
        toast.error(errorMessage);
      });
  };

  // Toggle between Investor and Entrepreneur roles
  const toggleRole = () => {
    const newRole = user.role.toLowerCase() === 'investor' ? 'entrepreneur' : 'investor';
    const updatedUser = {
      ...user,
      role: newRole,
      // Clear preferences for the opposite role
      investorPreference: newRole === 'entrepreneur' ? null : user.investorPreference || {
        investorType: 'individual',
        minInvestment: 0,
        maxInvestment: 0,
        yearsOfExperience: '0-1',
        socialAccounts: [''],
        country: '',
        city: '',
        industries: ['', '', '']
      },
      entrepreneurPreference: newRole === 'investor' ? null : user.entrepreneurPreference || {
        projectName: '',
        projectIndustry: '',
        pitch: '',
        fundingGoal: 0
      }
    };
    handleUserUpdate(updatedUser);
  };

  return (
    <div className="max-w  bg-gray-50 shadow-lg rounded-lg overflow-hidden">
      <style>
        {`
          .bg-gradient-to-r {
            background: linear-gradient(to right, #4f46e5, #3b82f6);
          }
        `}
      </style>
      
      <ProfileHeader 
        user={user} 
        isEditing={isHeaderEditing} 
        onSave={handleUserUpdate} 
        API_BASE_URL={API_BASE_URL}
        setIsEditing={setIsHeaderEditing}
        toggleRole={toggleRole} // Pass toggleRole to ProfileHeader (as per comment)
      />
      
      <div className="p-6">
        <PersonalInfoSection user={user} onSave={handleUserUpdate} />
        <ContactInfoSection user={user} onSave={handleUserUpdate} />
        <InvestorPreferenceSection user={user} onSave={handleUserUpdate} />
        <EntrepreneurPreferenceSection user={user} onSave={handleUserUpdate} />
        <SecuritySection user={user} onSave={handleUserUpdate} />
      </div>
    </div>
  );
};

export default Profile;