import { parseVideos } from '../../helpers/parseVideos';
import { parseCrew } from '../../helpers/parseCrew';
import { 
  API_REQUEST, 
  GET_TV_DETAILS, 
} from '../../constants';

const saveTvDetails = (payload) => {
  payload.videos = parseVideos(payload.videos.results);
  payload.credits.crew = parseCrew(payload.credits.crew);
  
  return {
    type: GET_TV_DETAILS,
    payload
  }
};

export const fetchTvDetails = (id) => ({
  type: API_REQUEST,
  payload: {
    url: `/tv/${id}`,
    onSuccess: saveTvDetails,
    data: {
      append_to_response: 'credits,videos,reviews,recommendations'
    }
  }
});