import { parseVideos } from '../../helpers/parseVideos';
import { 
  API_REQUEST, 
  GET_MOVIES_DETAILS, 
} from '../../constants';

const saveMoviesDetails = (payload) => {
  payload.videos = parseVideos(payload.videos.results);
  
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