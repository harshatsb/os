let highestZIndex = 10;

// Update Live Clock
function updateClock() {
  const now = new Date();
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  document.getElementById('clock').innerText = now.toLocaleDateString('en-US', options).toUpperCase();
}
setInterval(updateClock, 1000);
updateClock();

// Open and Bring Window to Front
function openWindow(id) {
  const win = document.getElementById(id);
  if (win) {
    win.style.display = 'flex';
    highestZIndex++;
    win.style.zIndex = highestZIndex;
  }
}

// Close Window
function closeWindow(id) {
  const win = document.getElementById(id);
  if (win) {
    win.style.display = 'none';
  }
}

// Drag & Drop Mechanics
document.querySelectorAll('.window').forEach(win => {
  const header = win.querySelector('.window-header');

  win.addEventListener('mousedown', () => {
    highestZIndex++;
    win.style.zIndex = highestZIndex;
  });

  header.addEventListener('mousedown', e => {
    if (e.target.tagName === 'BUTTON') return;

    let shiftX = e.clientX - win.getBoundingClientRect().left;
    let shiftY = e.clientY - win.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      win.style.left = pageX - shiftX + 'px';
      win.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.clientX, event.clientY);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    }, { once: true });
  });
});

// Audio Player Toggle
const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');

function toggleAudio() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = '⏸ Pause';
  } else {
    audio.pause();
    playBtn.innerText = '▶ Play';
  }
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
  playBtn.innerText = '▶ Play';
}
