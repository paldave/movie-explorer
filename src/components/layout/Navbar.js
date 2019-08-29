import React, { Component } from 'react'
import logo from '../../images/astronaut.svg';
import './Navbar.scss';

export default class Navbar extends Component {
  render() {
    return (
      <header className="navbar" id="main-nav">
        <div className="navbar-left">
          <a className="navbar-brands slide-left">
            <img className="navbar-logo" src={logo} alt="Astronaut" />
            <div className="navbar-name">TMEX</div>
          </a>
        </div>
        <div className="navbar-right">
          <ul> 
            <li>TODO_A</li>
            <li>TODO_B</li>
          </ul>          
        </div>
      </header>
    )
  }
}
