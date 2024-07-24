import React, { useState } from 'react';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userAvatar from '../assets/img-0.24.png';
import { Link } from 'react-router-dom';
import PopUpSignInForm from './PopUpSignInForm';

library.add(fas);

function NavUser() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignIn = () => {
    setIsPopupOpen(true); // Open the popup
    setIsDropdownOpen(false);
  };

  const handleSignUp = () => {
    setIsDropdownOpen(false);
  };

  const handleProfile = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const navBorderStyle = {
    border: isLoggedIn ? 'none' : '2px solid #000', // Hide border when logged in, show otherwise
  };

  return (
    <div className="navUser" style={navBorderStyle}>
      <div className="userIcon" onClick={toggleDropdown}>
        {isLoggedIn ? (
          <img 
            src={userAvatar}
            alt="" 
            className="userImage"
            onClick={toggleDropdown}
          />
        ) : (
          <FontAwesomeIcon icon="user" onClick={toggleDropdown} />
        )}
      </div>
      {isDropdownOpen && (
        <div className="dropdown">
          {isLoggedIn ? (
            <>
              <button className="dropdownItem" onClick={handleProfile}>Profile</button>
              <button className="dropdownItem" onClick={handleLogout}>Log Out</button>
            </>
          ) : (
            <>
              <button className="dropdownItem" onClick={handleSignIn}>Sign In</button>
              <Link to='/signup&signin'>
                <button className="dropdownItem" onClick={handleSignUp}>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      )}
      {isPopupOpen && <PopUpSignInForm onClose={closePopup} />}
    </div>
  );
}

export default NavUser;
