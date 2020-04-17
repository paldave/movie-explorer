import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoviesDetails } from '../../../actions/movies/details';
import CastBase from './CastBase';

export class MoviesCast extends Component {
  static propTypes = {
    fetchMoviesFullCast: PropTypes.func,
    data: PropTypes.object.isRequired
  }

  render() {
    return this.props.renderContent();
  }
}

const mapStateToProps = (state) => ({
  data: state.moviesDetails
});

export default connect(mapStateToProps, {})(CastBase(MoviesCast, fetchMoviesDetails));
