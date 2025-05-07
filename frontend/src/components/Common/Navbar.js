// Navbar.js
import React from 'react';
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

  return (
    <>
      <nav className={`${isFixed ? 'fixed-nav' : ''} ${!isVisible ? 'hidden-nav' : ''}`}>
        <div className='spacemin'></div>
        <div className='logoSearchLangUserNav'>
          <Logo />
          <div className='navSearchLangUser'>
            {/* <SearchBox /> */}
            {/* <LanguageSelector /> */}
            <Notification 
              isAuthenticated={isAuthenticated}
              isFixed={isFixed}
              isVisible={isVisible}
            />
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