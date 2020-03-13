import { API_REQUEST, GET_API_CONFIG } from '../constants';
import { PROPORTION } from '../helpers/image';

const parseImagesObject = (payload) => {
  let { images, languages } = payload;
  
  languages = Object.fromEntries(
    languages.map((item) => [item.iso_639_1, item.english_name])
  );

  const availableSizes = {
    [PROPORTION.THUMBNAIL]: images.poster_sizes[1],
    [PROPORTION.POSTER]: images.poster_sizes[3],
    [PROPORTION.BACKDROP]: images.backdrop_sizes[2]
  }
  
  const baseUrl = images.secure_base_url;

  return { imageConfig: { availableSizes, baseUrl }, languages };
};

const parseGenres = (payload) => (
  Object.fromEntries(
    payload.map((item) => [item.id, item.name])
  )
);

const saveApiConfig = (apiConfig, genres) => {
  return {
    type: GET_API_CONFIG,
    payload: { ...parseImagesObject(apiConfig), genres: parseGenres(genres) }
  }
}

export const fetchApiConfig = () => ({
  type: API_REQUEST,
  payload: {
    url: '/configuration',
    onSuccess: (apiConfig) => [
      fetchGenresConfig(apiConfig)
    ],
    data: {
      append_to_response: 'languages'
    }
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