import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApiConfig } from '../actions/apiConfig';

import SplashScreen from '../components/layout/SplashScreen';
import Navbar from '../components/layout/Navbar';
import Home from './Home';

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
          <Navbar />
          <Route exact path="/" component={ Home }/>
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
