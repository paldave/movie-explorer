import { combineReducers } from 'redux';
import userInterface from './userInterface';
import apiConfig from './apiConfig';
import moviesPopular from './movies/popular';
import moviesNowPlaying from './movies/nowPlaying';
import moviesUpcoming from './movies/upcoming';
import tvPopular from './tv/popular';

export default combineReducers({
  userInterface,
  apiConfig,
  moviesPopular,
  moviesNowPlaying,
  moviesUpcoming,
  tvPopular
});