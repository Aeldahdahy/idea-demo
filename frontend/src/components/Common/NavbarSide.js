import React from 'react';
// import SearchBox from '../Common/SearchBox';
// import LanguageSelector from './LanguageSelector';
import NavigationLinks from './NavigationLinks';
import NavUser from './NavUser';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Notification from './Notification';

library.add(fas);

function NavbarSide({
  isFixed,
  isVisible,
  toggleSideBar,
  sideBarVisible,
  onSignInClick,
  isAuthenticated,
  role,
  clientRole,
}) {
  return (
    <>
      <button
        className={`
          navbarbutton
          z-50
          p-3
          text-dark
          transition-all
          duration-300
          focus:outline-none
          ${isFixed ? 'fixed top-2 right-4' : 'absolute top-1 right-4'}
          ${!isVisible ? 'hidden' : ''}
        `}
        onClick={toggleSideBar}
        aria-label="Toggle sidebar"
        
      >
        {sideBarVisible ? (
          <FontAwesomeIcon icon="fa-solid fa-x" size="lg" />
        ) : (
          <FontAwesomeIcon icon="fa-solid fa-bars" size="lg" />
        )}
      </button>

      <div
        className={`
          fixed
          top-0
          right-0
          h-full
          w-100
          bg-white
          border-l
          border-gray-200
          shadow-md
          transform
          transition-transform
          duration-300
          z-40
          overflow-y-auto
          ${sideBarVisible ? 'translate-x-0' : 'translate-x-full'}
        `}
      >

        

        <div className="p-8 border-b border-gray-100">
          {/* <SearchBox /> */}
        </div>

        <div className="mt-auto px-4 py-4 border-t border-gray-100 flex flex-col gap-4 align-items-center">
          {/* <LanguageSelector /> */}
          {/* <Notification /> */}
          <NavUser
            isAuthenticated={isAuthenticated}
            role={role}
            clientRole={clientRole}
            onSignInClick={onSignInClick}
          />
        </div>

        <div className="px-4 py-2 SideBarLinks gap-6" onClick={toggleSideBar}>
          <NavigationLinks
            isAuthenticated={isAuthenticated}
            role={role}
            clientRole={clientRole}
          />
        </div>

        
      </div>
    </>
  );
}

export default NavbarSide;