import { 
  getDatePlusMonthFormatted, 
  getDatePlusDayFormatted 
} from './date';

export const SORT_BY = {
  popularityDesc: { type: 'sort_by', value: 'popularity.desc', label: 'Popularity Descending' },
  popularityAsc: { type: 'sort_by', value: 'popularity.asc', label: 'Popularity Ascending' },
  ratingDesc: { type: 'sort_by', value: 'vote_average.desc', label: 'Rating Descending' },
  ratingAsc: { type: 'sort_by', value: 'vote_average.asc', label: 'Rating Ascending' },
  titleDesc: { type: 'sort_by', value: 'original_title.desc', label: 'Title Descending' },
  titleAsc: { type: 'sort_by', value: 'original_title.asc', label: 'Title Ascending' },
  releaseDateDesc: { type: 'sort_by', value: 'primary_release_date.desc', label: 'Release Date Descending' },
  releaseDateAsc: { type: 'sort_by', value: 'primary_release_date.asc', label: 'Release Date Ascending' }
}

export const RELEASE_DATE = {
  greaterThan: { type: 'primary_release_date.gte', value: null, label: 'From: ' },
  lessThan: { type: 'primary_release_date.lte', value: null, label: 'To: ' }
}

export const defaultQueryValues = () => ({
  include_adult: false,
  include_video: false,
  'primary_release_date.lte': getDatePlusMonthFormatted(6)
});

export const upcomingQueryValues = () => ({
  ...defaultQueryValues(),
  'primary_release_date.gte': getDatePlusDayFormatted(2),
  'primary_release_date.lte': getDatePlusMonthFormatted(1)
})

export const parseQuery = (data) => {
  let parsedQueryList = {};

  Object.entries(data).forEach(([key, query]) => {
    if (key === 'with_genres' && Array.isArray(query) && query.length === 0) {
      delete parsedQueryList[key];
      return;
    }

    if (Array.isArray(query)) {
      return parsedQueryList[key] = query.map((element) => (
        element.value
      )).join(',')
    }

    if (key === 'page') {
      return parsedQueryList[key] = query
    }
      
    return parsedQueryList[key] = query.value;
  });

  return parsedQueryList;
}