/**
 * STAGE 6 — FINAL SURPRISE LOGIC
 * Manages celebration confetti particle bursts, presentation content, and experience replay.
 */

const FinalModule = (function() {
  let confettiCanvas = null;
  let ctx = null;
  let particles = [];
  let isRunning = false;
  let animId = null;

  function init() {
    populateDOM();
    setupReplayButton();
    setupCanvas();
  }

  function populateDOM() {
    const headingEl = document.getElementById('final-heading');
    if (headingEl) {
      headingEl.innerHTML = `${escapeHTML(CONFIG.final.heading)} <em>✨</em>`;
    }

    const subheadingEl = document.getElementById('final-subheading');
    if (subheadingEl) {
      subheadingEl.textContent = CONFIG.final.subheading;
    }

    const artworkImg = document.getElementById('final-artwork-img');
    if (artworkImg) {
      artworkImg.src = CONFIG.final.imagePath;
      artworkImg.alt = CONFIG.final.imageCaption;
    }

    const messageEl = document.getElementById('final-message-text');
    if (messageEl) {
      messageEl.textContent = `“${CONFIG.final.message}”`;
    }

    const toastEl = document.getElementById('final-toast-tag');
    if (toastEl) {
      toastEl.textContent = CONFIG.final.toast;
    }

    const replayBtn = document.getElementById('final-replay-btn');
    if (replayBtn) {
      replayBtn.textContent = CONFIG.final.replayButtonText;
    }
  }

  function setupReplayButton() {
    const replayBtn = document.getElementById('final-replay-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        stopCelebration();
        if (window.Navigation) {
          window.Navigation.resetExperience();
        }
      });
    }
  }

  function setupCanvas() {
    confettiCanvas = document.getElementById('confetti-canvas');
    if (!confettiCanvas) return;
    ctx = confettiCanvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  function resizeCanvas() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }

  function startCelebration() {
    if (isRunning) return;
    isRunning = true;
    resizeCanvas();
    spawnConfettiWave(90);
    animate();
  }

  function stopCelebration() {
    isRunning = false;
    cancelAnimationFrame(animId);
    particles = [];
    if (ctx && confettiCanvas) {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  function spawnConfettiWave(count) {
    const colors = ['#E99A2D', '#F5D77F', '#176F65', '#4EB2A6', '#FFFFFF', '#FF7B7B'];
    const w = confettiCanvas.width;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: -20 - Math.random() * 80,
        size: 5 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        velX: -2 + Math.random() * 4,
        velY: 2 + Math.random() * 3.5,
        rotation: Math.random() * 360,
        rotSpeed: -4 + Math.random() * 8,
        shape: Math.random() > 0.4 ? 'rect' : 'circle'
      });
    }
  }

  function animate() {
    if (!isRunning || !ctx || !confettiCanvas) return;

    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.velX;
      p.y += p.velY;
      p.rotation += p.rotSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Remove particles fallen below viewport
      if (p.y > confettiCanvas.height + 40) {
        particles.splice(i, 1);
      }
    }

    // Re-seed occasional gentle golden sparkles
    if (particles.length < 40 && Math.random() < 0.1) {
      spawnConfettiWave(8);
    }

    animId = requestAnimationFrame(animate);
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  return {
    init,
    startCelebration,
    stopCelebration
  };
})();

window.FinalModule = FinalModule;
