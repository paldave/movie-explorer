import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ItemThumb from './ItemThumb';
import SimpleLoader from '../layout/SimpleLoader';
import './ItemList.scss';

export default class ItemList extends Component {
  static propTypes = {
    data: PropTypes.array,
    apiConfig: PropTypes.object.isRequired
  }

  static defaultProps = {
    itemsPerRow: 'auto' // TODO: Consider automatic seletion depending on screen
  }

  render() {
    const { apiConfig, itemsPerRow } = this.props;
    let { data } = this.props;

    if (!data) {
      return (<SimpleLoader/>);
    }

    if (itemsPerRow != 'auto') {
      data = data.slice(0, itemsPerRow);
    }

    return (
      <div className="item-list">
        <ul className="item-list-content">
          {data.map((item) => (
            <li className="item-list-content-item" key={item.id}>
              <ItemThumb 
                data={item} 
                apiConfig={apiConfig}
                showMeta={true}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}