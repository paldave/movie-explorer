// Enum with available image proportions
export const PROPORTION = { 
  THUMBNAIL: 'THUMBNAIL',
  BACKDROP: 'BACKDROP'
};

export const getUrl = (size, base, path) => {
  return `${base}${size}${path}`;
}
