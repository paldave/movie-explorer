import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReviewItem from './ReviewItem';
import './ReviewList.scss';

export default class ItemList extends Component {
  static propTypes = {
    data: PropTypes.array,
  }

  render() {
    const { data } = this.props;

    if (data.length === 0) {
      return (
        <div className="review-list">
          <p className="no-review">There are no available reviews.</p>
        </div>
      );
    }

    return (
      <div className="review-list">
        <ul className="review-list-content">
          {data.map((item) => (
            <li className="review-list-content-item" key={item.id}>
              <ReviewItem data={item}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}