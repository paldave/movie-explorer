import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ItemThumb from './ItemThumb';
import ItemCast from './ItemCast';
import SimpleLoader from '../layout/SimpleLoader';
import Button from '../layout/Button';
import { ITEM_TYPE } from '../../helpers/itemType';
import { IoIosArrowDropright } from 'react-icons/io';
import './ItemList.scss';

export default class ItemList extends Component {
  static propTypes = {
    data: PropTypes.array,
    apiConfig: PropTypes.object.isRequired,
    itemType: PropTypes.string.isRequired
  }

  renderThumbnail(item, itemType, apiConfig) {
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

  // TODO: Link to
  viewMore = () => {
    console.log('>>> transfer');
  }

  render() {
    const { data, apiConfig, itemType } = this.props;
    
    if (!data) {
      return (<SimpleLoader/>);
    }

    if (data.length === 0 && [ITEM_TYPE.MOVIES, ITEM_TYPE.TV].includes(itemType)) {
      return (
        <p className="no-available">There are no available items.</p>
      )  
    }

    return (
      <div className="item-list">
        <ul className="item-list-content">
          {data.map((item) => (
            <li className="item-list-content-item" key={item.id}>
              {this.renderThumbnail(item, itemType, apiConfig)}
            </li>
          ))}
          { data
            ? <span className="load-more" onClick={this.viewMore}>
                <IoIosArrowDropright/>
                <br/>
                View more
              </span>
            : null
          }
        </ul>
      </div>
    )
  }
}