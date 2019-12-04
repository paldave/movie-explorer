import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoviesPopular } from '../actions/movies/popular';
import Backdrop from '../components/Backdrop';

class Home extends Component {
  static propTypes = {
    fetchMoviesPopular: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchMoviesPopular();
  }

  render() {
    const { apiConfig, moviesPopular } = this.props;
    
    // TODO: Spinner
    if (!moviesPopular.results) {
      return <div />
    }

    return (
      <Backdrop
        data={moviesPopular.results[0]}
        imageConfig={apiConfig.imageConfig}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  apiConfig: state.apiConfig,
  moviesPopular: state.moviesPopular
});

const actionCreators = {
  fetchMoviesPopular
};

export default connect(mapStateToProps, actionCreators)(Home);
