import { 
  API_REQUEST, 
  API_FINISH, 
  API_ERROR,
} from '../constants';

// TODO
const initialState = {
  pendingRequests: 0,
  lastSelectedFilters: {}
}; 

const userInterface = (state = initialState, action) => {
  switch(action.type) {
    case API_REQUEST:
      return {
        ...state,
        pendingRequests: state.pendingRequests + 1
      };
    case API_FINISH:
      return {
        ...state,
        pendingRequests: state.pendingRequests - 1
      };
    case API_ERROR:
      return {
        ...state,
        pendingRequests: state.pendingRequests - 1
        // TODO: Error handling
      };
    default:
      return state;
  }
}

export default userInterface;
