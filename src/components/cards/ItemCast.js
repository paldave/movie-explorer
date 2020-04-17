import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImageUnavailable from '../layout/ImageUnavailable';
import { PROPORTION, getUrl } from '../../helpers/image';
import './ItemThumb.scss';
import './ItemCast.scss';

export default class ItemCast extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    apiConfig: PropTypes.object.isRequired
  }

  static defaultProps = {
    PROFILE_THUMBNAIL: false
  }

  renderImage(imageConfig, path) {
    if (!path) {
      return <ImageUnavailable/>;
    }

    const proportionType = 
      this.props.PROFILE_THUMBNAIL ?
      PROPORTION.PROFILE_THUMBNAIL : 
      PROPORTION.THUMBNAIL; 

    const size = imageConfig.availableSizes[proportionType];
    const url = getUrl(size, imageConfig.baseUrl, path);

    return (
      <img src={url} alt=""/>
    );
  }

  render() {
    const { data, PROFILE_THUMBNAIL } = this.props;
    const { imageConfig } = this.props.apiConfig;

    return (
      <div className={`item-card item-card-thumb item-card-cast ${PROFILE_THUMBNAIL ? 'extra-small' : ''}`}>
        <Link to={`/person-details/${data.id}`}>
          <div className="card-top">
            <div className="card-meta"/>
            {this.renderImage(imageConfig, data.profile_path)}
            {!PROFILE_THUMBNAIL && (
              <div className="card-meta-character">
                <span className="actor">{data.name}</span> <br/>
                <span className="white-med-color character-name">{data.character}</span>
              </div>
            )}
          </div>
        </Link>
      </div>
    )
  }
}
