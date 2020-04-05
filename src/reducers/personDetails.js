import { 
  GET_PERSON_DETAILS, 
} from '../constants';

const initialState = {
  isLoaded: false
};

const personDetails = (state = initialState, action) => {
  switch(action.type) {
    case GET_PERSON_DETAILS:
      return {
        ...state,
        ...action.payload,
        isLoaded: true
      };
    default:
      return state;
  }
}

export default personDetails;
