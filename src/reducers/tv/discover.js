import {
  GET_TV_DISCOVER,
  GET_TV_DISCOVER_TOP,
  CLEAR_STORE_STATE
} from '../../constants';

const initialState = {
  isLoaded: false,
  query: null
};

export const tvDiscover = (state = initialState, action) => {
  switch (action.type) {
    case GET_TV_DISCOVER:
      return {
        ...state,
        ...action.payload,
        query: action.query,
        isLoaded: true
      };
    case CLEAR_STORE_STATE:
      return initialState;
    default:
      return state;
  }
}

export const tvDiscoverTop = (state = initialState, action) => {
  switch (action.type) {
    case GET_TV_DISCOVER_TOP:
      return {
        ...state,
        ...action.payload,
        query: action.query,
        isLoaded: true
      };
    case CLEAR_STORE_STATE:
      return initialState;
    default:
      return state;
  }
}
