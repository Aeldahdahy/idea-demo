import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fas);

function NavUser() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navUser" onClick={toggleDropdown}>
      <div className="userIconContainer">
        <div className='userIconSvgContainer'>
          <FontAwesomeIcon icon="user" className='userIconSVG' />
        </div>
      </div>
      {isDropdownOpen && (
        <div className="dropdownMenu">
          <Link to='/client-portal' className="dropdownItem" onClick={toggleDropdown}>
            <span>Client</span>
          </Link>
          <Link to='/employee-portal' className="dropdownItem" onClick={toggleDropdown}>
            <span>Employee</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavUser;
