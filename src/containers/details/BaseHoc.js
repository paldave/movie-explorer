import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from '../../components/layout/SplashScreen';

export default (WrappedContainer, fetchData) => {
  class BaseHoc extends Component {
    static propTypes = {
      WrappedContainer: PropTypes.element,
      fetchData: PropTypes.func
    }

    componentDidMount() {
      const id = this.props.match.params.id;
      this.props.fetchData(id);
    }

    componentDidUpdate(prevProps) {
      const [ newId, prevId ] = [ this.props.match.params.id, prevProps.match.params.id ];
  
      if (newId !== prevId) {
        this.props.fetchData(this.props.match.params.id);
      }
    }

    render() {
      if (!this.props.data.isLoaded || this.props.isLoading) {
        return (<SplashScreen/>);
      }

      return (
        <WrappedContainer {...this.props} />
      );
    }
  }

  const mapStateToProps = (state) => ({
    apiConfig: state.apiConfig,
    isLoading: state.userInterface.pendingRequests > 0
  });
  
  return connect(mapStateToProps, { fetchData })(BaseHoc);
}