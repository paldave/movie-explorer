import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PROPORTION, getUrl } from '../helpers/image';
import './Backdrop.scss';

export default class Backdrop extends Component {
  static propTypes = {
    backdropPath: PropTypes.string,
    imageConfig: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.SIZE = PROPORTION.BACKDROP;
  }

  render() {
    const { backdropPath, imageConfig } = this.props;
    const size = imageConfig.availableSizes[this.SIZE];
    const imageUrl = getUrl(size, imageConfig.baseUrl, backdropPath);

    const imageStyle = { 
      backgroundPosition: 'center 0px',
      backgroundImage: `url(${imageUrl})`
    }
    
    return (
      <div className={`backdrop-container ${!backdropPath ? 'no-background' : ''}`}>
        <div className="backdrop-wrapper">
          <div style={imageStyle} className="backdrop-image"/>
          <div className="backdrop-blur"/>
        </div>
      </div>
    )
  }
}
