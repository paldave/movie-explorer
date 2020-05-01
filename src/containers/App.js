import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApiConfig } from '../actions/apiConfig';

import SplashScreen from '../components/layout/SplashScreen';
import Navbar from '../components/layout/Navbar';
import ScrollToTop from '../helpers/scroll';
import Home from './Home';

import MoviesDetails from './details/Movies';
import MoviesCast from './details/full-cast/MoviesCast';
import MoviesPopular from './grids/movies/Popular';
import MoviesUpcoming from './grids/movies/Upcoming';
import MoviesTopRated from './grids/movies/TopRated';

import TvDetails from './details/Tv';
import TvCast from './details/full-cast/TvCast';
import TvPopular from './grids/tv/Popular';
import TvTopRated from './grids/tv/TopRated';

import Person from './Person';

import Search from './Search';

class App extends Component {
  static propTypes = {
    fetchApiConfig: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchApiConfig();
  }

  render() {
    if (this.props.apiConfig.isInitializing) {
      return <SplashScreen/>;
    }

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <ScrollToTop/>
          <Navbar/>
          <Switch>
            <Route exact path="/search" component={Search}/>

            <Route path="/movies/details/:id/full-cast" component={MoviesCast}/>
            <Route path="/movies/details/:id" component={MoviesDetails}/>
            <Route path="/movies/upcoming" component={MoviesUpcoming}/>
            <Route path="/movies/top-rated" component={MoviesTopRated}/>
            <Route path="/movies" component={MoviesPopular}/>

            <Route path="/tv/details/:id/full-cast" component={TvCast}/>
            <Route path="/tv/details/:id" component={TvDetails}/>
            <Route path="/tv/top-rated" component={TvTopRated}/>
            <Route path="/tv" component={TvPopular}/>

            <Route path="/person-details/:id" component={Person}/>

            <Route exact path="/" component={Home}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  apiConfig: state.apiConfig
});

export default connect(mapStateToProps, { fetchApiConfig })(App);
