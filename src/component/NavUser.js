import React, { useState } from 'react';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userAvatar from '../assets/img-0.24.png';
import { Link } from 'react-router-dom';

library.add(fas);

function NavUser() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignIn = () => {
    setIsLoggedIn(true);
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
          <FontAwesomeIcon icon="user"  onClick={toggleDropdown} />
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
              <button className="dropdownItem" onClick={handleSignUp} as={Link} to='/signup&signin'>Sign Up</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default NavUser;
