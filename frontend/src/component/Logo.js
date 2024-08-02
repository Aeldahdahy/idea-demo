import React from 'react';
import { Link } from 'react-router-dom';
import ideaLogo from '../assets/idea.png';

function Logo() {
  
  return (
    <div className='LogoMain' id='LogoMain'>
        <Link to='/'>
          <img src={ideaLogo} alt='Loading...' />
        </Link>
        <Link to='/'>
          <span className='nameLogo'>IDEA</span>
        </Link>
    </div>
  );
}

export default Logo;