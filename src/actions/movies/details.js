import { parseVideos } from '../../helpers/parseVideos';
import { parseCrew } from '../../helpers/parseCrew';
import { 
  API_REQUEST, 
  GET_MOVIES_DETAILS,
} from '../../constants';

const saveMoviesDetails = (payload) => {
  payload.videos = parseVideos(payload.videos.results);
  payload.credits.crew = parseCrew(payload.credits.crew);
  
  return {
    type: GET_MOVIES_DETAILS,
    payload
  }
};

export const fetchMoviesDetails = (id) => ({
  type: API_REQUEST,
  payload: {
    url: `/movie/${id}`,
    onSuccess: saveMoviesDetails,
    data: {
      append_to_response: 'credits,videos,reviews,recommendations'
    }
  }
});