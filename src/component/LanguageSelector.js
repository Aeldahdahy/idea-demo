import React from 'react';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFunctions } from '../useFunctions';

library.add(fas);

function LanguageSelector() {
  const {toggleDropdown, currentLanguage, dropdownVisible, selectLanguage } = useFunctions();

  return (
    <div className='navlang'> 
      <FontAwesomeIcon icon="globe"  onMouseEnter={toggleDropdown}/>
      {currentLanguage}
      {dropdownVisible ? (
        <FontAwesomeIcon icon="angle-up"  onMouseEnter={toggleDropdown}/>
      ) : (
        <FontAwesomeIcon icon="angle-down"  onMouseEnter={toggleDropdown}/>
      )}
      {dropdownVisible && (
        <div className='dropdownMenu'>
          <div className='dropdownItem' onClick={() => selectLanguage('En')}><span onClick={toggleDropdown}>English</span></div>
          <div className='dropdownItem' onClick={() => selectLanguage('Ar')}><span onClick={toggleDropdown}>Arabic</span></div>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;