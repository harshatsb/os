let highestZIndex = 10;

// Live Clock Display
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

// Window Dragging & Custom Clenched Fist Cursor
document.querySelectorAll('.window').forEach(win => {
  const header = win.querySelector('.window-header');

  win.addEventListener('mousedown', () => {
    highestZIndex++;
    win.style.zIndex = highestZIndex;
  });

  if (!header) return;

  header.addEventListener('mousedown', e => {
    if (e.target.tagName === 'BUTTON') return;

    document.body.classList.add('dragging');

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
      document.body.classList.remove('dragging');
    }, { once: true });
  });
});

// Audio Playlist Manager
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
  muteBtn.innerText = audio.muted ? '🔇 Muted' : '🔊 Volume';
}

function changeVolume(val) {
  audio.volume = val;
}

// Writings Database & Reader
const articles = {
  a1: {
    title: "The Future of Legal Tech & AI in Indian Courts",
    meta: "August 2026 // Constitutional & Tech Law",
    content: "<p>As AI tools and digitized dockets expand across Indian jurisprudence, the integration of technology in courtrooms offers unprecedented legal access while raising essential questions regarding procedural fairness and data privacy...</p><p>Lawyers who understand computational logic alongside statutory principles will be best equipped to shape the next decade of advocacy.</p>"
  },
  a2: {
    title: "Founding SOKA: Redefining Modern Legal Practice",
    meta: "May 2026 // SOKA Founder Notes",
    content: "<p>SOKA was established with a singular vision: combining deep legal rigour with modern, streamlined execution. From corporate advisories to litigation management, our mission is to eliminate archaic complexities.</p>"
  },
  a3: {
    title: "Reflections on Tinkering: Why Lawyers Should Code",
    meta: "January 2026 // Personal Essays",
    content: "<p>Legal drafting and software development share the exact same foundation: logic, conditionals, and structure. Tinkering with code refines the precision with which we construct contracts and legal arguments.</p>"
  },
  a4: {
    title: "Notes from the Supreme Court of India",
    meta: "October 2025 // Practice Insights",
    content: "<p>Observations on daily advocacy at the highest judicial forum in India. Precision of speech, thorough preparation of brief materials, and swift adaptability remain the bedrock of successful representation.</p>"
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
    document.getElementById('writings-footer').innerText = "Reading: " + art.title;
  }
}

function showWritingsIndex() {
  document.getElementById('writings-list-view').style.display = 'block';
  document.getElementById('writings-reader-view').style.display = 'none';
  document.getElementById('writings-footer').innerText = "4 Articles Available // Click to Read";
}
