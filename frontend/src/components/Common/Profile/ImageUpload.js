import React, {useState} from "react";
import Button from "./Button";

const ImageUpload = ({ user, onSave, API_BASE_URL }) => {
  const [previewUrl, setPreviewUrl] = useState(user.image);
  const [isHovering, setIsHovering] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    onSave({ ...user, image: file });
  };

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

export default ImageUpload;