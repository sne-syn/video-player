const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');
const player = document.querySelector('.player');

// Play & Pause ----------------------------------- //
const showPlayIcon = () => {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

const togglePlay = () => {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  } else {
    video.pause();
    showPlayIcon();
  }
}

// Progress Bar ---------------------------------- //

const displayTime = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
};

const updateProgress = () => {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

const setProgress = (evt) => {
  const newTime = evt.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}
// Volume Controls --------------------------- //

let lastVolume = 1;

const updateVolumeIcon = (volume) => {
  switch (true) {
    case volume > 0.7:
      console.log(volume)
      volumeIcon.classList.add('fas', 'fa-volume-up');
      break;
    case volume < 0.7 && volume > 0:
      console.log(volume)
      volumeIcon.classList.add('fas', 'fa-volume-down');
      break;
    case volume === 0:
      console.log(volume)
      volumeIcon.classList.add('fas', 'fa-volume-off');
      break;
    default:
      volumeIcon.className = '';
  };  
}

const changeVolume = (evt) => {
  let volume = evt.offsetX / volumeRange.offsetWidth;
  if (volume < 0.1) {
    volume = 0;
  }

  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  volumeIcon.className = '';
  updateVolumeIcon(volume);
  lastVolume = volume;
};

const toggleMute = () => {
  volumeIcon.className = '';
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    updateVolumeIcon(lastVolume);
    volumeIcon.setAttribute('title', 'Mute');
  }
};

// Change Playback Speed -------------------- //
const changeSpeed = () => {
  video.playbackRate = speed.value;
};

// Fullscreen ------------------------------- //
var elem = document.documentElement;

/* View in fullscreen */
const openFullscreen = (elem) => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }

  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }

  video.classList.remove('video-fullscreen');
}

let fullscreen = false;

// Toggle Fullscreen

const toggleFullscreen = () => {
  !fullscreen ? openFullscreen(player) :closeFullscreen();
  fullscreen = !fullscreen;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('ended', showPlayIcon)
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
