import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoviesDiscoverTopRated } from '../../../actions/movies/discover';
import GridBase from '../GridBase';
import { ITEM_TYPE } from '../../../helpers/itemType';
import { SORT_BY } from '../../../helpers/query';

const defaultQuery = {
  sort_by: SORT_BY.ratingDesc,
  page: 0
}

class TopRated extends Component {
  static propTypes = {
    fetchMoviesDiscoverTopRated: PropTypes.func,
    data: PropTypes.object.isRequired
  }

  render() {
    return this.props.renderContent();
  }
}

const mapStateToProps = (state) => ({
  data: state.moviesDiscover
});

export default connect(mapStateToProps, {})(GridBase(TopRated, fetchMoviesDiscoverTopRated, ITEM_TYPE.MOVIES, defaultQuery));
