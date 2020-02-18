import axios from 'axios';
import { API_REQUEST, API_FINISH, API_ERROR } from '../constants';

const axiosClient = axios.create(
  { 
    baseURL: process.env.REACT_APP_TMDB_API_URL,
    params: {
      api_key: process.env.REACT_APP_TMDB_API_KEY,
      language: 'en-GB'
    }
  }
);

const apiFinish = () => ({ type: API_FINISH });
const apiError = () => ({ type: API_ERROR });

export const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);

  if (action.type !== API_REQUEST) {
    return;
  }

  const { url, onSuccess, method = 'GET', data = {} } = action.payload;
  const dataProperty = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

  axiosClient.request({ url, method, [dataProperty]: data })
    .then(({ data }) => {
      dispatch(onSuccess(data));
      dispatch(apiFinish());
    })
    .catch((error) => {
      console.log(error)
      dispatch(apiError());
    }); // TODO

};