import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTvDetails } from '../../actions/tv/details';
import BaseHoc from './BaseHoc';
import Backdrop from '../../components/Backdrop';
import DetailsImage from '../../components/DetailsImage';
import SectionHeader from '../../components/SectionHeader';
import ItemList from '../../components/cards/ItemList';
import ReviewList from '../../components/details/ReviewList';
import Button from '../../components/layout/Button';
import ActionBar from '../../components/details/ActionBar';
import Directors from '../../components/details/Director';
import { getYear } from '../../helpers/movie';

class TvDetails extends Component {
  static propTypes = {
    fetchTvDetails: PropTypes.func
  }

  renderSidebar() {
    const { data, apiConfig } = this.props; 
    
    return (
      <section className="item-details-info">
        <div className="genres">
          <h4 className="header">Genres</h4>
          {data.genres.map((genre) => (
            <Fragment key={genre.id}>
              <Button label={genre.name}/>
            </Fragment>
          ))}
        </div>
        <div className="extras">
          <h4 className="header">Additional info</h4>
          <p>
            First air date:
            <br/>
            {data.first_air_date}
          </p>
          <p></p>
          <p>
            Original language:
            <br/>
            {apiConfig.languages[data.original_language]}
          </p>
          <p>
            Number of seasons:
            <br/>
            {data.number_of_seasons}
          </p>
          <p>
            Number of episodes:
            <br/>
            {data.number_of_episodes}
          </p>
          <p>
            Episode run time:
            <br/>
            {data.episode_run_time[0] ? `${data.episode_run_time[0]} min` : '-'}
          </p>
        </div>
      </section>
    );
  }

  render() {
    const { apiConfig, data } = this.props;

    return (
      <div className="item-details-container">
        <Backdrop
          backdropPath={data.backdrop_path}
          imageConfig={apiConfig.imageConfig}
        />
        <div className="body-container">
          <div className="item-details-wrapper">
            <section className="poster">
              <DetailsImage 
                imagePath={data.poster_path}
                imageConfig={apiConfig.imageConfig}
              />
            </section>
            <section className="item-details-main">
              <section className="header">
                <span className="main-title">
                  {data.name} 
                  <br/>
                  <span className="year white-med-color">({getYear(data.first_air_date) || '-'})</span>
                </span>
                <br/>
                <Directors data={data.created_by} label="Created by"/>
              </section>
              <ActionBar
                data={data}
              />
              <section className="overview">
                <p>{data.overview}</p>
              </section>
            </section>
            {this.renderSidebar()}
            <section className="item-details-cast">
              <SectionHeader
                title='Cast'
              />
              <ItemList
                data={data.credits.cast}
                apiConfig={apiConfig}
                viewMore={true}
              />
            </section>
            <section className="item-details-reviews">
              <SectionHeader
                title='Reviews'
              />
              <ReviewList
                data={data.reviews.results.slice(0, 4)}
              />
            </section>
            <section className="item-details-recommendations">
              <SectionHeader
                title='Recommendations'
              />
              <ItemList
                data={data.recommendations.results.slice(0, 12)}
                apiConfig={apiConfig}
                viewMore={false}
              />
            </section>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.tvDetails,
});

export default connect(mapStateToProps, {})(BaseHoc(TvDetails, fetchTvDetails));
