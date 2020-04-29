import { 
  API_REQUEST, 
  GET_MOVIES_DISCOVER, 
  GET_MOVIES_DISCOVER_TOP,
  GET_MOVIES_DISCOVER_UPCOMING,
  CLEAR_STORE_STATE 
} from '../../constants';
import { 
  parseQuery, 
  defaultQueryValues, 
  upcomingQueryValues,
  topRatedQueryValues 
} from '../../helpers/query';

const saveMoviesDiscover = (payload, query) => {
  return {
    type: GET_MOVIES_DISCOVER,
    payload,
    query
  }
};

const saveMoviesDiscoverTop = (payload, query) => {
  return {
    type: GET_MOVIES_DISCOVER_TOP,
    payload,
    query
  }
};

const saveMoviesDiscoverUpcoming = (payload, query) => {
  return {
    type: GET_MOVIES_DISCOVER_UPCOMING,
    payload,
    query
  }
};

export const clearStoreState = () => ({
  type: CLEAR_STORE_STATE
});

const _fetchMoviesBase = (unparsedQuery, currentPage, baseQuery, saveCallback) => {
  unparsedQuery.page = currentPage;

  const parsedQuery = parseQuery(unparsedQuery);
  
  return {
    type: API_REQUEST,
    payload: {
      url: '/discover/movie',
      onSuccess: (payload) => [
        saveCallback(payload, unparsedQuery)
      ],
      data: { ...baseQuery(), ...parsedQuery }
    }
  }
}

export const fetchMoviesDiscover = (unparsedQuery, currentPage) => {
  return _fetchMoviesBase(unparsedQuery, currentPage, defaultQueryValues, saveMoviesDiscover);
};

export const fetchMoviesDiscoverTopRated = (unparsedQuery, currentPage) => {
  return _fetchMoviesBase(unparsedQuery, currentPage, topRatedQueryValues, saveMoviesDiscoverTop);
};

export const fetchMoviesDiscoverUpcoming = (unparsedQuery, currentPage) => {
  return _fetchMoviesBase(unparsedQuery, currentPage, upcomingQueryValues, saveMoviesDiscoverUpcoming);
};