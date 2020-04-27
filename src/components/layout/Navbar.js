import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import logo from '../../images/astronaut.svg';
import './Navbar.scss';

export default class Navbar extends Component {
  render() {
    return (
      <header className="navbar-wrapper">
        <div className="navbar" id="main-nav">
          <div className="navbar-left">
            <Link to="/" className="navbar-brands slide-left">
              <img className="navbar-logo" src={logo} alt="Astronaut" />
              <div className="navbar-name">TMEX</div>
            </Link>
          </div>
          <div className="navbar-right">
            <ul> 
              <Popup
                trigger={<li className="navbar-item">Movies</li>}
                position="bottom center"
                on="hover"
                closeOnDocumentClick
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
            </ul>          
          </div>
        </div>
      </header>
    )
  }
}
