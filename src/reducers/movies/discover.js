import { 
  GET_MOVIES_DISCOVER,
  CLEAR_STORE_STATE 
} from '../../constants';

const initialState = {
  isLoaded: false,
  query: null
};

const moviesDiscover = (state = initialState, action) => {
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

export default moviesDiscover;
