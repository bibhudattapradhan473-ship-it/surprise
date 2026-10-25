/**
 * STAGE 2 — ROOM 2: FRIENDSHIP TIMELINE LOGIC
 * Computes exact duration arithmetic, leap years, and supporting milestones.
 */

const TimelineModule = (function () {
  let calculatedStats = {
    days: 0,
    years: "0",
    weekends: 0,
    seasons: 0,
    conversations: 0
  };

  let animationPlayed = false;

  function init() {
    calculateFriendshipStats();
    populateDOM();
  }

  function calculateFriendshipStats() {
    let diffDays;

    if (typeof CONFIG.friendshipDays === 'number' && !isNaN(CONFIG.friendshipDays)) {
      diffDays = Math.max(0, Math.round(CONFIG.friendshipDays));
    } else {
      const rawDate = CONFIG.friendshipStartDate;
      const startDate = new Date(rawDate);
      const today = new Date();

      // Verify valid date
      if (isNaN(startDate.getTime())) {
        console.warn("Invalid friendshipStartDate provided:", rawDate);
        calculatedStats.days = 940;
        calculatedStats.years = "2.6";
        calculatedStats.weekends = 268;
        calculatedStats.seasons = 10;
        calculatedStats.conversations = 380;
        return;
      }

      // Zero out time components for honest calendar-day difference
      const startUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
      const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

      const diffMs = todayUTC - startUTC;
      diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    }

    calculatedStats.days = diffDays;
    // Leap-year adjusted year arithmetic
    calculatedStats.years = (diffDays / 365.2425).toFixed(1);
    // 2 weekend days per week
    calculatedStats.weekends = Math.floor((diffDays / 7) * 2);
    // 4 seasons per 365.25 days (~91.3 days per season)
    calculatedStats.seasons = Math.floor(diffDays / 91.3);
    // Countless shared conversations / late-night chats
    const customChats = CONFIG.timeline?.lateNightChats ?? CONFIG.lateNightChats ?? CONFIG.timeline?.conversations;
    if (typeof customChats === 'number' && !isNaN(customChats)) {
      calculatedStats.conversations = customChats;
    } else {
      calculatedStats.conversations = 380;
    }
  }

  function populateDOM() {
    // Labels & Text from CONFIG
    const headingEl = document.getElementById('timeline-heading');
    if (headingEl) headingEl.textContent = CONFIG.timeline.heading;

    const quoteEl = document.getElementById('timeline-personal-quote');
    if (quoteEl) quoteEl.textContent = `“${CONFIG.timeline.personalNote}”`;

    // Static supporting statistics
    const statYears = document.getElementById('stat-years-val');
    if (statYears) statYears.textContent = `${calculatedStats.years} Yrs`;

    const statWeekends = document.getElementById('stat-weekends-val');
    if (statWeekends) statWeekends.textContent = calculatedStats.weekends.toLocaleString();

    const statSeasons = document.getElementById('stat-seasons-val');
    if (statSeasons) statSeasons.textContent = `${calculatedStats.seasons} Seasons`;

    const statConversations = document.getElementById('stat-conversations-val');
    if (statConversations) statConversations.textContent = `${calculatedStats.conversations.toLocaleString()}+`;

    // Static display before roll-up
    const daysEl = document.getElementById('milestone-days-val');
    if (daysEl) daysEl.textContent = calculatedStats.days.toLocaleString();
  }

  function animateDayCounter() {
    if (animationPlayed) return;
    animationPlayed = true;

    const daysEl = document.getElementById('milestone-days-val');
    if (!daysEl) return;

    const target = calculatedStats.days;
    const duration = 1600; // ms
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(target * ease);

      daysEl.textContent = currentVal.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        daysEl.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(updateCounter);
  }

  return {
    init,
    animateDayCounter,
    getStats: () => calculatedStats
  };
})();

window.TimelineModule = TimelineModule;
