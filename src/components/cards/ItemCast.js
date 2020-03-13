import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PROPORTION, getUrl } from '../../helpers/image';
import './ItemThumb.scss';
import './ItemCast.scss';

export default class ItemCast extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    apiConfig: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.SIZE = PROPORTION.THUMBNAIL;
  }

  renderImage(imageConfig, path) {
    const size = imageConfig.availableSizes[this.SIZE];
    const url = getUrl(size, imageConfig.baseUrl, path);

    return (
      <img src={url} />
    );
  }

  render() {
    const { data } = this.props;
    const { imageConfig } = this.props.apiConfig;

    return (
      <div className="item-card item-card-thumb">
        <div className="card-top">
          <div className="card-meta"/>
          {this.renderImage(imageConfig, data.profile_path)}
          <div className="card-meta-character">
            <span>{data.name}</span> <br/>
            <span className="white-med-color">{data.character}</span>
          </div>
        </div>
      </div>
    )
  }
}