import { combineReducers } from 'redux';
import userInterface from './userInterface';
import moviesNowPlaying from './movies/nowPlaying';

export default combineReducers({
  userInterface,
  moviesNowPlaying
});