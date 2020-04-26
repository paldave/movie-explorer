import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoviesPopular } from '../actions/movies/popular';
import { fetchMoviesUpcoming } from '../actions/movies/upcoming';
import { fetchTvPopular } from '../actions/tv/popular';
import Backdrop from '../components/Backdrop';
import SectionHeader from '../components/SectionHeader';
import ItemList from '../components/cards/ItemList';
import './Home.scss';

class Home extends Component {
  static propTypes = {
    fetchMoviesPopular: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (!this.props.moviesPopular.isLoaded) {
      this.props.fetchMoviesPopular();
    }

    if (!this.props.moviesUpcoming.isLoaded) {
      this.props.fetchMoviesUpcoming();
    }

    if (!this.props.tvPopular.isLoaded) {
      this.props.fetchTvPopular();
    }
  }

  render() {
    const { apiConfig, moviesPopular, moviesUpcoming, tvPopular } = this.props;
    
    // TODO: Spinner
    // Depend on GET moviesPopular to show Backdrop
    if (
      !moviesPopular.results ||
      !moviesUpcoming.results ||
      !tvPopular.results
    ) {
      return <div />
    }

    return (
      <div className="home-container">
        <Backdrop
          backdropPath={moviesPopular.results[0].backdrop_path}
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
                linkName='View more'
                linkTo='/movies'
              />
              <ItemList
                data={moviesPopular.results}
                apiConfig={apiConfig}
                viewMoreLink='/movies'
              />
            </section>
            <section id="tv-incoming">
              <SectionHeader
                title='Popular Series'
              />
              <ItemList
                data={tvPopular.results}
                apiConfig={apiConfig}
              />
            </section>
            <section id="movies-incoming">
              <SectionHeader
                title='Upcoming movies'
              />
              <ItemList
                data={moviesUpcoming.results}
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
  moviesPopular: state.moviesPopular,
  moviesUpcoming: state.moviesUpcoming,
  tvPopular: state.tvPopular
});

const actionCreators = {
  fetchMoviesPopular,
  fetchMoviesUpcoming,
  fetchTvPopular
};

export default connect(mapStateToProps, actionCreators)(Home);
