// Enum with available image proportions
export const PROPORTION = { 
  THUMBNAIL: 'THUMBNAIL',
  BACKDROP: 'BACKDROP',
  POSTER: 'POSTER',
  PROFILE_THUMBNAIL: 'PROFILE_THUMBNAIL'
};

export const getUrl = (size, base, path) => {
  return `${base}${size}${path}`;
}
