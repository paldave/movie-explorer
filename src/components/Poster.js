import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PROPORTION, getUrl } from '../helpers/image';

export default class Poster extends Component {
  static propTypes = {
    posterPath: PropTypes.string,
    imageConfig: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.SIZE = PROPORTION.POSTER;
  }

  render() {
    const { posterPath, imageConfig } = this.props;
    const size = imageConfig.availableSizes[this.SIZE];
    const imageUrl = getUrl(size, imageConfig.baseUrl, posterPath);
    
    return (
      <img src={imageUrl} className="poster-image"/>
    )
  }
}
