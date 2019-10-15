import { API_REQUEST, GET_API_CONFIG } from '../constants';
import { PROPORTION } from '../helpers/image';

const parseImagesObject = (payload) => {
  let { images } = payload;

  const availableSizes = {
    [PROPORTION.THUMBNAIL]: images.poster_sizes[1] 
  }
  
  const baseUrl = images.secure_base_url;

  return { imageConfig: { availableSizes, baseUrl } };
};

const parseGenres = (payload) => {
  let genres = {};
  payload.forEach((genre) => genres[genre.id] = genre.name);

  return { genres };
};

const saveApiConfig = (apiConfig, genres) => {
  return {
    type: GET_API_CONFIG,
    payload: { ...parseImagesObject(apiConfig), ...parseGenres(genres) }
  }
}

export const fetchApiConfig = () => ({
  type: API_REQUEST,
  payload: {
    url: '/configuration',
    onSuccess: (apiConfig) => [
      fetchGenresConfig(apiConfig)
    ]
  }
});

const fetchGenresConfig = (apiConfig) => ({
  type: API_REQUEST,
  payload: {  
    url: '/genre/movie/list',
    onSuccess: (genresConfig) => [
      saveApiConfig(apiConfig, genresConfig.genres)
    ]
  }
})