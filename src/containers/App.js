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

import TvDetails from './details/Tv';
import TvCast from './details/full-cast/TvCast';

import Person from './Person';

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
      <BrowserRouter>
        <div className="App">
          <ScrollToTop/>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Home}/>

            <Route path="/movies/details/:id/full-cast" component={MoviesCast}/>
            <Route path="/movies/details/:id" component={MoviesDetails}/>
            <Route exact path="/movies/upcoming" component={MoviesUpcoming}/>
            <Route exact path="/movies" component={MoviesPopular}/>

            <Route path="/tv/details/:id/full-cast" component={TvCast}/>
            <Route path="/tv/details/:id" component={TvDetails}/>

            <Route path="/person-details/:id" component={Person}/>
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
