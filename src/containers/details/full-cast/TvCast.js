import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTvDetails } from '../../../actions/tv/details';
import CastBase from './CastBase';

export class TvCast extends Component {
  static propTypes = {
    fetchMoviesFullCast: PropTypes.func,
    data: PropTypes.object.isRequired
  }

  render() {
    return this.props.renderContent();
  }
}

const mapStateToProps = (state) => ({
  data: state.tvDetails
});

export default connect(mapStateToProps, {})(CastBase(TvCast, fetchTvDetails));
