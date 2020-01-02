import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoviesPopular } from '../actions/movies/popular';
import { fetchMoviesUpcoming } from '../actions/movies/upcoming';
import Backdrop from '../components/Backdrop';
import SectionHeader from '../components/SectionHeader';
import MovieList from '../components/movies/MovieList';
import './Home.scss';

class Home extends Component {
  static propTypes = {
    fetchMoviesPopular: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchMoviesPopular();
    this.props.fetchMoviesUpcoming();
  }

  render() {
    const { apiConfig, moviesPopular, moviesUpcoming } = this.props;
    
    // TODO: Spinner
    // Depend on GET moviesPopular to show Backdrop
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
            <section id="movies-popular">
              <SectionHeader
                title='Popular movies'
              />
              <MovieList
                data={moviesPopular.results}
                apiConfig={apiConfig}
                itemsPerRow={6}
              />
            </section>
            <section id="movies-incoming">
              <SectionHeader
                title='Upcoming movies'
              />
              <MovieList
                data={moviesUpcoming.results}
                apiConfig={apiConfig}
                itemsPerRow={6}
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
  moviesPopular: state.moviesPopular,
  moviesUpcoming: state.moviesUpcoming
});

const actionCreators = {
  fetchMoviesPopular,
  fetchMoviesUpcoming
};

export default connect(mapStateToProps, actionCreators)(Home);
