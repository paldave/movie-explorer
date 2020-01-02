import { API_REQUEST, GET_TV_POPULAR } from '../../constants';

const saveTvPopular = (payload) => ({
  type: GET_TV_POPULAR,
  payload
});

export const fetchTvPopular = () => ({
  type: API_REQUEST,
  payload: {
    url: '/tv/popular',
    onSuccess: saveTvPopular
  }
});