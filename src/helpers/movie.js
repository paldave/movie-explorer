export const getYear = (date) => new Date(date).getFullYear();
export const getGenresString = (genres) => genres.map((genre) => genre.name).join(', ');
export const getDirector = (members) => members.find((member) => member.job === 'Director');
export const getCurrency = (value) => {
  if (value === 0) {
    return '-';
  };

  return new Intl.NumberFormat('en-US', 
    { style: 'currency', currency: 'USD' }
  ).format(value);
};