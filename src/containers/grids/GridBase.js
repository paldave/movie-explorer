import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearStoreState } from '../../actions/movies/discover';
import Paginate from '../../components/Paginate';
import SplashScreen from '../../components/layout/SplashScreen';
import ItemThumb from '../../components/cards/ItemThumb';
import FilterList from '../../components/filters/FilterList';
import SimpleLoader from '../../components/layout/SimpleLoader';
import { SORT_BY } from '../../helpers/query';
import './GridBase.scss';

const defaultQuery = {
  sort_by: SORT_BY.popularityDesc,
  page: 0
}

export default (WrappedContainer, fetchDataAction, itemType, wrappedQuery = defaultQuery, mainTitle) => {
  class GridBase extends Component {
    static propTypes = {
      WrappedContainer: PropTypes.element,
      fetchData: PropTypes.func,
      itemType: PropTypes.object,
      wrappedQuery: PropTypes.shape({
        sort_by: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        page: PropTypes.number.isRequired
      })
    }
  
    state = {
      pageChanged: false,
      currentPage: 0,
      query: null
    }

    componentDidMount() {
      if (!this.props.data.isLoaded) {
        this.fetchData(undefined, 1);
      }
    }
  
    componentWillUnmount() {
      if (!this.props.history.location.pathname.match('/movies/details|tv/details/')) {
        this.props.clearStoreState();
      }
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevState.currentPage !== this.state.currentPage) {
        this.fetchData(
          this.props.data.query|| undefined, 
          this.state.currentPage
        );
      }
    }
  
    fetchData(query = wrappedQuery, currentPage) {
      this.props.fetchDataAction(query, currentPage);
    }
  
    handleSubmit = (newQuery) => {
      this.setState({ query: newQuery, currentPage: 1 });
      this.fetchData(newQuery);
    }
  
    handlePageClick = (data) => {
      const selectedPage = data.selected + 1;
      this.setState({ currentPage: selectedPage, pageChanged: true });
    }
  
    renderFilterPanel() {
      const { genresForms } = this.props.apiConfig;
      const { wrappedQuery } = this.props;
  
      return (
        <FilterList
          handleSubmit={this.handleSubmit}
          defaultQuery={wrappedQuery}
          userQuery={this.props.data.query}
          availableGenres={genresForms}
        />
      );
    }
  
    renderPaginate() {
      const { data } = this.props;
  
      if (data.total_pages < 1) {
        return (<div/>);
      }
      
      return (
        <Paginate
          currentPage={this.state.currentPage}
          totalPages={data.total_pages}
          queryPage={data.query.page}
          handlePageClick={this.handlePageClick}
        />
      );
    }

    renderContent = () => {
      const { data, apiConfig, isLoading } = this.props;
    
      return (
        <div className="body-container no-padding poster-grid">
          <section className="main-title">
            {mainTitle}
          </section>
          <section className="posters">
            <section className="filters">
              {this.renderFilterPanel()}
            </section>
            <section className="grid-start">
              {data.total_results === 0 && (
                <p className="no-query">Sorry, no items were found that match your query.</p>
              )}
              {isLoading ? (
                <div className="loader">
                  <SimpleLoader/>
                </div>
              ) : (
                <>
                  <ul className="poster-list">
                    {data.results.map((item) => (
                      <li className="poster-item" key={item.id}>
                        <ItemThumb
                          data={item}
                          apiConfig={apiConfig}
                          itemType={itemType}
                        />
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

    render() {
      if (!this.props.data.isLoaded) {
        return (<SplashScreen/>);
      }

      return (
        <WrappedContainer 
          {...this.props} 
          renderContent={this.renderContent}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({
    apiConfig: state.apiConfig,
    isLoading: state.userInterface.pendingRequests > 0
  });

  const actionCreators = {
    fetchDataAction, 
    clearStoreState
  }

  return withRouter(connect(mapStateToProps, actionCreators)(GridBase));
}