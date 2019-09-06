import React, { Component } from 'react'
import './SplashScreen.scss';

export default class Navbar extends Component {
  render() {
    return (
      <div className="splash-screen">
        <div className="loader-solar">
          <div className="orbit orbit-first">
            <div className="planet" />
            <div className="orbit orbit-second">
              <div className="planet" />
              <div className="orbit orbit-third">
                <div className="planet" />
                <div className="planet-main" />
              </div>
            </div>
          </div>
        </div>
        <p>Loading...</p>
      </div>
    )
  }
}
