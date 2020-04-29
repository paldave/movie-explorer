import { 
  API_REQUEST, 
  GET_TV_DISCOVER,
  GET_TV_DISCOVER_TOP,
  CLEAR_STORE_STATE 
} from '../../constants';
import { 
  parseQuery, 
  defaultQueryValues, 
  topRatedQueryValues
} from '../../helpers/query';

const saveTvDiscover = (payload, query) => {
  return {
    type: GET_TV_DISCOVER,
    payload,
    query
  }
};

const saveTvDiscoverTop = (payload, query) => {
  return {
    type: GET_TV_DISCOVER_TOP,
    payload,
    query
  }
};

export const clearStoreState = () => ({
  type: CLEAR_STORE_STATE
});

const _fetchTvBase = (unparsedQuery, currentPage, baseQuery, saveCallback) => {
  unparsedQuery.page = currentPage;

  const parsedQuery = parseQuery(unparsedQuery);
  
  return {
    type: API_REQUEST,
    payload: {
      url: '/discover/tv',
      onSuccess: (payload) => [
        saveCallback(payload, unparsedQuery)
      ],
      data: { ...baseQuery(), ...parsedQuery }
    }
  }
}

export const fetchTvDiscover = (unparsedQuery, currentPage) => {
  return _fetchTvBase(unparsedQuery, currentPage, defaultQueryValues, saveTvDiscover);
};

export const fetchTvDiscoverTopRated = (unparsedQuery, currentPage) => {
  return _fetchTvBase(unparsedQuery, currentPage, topRatedQueryValues, saveTvDiscoverTop);
};