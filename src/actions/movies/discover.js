import { 
  API_REQUEST, 
  GET_MOVIES_DISCOVER, 
  CLEAR_STORE_STATE 
} from '../../constants';
import { parseQuery, baseQuery } from '../../helpers/query';

const saveMoviesDiscover = (payload, query) => {
  return {
    type: GET_MOVIES_DISCOVER,
    payload,
    query
  }
};

export const clearStoreState = () => ({
  type: CLEAR_STORE_STATE
});

export const fetchMoviesDiscover = (unparsedQuery, currentPage) => {
  unparsedQuery.page = currentPage;

  const parsedQuery = parseQuery(unparsedQuery);
  
  return {
    type: API_REQUEST,
    payload: {
      url: '/discover/movie',
      onSuccess: (payload) => [
        saveMoviesDiscover(payload, unparsedQuery)
      ],
      data: { ...baseQuery(), ...parsedQuery }
    }
  }
};

