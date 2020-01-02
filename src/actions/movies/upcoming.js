import { API_REQUEST, GET_MOVIES_UPCOMING } from '../../constants';

const saveMoviesUpcoming = (payload) => ({
  type: GET_MOVIES_UPCOMING,
  payload
});

export const fetchMoviesUpcoming = () => ({
  type: API_REQUEST,
  payload: {
    url: '/movie/upcoming',
    onSuccess: saveMoviesUpcoming
  }
});