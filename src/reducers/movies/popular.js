import { GET_MOVIES_POPULAR } from '../../constants';

const initialState = {
  isLoaded: false
};

const moviesPopular = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIES_POPULAR:
      return {
        ...state,
        ...action.payload,
        isLoaded: true
      };
    default:
      return state;
  }
}

export default moviesPopular;
