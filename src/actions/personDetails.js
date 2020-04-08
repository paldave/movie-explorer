import { 
  API_REQUEST, 
  GET_PERSON_DETAILS, 
} from '../constants';
import { getYear } from '../helpers/movie';

const _sortByKey = (data, key, additionalFunction) => {
  if (!data) {
    return {}
  }

  return data.sort((a, b) => {
    if (additionalFunction === 'date') {
      return new Date(b[key]) - new Date(a[key]);
    } else if (additionalFunction) {
      return additionalFunction(b[key]) - additionalFunction(a[key]);
    } else {
      return b[key] - a[key];
    }
  }).slice(0, 12);
};

const _parseItemCredits = (data, dateKey) => {
  let parsedHash = {};

  Object.keys(data).forEach((dataType) => {
    // Sort items for each key by date;
    _sortByKey(data[dataType], dateKey, 'date');

    // Loop through sorted items and create hash;
    data[dataType].forEach((item) => {
      const year = getYear(item[dateKey]) || 0;
      const yearIsEmpty = year === 0;

      if (!parsedHash.hasOwnProperty(dataType)) {
        parsedHash[dataType] = {};
      }
      
      if (!parsedHash[dataType].hasOwnProperty(year)) {
        parsedHash[dataType][year] = [];
      }

      let arrayToPush = parsedHash[dataType][year];
      let arrayLastElement;

      if (yearIsEmpty) {
        arrayLastElement = arrayToPush.find((lastItem) => lastItem.id === item.id);
      } else {
        arrayLastElement = arrayToPush[arrayToPush.length - 1];
      }
      
      if (
        (yearIsEmpty && arrayLastElement) || 
        (arrayLastElement && arrayLastElement.id === item.id)
      ) {
        (arrayLastElement.extras = []).push(item);
      } else {
        arrayToPush.push(item);
      }

    });
  });

  return parsedHash;
};

const savePersonDetails = (payload) => {
  payload.movie_credits = _parseItemCredits(payload.movie_credits, 'release_date');
  payload.tv_credits = _parseItemCredits(payload.tv_credits, 'first_air_date');

  payload.most_known_for = _sortByKey(
    payload.combined_credits.cast.slice(),
    'vote_count',
    parseFloat
  );

  return {
    type: GET_PERSON_DETAILS,
    payload
  }
};

export const fetchPersonDetails = (id) => ({
  type: API_REQUEST,
  payload: {
    url: `/person/${id}`,
    onSuccess: savePersonDetails,
    data: {
      append_to_response: 'movie_credits,tv_credits,combined_credits,external_ids'
    }
  }
});