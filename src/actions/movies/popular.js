import { API_REQUEST, GET_MOVIES_POPULAR } from '../../constants';

const saveMoviesPopular = (payload) => ({
  type: GET_MOVIES_POPULAR,
  payload
});

export const fetchMoviesPopular = () => ({
  type: API_REQUEST,
  payload: {
    url: '/movie/popular',
    onSuccess: saveMoviesPopular
  }
});