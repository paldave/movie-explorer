import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoviesDetails } from '../../actions/movies/details';
import BaseHoc from './BaseHoc';
import Backdrop from '../../components/Backdrop';
import DetailsImage from '../../components/DetailsImage';
import SectionHeader from '../../components/SectionHeader';
import ItemList from '../../components/cards/ItemList';
import ReviewList from '../../components/details/ReviewList';
import Button from '../../components/layout/Button';
import ActionBar from '../../components/details/ActionBar';
import Directors from '../../components/details/Director';
import { 
  getYear, 
  getDirector, 
  getCurrency 
} from '../../helpers/movie';

class MoviesDetails extends Component {
  static propTypes = {
    fetchMoviesDetails: PropTypes.func
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
            Release date:
            <br/>
            {data.release_date}
          </p>
          <p></p>
          <p>
            Original language:
            <br/>
            {apiConfig.languages[data.original_language]}
          </p>
          <p>
            Runtime:
            <br/>
            {data.runtime ? (
              <>{data.runtime} min</>
            ) : (
              <>-</>
            )}
          </p>
          <p>
            Budget:
            <br/>
            {getCurrency(data.budget)}
          </p>
          <p>
            Revenue:
            <br/>
            {getCurrency(data.revenue)}
          </p>
        </div>
      </section>
    );
  }

  render() {
    const { apiConfig, data } = this.props;
    
    const linkToCast = `${this.props.location.pathname}/full-cast`;

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
                  {data.title} 
                  <br/>
                  <span className="year white-med-color">({getYear(data.release_date) || '-'})</span>
                </span>
                <br/>
                <Directors data={getDirector(data.credits.crew)} label="Directed by"/>
              </section>
              <ActionBar
                data={data}
              />
              <section className="overview">
                {data.tagline &&
                  <p className="tagline">{data.tagline}</p>
                }
                <p>{data.overview}</p>
              </section>
            </section>
            {this.renderSidebar()}
            <section className="item-details-cast">
              <SectionHeader
                title='Cast'
                linkName='View full Cast & Crew'
                linkTo={linkToCast}
              />
              <ItemList
                data={data.credits.cast}
                apiConfig={apiConfig}
                viewMoreLink={linkToCast}
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
                data={data.recommendations.results}
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
  data: state.moviesDetails,
});

export default connect(mapStateToProps, {})(BaseHoc(MoviesDetails, fetchMoviesDetails));
