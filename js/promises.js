/**
 * STAGE 5 — ROOM 7: FRIENDSHIP PROMISES (THE COVENANT) LOGIC
 * Strict agreement validation: Requires all 5 clauses checked + valid signature.
 */

const PromisesModule = (function() {
  let isRatified = false;

  function init() {
    renderClauses();
    setupValidationListeners();
    validateForm();
  }

  function renderClauses() {
    const listContainer = document.getElementById('covenant-clause-list');
    if (!listContainer) return;

    listContainer.innerHTML = CONFIG.promises.list.map((clause, index) => {
      return `
        <label class="covenant-clause-item" for="${clause.id}">
          <div class="custom-checkbox-wrapper">
            <input type="checkbox" 
                   id="${clause.id}" 
                   class="custom-checkbox-input covenant-check" 
                   data-index="${index}">
            <div class="custom-checkbox-box">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
          <div class="clause-text-wrap">
            <div class="clause-title">${escapeHTML(clause.title)}</div>
            <p class="clause-description">${escapeHTML(clause.text)}</p>
          </div>
        </label>
      `;
    }).join('');
  }

  function setupValidationListeners() {
    const listContainer = document.getElementById('covenant-clause-list');
    const signatureInput = document.getElementById('covenant-signature-input');
    const signBtn = document.getElementById('covenant-sign-btn');

    // Checkbox change listener
    if (listContainer) {
      listContainer.addEventListener('change', (e) => {
        if (e.target.matches('.covenant-check')) {
          const item = e.target.closest('.covenant-clause-item');
          if (item) {
            item.classList.toggle('checked', e.target.checked);
          }
          validateForm();
        }
      });
    }

    // Signature input listener
    if (signatureInput) {
      signatureInput.addEventListener('input', () => {
        validateForm();
      });
    }

    // Ratification submit button
    if (signBtn) {
      signBtn.addEventListener('click', () => {
        if (!signBtn.disabled && !isRatified) {
          ratifyAgreement();
        }
      });
    }
  }

  function validateForm() {
    const checks = document.querySelectorAll('.covenant-check');
    const signatureInput = document.getElementById('covenant-signature-input');
    const signBtn = document.getElementById('covenant-sign-btn');
    const statusNote = document.getElementById('covenant-validation-status');

    if (!checks.length || !signatureInput || !signBtn) return;

    const allChecked = Array.from(checks).every(c => c.checked);
    const signatureValue = signatureInput.value.trim();
    const hasSignature = signatureValue.length > 0;

    const isValid = allChecked && hasSignature;

    // Strict button disable/enable
    signBtn.disabled = !isValid;

    // Informative live status feedback (no intrusive alerts)
    if (statusNote) {
      if (isRatified) {
        statusNote.textContent = "✓ Our promises are sealed with all my love.";
        statusNote.className = "covenant-validation-status ready";
      } else if (!allChecked && !hasSignature) {
        const uncheckedCount = Array.from(checks).filter(c => !c.checked).length;
        statusNote.textContent = `Please read through the ${uncheckedCount} remaining promise${uncheckedCount > 1 ? 's' : ''} and add your name.`;
        statusNote.className = "covenant-validation-status";
      } else if (!allChecked) {
        const uncheckedCount = Array.from(checks).filter(c => !c.checked).length;
        statusNote.textContent = `Almost there! ${uncheckedCount} promise${uncheckedCount > 1 ? 's' : ''} left to read.`;
        statusNote.className = "covenant-validation-status";
      } else if (!hasSignature) {
        statusNote.textContent = "All promises read! Please type your name below to seal them.";
        statusNote.className = "covenant-validation-status";
      } else {
        statusNote.textContent = "Ready! You can now seal our promises with love.";
        statusNote.className = "covenant-validation-status ready";
      }
    }

    // If agreement was already ratified but visitor unchecks or clears signature, revoke verified certificate
    if (isRatified && !isValid) {
      revokeRatification();
    }
  }

  function ratifyAgreement() {
    isRatified = true;

    const signatureInput = document.getElementById('covenant-signature-input');
    const certificate = document.getElementById('covenant-ratified-certificate');
    const displaySignee = document.getElementById('ratified-signee-name');
    const displayDate = document.getElementById('ratified-date-text');
    const nextBtn = document.getElementById('covenant-next-btn');
    const signBtn = document.getElementById('covenant-sign-btn');

    const signature = signatureInput.value.trim();

    if (displaySignee) {
      displaySignee.textContent = signature;
    }

    if (displayDate) {
      const today = new Date();
      displayDate.textContent = `Sealed with love on ${today.toLocaleDateString(undefined, { 
        year: 'numeric', month: 'long', day: 'numeric' 
      })}`;
    }

    if (certificate) {
      certificate.classList.add('show');
    }

    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
    }

    if (signBtn) {
      signBtn.textContent = "✓ Promises Sealed With Love 💕";
      signBtn.disabled = true;
    }

    validateForm();

    // Unlock Finale room in Navigation
    if (window.Navigation) {
      window.Navigation.unlockNextRoom();
    }
  }

  function revokeRatification() {
    isRatified = false;
    const certificate = document.getElementById('covenant-ratified-certificate');
    const nextBtn = document.getElementById('covenant-next-btn');
    const signBtn = document.getElementById('covenant-sign-btn');

    if (certificate) certificate.classList.remove('show');
    if (nextBtn) nextBtn.style.display = 'none';
    if (signBtn) signBtn.textContent = CONFIG.promises.signButtonText;
  }

  function resetPromises() {
    isRatified = false;
    const checks = document.querySelectorAll('.covenant-check');
    checks.forEach(c => {
      c.checked = false;
      const item = c.closest('.covenant-clause-item');
      if (item) item.classList.remove('checked');
    });

    const signatureInput = document.getElementById('covenant-signature-input');
    if (signatureInput) signatureInput.value = '';

    revokeRatification();
    validateForm();
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  return {
    init,
    resetPromises,
    isRatified: () => isRatified
  };
})();

window.PromisesModule = PromisesModule;
