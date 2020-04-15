import { parseVideos } from '../../helpers/parseVideos';
import { 
  API_REQUEST, 
  GET_MOVIES_DETAILS, 
} from '../../constants';

const parseCrew = (crew) => {
  let parsedData = {};
  
  crew.forEach((member) => {
    const { department } = member;
    
    if (!parsedData.hasOwnProperty(department)) {
      parsedData[department] = [];
    }

    parsedData[department].push(member);
  });
  
  return parsedData;
}

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