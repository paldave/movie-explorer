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
import { ITEM_TYPE } from '../../helpers/itemType';
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
            {data.episode_run_time[0]} min
          </p>
        </div>
      </section>
    );
  }

  renderCreatedBy() {
    const authors = this.props.data.created_by.map((author) => author.name).join(', ');

    return (
      <p className="director">
        <span className="white-med-color">Created by</span> {authors}
      </p>
    );
  }

  render() {
    const { apiConfig, data } = this.props;

    console.log(this);

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
                <span className="title">
                  {data.name} 
                  <br/>
                  <span className="year white-med-color">({getYear(data.first_air_date)})</span>
                </span>
                <br/>
                {this.renderCreatedBy()}
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
                data={data.credits.cast.slice(0, 12)}
                apiConfig={apiConfig}
                itemType={ITEM_TYPE.CAST}
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
                itemType={ITEM_TYPE.TV}
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
