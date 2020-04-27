import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTvDiscoverTopRated } from '../../../actions/tv/discover';
import GridBase from '../GridBase';
import { ITEM_TYPE } from '../../../helpers/itemType';
import { SORT_BY } from '../../../helpers/query';

const defaultQuery = {
  sort_by: SORT_BY.ratingDesc,
  page: 0
}

class TopRated extends Component {
  static propTypes = {
    fetchTvDiscoverTopRated: PropTypes.func,
    data: PropTypes.object.isRequired
  }

  render() {
    return this.props.renderContent();
  }
}

const mapStateToProps = (state) => ({
  data: state.tvDiscover
});

export default connect(mapStateToProps, {})(GridBase(TopRated, fetchTvDiscoverTopRated, ITEM_TYPE.TV, defaultQuery));
