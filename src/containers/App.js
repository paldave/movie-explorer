import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApiConfig } from '../actions/apiConfig';

import Navbar from '../components/layout/Navbar';
import Home from './Home';

class App extends Component {
  componentDidMount() {
    this.props.fetchApiConfig();
  }

  render() {
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

const actionCreators = { fetchApiConfig };

export default connect(null, actionCreators)(App);
