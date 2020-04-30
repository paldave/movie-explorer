import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  fetchSearchPerson,
  fetchSearchMovies,
  fetchSearchTv,
  setSearchQueryUser,
  clearStoreState
} from '../actions/search';
import { ITEM_TYPE } from '../helpers/itemType';
import SplashScreen from '../components/layout/SplashScreen';
import Paginate from '../components/Paginate';
import SimpleLoader from '../components/layout/SimpleLoader';
import ItemThumb from '../components/cards/ItemThumb';
import ItemCast from '../components/cards/ItemCast';
import './Search.scss';

class Search extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  state = {
    dataToShow: 'person',
    person: {
      currentPage: 1
    },
    movie: {
      currentPage: 1
    },
    tv: {
      currentPage: 1
    }
  }

  componentDidMount() {
    if (this.props.data.userQuery) {
      this.setState(this.props.data.userQuery);
    }

    if (this.props.location.state) {
      this.props.fetchSearchPerson(this.props.location.state, 1);
      this.props.fetchSearchMovies(this.props.location.state, 1);
      this.props.fetchSearchTv(this.props.location.state, 1);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const currentDataName = this.state.dataToShow;

    if (prevProps.location.state !== this.props.location.state) {
      this.props.fetchSearchPerson(this.props.location.state, 1);
      this.props.fetchSearchMovies(this.props.location.state, 1);
      this.props.fetchSearchTv(this.props.location.state, 1);
    }

    if (prevState[currentDataName].currentPage !== this.state[currentDataName].currentPage) {
      const searchQuery = this.props.location.state;
      const currentPage = this.state[currentDataName].currentPage;

      switch(currentDataName) {
        case 'person':
          this.props.fetchSearchPerson(searchQuery, currentPage);
          break;
        case 'movie':
          this.props.fetchSearchMovies(searchQuery, currentPage);
          break;
        case 'tv':
          this.props.fetchSearchTv(searchQuery, currentPage);
          break;
        default:
          return null;
      }
    }
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname.match('/movies/details|/tv/details|/person-details/')) {
      this.props.setSearchQueryUser(this.state);
    } else {
      this.props.clearStoreState();
    }
  }

  handlePageClick = (data) => {
    const { state } = this;
    
    const selectedPage = data.selected + 1;
    this.setState({ [state.dataToShow]: { currentPage: selectedPage } });
  }

  handleDataChange = (type) => {
    this.setState({ dataToShow: type });
  }

  renderPaginate() {
    const { state } = this;
    const currentData = this.props.data[state.dataToShow];

    if (currentData.total_pages < 1) {
      return (<div/>);
    }
    
    return (
      <Paginate
        currentPage={state[state.dataToShow].currentPage}
        totalPages={currentData.total_pages}
        queryPage={1}
        handlePageClick={this.handlePageClick}
      />
    );
  }

  render() {
    const { data, apiConfig, isLoading } = this.props;
    const { state } = this;

    if (!this.props.data.isLoaded) {
      return (<SplashScreen/>);
    }

    const currentData = data[state.dataToShow];
    if (!currentData) {
      return (<div/>);
    }

    return (
      <div className="body-container no-padding poster-grid">
        <section className="main-title">
          <span>Search Results</span>
        </section>
        <section className="posters">
          <section className="filters">
            <div 
              className={`filter-card ${data.person && data.person.total_results === 0 ? 'disabled' : ''} ${state.dataToShow === 'person' ? 'selected' : ''}`}
              onClick={() => this.handleDataChange('person')}
            >
              <div className="name">
                <h3>People</h3>
                <h3>( {data.person ? data.person.total_results : 0} )</h3>
              </div>
            </div>
            <div 
              className={`filter-card ${data.movie && data.movie.total_results === 0 ? 'disabled' : ''} ${state.dataToShow === 'movie' ? 'selected' : ''}`}
              onClick={() => this.handleDataChange('movie')}
            >
              <div className="name">
                <h3>Movies</h3>
                <h3>( {data.movie ? data.movie.total_results : 0} )</h3>
              </div>
            </div>
            <div 
              className={`filter-card ${data.tv && data.tv.total_results === 0 ? 'disabled' : ''} ${state.dataToShow === 'tv' ? 'selected' : ''}`}
              onClick={() => this.handleDataChange('tv')}
            >
              <div className="name">
                <h3>Series</h3>
                <h3>( {data.tv ? data.tv.total_results : 0} )</h3>
              </div>
            </div>
          </section>
          <section className="grid-start">
            {currentData.total_results === 0 && (
              <p className="no-query">Sorry, no items were found that match your query.</p>
            )}
            {isLoading ? (
              <div className="loader">
                <SimpleLoader/>
              </div>
            ) : (
              <>
                <ul className="poster-list">
                  {currentData.results.map((item) => (
                    <li className="poster-item" key={item.id}>
                      {state.dataToShow === 'person' ? (
                        <ItemCast
                          data={item}
                          apiConfig={apiConfig}
                        />
                      ) : (
                        <ItemThumb
                          data={item}
                          apiConfig={apiConfig}
                          itemType={state.dataToShow === 'tv' ? ITEM_TYPE.TV : ITEM_TYPE.MOVIES}
                        />
                      )}
                    </li>
                  ))}
                </ul>
                {this.renderPaginate()}
              </>
            )}
          </section>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.search,
  apiConfig: state.apiConfig,
  isLoading: state.userInterface.pendingRequests > 0
});

const actionCreators = {
  fetchSearchPerson, 
  fetchSearchMovies,
  fetchSearchTv,
  setSearchQueryUser,
  clearStoreState
}

export default connect(mapStateToProps, actionCreators)(Search);