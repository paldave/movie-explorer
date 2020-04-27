import { 
  API_REQUEST, 
  GET_MOVIES_DISCOVER, 
  CLEAR_STORE_STATE 
} from '../../constants';
import { 
  parseQuery, 
  defaultQueryValues, 
  upcomingQueryValues 
} from '../../helpers/query';

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

const _fetchMoviesBase = (unparsedQuery, currentPage, baseQuery) => {
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
}

export const fetchMoviesDiscover = (unparsedQuery, currentPage) => {
  return _fetchMoviesBase(unparsedQuery, currentPage, defaultQueryValues);
};

export const fetchMoviesDiscoverUpcoming = (unparsedQuery, currentPage) => {
  return _fetchMoviesBase(unparsedQuery, currentPage, upcomingQueryValues);
};

