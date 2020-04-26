import { combineReducers } from 'redux';
import userInterface from './userInterface';
import apiConfig from './apiConfig';
import moviesPopular from './movies/popular';
import moviesNowPlaying from './movies/nowPlaying';
import moviesUpcoming from './movies/upcoming';
import moviesDetails from './movies/details';
import moviesDiscover from './movies/discover';
import tvPopular from './tv/popular';
import tvDetails from './tv/details';
import personDetails from './personDetails';

export default combineReducers({
  userInterface,
  apiConfig,
  moviesPopular,
  moviesNowPlaying,
  moviesUpcoming,
  moviesDetails,
  moviesDiscover,
  tvPopular,
  tvDetails,
  personDetails
});