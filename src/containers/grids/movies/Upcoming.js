import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoviesDiscoverUpcoming } from '../../../actions/movies/discover';
import { ITEM_TYPE } from '../../../helpers/itemType';
import GridBase from '../GridBase';

class Upcoming extends Component {
  static propTypes = {
    fetchMoviesDiscoverUpcoming: PropTypes.func,
    data: PropTypes.object.isRequired
  }

  render() {
    return this.props.renderContent();
  }
}

const mapStateToProps = (state) => ({
  data: state.moviesDiscover
});

export default connect(mapStateToProps, {})
  (GridBase(
    Upcoming, 
    fetchMoviesDiscoverUpcoming, 
    ITEM_TYPE.MOVIES, 
    undefined, 
    'Upcoming Movies'
  ));
