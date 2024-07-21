import React from 'react';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFunctions } from '../useFunctions';

library.add(fas);

function SearchBox() {
    const { searchTerm, handleInputChange, handleSearch } = useFunctions();
  
    return (
      <form className="searchBox">
        <input
          className="searchInput"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="searchButton" onClick={handleSearch}>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </button>
      </form>
    );
}

export default SearchBox;