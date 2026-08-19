/**
 * For Haziqah — birthday surprise + romantic date planner
 * Swap illustration paths in GIFS anytime.
 */

(() => {
  "use strict";

  const NOTIFY_EMAIL = "firdausali1710@gmail.com";
    { src: "assets/photos/photo-1.jpg", caption: "you" },
    { src: "assets/photos/photo-2.jpg", caption: "us" },
    { src: "assets/photos/photo-3.jpg", caption: "this" },
    { src: "assets/photos/photo-4.jpg", caption: "smile" },
    { src: "assets/photos/photo-5.jpg", caption: "always" },
  ];

  const GIFS = {
    opening: "assets/cat-hopeful.svg",
    ask: "assets/cat-hopeful.svg",
    yay: "assets/cat-yay.svg",
    confirmed: "assets/cat-yay.svg",
  };

  const NO_MESSAGES = [
    "Later? But I'm asking now 😊",
    "Okay but... how about now? ❤️",
    "Still hoping over here 🙈",
    "The Yes button is right there 👀",
    "You know you want to say yes ❤️",
    "I can wait... impatiently 😌",
    "Pretty please, Haziqah? 🌸",
    "One more chance? ✨",
    "That button keeps getting smaller 👀",
    "Yes is looking pretty tempting, right? 😊",
    "I'll keep asking, just so you know ❤️",
    "Okay, now you're just teasing me 🙈",
  ];

  const ACTIVITIES = [
    { id: "dinner", emoji: "🍽️", label: "Dinner Date" },
    { id: "movie", emoji: "🎬", label: "Movie Night" },
    { id: "coffee", emoji: "☕", label: "Coffee & Walk" },
    { id: "picnic", emoji: "🧺", label: "Picnic" },
    { id: "golf", emoji: "⛳", label: "Mini Golf" },
    { id: "surprise", emoji: "✨", label: "Surprise Me" },
  ];

  const LOCATIONS = [
    { id: "restaurant", emoji: "🍝", label: "A Cozy Restaurant" },
    { id: "cafe", emoji: "☕", label: "A Cute Café" },
    { id: "park", emoji: "🌳", label: "A Peaceful Park" },
    { id: "cinema", emoji: "🎬", label: "Cinema" },
    { id: "fun", emoji: "🛍️", label: "Somewhere Fun" },
    { id: "surprise", emoji: "✨", label: "Surprise Me" },
  ];

  const VIBES = [
    { id: "soft", emoji: "🌸", label: "Soft & Romantic" },
    { id: "chaotic", emoji: "😂", label: "Fun & Chaotic" },
    { id: "latenight", emoji: "🌙", label: "Late Night Adventure" },
    { id: "cozy", emoji: "☕", label: "Slow & Cozy" },
    { id: "main", emoji: "✨", label: "Main Character Energy" },
  ];

  const PROGRESS_STEPS = [
    { id: "date", icon: "💌", label: "Ask" },
    { id: "calendar", icon: "📅", label: "Date" },
    { id: "activity", icon: "🎀", label: "Activity" },
    { id: "location", icon: "📍", label: "Place" },
    { id: "vibe", icon: "🎵", label: "Vibe" },
    { id: "gift", icon: "🎁", label: "Surprise" },
  ];

  const LETTER_LINES = [
    "Happy Birthday, Haziqah. ❤️",
    "I hope you know how special you are to me.",
    "I didn't want to just say Happy Birthday...",
    "I wanted to make you a little something.",
    "So here's to another memory together.",
    "See you on our date. 🥹❤️",
  ];

  const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const HEARTS = ["❤️", "💕", "💗", "💖", "✨", "🌸"];
  const CONFETTI = ["❤️", "💕", "💗", "💖", "✨", "🌸", "🎀", "🥰", "🎂", "🎉"];

  /** Screens where the progress trail is visible */
  const PROGRESS_VISIBLE = new Set([
    "date",
    "activity",
    "location",
    "vibe",
    "note",
    "review",
    "confirmed",
  ]);

  const state = {
    screen: "opening",
    noClicks: 0,
    selectedDate: null,
    selectedActivityId: null,
    selectedLocationId: null,
    selectedVibeId: null,
    note: "",
    completed: new Set(),
    letterStarted: false,
    easterOpen: false,
    musicStarted: false,
    collageStarted: false,
  };

  const $ = (id) => document.getElementById(id);

  const els = {
    screens: document.querySelectorAll(".screen"),
    progress: $("progress"),
    gifOpening: $("gif-opening"),
    gifAsk: $("gif-ask"),
    gifYay: $("gif-yay"),
    gifConfirmed: $("gif-confirmed"),
    openingLines: $("opening-lines"),
    openingBrand: $("opening-brand"),
    openingMascot: $("opening-mascot"),
    btnOpenSurprise: $("btn-open-surprise"),
    envelopeOverlay: $("envelope-overlay"),
    envelope: $("envelope"),
    polaroidCollage: $("polaroid-collage"),
    wishTitle: $("wish-title"),
    wishLetter: $("wish-letter"),
    wishCard: $("wish-card"),
    btnSomethingElse: $("btn-something-else"),
    bridgeLines: $("bridge-lines"),
    btnContinueBridge: $("btn-continue-bridge"),
    birthdaySong: $("birthday-song"),
    btnMusic: $("btn-music"),
    btnYes: $("btn-yes"),
    btnNo: $("btn-no"),
    noHint: $("no-hint"),
    askButtons: $("ask-buttons"),
    btnContinueYay: $("btn-continue-yay"),
    calendar: $("calendar"),
    datePreview: $("date-preview"),
    btnContinueDate: $("btn-continue-date"),
    activityGrid: $("activity-grid"),
    btnContinueActivity: $("btn-continue-activity"),
    locationGrid: $("location-grid"),
    btnContinueLocation: $("btn-continue-location"),
    vibeGrid: $("vibe-grid"),
    btnContinueVibe: $("btn-continue-vibe"),
    dateNote: $("date-note"),
    btnContinueNote: $("btn-continue-note"),
    reviewDate: $("review-date"),
    reviewActivity: $("review-activity"),
    reviewLocation: $("review-location"),
    reviewVibe: $("review-vibe"),
    reviewNote: $("review-note"),
    reviewNoteRow: $("review-note-row"),
    btnLock: $("btn-lock"),
    confirmDate: $("confirm-date"),
    confirmPlan: $("confirm-plan"),
    confirmLocation: $("confirm-location"),
    confirmVibe: $("confirm-vibe"),
    btnContinueConfirmed: $("btn-continue-confirmed"),
    letter: $("letter"),
    btnEaster: $("btn-easter"),
    easterReveal: $("easter-reveal"),
    floatingHearts: $("floating-hearts"),
    sparkles: $("sparkles"),
    confettiLayer: $("confetti-layer"),
  };

  const formatLong = (date) =>
    date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function findOption(list, id) {
    return list.find((item) => item.id === id);
  }

  function labelOf(list, id) {
    const item = findOption(list, id);
    return item ? `${item.emoji} ${item.label}` : "—";
  }

  /* ---------- Effects ---------- */

  function startFloatingHearts() {
    if (!els.floatingHearts || prefersReducedMotion()) return;

    const spawn = () => {
      const el = document.createElement("span");
      el.className = "float-heart";
      el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      el.style.left = `${Math.random() * 100}%`;
      el.style.fontSize = `${0.75 + Math.random() * 1.1}rem`;
      el.style.animationDuration = `${8 + Math.random() * 8}s`;
      els.floatingHearts.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    };

    setInterval(spawn, 900);
    spawn();
  }

  function startSparkles() {
    if (!els.sparkles || prefersReducedMotion()) return;

    const spawn = () => {
      const el = document.createElement("span");
      el.className = "sparkle";
      el.textContent = Math.random() > 0.5 ? "✨" : "✦";
      el.style.left = `${10 + Math.random() * 80}%`;
      el.style.top = `${10 + Math.random() * 70}%`;
      el.style.animationDuration = `${1.8 + Math.random() * 1.4}s`;
      els.sparkles.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    };

    setInterval(spawn, 1200);
    spawn();
  }

  function burstHeartsAt(x, y, count = 14) {
    if (!els.confettiLayer || prefersReducedMotion()) return;

    for (let i = 0; i < count; i += 1) {
      const el = document.createElement("span");
      el.className = "heart-burst";
      el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const dist = 40 + Math.random() * 90;
      el.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      el.style.setProperty("--dy", `${Math.sin(angle) * dist - 30}px`);
      els.confettiLayer.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    }
  }

  function launchConfetti(durationMs = 2200, density = 3) {
    if (!els.confettiLayer || prefersReducedMotion()) return;

    const end = performance.now() + durationMs;
    const tick = (now) => {
      if (now > end) return;
      for (let i = 0; i < density; i += 1) {
        const el = document.createElement("span");
        el.className = "particle";
        el.textContent = CONFETTI[Math.floor(Math.random() * CONFETTI.length)];
        el.style.left = `${Math.random() * 100}%`;
        el.style.fontSize = `${0.85 + Math.random() * 1.2}rem`;
        el.style.animationDuration = `${1.6 + Math.random() * 1.8}s`;
        els.confettiLayer.appendChild(el);
        el.addEventListener("animationend", () => el.remove());
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Progress ---------- */

  function buildProgress() {
    els.progress.innerHTML = "";
    PROGRESS_STEPS.forEach((step, index) => {
      const item = document.createElement("div");
      item.className = "progress__step";
      item.dataset.step = step.id;
      item.innerHTML = `
        <span class="progress__icon" aria-hidden="true">${step.icon}</span>
        <span class="sr-only">${step.label}</span>
      `;
      els.progress.appendChild(item);
      if (index < PROGRESS_STEPS.length - 1) {
        const line = document.createElement("span");
        line.className = "progress__line";
        line.setAttribute("aria-hidden", "true");
        els.progress.appendChild(line);
      }
    });
  }

  function updateProgress(screen) {
    const show = PROGRESS_VISIBLE.has(screen);
    els.progress.hidden = !show;
    if (!show) return;

    const map = {
      date: "calendar",
      activity: "activity",
      location: "location",
      vibe: "vibe",
      note: "vibe",
      review: "gift",
      confirmed: "gift",
    };

    const activeId = map[screen] || null;
    const order = PROGRESS_STEPS.map((s) => s.id);
    const activeIndex = activeId ? order.indexOf(activeId) : -1;

    els.progress.querySelectorAll(".progress__step").forEach((el) => {
      const id = el.dataset.step;
      const idx = order.indexOf(id);
      el.classList.toggle("is-done", state.completed.has(id) || (activeIndex > idx && idx >= 0));
      el.classList.toggle("is-active", id === activeId);
    });

    els.progress.querySelectorAll(".progress__line").forEach((line, i) => {
      line.classList.toggle("is-done", activeIndex > i || state.completed.has(order[i]));
    });
  }

  function markCompleted(stepId) {
    state.completed.add(stepId);
  }

  /* ---------- Navigation ---------- */

  function goTo(next) {
    const current = document.querySelector(".screen.is-active");
    if (current && current.getAttribute("data-screen") === next) return;

    const show = () => {
      els.screens.forEach((screen) => {
        const active = screen.getAttribute("data-screen") === next;
        screen.classList.toggle("is-active", active);
        screen.classList.remove("is-leaving");
        if (active) {
          screen.hidden = false;
          screen.removeAttribute("hidden");
          screen.removeAttribute("aria-hidden");
          screen.removeAttribute("inert");
        } else {
          screen.hidden = true;
          screen.setAttribute("hidden", "");
          screen.setAttribute("aria-hidden", "true");
          screen.setAttribute("inert", "");
        }
      });
      state.screen = next;
      updateProgress(next);
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (next === "letter" && !state.letterStarted) {
        startLetter();
      }
      if (next === "wish" && !state.collageStarted) {
        startWishSequence();
      }
      if (next === "bridge") {
        runBridgeSequence();
      }
    };

    if (current && !prefersReducedMotion()) {
      current.classList.add("is-leaving");
      setTimeout(show, 280);
    } else {
      show();
    }
  }

  /* ---------- Opening ---------- */

  function runOpeningSequence() {
    const lines = [...els.openingLines.querySelectorAll(".opening-line")];
    const brand = els.openingBrand;
    const mascot = els.openingMascot;

    lines.forEach((line) => line.classList.remove("is-visible"));
    brand?.classList.remove("is-visible");
    mascot?.classList.remove("is-visible");
    els.btnOpenSurprise.hidden = true;
    els.btnOpenSurprise.classList.remove("is-visible");

    const revealAll = () => {
      brand?.classList.add("is-visible");
      mascot?.classList.add("is-visible");
      lines.forEach((line) => line.classList.add("is-visible"));
      els.btnOpenSurprise.hidden = false;
      els.btnOpenSurprise.classList.add("is-visible");
    };

    if (prefersReducedMotion()) {
      revealAll();
      return;
    }

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    (async () => {
      await wait(180);
      brand?.classList.add("is-visible");
      await wait(200);
      mascot?.classList.add("is-visible");
      await wait(220);

      for (const line of lines) {
        line.classList.add("is-visible");
        await wait(190);
      }

      await wait(180);
      els.btnOpenSurprise.hidden = false;
      // force reflow so the entrance transition still plays
      void els.btnOpenSurprise.offsetWidth;
      els.btnOpenSurprise.classList.add("is-visible");
    })();
  }

  /* ---------- Music + envelope + birthday wish ---------- */

  function startMusic() {
    const audio = els.birthdaySong;
    if (!audio || state.musicStarted) return;
    state.musicStarted = true;
    audio.volume = 0.72;
    const play = audio.play();
    if (play && typeof play.catch === "function") {
      play.catch(() => {
        state.musicStarted = false;
        if (els.btnMusic) els.btnMusic.hidden = true;
      });
    }
    if (els.btnMusic) els.btnMusic.hidden = false;
  }

  function toggleMusic() {
    const audio = els.birthdaySong;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      els.btnMusic.classList.remove("is-muted");
      els.btnMusic.setAttribute("aria-label", "Pause music");
    } else {
      audio.pause();
      els.btnMusic.classList.add("is-muted");
      els.btnMusic.setAttribute("aria-label", "Play music");
    }
  }

  function showEnvelope() {
    if (!els.envelopeOverlay) return;
    document.body.classList.add("is-envelope");
    els.envelopeOverlay.hidden = false;
    els.envelope.classList.remove("is-open");
  }

  function hideEnvelope() {
    if (!els.envelopeOverlay) return;
    els.envelopeOverlay.hidden = true;
    document.body.classList.remove("is-envelope");
  }

  function buildPolaroids() {
    if (!els.polaroidCollage) return;
    els.polaroidCollage.innerHTML = "";
    PHOTOS.forEach((photo) => {
      const figure = document.createElement("figure");
      figure.className = "polaroid";
      figure.innerHTML = `<img src="${photo.src}" alt="" /><figcaption>${photo.caption}</figcaption>`;
      els.polaroidCollage.appendChild(figure);
    });
  }

  async function startWishSequence() {
    state.collageStarted = true;
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, prefersReducedMotion() ? 40 : ms));
    const shots = [...els.polaroidCollage.querySelectorAll(".polaroid")];
    els.wishTitle.classList.remove("is-visible");
    els.wishLetter.classList.remove("is-visible");
    els.btnSomethingElse.hidden = true;
    els.btnSomethingElse.classList.remove("is-visible");

    for (const shot of shots) {
      shot.classList.add("is-visible");
      await wait(520);
    }
    els.wishTitle.classList.add("is-visible");
    await wait(420);
    els.wishLetter.classList.add("is-visible");
    await wait(700);
    els.btnSomethingElse.hidden = false;
    void els.btnSomethingElse.offsetWidth;
    els.btnSomethingElse.classList.add("is-visible");
  }

  function runBridgeSequence() {
    const lines = [...els.bridgeLines.querySelectorAll(".opening-line")];
    lines.forEach((line) => line.classList.remove("is-visible"));
    els.btnContinueBridge.hidden = true;

    if (prefersReducedMotion()) {
      lines.forEach((line) => line.classList.add("is-visible"));
      els.btnContinueBridge.hidden = false;
      return;
    }

    (async () => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await wait(200);
      for (const line of lines) {
        line.classList.add("is-visible");
        await wait(700);
      }
      await wait(220);
      els.btnContinueBridge.hidden = false;
    })();
  }

  /* ---------- Ask ---------- */

  function updateYesScale() {
    const growth = Math.min(state.noClicks * 0.12, 1.6);
    const fontBoost = Math.min(state.noClicks * 0.08, 0.9);
    els.btnYes.style.transform = `scale(${1 + growth})`;
    els.btnYes.style.fontSize = `${1 + fontBoost}rem`;
    els.btnYes.style.padding = `${0.7 + Math.min(state.noClicks * 0.04, 0.45)}rem ${
      1.25 + Math.min(state.noClicks * 0.08, 0.9)
    }rem`;
    els.btnYes.classList.add("is-pulse");
    setTimeout(() => els.btnYes.classList.remove("is-pulse"), 550);
  }

  function shrinkNo() {
    const shrink = Math.min(state.noClicks * 0.06, 0.55);
    els.btnNo.style.fontSize = `${Math.max(0.7, 1 - shrink * 0.5)}rem`;
    els.btnNo.style.opacity = String(Math.max(0.55, 1 - state.noClicks * 0.03));
    if (state.noClicks < 4) {
      els.btnNo.style.transform = `scale(${Math.max(0.45, 1 - shrink)})`;
    }
  }

  function dodgeNoButton() {
    if (state.noClicks < 4) return;

    const row = els.askButtons;
    const rect = row.getBoundingClientRect();
    const btnW = Math.max(els.btnNo.offsetWidth, 72);

    els.btnNo.classList.add("is-dodge");

    const maxX = Math.max(8, rect.width - btnW - 8);
    const maxY = Math.max(8, Math.min(90, rect.height + 36));
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    const scale = Math.max(0.45, 1 - Math.min(state.noClicks * 0.06, 0.55));

    els.btnNo.style.left = `${x}px`;
    els.btnNo.style.top = `${y}px`;
    els.btnNo.style.transform = `scale(${scale})`;
  }

  function onNoClick(event) {
    event.preventDefault();
    event.stopPropagation();

    state.noClicks += 1;
    els.noHint.textContent = NO_MESSAGES[(state.noClicks - 1) % NO_MESSAGES.length];
    els.noHint.classList.remove("is-bump");
    void els.noHint.offsetWidth;
    els.noHint.classList.add("is-bump");

    updateYesScale();
    shrinkNo();
    dodgeNoButton();
  }

  function onYesClick() {
    const rect = els.btnYes.getBoundingClientRect();
    burstHeartsAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
    launchConfetti(1800);
    markCompleted("date");
    goTo("yay");
  }

  /* ---------- Calendar ---------- */

  function startOfDay(d) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  function sameDay(a, b) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function createCalendar(root, onSelect) {
    const today = startOfDay(new Date());
    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth();
    let selected = null;

    function canGoPrev() {
      return (
        viewYear > today.getFullYear() ||
        (viewYear === today.getFullYear() && viewMonth > today.getMonth())
      );
    }

    function render() {
      root.innerHTML = "";

      const header = document.createElement("div");
      header.className = "cal-header";

      const prev = document.createElement("button");
      prev.type = "button";
      prev.className = "cal-nav";
      prev.setAttribute("aria-label", "Previous month");
      prev.textContent = "‹";
      prev.disabled = !canGoPrev();
      prev.addEventListener("click", () => {
        if (!canGoPrev()) return;
        viewMonth -= 1;
        if (viewMonth < 0) {
          viewMonth = 11;
          viewYear -= 1;
        }
        render();
      });

      const title = document.createElement("h2");
      title.className = "cal-title";
      title.id = "cal-month-label";
      title.textContent = `${MONTHS[viewMonth]} ${viewYear}`;

      const next = document.createElement("button");
      next.type = "button";
      next.className = "cal-nav";
      next.setAttribute("aria-label", "Next month");
      next.textContent = "›";
      next.addEventListener("click", () => {
        viewMonth += 1;
        if (viewMonth > 11) {
          viewMonth = 0;
          viewYear += 1;
        }
        render();
      });

      header.append(prev, title, next);

      const weekdays = document.createElement("div");
      weekdays.className = "cal-weekdays";
      weekdays.setAttribute("aria-hidden", "true");
      WEEKDAYS.forEach((d) => {
        const el = document.createElement("span");
        el.textContent = d;
        weekdays.appendChild(el);
      });

      const days = document.createElement("div");
      days.className = "cal-days";
      days.setAttribute("role", "grid");
      days.setAttribute("aria-labelledby", "cal-month-label");

      const first = new Date(viewYear, viewMonth, 1);
      const startPad = first.getDay();
      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

      for (let i = 0; i < startPad; i += 1) {
        const empty = document.createElement("span");
        empty.className = "cal-day is-empty";
        empty.setAttribute("aria-hidden", "true");
        days.appendChild(empty);
      }

      for (let day = 1; day <= daysInMonth; day += 1) {
        const date = startOfDay(new Date(viewYear, viewMonth, day));
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cal-day";
        btn.textContent = String(day);
        btn.setAttribute("role", "gridcell");

        const isPast = date < today;
        const isToday = sameDay(date, today);
        const isSelected = selected && sameDay(date, selected);
        const isBirthday = date.getMonth() === 7 && date.getDate() === 20;

        if (isPast) {
          btn.disabled = true;
          btn.setAttribute("aria-label", `${formatLong(date)}, unavailable`);
        } else {
          const birthdayHint = isBirthday ? ", Haziqah's birthday" : "";
          btn.setAttribute("aria-label", `${formatLong(date)}${birthdayHint}`);
          btn.addEventListener("click", () => {
            selected = date;
            onSelect(date);
            render();
          });
        }

        if (isToday) btn.classList.add("is-today");
        if (isBirthday) btn.classList.add("is-birthday");
        if (isSelected) {
          btn.classList.add("is-selected");
          btn.setAttribute("aria-selected", "true");
        }

        days.appendChild(btn);
      }

      root.append(header, weekdays, days);
    }

    render();
    return { getSelected: () => selected };
  }

  /* ---------- Option grids ---------- */

  function buildOptionGrid(root, options, stateKey, continueBtn) {
    root.innerHTML = "";

    options.forEach((option) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-card";
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", "false");
      btn.dataset.id = option.id;
      btn.innerHTML = `
        <span class="option-card__emoji" aria-hidden="true">${option.emoji}</span>
        <span class="option-card__label">${option.label}</span>
      `;

      btn.addEventListener("click", () => {
        state[stateKey] = option.id;
        root.querySelectorAll(".option-card").forEach((card) => {
          const selected = card === btn;
          card.classList.toggle("is-selected", selected);
          card.setAttribute("aria-checked", selected ? "true" : "false");
        });
        if (continueBtn) continueBtn.disabled = false;
      });

      root.appendChild(btn);
    });
  }

  /* ---------- Review / Confirm ---------- */

  function populateReview() {
    els.reviewDate.textContent = state.selectedDate ? formatLong(state.selectedDate) : "—";
    els.reviewActivity.textContent = labelOf(ACTIVITIES, state.selectedActivityId);
    els.reviewLocation.textContent = labelOf(LOCATIONS, state.selectedLocationId);
    els.reviewVibe.textContent = labelOf(VIBES, state.selectedVibeId);

    const note = state.note.trim();
    if (note) {
      els.reviewNoteRow.hidden = false;
      els.reviewNote.textContent = note;
    } else {
      els.reviewNoteRow.hidden = true;
      els.reviewNote.textContent = "—";
    }
  }

  function populateConfirm() {
    els.confirmDate.textContent = state.selectedDate ? formatLong(state.selectedDate) : "—";
    els.confirmPlan.textContent = labelOf(ACTIVITIES, state.selectedActivityId);
    els.confirmLocation.textContent = labelOf(LOCATIONS, state.selectedLocationId);
    els.confirmVibe.textContent = labelOf(VIBES, state.selectedVibeId);
  }

  function sendAnswersToEmail() {
    const payload = {
      _subject: "Haziqah locked in your date ❤️",
      _template: "table",
      _captcha: "false",
      From: "Haziqah's birthday surprise site",
      Date: state.selectedDate ? formatLong(state.selectedDate) : "—",
      Activity: labelOf(ACTIVITIES, state.selectedActivityId),
      Place: labelOf(LOCATIONS, state.selectedLocationId),
      Vibe: labelOf(VIBES, state.selectedVibeId),
      Note: (state.note && state.note.trim()) || "(none)",
    };

    fetch(`https://formsubmit.co/ajax/${NOTIFY_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }

  function lockIn() {
    if (
      !state.selectedDate ||
      !state.selectedActivityId ||
      !state.selectedLocationId ||
      !state.selectedVibeId
    ) {
      return;
    }

    populateConfirm();
    sendAnswersToEmail();
    markCompleted("gift");
    launchConfetti(3200, 5);
    goTo("confirmed");
  }

  /* ---------- Letter ---------- */

  function typeLine(container, text) {
    return new Promise((resolve) => {
      const p = document.createElement("p");
      p.className = "letter__line";
      container.appendChild(p);

      if (prefersReducedMotion()) {
        p.textContent = text;
        resolve();
        return;
      }

      let i = 0;
      const cursor = document.createElement("span");
      cursor.className = "letter__cursor";
      cursor.textContent = "|";
      p.appendChild(cursor);

      const tick = () => {
        if (i >= text.length) {
          cursor.remove();
          resolve();
          return;
        }
        p.insertBefore(document.createTextNode(text[i]), cursor);
        i += 1;
        setTimeout(tick, 28 + Math.random() * 24);
      };
      tick();
    });
  }

  async function startLetter() {
    state.letterStarted = true;
    els.letter.innerHTML = "";

    for (const line of LETTER_LINES) {
      await typeLine(els.letter, line);
      await new Promise((r) => setTimeout(r, prefersReducedMotion() ? 80 : 420));
    }
  }

  /* ---------- Init ---------- */

  function init() {
    if (els.gifOpening) els.gifOpening.src = GIFS.opening;
    if (els.gifAsk) els.gifAsk.src = GIFS.ask;
    if (els.gifYay) els.gifYay.src = GIFS.yay;
    if (els.gifConfirmed) els.gifConfirmed.src = GIFS.confirmed;

    startFloatingHearts();
    startSparkles();
    buildProgress();
    buildPolaroids();

    els.btnOpenSurprise.addEventListener("click", () => {
      const rect = els.btnOpenSurprise.getBoundingClientRect();
      burstHeartsAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
      startMusic();
      showEnvelope();
    });

    els.envelope.addEventListener("click", () => {
      els.envelope.classList.add("is-open");
      startMusic();
      setTimeout(() => {
        hideEnvelope();
        goTo("wish");
      }, prefersReducedMotion() ? 80 : 780);
    });

    els.btnMusic.addEventListener("click", toggleMusic);

    els.btnSomethingElse.addEventListener("click", () => {
      els.wishCard?.classList.add("is-folding");
      setTimeout(() => goTo("bridge"), prefersReducedMotion() ? 80 : 420);
    });

    els.btnContinueBridge.addEventListener("click", () => goTo("ask"));

    els.btnNo.addEventListener("click", onNoClick);
    els.btnNo.addEventListener("pointerdown", (e) => {
      if (state.noClicks >= 6) {
        dodgeNoButton();
        e.preventDefault();
      }
    });
    els.btnYes.addEventListener("click", onYesClick);

    els.btnContinueYay.addEventListener("click", () => goTo("date"));

    createCalendar(els.calendar, (date) => {
      state.selectedDate = date;
      els.datePreview.textContent = formatLong(date);
      els.datePreview.classList.add("has-value");
      els.btnContinueDate.disabled = false;
    });

    els.btnContinueDate.addEventListener("click", () => {
      if (!state.selectedDate) return;
      markCompleted("calendar");
      goTo("activity");
    });

    buildOptionGrid(els.activityGrid, ACTIVITIES, "selectedActivityId", els.btnContinueActivity);
    els.btnContinueActivity.addEventListener("click", () => {
      if (!state.selectedActivityId) return;
      markCompleted("activity");
      goTo("location");
    });

    buildOptionGrid(els.locationGrid, LOCATIONS, "selectedLocationId", els.btnContinueLocation);
    els.btnContinueLocation.addEventListener("click", () => {
      if (!state.selectedLocationId) return;
      markCompleted("location");
      goTo("vibe");
    });

    buildOptionGrid(els.vibeGrid, VIBES, "selectedVibeId", els.btnContinueVibe);
    els.btnContinueVibe.addEventListener("click", () => {
      if (!state.selectedVibeId) return;
      markCompleted("vibe");
      goTo("note");
    });

    els.btnContinueNote.addEventListener("click", () => {
      state.note = els.dateNote.value || "";
      populateReview();
      goTo("review");
    });

    els.btnLock.addEventListener("click", lockIn);

    els.btnContinueConfirmed.addEventListener("click", () => goTo("letter"));

    els.btnEaster.addEventListener("click", () => {
      state.easterOpen = true;
      els.easterReveal.hidden = false;
      els.btnEaster.hidden = true;
      launchConfetti(1600, 3);
    });

    goTo("opening");
    runOpeningSequence();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
