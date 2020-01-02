import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { PROPORTION, getUrl } from '../../helpers/image';
import { getYear } from '../../helpers/movie';
import { FaStar } from "react-icons/fa";
import './ItemThumb.scss';

export default class ItemThumb extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    apiConfig: PropTypes.object.isRequired
  }

  static defaultProps = {
    showMeta: false
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
    const { data, showMeta } = this.props;
    const { imageConfig, genres } = this.props.apiConfig;
    
    return (
      <div className="item-card item-card-thumb">
        <div className="card-top">
          {showMeta &&
            <div className="card-meta">
              <div className="card-meta-rating">
                <span className="vote-number">{data.vote_average}</span>
                <span><FaStar/></span>
              </div>
              <div className="card-meta-details">
                <span>{data.title || data.name}</span>
                <br/>
                <span>{getYear(data.release_date || data.first_air_date)}</span>
              </div>
            </div>
          }
          {this.renderImage(imageConfig, data.poster_path)}
        </div>
      </div>
    )
  }
}
