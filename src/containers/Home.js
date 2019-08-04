import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMovieNowPlaying } from '../actions/movies/nowPlaying';

class Home extends Component {
  componentWillMount() {
    this.props.fetchMovieNowPlaying();
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}

// Home.propTypes = {
//   fetchMovieNowPlaying: PropTypes.func.isRequired,
// };

const mapStateToProps = (state) => ({
  moviesNowPlaying: state.moviesNowPlaying
});

const actionCreators = {
  fetchMovieNowPlaying
};

export default connect(mapStateToProps, actionCreators)(Home);
