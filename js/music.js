/**
 * AUDIO CONTROLLER
 * Compliant with modern browser autoplay policies.
 * Plays local audio file with procedural Web Audio ambient fallback.
 */

const MusicModule = (function() {
  let audioEl = null;
  let isPlaying = false;
  let isMuted = false;
  let userHasInteracted = false;
  let webAudioCtx = null;
  let webAudioTimer = null;

  function init() {
    setupAudioElement();
    setupControls();
  }

  function setupAudioElement() {
    audioEl = new Audio();
    audioEl.src = CONFIG.audio.filePath;
    audioEl.loop = true;
    audioEl.volume = CONFIG.audio.defaultVolume || 0.45;

    // Detect if audio file cannot be loaded
    audioEl.addEventListener('error', (e) => {
      console.info("Local audio file not available or format unsupported. Ambient synth fallback ready.");
    });
  }

  function setupControls() {
    const toggleBtn = document.getElementById('audio-toggle-btn');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      if (!isPlaying) {
        startMusic();
      } else {
        toggleMute();
      }
    });
  }

  function startMusic() {
    userHasInteracted = true;
    if (isPlaying) return;

    // Attempt HTML5 audio playback
    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        updateUI();
      }).catch((err) => {
        console.warn("Autoplay blocked or file missing. Starting Web Audio ambient synthesizer.");
        startWebAudioFallback();
      });
    } else {
      startWebAudioFallback();
    }
  }

  function startWebAudioFallback() {
    if (!CONFIG.audio.enableChimeFallback) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!webAudioCtx) webAudioCtx = new AudioContext();

      if (webAudioCtx.state === 'suspended') {
        webAudioCtx.resume();
      }

      isPlaying = true;
      updateUI();
      scheduleAmbientChimes();
    } catch (e) {
      console.warn("Web Audio ambient synth could not start:", e);
    }
  }

  function scheduleAmbientChimes() {
    if (!isPlaying || isMuted || !webAudioCtx) return;

    // Soothing pentatonic chord frequencies (F, G, A, C, D)
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    const randomFreq = notes[Math.floor(Math.random() * notes.length)];

    playChime(randomFreq);

    // Schedule next gentle chime between 2.5 and 5.5 seconds
    const delay = 2500 + Math.random() * 3000;
    webAudioTimer = setTimeout(scheduleAmbientChimes, delay);
  }

  function playChime(freq) {
    if (!webAudioCtx || isMuted) return;

    const osc = webAudioCtx.createOscillator();
    const gain = webAudioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, webAudioCtx.currentTime);

    const now = webAudioCtx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    osc.connect(gain);
    gain.connect(webAudioCtx.destination);

    osc.start(now);
    osc.stop(now + 3.3);
  }

  function toggleMute() {
    isMuted = !isMuted;
    if (audioEl) audioEl.muted = isMuted;

    if (isMuted && webAudioTimer) {
      clearTimeout(webAudioTimer);
    } else if (!isMuted && isPlaying && !audioEl.src) {
      scheduleAmbientChimes();
    }

    updateUI();
  }

  function pauseMusic() {
    isPlaying = false;
    if (audioEl) audioEl.pause();
    if (webAudioTimer) clearTimeout(webAudioTimer);
    updateUI();
  }

  function updateUI() {
    const toggleBtn = document.getElementById('audio-toggle-btn');
    if (!toggleBtn) return;

    toggleBtn.classList.toggle('muted', isMuted);
    toggleBtn.classList.toggle('paused', !isPlaying);
    toggleBtn.setAttribute('aria-label', isMuted ? 'Unmute background music' : 'Mute background music');
    toggleBtn.title = isMuted ? 'Unmute background music' : 'Mute background music';
  }

  return {
    init,
    startMusic,
    toggleMute,
    pauseMusic,
    isPlaying: () => isPlaying,
    isMuted: () => isMuted
  };
})();

window.MusicModule = MusicModule;
