/**
 * STAGE 3 — ROOM 4: PHOTO MEMORY PUZZLE LOGIC
 * Complete 3x3 touch & mouse tile swap jigsaw puzzle with timer, move tracking, and hint preview.
 */

const PuzzleModule = (function() {
  const GRID_SIZE = CONFIG.puzzle.gridSize || 3;
  const TOTAL_TILES = GRID_SIZE * GRID_SIZE; // 9

  // currentTilePositions[slotIndex] = pieceOriginalIndex
  let currentTilePositions = [];
  let selectedSlotIndex = null;
  let moveCount = 0;
  let secondsElapsed = 0;
  let timerInterval = null;
  let timerStarted = false;
  let isSolved = false;

  function init() {
    setupDOM();
    setupHintToggle();
    setupShuffleButton();
    resetPuzzle();
  }

  function setupDOM() {
    const hintOverlay = document.getElementById('puzzle-hint-overlay');
    if (hintOverlay) {
      hintOverlay.style.backgroundImage = `url('${CONFIG.puzzle.imagePath}')`;
    }

    const gridEl = document.getElementById('puzzle-grid');
    if (!gridEl) return;

    // Create 9 tile elements
    gridEl.innerHTML = '';
    for (let slot = 0; slot < TOTAL_TILES; slot++) {
      const tile = document.createElement('div');
      tile.className = 'puzzle-tile';
      tile.dataset.slotIndex = slot;
      tile.setAttribute('role', 'button');
      tile.setAttribute('tabindex', '0');
      tile.setAttribute('aria-label', `Puzzle slot ${slot + 1}`);

      // Handle pointer click / touch
      tile.addEventListener('click', () => onTileClick(slot));
      tile.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTileClick(slot);
        }
      });

      gridEl.appendChild(tile);
    }
  }

  function setupHintToggle() {
    const hintBtn = document.getElementById('puzzle-hint-btn');
    const hintOverlay = document.getElementById('puzzle-hint-overlay');
    if (!hintBtn || !hintOverlay) return;

    let isHintShowing = false;
    hintBtn.addEventListener('click', () => {
      isHintShowing = !isHintShowing;
      hintOverlay.classList.toggle('show', isHintShowing);
      hintBtn.textContent = isHintShowing ? 'Hide Hint' : 'Show Hint';
    });
  }

  function setupShuffleButton() {
    const shuffleBtn = document.getElementById('puzzle-shuffle-btn');
    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => {
        resetPuzzle();
      });
    }
  }

  function resetPuzzle() {
    isSolved = false;
    selectedSlotIndex = null;
    moveCount = 0;
    secondsElapsed = 0;
    stopTimer();
    updateDashboard();

    // Hide completion modal
    const banner = document.getElementById('puzzle-solved-banner');
    if (banner) banner.classList.remove('show');

    // Generate a non-solved shuffle
    currentTilePositions = generateShuffledTiles();
    renderTiles();
  }

  function generateShuffledTiles() {
    // Array with indices 0 to 8
    let tiles = Array.from({ length: TOTAL_TILES }, (_, i) => i);
    let attempts = 0;

    // Fisher-Yates shuffle until it is genuinely scrambled
    do {
      for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
      }
      attempts++;
    } while (checkIfArraySolved(tiles) && attempts < 20);

    return tiles;
  }

  function checkIfArraySolved(arr) {
    return arr.every((val, idx) => val === idx);
  }

  function renderTiles() {
    const gridEl = document.getElementById('puzzle-grid');
    if (!gridEl) return;

    const tiles = gridEl.querySelectorAll('.puzzle-tile');
    tiles.forEach((tile, slot) => {
      const originalPieceIdx = currentTilePositions[slot];
      const row = Math.floor(originalPieceIdx / GRID_SIZE);
      const col = originalPieceIdx % GRID_SIZE;

      // Calculate slice coordinates for background-position
      // 0, 50%, 100%
      const posX = (col / (GRID_SIZE - 1)) * 100;
      const posY = (row / (GRID_SIZE - 1)) * 100;

      tile.style.backgroundImage = `url('${CONFIG.puzzle.imagePath}')`;
      tile.style.backgroundSize = `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`;
      tile.style.backgroundPosition = `${posX}% ${posY}%`;

      // Selection state
      tile.classList.toggle('selected', slot === selectedSlotIndex);
      // Correct position indicator
      tile.classList.toggle('in-place', slot === originalPieceIdx);
    });
  }

  function onTileClick(slotIndex) {
    if (isSolved) return;

    // Start timer on first interaction
    if (!timerStarted) {
      startTimer();
    }

    if (selectedSlotIndex === null) {
      // First selection
      selectedSlotIndex = slotIndex;
      renderTiles();
    } else if (selectedSlotIndex === slotIndex) {
      // Deselect clicked tile
      selectedSlotIndex = null;
      renderTiles();
    } else {
      // Swap tiles
      swapTiles(selectedSlotIndex, slotIndex);
      selectedSlotIndex = null;
      moveCount++;
      updateDashboard();
      renderTiles();
      checkWinCondition();
    }
  }

  function swapTiles(slotA, slotB) {
    const temp = currentTilePositions[slotA];
    currentTilePositions[slotA] = currentTilePositions[slotB];
    currentTilePositions[slotB] = temp;
  }

  function checkWinCondition() {
    const solved = checkIfArraySolved(currentTilePositions);
    if (solved) {
      isSolved = true;
      stopTimer();

      // Trigger completion modal and unlock next stage
      const banner = document.getElementById('puzzle-solved-banner');
      if (banner) {
        setTimeout(() => {
          banner.classList.add('show');
        }, 300);
      }

      // Unlock Room 06 in navigation
      if (window.Navigation) {
        window.Navigation.unlockNextRoom();
      }
    }
  }

  function startTimer() {
    timerStarted = true;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      secondsElapsed++;
      updateDashboard();
    }, 1000);
  }

  function stopTimer() {
    timerStarted = false;
    clearInterval(timerInterval);
  }

  function updateDashboard() {
    const movesEl = document.getElementById('puzzle-moves-val');
    if (movesEl) movesEl.textContent = moveCount;

    const timeEl = document.getElementById('puzzle-time-val');
    if (timeEl) {
      const minutes = Math.floor(secondsElapsed / 60);
      const seconds = secondsElapsed % 60;
      timeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }

  function onRoomActivated() {
    if (!isSolved && !timerStarted && moveCount === 0) {
      // Clean start
    }
  }

  return {
    init,
    resetPuzzle,
    onRoomActivated,
    isPuzzleSolved: () => isSolved
  };
})();

window.PuzzleModule = PuzzleModule;
