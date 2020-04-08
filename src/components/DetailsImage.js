import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageUnavailable from './layout/ImageUnavailable';
import { PROPORTION, getUrl } from '../helpers/image';

export default class DetailsImage extends Component {
  static propTypes = {
    imagePath: PropTypes.string,
    imageConfig: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.SIZE = PROPORTION.POSTER;
  }

  render() {
    const { imagePath, imageConfig } = this.props;

    if (!imagePath) {
      return <ImageUnavailable/>;
    }

    const size = imageConfig.availableSizes[this.SIZE];
    const imageUrl = getUrl(size, imageConfig.baseUrl, imagePath);
    
    return (
      <img src={imageUrl} className="details-image" alt=""/>
    )
  }
}
