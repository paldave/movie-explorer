import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MovieThumb from './MovieThumb';
import './MovieList.scss';

export default class MovieList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    apiConfig: PropTypes.object.isRequired
  }

  static defaultProps = {
    itemsPerRow: 'auto'
  }

  render() {
    const { data, apiConfig, itemsPerRow } = this.props;

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