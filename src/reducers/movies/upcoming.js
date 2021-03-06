import { GET_MOVIES_UPCOMING } from '../../constants';

const initialState = {
  isLoaded: false
};

const moviesUpcoming = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIES_UPCOMING:
      return {
        ...state,
        ...action.payload,
        isLoaded: true
      };
    default:
      return state;
  }
}

export default moviesUpcoming;
