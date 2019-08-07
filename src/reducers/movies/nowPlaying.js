import { GET_MOVIES_NOW_PLAYING } from '../../constants';

const initialState = {
  results: []
};

const moviesNowPlaying = (state = initialState, action) => {
  switch(action.type) {
    case GET_MOVIES_NOW_PLAYING:
      return {
        ...state,
        ...action.payload.results
      };
    default:
      return state;
  }
}

export default moviesNowPlaying;
