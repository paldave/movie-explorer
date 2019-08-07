import { API_REQUEST, GET_API_CONFIG } from '../constants';

const saveApiConfig = (payload) => ({
  type: GET_API_CONFIG,
  payload
});

export const fetchApiConfig = () => ({
  type: API_REQUEST,
  payload: {
    url: '/configuration',
    onSuccess: saveApiConfig
  }
});