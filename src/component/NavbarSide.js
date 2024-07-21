import React from 'react';
import SearchBox from './SearchBox';
import LanguageSelector from './LanguageSelector';
import NavigationLinks from './NavigationLinks';
import NavUser from './NavUser';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);


function NavbarSide({ isFixed, isVisible, toggleSideBar, sideBarVisible }) {
  return (
    <>
      <button className={`sideBartoggleButton ${isFixed ? 'fixed-nav' : ''} ${!isVisible ? 'hidden-nav' : ''}`} onClick={toggleSideBar}>
        {sideBarVisible ? <FontAwesomeIcon icon="fa-solid fa-x" /> : <FontAwesomeIcon icon="fa-solid fa-bars" />}
      </button>
      <div className={`sideBarNav ${sideBarVisible ? 'visible' : ''}`}>
        <div className="sideBarSearch">
          <SearchBox />
        </div>
        <div className='SideBarLinks' onClick={toggleSideBar}>
          <NavigationLinks />
        </div>
        <div className='SideBarLangUser'>
          <LanguageSelector />
          <NavUser />
        </div>
      </div>
    </>
  );
}

export default NavbarSide;
