import React from 'react';
import ImageUpload from './ImageUpload';

const ProfileHeader = ({ user, isEditing, setIsEditing, onSave, API_BASE_URL, toggleRole }) => {
  const fullName = user?.fullName || '';
  const email = user?.email || '';
  const role = user?.role || '';
  const status = user?.status || '';
  const image = user?.image || null;

  return (
    <div className="bg-gradient-to-r to-indigo-300 from-blue-800 text-white p-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-4 md:mb-0 md:mr-6">
          {isEditing && console.log('ImageUpload is rendering')}
            {isEditing ? (
              <ImageUpload 
                user={{ ...user, fullName, image }} 
                onSave={onSave} 
                API_BASE_URL={API_BASE_URL}
              />
            ) : (
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                {image ? (
                  <img 
                    src={typeof image === 'string' ? `${API_BASE_URL}/Uploads/user_images/${image}` : image} 
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

export default ProfileHeader
