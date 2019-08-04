import { API_REQUEST, GET_MOVIES_NOW_PLAYING } from '../../constants';

const saveMovieNowPlaying = (payload) => ({
  type: GET_MOVIES_NOW_PLAYING,
  payload
});

export const fetchMovieNowPlaying = () => ({
  type: API_REQUEST,
  payload: {
    url: '/movie/now_playing',
    onSuccess: saveMovieNowPlaying
  }
});