import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPersonDetails } from '../actions/personDetails';
import SplashScreen from '../components/layout/SplashScreen';
import DetailsImage from '../components/DetailsImage';
import SectionHeader from '../components/SectionHeader';
import ItemList from '../components/cards/ItemList';
import CreditsTable from '../components/CreditsTable';
import { ITEM_TYPE } from '../helpers/itemType';
import { isOverflown } from '../helpers/scroll';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
} from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; 
import './Person.scss';

class Person extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    apiConfig: PropTypes.object.isRequired
  }

  state = {
    biographyExtended: false
  }

  constructor(props) {
    super(props);
    this.biographyDiv = React.createRef();
    this.biographyExtendButton = React.createRef();
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPersonDetails(id);
  }

  componentDidUpdate() {
    const isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
      return scrollHeight > clientHeight || scrollWidth > clientWidth;
    }

    if (
      !this.state.biographyExtended &&
      this.biographyDiv.current && 
      !isOverflown(this.biographyDiv.current)
    ) {
      this.biographyExtendButton.current.classList.add('hide');
    }
  }

  renderSocialLinks() {
    const data = this.props.data.external_ids;

    return (
      <span className="social-links">
        {data.facebook_id && (
          <a href={`https://www.facebook.com/${data.facebook_id}`}>
            <FaFacebook/>
          </a>
        )}
        {data.instagram_id && (
          <a href={`https://www.instagram.com/${data.instagram_id}`}>
            <FaInstagram/>
          </a>
        )}
        {data.twitter_id && (
          <a href={`https://www.twitter.com/${data.twitter_id}`}>
            <FaTwitter/>
          </a>
        )}
      </span>
    )
  }

  renderAdditionalInfo() {
    const { data } = this.props;

    const _getValue = (value) => data[value] ? data[value] : '-';

    return (
      <section className="additional">
        <ul>
          <li>
            <span className="white-med-color">Known for:</span> {_getValue('known_for_department')}
          </li>
          <li>
          <span className="white-med-color">Birthday:</span> {_getValue('birthday')}
          </li>
          <li>
            <span className="white-med-color">Place of birth:</span> {_getValue('place_of_birth')}
          </li>
        </ul>
      </section>
    );
  }

  extendBiography = () => {
    this.setState((state) => ({
      biographyExtended: !state.biographyExtended
    }));
  }

  renderBiography() {
    if (!this.props.data.biography) {
      return (
        <section className="person-biography">
          <p>Biography</p>
          <div className="content">
            Sorry, biography is unavailable at this time.
          </div>
        </section>
      );
    }

    let extendButton = (
      <>
        Show more <IoIosArrowDown/>
      </>
    );

    if (this.state.biographyExtended) {
      extendButton = (
        <>
          Show less <IoIosArrowUp/> 
        </>
      );
    }

    return (
      <section className="person-biography">
        <p>Biography</p>
        <div 
          className={`content ${this.state.biographyExtended ? 'extended' : 'hidden'}`}
          ref={this.biographyDiv}
        >
          {this.props.data.biography}
        </div>
      
        <span 
          className="extend-button" 
          ref={this.biographyExtendButton} 
          onClick={this.extendBiography}
        >
          {extendButton}
        </span>
      </section>
    )
  }

  render() {
    const { data, apiConfig } = this.props;

    if (!data.isLoaded || this.props.isLoading) {
      return (<SplashScreen/>);
    }

    return (
      <div className="person-details-container">
        <div className="body-container person-details-wrapper">
          <section className="poster">
            <DetailsImage 
              imagePath={data.profile_path}
              imageConfig={apiConfig.imageConfig}
            />
          </section>
          <section className="person-details-main">
            <section className="title">
              <span className="main-title">{data.name}</span>
              <br/>
              {this.renderSocialLinks()}
            </section>
            {this.renderAdditionalInfo()}
            {this.renderBiography()}
          </section>
          <section className="person-details-known">
            <SectionHeader
              title='Known For'
            />
            <ItemList
              data={data.most_known_for}
              apiConfig={apiConfig}
              itemType={ITEM_TYPE.MOVIES}
              viewMore={false}
            />
          </section>
          <section className="person-details-credits">
            <SectionHeader
              title='Credits'
            />
            <CreditsTable 
              movieCredits={data.movie_credits} 
              tvCredits={data.tv_credits} 
            />
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apiConfig: state.apiConfig,
  isLoading: state.userInterface.pendingRequests > 0,
  data: state.personDetails
});

export default connect(mapStateToProps, { fetchPersonDetails })(Person);
