import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoviesDiscover } from '../../../actions/movies/discover';
import GridBase from '../GridBase';

class Popular extends Component {
  static propTypes = {
    fetchMoviesDiscover: PropTypes.func,
    data: PropTypes.object.isRequired
  }

  render() {
    return this.props.renderContent();
  }
}

const mapStateToProps = (state) => ({
  data: state.moviesDiscover
});

export default connect(mapStateToProps, {})(GridBase(Popular, fetchMoviesDiscover));
