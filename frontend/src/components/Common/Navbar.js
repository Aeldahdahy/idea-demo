// Navbar.js
import React, { useState, useEffect } from 'react';
// import SearchBox from '../Common/SearchBox';
// import LanguageSelector from './LanguageSelector';
import NavigationLinks from './NavigationLinks';
import NavUser from './NavUser';
import NavbarSide from './NavbarSide';
import { useFunctions } from '../../useFunctions';
import Logo from '../Common/Logo';
import Notification from './Notification';

function NavBar({ isAuthenticated, role, clientRole, onSignInClick }) {
  const { isFixed, isVisible, toggleSideBar, sideBarVisible } = useFunctions();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 870);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 870);
    };

    window.addEventListener('resize', handleResize);

    // Set initial value
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav className={`${isFixed ? 'fixed-nav' : ''} ${!isVisible ? 'hidden-nav' : ''}`}>
        <div className='spacemin'></div>
        <div className='logoSearchLangUserNav'>
          <Logo />
          {isMobile ? (
            <Notification 
              isAuthenticated={isAuthenticated}
              isFixed={isFixed}
              isVisible={isVisible}
            />
          ) : null}
          <div className='navSearchLangUser'>
            {/* <SearchBox /> */}
            {/* <LanguageSelector /> */}
            {!isMobile ? (
              <Notification 
                isAuthenticated={isAuthenticated}
                isFixed={isFixed}
                isVisible={isVisible}
              />
            ) : null}
            <NavUser
              isAuthenticated={isAuthenticated}
              role={role}
              clientRole={clientRole}
              onSignInClick={onSignInClick}
              isFixed={isFixed}
              isVisible={isVisible}
            />
          </div>
        </div>
        <div className='spacemin'></div>

        <div className='Links'>
          <NavigationLinks
            isAuthenticated={isAuthenticated}
            role={role}
            clientRole={clientRole}
          />
        </div>
      </nav>
      <NavbarSide
        toggleSideBar={toggleSideBar}
        sideBarVisible={sideBarVisible}
        isFixed={isFixed}
        isVisible={isVisible}
        isAuthenticated={isAuthenticated}
        role={role}
        clientRole={clientRole}
        onSignInClick={onSignInClick}
      />
    </>
  );
}

export default NavBar;
