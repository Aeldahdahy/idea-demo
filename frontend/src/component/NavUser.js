// NavUser.js
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import userAvatar from '../assets/img-0.24.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useFunctions } from '../useFunctions';

library.add(fas);

function NavUser() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.user.fullName);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignIn = () => {
    setIsDropdownOpen(false);
  };

  const handleSignUp = () => {
    setIsDropdownOpen(false);
  };

  const handleProfile = () => {
    setIsDropdownOpen(false);
  };
  const {signOutDistroySession} = useFunctions();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserName('');
    setIsDropdownOpen(false);
    try {
      signOutDistroySession();
    } finally {
      navigate('/');
    }
  };

  return (
    <div className="navUser" onClick={toggleDropdown}>
      <div className="userIconContainer">
        {isLoggedIn ? (
          <>
            <img 
              src={userAvatar}
              alt="User Avatar" 
              className="userImage"
            />
            <span className="userName">{userName}</span>
            <FontAwesomeIcon icon="fa-solid fa-angle-down" className="dropdownIcon" />
          </>
        ) : (
          <div className='userIconSvgContainer'>
            <FontAwesomeIcon icon="user" className='userIconSVG' />
          </div>
        )}
      </div>
      {isDropdownOpen && (
        <div className="dropdownMenu">
          {isLoggedIn ? (
            <>
              <div className="dropdownItem" onClick={handleProfile}>
                <span>Profile</span>
              </div>
              <div className="dropdownItem" onClick={handleLogout}>
                <span>Log Out</span>
              </div>
            </>
          ) : (
            <>
              <Link to='/client-portal' className="dropdownItem" onClick={handleSignIn}>
                <span>Sign In</span>
              </Link>
              <Link to='/employee-portal' className="dropdownItem" onClick={handleSignUp}>
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default NavUser;
