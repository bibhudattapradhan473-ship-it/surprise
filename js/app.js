/**
 * MASTER APPLICATION COORDINATOR
 * Initializes all submodules, ambient effects, and the 3D entrance transition.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Populate Dynamic Welcome Content from CONFIG
  populateWelcomeContent();

  // 2. Initialize Ambient Star / Dust Canvas in Museum Lobby
  initAmbientDustCanvas();

  // 3. Initialize Modules
  if (window.Navigation) window.Navigation.init();
  if (window.TimelineModule) window.TimelineModule.init();
  if (window.PuzzleModule) window.PuzzleModule.init();
  if (window.LetterModule) window.LetterModule.init();
  if (window.PromisesModule) window.PromisesModule.init();
  if (window.MusicModule) window.MusicModule.init();
  if (window.FinalModule) window.FinalModule.init();

  // 4. Connect Museum 3D Entrance Interaction
  setupEntranceInteraction();
});

function populateWelcomeContent() {
  const badgeEl = document.getElementById('welcome-badge');
  if (badgeEl) badgeEl.textContent = CONFIG.welcome.badge;

  const titleEl = document.getElementById('welcome-title');
  if (titleEl) {
    titleEl.innerHTML = `${escapeHTML(CONFIG.welcome.title)}`;
  }

  const subtitleEl = document.getElementById('welcome-subtitle');
  if (subtitleEl) subtitleEl.textContent = CONFIG.welcome.subtitle;

  const enterBtn = document.getElementById('welcome-enter-btn');
  if (enterBtn) enterBtn.textContent = CONFIG.welcome.enterButtonText;

  const hintEl = document.getElementById('welcome-hint');
  if (hintEl) hintEl.textContent = CONFIG.welcome.hintText;
}

function setupEntranceInteraction() {
  const portalStage = document.getElementById('door-portal-stage');
  const enterBtn = document.getElementById('welcome-enter-btn');
  let isEntering = false;

  function triggerDoorOpening() {
    if (isEntering) return;
    isEntering = true;

    // Start background audio seamlessly upon this first user interaction
    if (window.MusicModule) {
      window.MusicModule.startMusic();
    }

    // Animate 3D door swing
    if (portalStage) {
      portalStage.classList.add('opening');
    }

    if (enterBtn) {
      enterBtn.textContent = "Stepping inside...";
      enterBtn.disabled = true;
    }

    // Smooth transition to Room 02 after cinematic opening completes
    setTimeout(() => {
      if (window.Navigation) {
        window.Navigation.goToRoomById('room-timeline');
      }
      isEntering = false;
      if (portalStage) portalStage.classList.remove('opening');
      if (enterBtn) {
        enterBtn.textContent = CONFIG.welcome.enterButtonText;
        enterBtn.disabled = false;
      }
    }, 1300);
  }

  if (portalStage) {
    portalStage.addEventListener('click', triggerDoorOpening);
    portalStage.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerDoorOpening();
      }
    });
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', triggerDoorOpening);
  }
}

function initAmbientDustCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Gentle floating museum dust motes
  const motes = [];
  const count = 35;
  for (let i = 0; i < count; i++) {
    motes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 0.8 + Math.random() * 1.6,
      alpha: 0.15 + Math.random() * 0.45,
      speedX: -0.2 + Math.random() * 0.4,
      speedY: -0.3 - Math.random() * 0.5
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw only on dark rooms (room 0 and final room)
    const isDark = document.body.classList.contains('theme-dark');
    if (isDark) {
      for (const m of motes) {
        m.x += m.speedX;
        m.y += m.speedY;
        if (m.y < 0) {
          m.y = canvas.height + 10;
          m.x = Math.random() * canvas.width;
        }
        if (m.x < 0) m.x = canvas.width;
        if (m.x > canvas.width) m.x = 0;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233, 154, 45, ${m.alpha})`;
        ctx.fill();
      }
    }
    requestAnimationFrame(render);
  }

  render();
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
