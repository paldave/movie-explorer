import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import './SearchBar.scss';

const SearchBar = ({ showSearchBar, setShowSearchBar, searchAlwaysVisible }) => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (!searchAlwaysVisible) {
      searchInputRef.current.focus();
    }

    if (!showSearchBar && searchValue.length > 0) {
      setSearchValue('');
    }
  }, [searchAlwaysVisible, showSearchBar, searchValue.length]);

  useEffect(() => {
    if (history.location.state) {
      setSearchValue(history.location.state.query);
    } 
  }, [history.location.state]);

  const handleSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchValue === '') {
      return;
    }

    searchInputRef.current.blur();

    history.push({
      pathname: '/search',
      state: { query: searchValue }
    })
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
          {!searchAlwaysVisible && (
            <span 
              className="search-close"
              onClick={() => (setShowSearchBar((prevState) => setShowSearchBar(!prevState)))}
            >
              <IoMdClose/>
            </span>
          )}
        </form>
      </div>
    </section>
  );
};

SearchBar.propTypes = {
  showSearchBar: PropTypes.bool,
  setShowSearchBar: PropTypes.func,
  searchAlwaysVisible: PropTypes.bool
};

export default SearchBar
