import { 
  GET_SEARCH_PERSON,
  GET_SEARCH_MOVIES,
  GET_SEARCH_TV,
  SET_SEARCH_QUERY,
  CLEAR_STORE_STATE
} from '../constants';

const initialState = {
  isLoaded: false,
  movie: undefined,
  person: undefined,
  tv: undefined,
  userQuery: undefined
};

const search = (state = initialState, action) => {
  switch(action.type) {
    case GET_SEARCH_PERSON:
      return {
        ...state,
        person: action.payload,
        isLoaded: true
      };
    case GET_SEARCH_MOVIES:
      return {
        ...state,
        movie: action.payload,
        isLoaded: true
      }
    case GET_SEARCH_TV:
      return {
        ...state,
        tv: action.payload,
        isLoaded: true
      }
    case SET_SEARCH_QUERY:
      return {
        ...state,
        userQuery: action.payload
      }
    case CLEAR_STORE_STATE:
      return initialState
    default:
      return state;
  }
}

export default search;
