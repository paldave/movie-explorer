import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SplashScreen from '../../../components/layout/SplashScreen';
import DetailsImage from '../../../components/DetailsImage';
import CastTable from '../../../components/CastTable';
import Button from '../../../components/layout/Button';
import { getYear } from '../../../helpers/movie';
import { IoMdArrowBack } from 'react-icons/io'; 
import './CastBase.scss';

export default (WrappedContainer, fetchData) => {
  class CastBase extends Component {
    static propTypes = {
      WrappedContainer: PropTypes.element,
      fetchData: PropTypes.func
    }

    componentDidMount() {
      if (!this.props.data.credits) {
        const id = this.props.match.params.id;
        this.props.fetchData(id);
      }
    }

    goBackToDetails = () => {
      const urlToChange = this.props.match.url.replace(/\/full-cast/, '');
      this.props.history.push(urlToChange);
    }

    renderContent = () => {
      const { data, apiConfig } = this.props;

      const buttonLabel = ( 
        <>
          <IoMdArrowBack/> <span>Go back to details</span> 
        </>
      );

      return (
        <div className="body-container no-padding">
          <div className="full-cast-wrapper">
            <section className="main-header">
              <section className="poster">
                <DetailsImage 
                  imagePath={data.poster_path}
                  imageConfig={apiConfig.imageConfig}
                />
              </section>
              <section className="info">
                <span className="main-title">
                  {data.title || data.name} 
                  <br/>
                  <span className="year white-med-color">({getYear(data.release_date || data.first_air_date) || '-'})</span>
                </span>
                <p>
                  <Button label={buttonLabel} onClick={this.goBackToDetails}/>
                </p>
              </section>
            </section>
            <section className="cast-tables">
              <CastTable 
                data={this.props.data.credits.cast}
                apiConfig={this.props.apiConfig}
                name='Cast'
                includePhotos={true}
              />
            </section>
            <section className="crew-tables">
              {Object.keys(data.credits.crew).map((department) => (
                <CastTable
                  key={department}
                  data={data.credits.crew[department]}
                  apiConfig={this.props.apiConfig}
                  name={department}
                />
              ))}
            </section>
          </div>
        </div>
      );
    }

    render() {
      if (!this.props.data.isLoaded || this.props.isLoading) {
        return (<SplashScreen/>);
      }

      return (
        <WrappedContainer 
          {...this.props} 
          renderContent={this.renderContent}
          goBackToDetails={this.goBackToDetails}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({
    apiConfig: state.apiConfig,
    isLoading: state.userInterface.pendingRequests > 0
  });
  
  return withRouter(connect(mapStateToProps, { fetchData })(CastBase));
}