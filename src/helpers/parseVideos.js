export const parseVideos = (videos) => {
  let parsedVideos = [];

  videos.forEach((video) => {
    if (video.site !== 'YouTube') {
      return;
    }
    
    video.url = `https://www.youtube.com/watch?v=${video.key}`;

    if (video.type === 'Trailer') {
      parsedVideos.unshift(video);
    }

    if (video.type === 'Teaser') {
      parsedVideos.push(video);
    }
  });
  
  return parsedVideos;
}