import React, { useState } from 'react';
import SideNav from 'react-simple-sidenav';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Sidebar.scss';

const Sidebar = () => {
  const [showSidebar, setSidebar] = useState();

  const sidebarItems = [
    <div className="category-main home" onClick={() => setSidebar(false)}>
      <h3 className="category-name">
        <Link to="/">Home</Link>
      </h3>
    </div>,
    <div className="category-main" onClick={() => setSidebar(false)}>
      <h3 className="category-name">
        <Link to="/movies">Movies</Link>
      </h3>
      <ul className="category-list">
        <Link to="/movies" className="category-item">
          <li>Popular</li>
        </Link>
        <Link to="/movies/upcoming" className="category-item">
          <li>Upcoming</li>
        </Link>
        <Link to="/movies/top-rated" className="category-item">
          <li>Top rated</li>
        </Link>
      </ul>
    </div>,
    <div className="category-main" onClick={() => setSidebar(false)}>
      <h3 className="category-name">
        <Link to="/tv">Series</Link>
      </h3>
      <ul className="category-list">
        <Link to="/tv" className="category-item">
          <li>Popular</li>
        </Link>
        <Link to="/tv/top-rated" className="category-item">
          <li>Top rated</li>
        </Link>
      </ul>
    </div>
  ];

  return (
    <div className="sidebar">
      <div className="hamburger-icon">
        <GiHamburgerMenu onClick={() => setSidebar(true)}/>
      </div>
      <SideNav 
        showNav={showSidebar} 
        onHideNav={() => setSidebar(false)} 
        title={false}
        items={sidebarItems}
        titleStyle={{ backgroundColor: '#4CAF50' }}
        itemStyle={{ backgroundColor: '#fff' }}
        itemHoverStyle={{ backgroundColor: '#CDDC39' }}
      />
    </div>
  )
}

export default Sidebar;
