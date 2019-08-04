import { GET_ERRORS } from '../constants';

const initialState = {};

const userInterface = (state = initialState, action) => {
  switch(action.type) {
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
};

export default userInterface;