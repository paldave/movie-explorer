import { API_REQUEST, API_FINISH, API_ERROR } from '../constants';

// TODO
const initialState = {}; 

const userInterface = (state = initialState, action) => {
  switch(action.type) {
    case API_REQUEST:
      return {
        ...state,
        // ...action.payload
      };
    case API_FINISH:
      return { ...state };
    case API_ERROR:
      return { ...state };
    default:
      return state;
  }
}

export default userInterface;
