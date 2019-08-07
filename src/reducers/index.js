import { combineReducers } from 'redux';
import userInterface from './userInterface';
import apiConfig from './apiConfig';
import moviesNowPlaying from './movies/nowPlaying';

export default combineReducers({
  userInterface,
  apiConfig,
  moviesNowPlaying
});