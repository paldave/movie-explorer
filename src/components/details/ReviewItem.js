import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from '../layout/Button';
import ShowMoreText from 'react-show-more-text';
import './ReviewItem.scss';

export default class ReviewItem extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  renderExtend(label) {
    return (
      <span className="extend">{label}</span>
    )
  }

  render() {
    const { data } = this.props;

    return (
      <div className="review-item">
        <section className="author">
          <span className="white-med-color">Review by</span> {data.author}
        </section>
        <section className="content">
          <ShowMoreText
            lines={5}
            more={this.renderExtend('Show more')}
            less={false}
            expanded={false}
          >
            {data.content}
          </ShowMoreText>
        </section>
      </div>
    )
  }
}
