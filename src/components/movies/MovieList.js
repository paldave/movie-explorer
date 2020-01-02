import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MovieThumb from './MovieThumb';
import SimpleLoader from '../layout/SimpleLoader';
import './MovieList.scss';

export default class MovieList extends Component {
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
      <div className="movie-list">
        <ul className="movie-list-content">
          {data.map((item) => (
            <li className="movie-list-content-item" key={item.id}>
              <MovieThumb 
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