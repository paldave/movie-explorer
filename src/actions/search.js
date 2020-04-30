import { 
  API_REQUEST, 
  GET_SEARCH_PERSON,
  GET_SEARCH_MOVIES,
  GET_SEARCH_TV,
  SET_SEARCH_QUERY,
  CLEAR_STORE_STATE
} from '../constants';
import { defaultSearchQueryValues } from '../helpers/query';

const saveSearchPerson = (payload) => ({
  type: GET_SEARCH_PERSON,
  payload
});

const saveSearchMovies = (payload) => ({
  type: GET_SEARCH_MOVIES,
  payload
});

const saveSearchTv = (payload) => ({
  type: GET_SEARCH_TV,
  payload
});

export const setSearchQueryUser = (payload) => ({
  type: SET_SEARCH_QUERY,
  payload
})

export const clearStoreState = () => ({
  type: CLEAR_STORE_STATE
})

export const fetchSearchMovies = (unparsedQuery, currentPage) => {
  unparsedQuery.page = currentPage;

  return {
    type: API_REQUEST,
    payload: {
      url: '/search/movie',
      onSuccess: (payload) => [
        saveSearchMovies(payload)
      ],
      data: { ...defaultSearchQueryValues(), ...unparsedQuery }
    }
  }
}

export const fetchSearchPerson = (unparsedQuery, currentPage) => {
  unparsedQuery.page = currentPage;
  
  return {
    type: API_REQUEST,
    payload: {
      url: '/search/person',
      onSuccess: (payload) => [
        saveSearchPerson(payload)
      ],
      data: { ...defaultSearchQueryValues(), ...unparsedQuery }
    }
  }
}

export const fetchSearchTv = (unparsedQuery, currentPage) => {
  unparsedQuery.page = currentPage;

  return {
    type: API_REQUEST,
    payload: {
      url: '/search/tv',
      onSuccess: (payload) => [
        saveSearchTv(payload)
      ],
      data: { ...defaultSearchQueryValues(), ...unparsedQuery }
    }
  }
}