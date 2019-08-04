import axios from 'axios';
import { API_REQUEST } from '../constants';

const axiosClient = axios.create(
  { 
    baseURL: process.env.REACT_APP_TMDB_API_URL,
    params: {
      api_key: process.env.REACT_APP_TMDB_API_KEY,
      language: 'en-GB'
    }
  }
);

export const apiMiddleware = ({ dispatch }) => next => action => {
  console.log(axiosClient.defaults);
  console.log(action);
  next(action);

  if (action.type !== API_REQUEST) {
    return;
  }

  const { url, onSuccess, method = 'GET' } = action.payload;

  axiosClient.request({ url, method })
    .then(({ data }) => dispatch(onSuccess(data)))
    .catch((error) => console.log(error)); // TODO

};