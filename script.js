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

// Window Dragging and Clenched Hand Cursor
document.querySelectorAll('.window').forEach(win => {
  const header = win.querySelector('.window-header');

  win.addEventListener('mousedown', () => {
    highestZIndex++;
    win.style.zIndex = highestZIndex;
  });

  header.addEventListener('mousedown', e => {
    if (e.target.tagName === 'BUTTON') return;
    
    // Change Cursor to Clenched Fist when dragging
    win.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'black\' stroke=\'white\' stroke-width=\'1.5\'><path d=\'M18 11V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2a2 2 0 0 0-2 2v3a5 5 0 0 0 5 5h4a5 5 0 0 0 5-5v-3a2 2 0 0 0-2-2z\'/></svg>"), grabbing';

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
      // Revert Cursor
      win.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'black\' stroke=\'white\' stroke-width=\'1.5\'><path d=\'M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v11l-3-3a2 2 0 0 0-2.8 2.8l5.8 5.8C8 22 10 23 13 23h4a5 5 0 0 0 5-5v-5a2 2 0 0 0-2-2z\'/></svg>"), pointer';
    }, { once: true });
  });
});

// Audio Playlist Manager (Volume Control added)
const playlist = [
  { title: "01. Lofi Chill Beats (Acoustic)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "02. Synthwave Sunset (1988)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "03. Supreme Court Chambers Lofi", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "04. Jalandhar Rain Ambient", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "05. Midnight Code & Law Study", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { title: "06. Retro Radio Wave Broadcast", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" }
];

let currentTrackIndex = 0;
const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');
const muteBtn = document.getElementById('mute-btn');
const nowPlayingTitle = document.getElementById('now-playing-title');
const playlistItems = document.querySelectorAll('#playlist-ul li');

function playTrack(index) {
  currentTrackIndex = index;
  audio.src = playlist[index].url;
  nowPlayingTitle.innerText = "► " + playlist[index].title;
  
  playlistItems.forEach((li, i) => {
    li.classList.toggle('active', i === index);
  });

  audio.play();
  playBtn.innerText = '⏸ Pause';
}

function toggleAudio() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = '⏸ Pause';
  } else {
    audio.pause();
    playBtn.innerText = '▶ Play';
  }
}

function toggleMute() {
  audio.muted = !audio.muted;
  muteBtn.innerText = audio.muted ? '🔇 Muted' : '🔊 Vol';
}

function changeVolume(val) {
  audio.volume = val;
}

// Writings Database & Reader
const articles = {
  a1: {
    title: "The Future of Legal Tech & AI in Indian Courts",
    meta: "August 2026 // Constitutional Law // AI",
    content: "<p>As AI tools and digitized dockets expand across Indian jurisprudence, the integration of technology in courtrooms offers unprecedented legal access while raising essential questions regarding procedural fairness...</p><p>Advocates who understand the intersection of statute and data will be essential in navigating the next decade of advocacy.</p>"
  },
  a2: {
    title: "Founding SOKA: Redefining Modern Legal Practice",
    meta: "May 2026 // Legal Innovation // Founder Notes",
    content: "<p>SOKA was established with a singular vision: combining deep legal rigour with streamlined execution. Our mission is to eliminate archaic complexities in legal service delivery.</p>"
  },
  a3: {
    title: "Notes from the Supreme Court: Precision in Advocacy",
    meta: "January 2026 // Supreme Court of India // Notes",
    content: "<p>The Supreme Court environment demands extreme preparation. Precision of argument, logical clarity, and swift adaptability under judicial scrutiny are the bedrock of successful representation.</p>"
  }
};

function readArticle(id) {
  const art = articles[id];
  if (art) {
    document.getElementById('article-heading').innerText = art.title;
    document.getElementById('article-meta').innerText = art.meta;
    document.getElementById('article-body-text').innerHTML = art.content;

    document.getElementById('writings-list-view').style.display = 'none';
    document.getElementById('writings-reader-view').style.display = 'block';
  }
}

function showWritingsIndex() {
  document.getElementById('writings-list-view').style.display = 'block';
  document.getElementById('writings-reader-view').style.display = 'none';
}

// Guestbook Management
const guestbookMessages = document.getElementById('guestbook-messages');
const guestbookInput = document.getElementById('guestbook-input');

guestbookInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && guestbookInput.value.trim() !== "") {
    addGuestbookMessage(guestbookInput.value);
    guestbookInput.value = ""; // Clear input
  }
});

function addGuestbookMessage(text) {
  const now = new Date();
  const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

  const messageDiv = document.createElement('div');
  messageDiv.className = 'guest-message';
  messageDiv.innerHTML = `<strong>Anon</strong> <span class="gb-time">${timeStr}</span><p>${text}</p>`;

  // Add to top of list
  guestbookMessages.prepend(messageDiv);
}
