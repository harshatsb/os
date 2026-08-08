let highestZIndex = 10;

// Retro Setup / Boot Loader Logic
function simulateOsSetup() {
  const bootLoader = document.getElementById('os-boot-loader');
  const progressBar = document.getElementById('boot-progress');
  const percentText = document.getElementById('boot-percent');
  
  let progress = 0;
  const setupInterval = setInterval(() => {
    progress += Math.random() * 8; // Random incremental jumps
    if (progress >= 100) {
      progress = 100;
      clearInterval(setupInterval);
      
      // Hide Loader and show desktop with a slight delay
      setTimeout(() => {
        bootLoader.style.display = 'none';
        openWindow('win-about'); // Open System Info on boot
      }, 500);
    }
    
    progressBar.style.width = progress + '%';
    percentText.innerText = Math.round(progress);
  }, 100); // Fast but simulated loading
}

// Start Setup on Page Load
simulateOsSetup();

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

// Audio Playlist Manager (Mute, Vol added)
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
const eqBars = document.getElementById('eq-bars');
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
  eqBars.classList.add('playing');
}

function toggleAudio() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = '⏸ Pause';
    eqBars.classList.add('playing');
  } else {
    audio.pause();
    playBtn.innerText = '▶ Play';
    eqBars.classList.remove('playing');
  }
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  playTrack(currentTrackIndex);
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  playTrack(currentTrackIndex);
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
    meta: "August 2026 // Constitutional & Tech Law",
    content: "<p>As AI tools and digitized dockets expand across Indian jurisprudence, the integration of technology in courtrooms offers unprecedented legal access while raising essential questions regarding procedural fairness and data privacy...</p><p>Advocates who understand computational logic alongside statutory principles will be best equipped to shape the next decade of advocacy.</p>"
  },
  a2: {
    title: "Founding SOKA: Redefining Modern Legal Practice",
    meta: "May 2026 // Legal Innovation // Founder Notes",
    content: "<p>SOKA was established with a singular vision: combining deep legal rigour with modern, streamlined execution. Our mission is to eliminate archaic complexities in legal service delivery.</p>"
  },
  a3: {
    title: "Reflections on Tinkering: Why Lawyers Should Code",
    meta: "January 2026 // Personal Essays",
    content: "<p>The constructs of legal drafting and software development share the exact same foundation: logic, conditionals, and structure. Tinkering with code refines the precision with which we construct contracts and arguments.</p>"
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

// Guestbook Management (Sign anonymoulsy)
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
