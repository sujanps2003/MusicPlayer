// Selecting HTML elements
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const seekBar = document.getElementById('seek-bar');
const volumeSlider = document.getElementById('volume');
const playlist = document.getElementById('playlist');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

let currentIndex = 0;
const tracks = Array.from(playlist.querySelectorAll('li'));

// Load song based on index
function loadTrack(index) {
  const track = tracks[index];
  const [title, artist] = track.textContent.split(' - ');
  audio.src = track.getAttribute('data-src');
  trackTitle.textContent = title;
  trackArtist.textContent = artist;
  updateActiveClass(index);
}

function updateActiveClass(index) {
  tracks.forEach((track, i) => {
    track.classList.toggle('active', i === index);
  });
}

// Format time (e.g., 1:09)
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

// Play or pause toggle
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
});

// Previous song
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentIndex);
  audio.play();
  playBtn.textContent = '⏸️';
});

// Next song
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex);
  audio.play();
  playBtn.textContent = '⏸️';
});

// Update progress bar and time
audio.addEventListener('timeupdate', () => {
  seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
  durationDisplay.textContent = formatTime(audio.duration || 0);
});

// Seek bar control
seekBar.addEventListener('input', () => {
  audio.currentTime = (seekBar.value / 100) * audio.duration;
});

// Volume control
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Playlist click
tracks.forEach((track, index) => {
  track.addEventListener('click', () => {
    currentIndex = index;
    loadTrack(index);
    audio.play();
    playBtn.textContent = '⏸️';
  });
});

// Auto next song
audio.addEventListener('ended', () => {
  nextBtn.click();
});

// Initialize first track
loadTrack(currentIndex);
