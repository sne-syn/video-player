const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

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
  }
}

// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('ended', showPlayIcon)
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
