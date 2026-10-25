/**
 * MUSEUM NAVIGATION & EXPERIENCE STATE CONTROLLER
 */

const Navigation = (function() {
  // Defined sequential room progression
  const ROOMS = [
    { id: 'room-welcome', num: '01', label: 'Welcome' },
    { id: 'room-timeline', num: '02', label: 'Archives' },
    { id: 'room-puzzle', num: '04', label: 'Puzzle' },
    { id: 'room-letter', num: '06', label: 'Letter' },
    { id: 'room-promises', num: '07', label: 'Covenant' },
    { id: 'room-final', num: 'FINALE', label: 'Finale' }
  ];

  let currentRoomIndex = 0;
  // Highest unlocked room index (sequential progression)
  let maxUnlockedIndex = 0;

  function init() {
    // Check for developer test query
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('unlockAll') === 'true') {
      maxUnlockedIndex = ROOMS.length - 1;
    }

    renderProgressPills();
    setupEventListeners();

    // Check initial hash if room is already unlocked
    const initialHash = window.location.hash.replace('#', '');
    const matchedIdx = ROOMS.findIndex(r => r.id === initialHash);
    if (matchedIdx !== -1 && matchedIdx <= maxUnlockedIndex) {
      showRoom(matchedIdx, false);
    } else {
      showRoom(0, false);
    }
  }

  function unlockAllRooms() {
    maxUnlockedIndex = ROOMS.length - 1;
    renderProgressPills();
  }

  function renderProgressPills() {
    const nav = document.getElementById('room-progress-nav');
    if (!nav) return;

    nav.innerHTML = ROOMS.map((room, index) => {
      const isDisabled = index > maxUnlockedIndex ? 'disabled' : '';
      const isCompleted = index < currentRoomIndex ? 'completed' : '';
      const isActive = index === currentRoomIndex ? 'active' : '';

      return `
        <button class="nav-room-pill ${isActive} ${isCompleted}" 
                data-room-index="${index}" 
                aria-label="Room ${room.num}: ${room.label}" 
                ${isDisabled}>
          ${room.num} <span class="pill-text">${room.label}</span>
        </button>
      `;
    }).join('');

    // Attach click events
    nav.querySelectorAll('.nav-room-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetIndex = parseInt(btn.dataset.roomIndex, 10);
        if (targetIndex <= maxUnlockedIndex) {
          goToRoomIndex(targetIndex);
        }
      });
    });
  }

  function setupEventListeners() {
    // Header navigation visibility on entrance vs inner rooms
    updateHeaderVisibility();

    // Universal data-go-room attributes
    document.querySelectorAll('[data-go-room]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-go-room');
        goToRoomById(targetId);
      });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
      if (e.state && typeof e.state.roomIndex === 'number') {
        const idx = e.state.roomIndex;
        if (idx <= maxUnlockedIndex) {
          showRoom(idx, false);
        }
      }
    });
  }

  function updateHeaderVisibility() {
    const header = document.getElementById('museum-header');
    if (!header) return;

    // Discreet header is visible in all personal rooms, hidden in initial dark welcome
    if (currentRoomIndex === 0) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
  }

  function unlockRoom(index) {
    if (index > maxUnlockedIndex && index < ROOMS.length) {
      maxUnlockedIndex = index;
      renderProgressPills();
    }
  }

  function unlockNextRoom() {
    unlockRoom(currentRoomIndex + 1);
  }

  function goToRoomIndex(targetIndex) {
    if (targetIndex < 0 || targetIndex >= ROOMS.length) return;
    if (targetIndex > maxUnlockedIndex) return;

    showRoom(targetIndex, true);
  }

  function goToRoomById(roomId) {
    const targetIndex = ROOMS.findIndex(r => r.id === roomId);
    if (targetIndex !== -1) {
      // Auto-unlock if navigating from room action button
      if (targetIndex === currentRoomIndex + 1) {
        unlockRoom(targetIndex);
      }
      goToRoomIndex(targetIndex);
    }
  }

  function showRoom(index, pushHistory = true) {
    const prevIndex = currentRoomIndex;
    currentRoomIndex = index;

    // Update rooms DOM
    const roomElements = document.querySelectorAll('.museum-room');
    roomElements.forEach((el, i) => {
      if (i === index) {
        el.classList.add('active');
        el.setAttribute('aria-hidden', 'false');
      } else {
        el.classList.remove('active');
        el.setAttribute('aria-hidden', 'true');
      }
    });

    // Update body theme class for seamless styling
    document.body.classList.toggle('theme-dark', index === 0 || index === ROOMS.length - 1);
    document.body.classList.toggle('theme-cream', index > 0 && index < ROOMS.length - 1);

    // Update navigation pills
    renderProgressPills();
    updateHeaderVisibility();

    // Scroll smoothly to top of room
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Room activation callbacks
    triggerRoomCallback(index);

    if (pushHistory && window.history && window.history.pushState) {
      window.history.pushState({ roomIndex: index }, '', `#${ROOMS[index].id}`);
    }
  }

  function triggerRoomCallback(index) {
    const room = ROOMS[index];
    if (room.id === 'room-timeline' && window.TimelineModule) {
      window.TimelineModule.animateDayCounter();
    }
    if (room.id === 'room-puzzle' && window.PuzzleModule) {
      window.PuzzleModule.onRoomActivated();
    }
    if (room.id === 'room-final' && window.FinalModule) {
      window.FinalModule.startCelebration();
    }
  }

  function resetExperience() {
    currentRoomIndex = 0;
    maxUnlockedIndex = 0;
    renderProgressPills();
    showRoom(0, true);
    if (window.PuzzleModule) window.PuzzleModule.resetPuzzle();
    if (window.PromisesModule) window.PromisesModule.resetPromises();
    if (window.LetterModule) window.LetterModule.resetLetter();
  }

  return {
    init,
    unlockNextRoom,
    unlockRoom,
    unlockAllRooms,
    goToRoomIndex,
    goToRoomById,
    resetExperience,
    getCurrentRoomIndex: () => currentRoomIndex
  };
})();

window.Navigation = Navigation;
