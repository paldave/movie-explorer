import { GET_MOVIES_POPULAR } from '../../constants';

const initialState = {
  results: []
};

const moviesPopular = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIES_POPULAR:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default moviesPopular;
