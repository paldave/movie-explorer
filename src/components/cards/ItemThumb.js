import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImageUnavailable from '../layout/ImageUnavailable';
import { PROPORTION, getUrl } from '../../helpers/image';
import { getYear } from '../../helpers/movie';
import { FaStar } from 'react-icons/fa';
import './ItemThumb.scss';

export default class ItemThumb extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    apiConfig: PropTypes.object.isRequired,
    itemType: PropTypes.string.isRequired
  }

  static defaultProps = {
    showMeta: true
  }

  constructor(props) {
    super(props);

    this.SIZE = PROPORTION.THUMBNAIL;
  }

  renderImage(imageConfig, path) {
    if (!path) {
      return <ImageUnavailable/>;
    }

    const size = imageConfig.availableSizes[this.SIZE];
    const url = getUrl(size, imageConfig.baseUrl, path);

    return (
      <img src={url} />
    );
  }

  render() {
    const { data, showMeta, itemType } = this.props;
    const { imageConfig } = this.props.apiConfig;

    return (
      <div className="item-card item-card-thumb">
        <Link to={`/${itemType}/details/${data.id}`}>
          <div className="card-top">
            {showMeta &&
              <div className={`card-meta ${!data.poster_path ? 'show-title' : ''}`}>
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
        </Link>
      </div>
    )
  }
}
