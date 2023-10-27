const requestFullScreen = (index: number) => {
  const videos = document.getElementsByTagName('video');
  videos[index].requestFullscreen();
};

export default requestFullScreen;
