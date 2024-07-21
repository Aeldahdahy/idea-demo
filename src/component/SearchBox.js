import React from 'react';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFunctions } from '../useFunctions';

library.add(fas);

function SearchBox() {
  const { searchTerm, handleInputChange, handleSearch } = useFunctions();

  return (
    <form className="searchBox" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
      <div className="searchContainer">
        <button type="button" className="iconButton" onClick={handleSearch}>
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </button>
        <span className="separator">|</span>
        <input
          className="searchInput"
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
        />        
      </div>
    </form>
  );
}

export default SearchBox;
