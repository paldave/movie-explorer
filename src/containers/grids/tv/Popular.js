import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTvDiscover } from '../../../actions/tv/discover';
import { ITEM_TYPE } from '../../../helpers/itemType';
import GridBase from '../GridBase';

class Popular extends Component {
  static propTypes = {
    fetchTvDiscover: PropTypes.func,
    data: PropTypes.object.isRequired
  }

  render() {
    return this.props.renderContent();
  }
}

const mapStateToProps = (state) => ({
  data: state.tvDiscover
});

export default connect(mapStateToProps, {})
  (GridBase(
    Popular, 
    fetchTvDiscover, 
    ITEM_TYPE.TV, 
    undefined, 
    'Popular Series'
  ));
