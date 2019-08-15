import React, { Component } from 'react'
import logo from '../../images/tmdbp_logo.png';
import './Navbar.scss';

export default class Navbar extends Component {
  render() {
    return (
      <header className="navbar" id="main-nav">
        <div className="navbar-left">
          <a className="navbar-brands">
            <img className="navbar-logo-api" src={logo} alt="Powered by TMDB" />
          </a>
        </div>
        <div className="navbar-right">
          <ul> 
            <li>TODO_B</li>
            <li>TODO_B</li>
          </ul>          
        </div>
      </header>
    )
  }
}
