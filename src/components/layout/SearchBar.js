import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';
import './SearchBar.scss';

const SearchBar = ({ showSearchBar, setShowSearchBar }) => {
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
  }, [showSearchBar]);

  const handleSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('>>>> submit');
  }

  return (
    <section 
      className={`search-bar ${!showSearchBar ? 'hide' : ''}`}
    >
      <div className="search-bar-wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for your movie, tv serie or person..."
            value={searchValue}
            onChange={handleSearchInput}
            ref={searchInputRef}
          />
          <button 
            className={`search-bar-button`} 
            onClick={handleSubmit}
          >
            <span className="label">Search</span>
          </button>
          <span 
            className="search-close"
            onClick={() => (setShowSearchBar((prevState) => setShowSearchBar(!prevState)))}
          >
            <IoMdClose/>
          </span>
        </form>
      </div>
    </section>
  );
};

SearchBar.propTypes = {
  showSearchBar: PropTypes.bool.isRequired,
  setShowSearchBar: PropTypes.func.isRequired
};

export default SearchBar
