import React, { useState } from 'react';
import Button from './Button';
import { toast } from 'react-toastify';

const InvestorPreferenceSection = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    investorPreference: {
      investorType: user.investorPreference?.investorType || 'individual',
      minInvestment: user.investorPreference?.minInvestment || 0,
      maxInvestment: user.investorPreference?.maxInvestment || 0,
      industries: user.investorPreference?.industries || ['', '', '']
    },
    yearsOfExperience: user.yearsOfExperience || '0-1',
    socialAccounts: user.socialAccounts?.map(acc => {
      try {
        return typeof acc === 'string' && acc.startsWith('[') ? JSON.parse(acc)[0] : acc;
      } catch {
        return acc;
      }
    }) || [''],
    country: user.country || '',
    city: user.city || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['investorType', 'minInvestment', 'maxInvestment'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        investorPreference: { ...prev.investorPreference, [name]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      investorPreference: { ...prev.investorPreference, [name]: Number(value) }
    }));
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
    const updatedIndustries = [...formData.investorPreference.industries];
    updatedIndustries[index] = value;
    setFormData((prev) => ({
      ...prev,
      investorPreference: { ...prev.investorPreference, industries: updatedIndustries }
    }));
  };

  const handleSubmit = () => {
    // Validate investorPreference fields
    if (formData.investorPreference.industries.length < 3 || formData.investorPreference.industries.some(ind => !ind.trim())) {
      toast.error('Please provide at least 3 valid industries');
      return;
    }
    
    if (!['individual', 'company'].includes(formData.investorPreference.investorType)) {
      toast.error('Investor type must be either "individual" or "company"');
      return;
    }

    if (formData.investorPreference.minInvestment > formData.investorPreference.maxInvestment) {
      toast.error('Maximum investment must be greater than or equal to minimum investment');
      return;
    }

    if (formData.investorPreference.minInvestment < 0 || formData.investorPreference.maxInvestment > 1000000) {
      toast.error('Investment range must be between 0 and 1,000,000 EGP');
      return;
    }

    // Validate root-level fields
    if (formData.socialAccounts.length === 0 || formData.socialAccounts.some(acc => !acc.trim())) {
      toast.error('Please provide at least one valid social account');
      return;
    }

    if (!formData.country.trim() || !formData.city.trim()) {
      toast.error('Country and city are required');
      return;
    }

    if (!['0-1', '1-3', '3-5', '5+', 'N/A'].includes(formData.yearsOfExperience)) {
      toast.error('Invalid years of experience');
      return;
    }

    // Construct updatedUser with correct structure
    const updatedUser = {
      ...user,
      role: 'investor',
      country: formData.country,
      city: formData.city,
      socialAccounts: formData.socialAccounts.filter(acc => acc.trim() !== ''),
      yearsOfExperience: formData.yearsOfExperience,
      investorPreference: {
        investorType: formData.investorPreference.investorType,
        minInvestment: formData.investorPreference.minInvestment,
        maxInvestment: formData.investorPreference.maxInvestment,
        industries: formData.investorPreference.industries
      },
      entrepreneurPreference: null // Clear entrepreneurPreference for investors
    };

    console.log('InvestorPreferenceSection updatedUser:', updatedUser);

    onSave(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      investorPreference: {
        investorType: user.investorPreference?.investorType || 'individual',
        minInvestment: user.investorPreference?.minInvestment || 0,
        maxInvestment: user.investorPreference?.maxInvestment || 0,
        industries: user.investorPreference?.industries || ['', '', '']
      },
      yearsOfExperience: user.yearsOfExperience || '0-1',
      socialAccounts: user.socialAccounts?.map(acc => {
        try {
          return typeof acc === 'string' && acc.startsWith('[') ? JSON.parse(acc)[0] : acc;
        } catch {
          return acc;
        }
      }) || [''],
      country: user.country || '',
      city: user.city || ''
    });
    setIsEditing(false);
  };

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
        user.investorPreference && user.investorPreference.industries?.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Investor Type</p>
                <p className="text-gray-800 capitalize">{user.investorPreference.investorType}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Years of Experience</p>
                <p className="text-gray-800">{user.yearsOfExperience} years</p>
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
                <p className="text-gray-800">{user.city}, {user.country}</p>
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
                  {formData.socialAccounts.map((account, index) => (
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
                value={formData.investorPreference.investorType}
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
                  value={formData.investorPreference.minInvestment}
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
                  value={formData.investorPreference.maxInvestment}
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
              Industries of Interest (Select at least 3)
            </label>
            <div className="space-y-2">
              {formData.investorPreference.industries.map((industry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => handleIndustryChange(index, e.target.value)}
                    placeholder={`Industry ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required={index < 3}
                  />
                  {index >= 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const updatedIndustries = [...formData.investorPreference.industries];
                        updatedIndustries.splice(index, 1);
                        setFormData((prev) => ({
                          ...prev,
                          investorPreference: { ...prev.investorPreference, industries: updatedIndustries }
                        }));
                      }}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    investorPreference: {
                      ...prev.investorPreference,
                      industries: [...prev.investorPreference.industries, '']
                    }
                  }));
                }}
                className="mt-2"
              >
                Add Industry
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">You must select at least 3 industries.</p>
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
        </div>
      )}
    </div>
  );
};

export default InvestorPreferenceSection;