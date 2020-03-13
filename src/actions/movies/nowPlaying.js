import { API_REQUEST, GET_MOVIES_NOW_PLAYING } from '../../constants';

const saveMoviesNowPlaying = (payload) => ({
  type: GET_MOVIES_NOW_PLAYING,
  payload
});

export const fetchMoviesNowPlaying = () => ({
  type: API_REQUEST,
  payload: {
    url: '/movie/now_playing',
    onSuccess: saveMoviesNowPlaying
  }
});