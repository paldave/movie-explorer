import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoviesPopular } from '../actions/movies/popular';
import Backdrop from '../components/Backdrop';
import MovieList from '../components/movies/MovieList';
import './Home.scss';

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
      <div className="home-container">
        <Backdrop
          data={moviesPopular.results[0]}
          imageConfig={apiConfig.imageConfig}
        />
        <div className="body-container">
          <div className="body-wrapper">
            <div className="home-welcome">
              <h1>Space is for everybody. Just like movies. <br/> Explore, review and share what you like. </h1>
            </div>
            <section id="popular">
              <MovieList
                data={moviesPopular.results.slice(0, 6)}
                apiConfig={apiConfig}
              />
            </section>
          </div>
        </div>
      </div>
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
