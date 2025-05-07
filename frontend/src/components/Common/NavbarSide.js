import React from 'react';
// import SearchBox from '../Common/SearchBox';
// import LanguageSelector from './LanguageSelector';
import NavigationLinks from './NavigationLinks';
import NavUser from './NavUser';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notification from './Notification';

library.add(fas);


function NavbarSide({ isFixed, isVisible, toggleSideBar, sideBarVisible, onSignInClick, isAuthenticated, role, clientRole  }) {
  return (
    <>
      <button className={`sideBartoggleButton ${isFixed ? 'fixed-nav' : ''} ${!isVisible ? 'hidden-nav' : ''}`} onClick={toggleSideBar}>
        {sideBarVisible ? <FontAwesomeIcon icon="fa-solid fa-x" /> : <FontAwesomeIcon icon="fa-solid fa-bars" />}
      </button>
      <div className={`sideBarNav ${sideBarVisible ? 'visible' : ''}`}>
        <div className="sideBarSearch">
          {/* <SearchBox /> */}
        </div>
        <div className='SideBarLinks' onClick={toggleSideBar}>
        <NavigationLinks
            isAuthenticated={isAuthenticated}
            role={role}
            clientRole={clientRole}
          />
        </div>
        <div className='SideBarLangUser'>
          {/* <LanguageSelector /> */}
          <Notification />
          <NavUser
              isAuthenticated={isAuthenticated}
              role={role}
              clientRole={clientRole}
              onSignInClick={onSignInClick}
            />
        </div>
      </div>
    </>
  );
}

export default NavbarSide;
