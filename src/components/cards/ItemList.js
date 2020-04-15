import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ItemThumb from './ItemThumb';
import ItemCast from './ItemCast';
import SimpleLoader from '../layout/SimpleLoader';
import { ITEM_TYPE } from '../../helpers/itemType';
import { IoIosArrowDropright } from 'react-icons/io';
import './ItemList.scss';

export default class ItemList extends Component {
  static propTypes = {
    data: PropTypes.array,
    apiConfig: PropTypes.object.isRequired,
    viewMore: PropTypes.bool,
    viewMoreLink: PropTypes.string
  }

  static defaultProps = {
    viewMore: true,
    itemsPerRow: 12
  }

  renderThumbnail(item, apiConfig) {
    const { media_type, episode_count, first_air_date, release_date } = item;
    
    let itemType;
    if (media_type === ITEM_TYPE.TV || episode_count || first_air_date) {
      itemType = ITEM_TYPE.TV;
    } else if (media_type === ITEM_TYPE.MOVIES || release_date) {
      itemType = ITEM_TYPE.MOVIES;
    } else {
      itemType = ITEM_TYPE.CAST;
    }

    if (itemType === ITEM_TYPE.CAST) {
      return (
        <ItemCast
          data={item}
          apiConfig={apiConfig}
        />
      )
    }

    return (
      <ItemThumb 
        data={item} 
        apiConfig={apiConfig}
        itemType={itemType}
      /> 
    );
  }

  renderViewMore() {
    if (
      !this.props.data || 
      !this.props.viewMore ||
      this.props.data.length < this.props.itemsPerRow
    ) {
      return null;
    }

    return (
      <span className="load-more">
        <Link to={this.props.viewMoreLink}>
          <IoIosArrowDropright/>
          <br/>
          View more
        </Link>
      </span>
    );
  }

  render() {
    const { data, apiConfig, itemsPerRow } = this.props;
    
    if (!data) {
      return (<SimpleLoader/>);
    }

    if (data.length === 0) {
      return (
        <p className="no-available">There are no available items.</p>
      )  
    }

    return (
      <div className="item-list">
        <ul className="item-list-content">
          {data.slice(0, itemsPerRow).map((item) => (
            <li className="item-list-content-item" key={item.id}>
              {this.renderThumbnail(item, apiConfig)}
            </li>
          ))}
          {this.renderViewMore()}
        </ul>
      </div>
    )
  }
}