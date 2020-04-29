import { 
  GET_MOVIES_DISCOVER,
  GET_MOVIES_DISCOVER_TOP,
  GET_MOVIES_DISCOVER_UPCOMING,
  CLEAR_STORE_STATE
} from '../../constants';

const initialState = {
  isLoaded: false,
  query: null
};

export const moviesDiscover = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIES_DISCOVER:
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

export const moviesDiscoverTop = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIES_DISCOVER_TOP:
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

export const moviesDiscoverUpcoming = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIES_DISCOVER_UPCOMING:
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