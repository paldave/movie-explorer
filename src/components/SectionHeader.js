import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SectionHeader.scss';

const SectionHeader = ({ title, linkName, linkTo }) => {
  return (
    <div className="section-header">
      <span className="title">{title}</span>
      { linkTo && (
        <Link to={linkTo}>
          <span className="link-name">{linkName}</span>
        </Link>
      )}
    </div>
  )
}

SectionHeader.propTypes = { 
  title: PropTypes.string.isRequired,
  linkName: PropTypes.string,
  linkTo: PropTypes.string
};

export default SectionHeader;
