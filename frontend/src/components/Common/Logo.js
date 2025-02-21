import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ideaLogo from '../../assets/idea.png';

function Logo() {
  const location = useLocation();

  // Determine the base path based on the URL
  const getBasePath = () => {
    if (location.pathname.startsWith('/employee-portal')) {
      return '/employee-portal/';
    } else if (location.pathname.startsWith('/client-portal')) {
      return '/client-portal/';
    }
    return '/'; // Default to home if neither condition matches
  };

  return (
    <div className='LogoMain' id='LogoMain'>
        <Link to={getBasePath()}>
          <img src={ideaLogo} alt='Loading...' />
        </Link>
        <Link to={getBasePath()}>
          <span className='nameLogo'>IDEA.</span>
        </Link>
    </div>
  );
}

export default Logo;
