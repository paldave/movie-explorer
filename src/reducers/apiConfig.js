import { GET_API_CONFIG } from '../constants';

const initialState = {}

const apiConfig = (state = initialState, action) => {
  switch(action.type) {
    case GET_API_CONFIG:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default apiConfig;
