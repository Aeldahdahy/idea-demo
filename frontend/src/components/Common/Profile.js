import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFunctions } from '../../useFunctions';
import { updateClientData } from '../../redux/clientAuthSlice';
import { toast } from 'react-toastify';

import ProfileHeader from './Profile/ProfileHeader';
import InvestorPreferenceSection from './Profile/InvestorPreferenceSection';
import SecuritySection from './Profile/SecuritySection';
import ContactInfoSection from './Profile/ContactInfoSection';
import PersonalInfoSection from './Profile/PersonalInfoSection';
import EntrepreneurPreferenceSection from './Profile/EntrepreneurPreferenceSection';

const Profile = () => {
  const { updateUsers, API_BASE_URL } = useFunctions();
  const [isHeaderEditing, setIsHeaderEditing] = useState(false);
  const clientData = useSelector((state) => state.clientAuth.clientData);
  const dispatch = useDispatch();

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
    role: clientData?.role || 'investor',
    status: 'Active',
    password: '',
    image: null,
    investorPreference: null,
    entrepreneurPreference: null,
    yearsOfExperience: '0-1',
    socialAccounts: [''],
    country: '',
    city: ''
  });

  const handleUserUpdate = (updatedUser) => {
    if (!clientData?._id) {
      toast.error('User ID is missing. Please log in again.');
      return;
    }

    updateUsers(clientData._id, updatedUser, updatedUser.image instanceof File ? updatedUser.image : null)
      .then(() => {
        setUser(updatedUser);
        dispatch(updateClientData(updatedUser));
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || 'Failed to update profile. Please try again.';
        console.error('Failed to update user:', err);
        console.error(errorMessage);
        // toast.error(errorMessage);
      });
  };

  const toggleRole = () => {
    const confirmSwitch = window.confirm(
      `Are you sure you want to switch to ${user.role.toLowerCase() === 'investor' ? 'entrepreneur' : 'investor'} role? This will clear your current role-specific preferences.`
    );
    if (!confirmSwitch) return;

    const newRole = user.role.toLowerCase() === 'investor' ? 'entrepreneur' : 'investor';
    const updatedUser = {
      ...user,
      role: newRole,
      investorPreference: newRole === 'investor' ? {
        investorType: 'individual',
        minInvestment: 0,
        maxInvestment: 0,
        industries: ['', '', '']
      } : null,
      entrepreneurPreference: newRole === 'entrepreneur' ? {
        projectName: '',
        projectIndustry: '',
        pitch: '',
        fundingGoal: 0
      } : null,
      yearsOfExperience: newRole === 'investor' ? '0-1' : 'N/A',
      socialAccounts: user.socialAccounts || [''],
      country: user.country || '',
      city: user.city || ''
    };
    handleUserUpdate(updatedUser);
  };

  return (
    <div className="max-w bg-gray-50 shadow-lg rounded-lg overflow-hidden">
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
        toggleRole={toggleRole}
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