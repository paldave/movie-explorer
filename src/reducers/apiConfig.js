import { GET_API_CONFIG } from '../constants';

const initialState = {
  isInitializing: true,
  imageConfig: { 
    availableSizes: {},
    baseUrl: null
  },
  genres: {}
};

const apiConfig = (state = initialState, action) => {
  switch(action.type) {
    case GET_API_CONFIG:
      return {
        ...state,
        ...action.payload,
        isInitializing: false
      };
    default:
      return state;
  }
}

export default apiConfig;
