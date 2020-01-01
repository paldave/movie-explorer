import React from 'react';
import PropTypes from 'prop-types';
import './SectionHeader.scss';

export default function SectionHeader(props) {
  return (
    <div className="section-header">
      <span className="section-header-title">{props.title}</span>
    </div>
  )
}

SectionHeader.propTypes = { title: PropTypes.string.isRequired };
