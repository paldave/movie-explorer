import { combineReducers } from 'redux';
import userInterface from './userInterface';
import apiConfig from './apiConfig';
import moviesPopular from './movies/popular';
import moviesNowPlaying from './movies/nowPlaying';

export default combineReducers({
  userInterface,
  apiConfig,
  moviesPopular,
  moviesNowPlaying
});