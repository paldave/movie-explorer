import { combineReducers } from 'redux';
import userInterface from './userInterface';
import apiConfig from './apiConfig';
import moviesPopular from './movies/popular';
import moviesNowPlaying from './movies/nowPlaying';
import moviesUpcoming from './movies/upcoming';
import moviesDetails from './movies/details';
import tvPopular from './tv/popular';
import tvDetails from './tv/details';

export default combineReducers({
  userInterface,
  apiConfig,
  moviesPopular,
  moviesNowPlaying,
  moviesUpcoming,
  moviesDetails,
  tvPopular,
  tvDetails
});