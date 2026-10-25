/**
 * STAGE 4 — ROOM 6: THE READING ROOM (LETTER) LOGIC
 * Manages 3D envelope unsealing, progressive letter reveal, and content population.
 */

const LetterModule = (function() {
  let isEnvelopeOpened = false;

  function init() {
    populateLetterContent();
    setupEnvelopeInteraction();
  }

  function populateLetterContent() {
    const salutationEl = document.getElementById('letter-salutation');
    if (salutationEl) {
      salutationEl.textContent = CONFIG.letter.salutation;
    }

    const dateEl = document.getElementById('letter-date');
    if (dateEl) {
      dateEl.textContent = CONFIG.letter.date;
    }

    const bodyEl = document.getElementById('letter-body');
    if (bodyEl) {
      bodyEl.innerHTML = CONFIG.letter.paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join('');
    }

    const closingEl = document.getElementById('letter-closing');
    if (closingEl) {
      closingEl.textContent = CONFIG.letter.closing;
    }

    const signatureEl = document.getElementById('letter-signature');
    if (signatureEl) {
      signatureEl.textContent = CONFIG.letter.signature;
    }
  }

  function setupEnvelopeInteraction() {
    const envelopeStage = document.getElementById('envelope-stage');
    const letterSheet = document.getElementById('letter-parchment-sheet');
    const nextBtn = document.getElementById('letter-continue-btn');

    if (!envelopeStage) return;

    envelopeStage.addEventListener('click', () => {
      if (isEnvelopeOpened) return;
      openEnvelope();
    });

    // Keyboard trigger
    envelopeStage.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !isEnvelopeOpened) {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  function openEnvelope() {
    isEnvelopeOpened = true;

    const envelopeStage = document.getElementById('envelope-stage');
    const letterSheet = document.getElementById('letter-parchment-sheet');
    const nextBtn = document.getElementById('letter-continue-btn');

    if (envelopeStage) {
      envelopeStage.classList.add('opened');
      envelopeStage.setAttribute('aria-expanded', 'true');
    }

    // Reveal letter smoothly after flap rotates
    setTimeout(() => {
      if (letterSheet) {
        letterSheet.classList.add('revealed');
      }
      if (nextBtn) {
        nextBtn.classList.remove('sr-only');
        nextBtn.style.display = 'inline-flex';
      }

      // Unlock Room 07 in Navigation
      if (window.Navigation) {
        window.Navigation.unlockNextRoom();
      }
    }, 450);
  }

  function resetLetter() {
    isEnvelopeOpened = false;
    const envelopeStage = document.getElementById('envelope-stage');
    const letterSheet = document.getElementById('letter-parchment-sheet');
    const nextBtn = document.getElementById('letter-continue-btn');

    if (envelopeStage) {
      envelopeStage.classList.remove('opened');
      envelopeStage.setAttribute('aria-expanded', 'false');
    }
    if (letterSheet) {
      letterSheet.classList.remove('revealed');
    }
    if (nextBtn) {
      nextBtn.style.display = 'none';
    }
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  return {
    init,
    resetLetter,
    openEnvelope,
    isOpened: () => isEnvelopeOpened
  };
})();

window.LetterModule = LetterModule;
