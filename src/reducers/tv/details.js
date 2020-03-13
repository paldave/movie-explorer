import { 
  GET_TV_DETAILS, 
} from '../../constants';

const initialState = {
  isLoaded: false
};

const tvDetails = (state = initialState, action) => {
  switch(action.type) {
    case GET_TV_DETAILS:
      return {
        ...state,
        ...action.payload,
        isLoaded: true
      };
    default:
      return state;
  }
}

export default tvDetails;
