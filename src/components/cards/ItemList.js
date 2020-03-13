import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ItemThumb from './ItemThumb';
import ItemCast from './ItemCast';
import SimpleLoader from '../layout/SimpleLoader';
import { ITEM_TYPE } from '../../helpers/itemType';
import './ItemList.scss';

export default class ItemList extends Component {
  static propTypes = {
    data: PropTypes.array,
    apiConfig: PropTypes.object.isRequired,
    itemType: PropTypes.string.isRequired
  }

  static defaultProps = {
    showMeta: true
  }

  renderThumbnail(item, itemType, apiConfig) {
    if (ITEM_TYPE.CAST === itemType) {
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

  render() {
    const { data, apiConfig, itemType, showMeta } = this.props;
    
    if (!data) {
      return (<SimpleLoader/>);
    }

    return (
      <div className="item-list">
        <ul className="item-list-content">
          {data.map((item) => (
            <li className="item-list-content-item" key={item.id}>
              {this.renderThumbnail(item, itemType, apiConfig)}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}