// NavUser.js
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import userAvatar from '../assets/img-0.24.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group';
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
    navigate('/signup&signin'); // Redirect to sign-in page
  };

  const handleSignUp = () => {
    setIsDropdownOpen(false);
    navigate('/signup&signin'); // Redirect to sign-up page
  };

  const handleProfile = () => {
    setIsDropdownOpen(false);
    navigate('/profile'); // Redirect to profile page
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userFullName');
    setIsLoggedIn(false);
    setUserName('');
    setIsDropdownOpen(false);
    navigate('/'); // Redirect to home page
  };

  const navBorderStyle = {
    // border: isLoggedIn ? 'none' : '2px solid #000',
    width: !isLoggedIn ? '30px' : '16%',
    height: !isLoggedIn ? '30px': '60px',
    border: !isLoggedIn ? 'solid 2px #000' : 'none',
  };

  return (
    <div className="navUser" style={navBorderStyle} onClick={toggleDropdown}>
        {isLoggedIn ? (
          <>
            <img 
              src={userAvatar}
              alt="User Avatar" 
              className="userImage"
              onClick={toggleDropdown}
            />
            <span className='userNameDownIcon'>{userName}<FontAwesomeIcon icon="fa-solid fa-angle-down" /></span>
          </>
        ) : (
            <FontAwesomeIcon icon="user" className='userIconSVG' onClick={toggleDropdown} />
        )}
      {isDropdownOpen && (
        <div className="dropdown">
          {isLoggedIn ? (
            <>
              <button className="dropdownItem" onClick={handleProfile}>Profile</button>
              <button className="dropdownItem" onClick={handleLogout}>Log Out</button>
            </>
          ) : (
            <>
              <Link to='/signup&signin'>
                <button className="dropdownItem" onClick={handleSignIn}>Sign In</button>
              </Link>
              <Link to='/signup&signin'>
                <button className="dropdownItem" onClick={handleSignUp}>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default NavUser;
