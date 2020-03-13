import { 
  GET_MOVIES_DETAILS, 
} from '../../constants';

const initialState = {
  isLoaded: false
};

const moviesDetails = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIES_DETAILS:
      return {
        ...state,
        ...action.payload,
        isLoaded: true
      };
    default:
      return state;
  }
}

export default moviesDetails;
