import { 
  API_REQUEST, 
  GET_TV_DISCOVER, 
  CLEAR_STORE_STATE 
} from '../../constants';
import { 
  parseQuery, 
  defaultQueryValues, 
  upcomingQueryValues 
} from '../../helpers/query';

const saveTvDiscover = (payload, query) => {
  return {
    type: GET_TV_DISCOVER,
    payload,
    query
  }
};

export const clearStoreState = () => ({
  type: CLEAR_STORE_STATE
});

const _fetchTvBase = (unparsedQuery, currentPage, baseQuery) => {
  unparsedQuery.page = currentPage;

  const parsedQuery = parseQuery(unparsedQuery);
  
  return {
    type: API_REQUEST,
    payload: {
      url: '/discover/tv',
      onSuccess: (payload) => [
        saveTvDiscover(payload, unparsedQuery)
      ],
      data: { ...baseQuery(), ...parsedQuery }
    }
  }
}

export const fetchTvDiscover = (unparsedQuery, currentPage) => {
  return _fetchTvBase(unparsedQuery, currentPage, defaultQueryValues);
};

export const fetchTvDiscoverUpcoming = (unparsedQuery, currentPage) => {
  return _fetchTvBase(unparsedQuery, currentPage, upcomingQueryValues);
};

