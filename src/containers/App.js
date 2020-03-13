import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApiConfig } from '../actions/apiConfig';

import SplashScreen from '../components/layout/SplashScreen';
import Navbar from '../components/layout/Navbar';
import ScrollToTop from '../helpers/scroll';
import Home from './Home';
import MoviesDetails from './details/Movies';
import TvDetails from './details/Tv';

class App extends Component {
  componentDidMount() {
    this.props.fetchApiConfig();
  }

  render() {
    if (this.props.apiConfig.isInitializing) {
      return <SplashScreen />;
    }

    return (
      <BrowserRouter>
        <div className="App">
          <ScrollToTop />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/movies/details/:id" component={BaseDetailsHoc(MoviesDetails)} /> */}
            <Route exact path="/movies/details/:id" component={MoviesDetails} />
            <Route exact path="/tv/details/:id" component={TvDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  fetchApiConfig: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  apiConfig: state.apiConfig
});

const actionCreators = { fetchApiConfig };

export default connect(mapStateToProps, actionCreators)(App);
