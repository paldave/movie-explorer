import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import { IoIosSearch } from 'react-icons/io';
import logo from '../../images/astronaut.svg';
import './Navbar.scss';

const Navbar = () => {
  const history = useHistory();
  const searchAlwaysVisible = history.location.pathname === '/search';
  const [showSearchBar, setShowSearchBar] = useState(searchAlwaysVisible);

  useEffect(() => {
    setShowSearchBar(searchAlwaysVisible);
  }, [searchAlwaysVisible]);

  const searchIcon = () => {
    return (
      <li 
        className={`search-icon ${showSearchBar ? 'disabled' : ''}`}
        onClick={() => (setShowSearchBar((prevState) => setShowSearchBar(!prevState)))}
      >
        <IoIosSearch/>
      </li>
    );
  }

  return (
    <header className="navbar-wrapper">
      <div className="navbar" id="main-nav">
        <div className="navbar-left">
          <Link to="/" className="navbar-brands slide-left">
            <img className="navbar-logo" src={logo} alt="Astronaut" />
            <div className="navbar-name">TMEX</div>
          </Link>
        </div>
        <Sidebar
          searchIcon={searchIcon}
          showSearchBar={showSearchBar}
          setShowSearchBar={setShowSearchBar}
        />
        <div className="navbar-right">
          <ul> 
            <Popup
              trigger={<li className="navbar-item">Movies</li>}
              position="bottom center"
              on="hover"
              closeOnDocumentClick
              arrow={false}
            >
              <div className="popup-menu">
                <Link to="/movies" className="item">
                  <span>Popular</span>
                </Link>
                <Link to="/movies/upcoming" className="item">
                  <span>Upcoming</span>
                </Link>
                <Link to="/movies/top-rated" className="item">
                  <span>Top rated</span>
                </Link>
              </div>
            </Popup>
            <Popup
              trigger={<li className="navbar-item">Series</li>}
              position="bottom center"
              on="hover"
              closeOnDocumentClick
              arrow={false}
            >
              <div className="popup-menu">
                <Link to="/tv" className="item">
                  <span>Popular</span>
                </Link>
                <Link to="/tv/top-rated" className="item">
                  <span>Top rated</span>
                </Link>
              </div>
            </Popup>
            {!searchAlwaysVisible && (
              <>
                {searchIcon()}
              </>
            )}
          </ul>          
        </div>
      </div>
      <SearchBar 
        showSearchBar={showSearchBar}
        setShowSearchBar={setShowSearchBar}
        searchAlwaysVisible={searchAlwaysVisible}
      />
    </header>
  );
}

export default Navbar;