import React from 'react';
import SearchBox from './SearchBox';
import LanguageSelector from './LanguageSelector';
import NavigationLinks from './NavigationLinks';
import NavUser from './NavUser';
import NavbarSide from './NavbarSide';
import { useFunctions } from '../useFunctions';
import Logo from './Logo';

function NavBar({ onSignInClick }) {
  const { isFixed, isVisible, toggleSideBar, sideBarVisible } = useFunctions();

  return (
    <>
      <nav className={`${isFixed ? 'fixed-nav' : ''} ${!isVisible ? 'hidden-nav' : ''}`}>
        <div className='spacemin'></div>
        <div className='logoSearchLangUserNav'>
          <Logo />
          <div className='navSearchLangUser'>
            <SearchBox />
            <LanguageSelector />
            <NavUser onSignInClick={onSignInClick} />
          </div>
        </div>
          <div className='spacemin'></div>

        <div className='Links'>
          <NavigationLinks />
        </div>
      </nav>
      <NavbarSide toggleSideBar={toggleSideBar} sideBarVisible={sideBarVisible} isFixed={isFixed} isVisible={isVisible} onSignInClick={onSignInClick} />
    </>
  );
}

export default NavBar;
