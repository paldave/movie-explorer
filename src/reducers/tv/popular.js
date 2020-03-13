import { GET_TV_POPULAR } from '../../constants';

const initialState = {
  isLoaded: false
};

const tvPopular = (state = initialState, action) => {
  switch(action.type) {
    case GET_TV_POPULAR:
      return {
        ...state,
        ...action.payload,
        isLoaded: true
      };
    default:
      return state;
  }
}

export default tvPopular;
