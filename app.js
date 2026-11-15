/**
 * ====================================================================
 * ROYAL WEDDING INVITATION — APPLICATION ENGINE (app.js)
 * High-Performance Dynamic Hydration, Canvas Scratch, Petals & Countdown
 * ====================================================================
 */

// 1. Load Configuration
const config = window.WEDDING_CONFIG;
if (!config) {
  console.error('WEDDING_CONFIG not found. Please ensure wedding-config.js is loaded.');
}

// 2. Vector Mandala Sources
const MA = 'assets/images/mandala-a.webp';
const MB = 'assets/images/mandala-b.webp';
const mImg = src => `<image href="${src}" width="200" height="200"/>`;
const svgM = mImg(MB);

/**
 * Helper: Parse ISO-8601 string or Date object with specified IANA timezone
 */
function getDerivedDates(isoStr, timeZone) {
  const targetDate = new Date(isoStr);
  const tz = timeZone || 'Asia/Kolkata';

  // Formatters locked to configured timezone
  const fmtDay = new Intl.DateTimeFormat('en-US', { timeZone: tz, day: 'numeric' });
  const fmtDay2 = new Intl.DateTimeFormat('en-US', { timeZone: tz, day: '2-digit' });
  const fmtMonth = new Intl.DateTimeFormat('en-US', { timeZone: tz, month: 'long' });
  const fmtMonth2 = new Intl.DateTimeFormat('en-US', { timeZone: tz, month: '2-digit' });
  const fmtYear = new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric' });
  const fmtWeekday = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'long' });

  const day = fmtDay.format(targetDate);
  const day2 = fmtDay2.format(targetDate);
  const month = fmtMonth.format(targetDate);
  const month2 = fmtMonth2.format(targetDate);
  const year = fmtYear.format(targetDate);
  const weekday = fmtWeekday.format(targetDate);

  return {
    epoch: targetDate.getTime(),
    day,
    day2,
    month,
    month2,
    year,
    weekday,
    // e.g. "22 · 11 · 2026"
    heroDatePill: `${day2} · ${month2} · ${year}`,
    // e.g. "Sunday · 22 November 2026"
    fullDateString: `${weekday} · ${day} ${month} ${year}`,
    // e.g. "22 NOVEMBER 2026"
    footerDateString: `${day} ${month.toUpperCase()} ${year}`
  };
}

// Derive Canonical Wedding Dates
const weddingDates = getDerivedDates(
  config.canonicalWeddingDate.isoTimestamp,
  config.canonicalWeddingDate.timeZone
);

/**
 * 3. Dynamic Hydration of DOM Elements from Configuration
 */
function hydrateContent() {
  // --- A. SEO & Social Metadata ---
  if (config.metadata) {
    document.title = config.metadata.siteTitle || document.title;
    const descEl = document.getElementById('metaDescription');
    if (descEl) descEl.content = config.metadata.metaDescription || '';
    const themeEl = document.getElementById('metaThemeColor');
    if (themeEl) themeEl.content = config.metadata.themeColor || '#2a0811';

    const ogTitle = document.getElementById('ogTitle');
    if (ogTitle) ogTitle.content = config.metadata.ogTitle || document.title;
    const ogDesc = document.getElementById('ogDescription');
    if (ogDesc) ogDesc.content = config.metadata.ogDescription || '';

    // Resolve Open Graph absolute URL
    const ogImg = document.getElementById('ogImage');
    if (ogImg && config.metadata.ogImage) {
      const base = config.metadata.deploymentUrl ? config.metadata.deploymentUrl.replace(/\/+$/, '') : '';
      const imgPath = config.metadata.ogImage.replace(/^\/+/, '');
      ogImg.content = base ? `${base}/${imgPath}` : config.metadata.ogImage;
    }
    const ogUrl = document.getElementById('ogUrl');
    if (ogUrl && config.metadata.deploymentUrl) {
      ogUrl.content = config.metadata.deploymentUrl;
    }
  }

  // --- B. Section 0: Opening Screen ---
  const openingCover = document.getElementById('openingCoverImg');
  if (openingCover && config.images.openingScreen) {
    openingCover.src = config.images.openingScreen.src;
    openingCover.alt = config.images.openingScreen.alt || 'Opening Cover';
    if (config.images.openingScreen.objectPosition) {
      openingCover.style.objectPosition = config.images.openingScreen.objectPosition;
    }
  }
  const openMantra = document.getElementById('openingMantra');
  if (openMantra) openMantra.textContent = config.invocations.openingMantra;
  const openTag = document.getElementById('openingWelcomeTag');
  if (openTag) openTag.textContent = config.openingScreen.welcomeTag;
  const openHash = document.getElementById('openingHashtag');
  if (openHash) openHash.textContent = config.couple.hashtag;
  const openBtn = document.getElementById('openInvite');
  if (openBtn) openBtn.textContent = config.openingScreen.openButtonLabel;

  // --- C. Section 1: Hero Section ---
  const heroImg = document.getElementById('heroCoupleImg');
  if (heroImg && config.images.heroCouplePortrait) {
    heroImg.src = config.images.heroCouplePortrait.src;
    heroImg.alt = config.images.heroCouplePortrait.alt || 'Couple Portrait';
    if (config.images.heroCouplePortrait.objectPosition) {
      heroImg.style.objectPosition = config.images.heroCouplePortrait.objectPosition;
    }
  }
  const heroTogether = document.getElementById('heroTogetherText');
  if (heroTogether) heroTogether.textContent = config.heroSection.togetherText;
  const heroGroom = document.getElementById('heroGroomFirstName');
  if (heroGroom) heroGroom.textContent = config.couple.groom.firstName;
  const heroBride = document.getElementById('heroBrideFirstName');
  if (heroBride) heroBride.textContent = config.couple.bride.firstName;
  const heroPill = document.getElementById('heroDatePill');
  if (heroPill) heroPill.textContent = weddingDates.heroDatePill;
  const heroCue = document.getElementById('heroScrollCue');
  if (heroCue && config.heroSection.scrollCueAriaLabel) {
    heroCue.setAttribute('aria-label', config.heroSection.scrollCueAriaLabel);
  }

  // --- D. Section 2: Sacred Invitation ---
  const invMantra = document.getElementById('invitationMantra');
  if (invMantra) invMantra.textContent = config.invocations.weddingMantra;
  const invEyebrow = document.getElementById('invitationEyebrow');
  if (invEyebrow) invEyebrow.textContent = config.invitationSection.eyebrow;
  const invT1 = document.getElementById('invitationTitle1');
  if (invT1) invT1.textContent = config.invitationSection.mainTitleLine1;
  const invT2 = document.getElementById('invitationTitle2');
  if (invT2) invT2.textContent = config.invitationSection.mainTitleLine2;
  const invLead = document.getElementById('invitationLead');
  if (invLead) invLead.textContent = config.invitationSection.leadParagraph;

  const groomLbl = document.getElementById('groomLabel');
  if (groomLbl) groomLbl.textContent = config.couple.groom.label;
  const groomFull = document.getElementById('groomFullName');
  if (groomFull) groomFull.textContent = config.couple.groom.fullName;
  const groomParents = document.getElementById('groomParentsLine');
  if (groomParents) groomParents.textContent = `Son of ${config.couple.groom.parentsNames}`;

  const brideLbl = document.getElementById('brideLabel');
  if (brideLbl) brideLbl.textContent = config.couple.bride.label;
  const brideFull = document.getElementById('brideFullName');
  if (brideFull) brideFull.textContent = config.couple.bride.fullName;
  const brideParents = document.getElementById('brideParentsLine');
  if (brideParents) brideParents.textContent = `Daughter of ${config.couple.bride.parentsNames}`;

  const invCity = document.getElementById('invitationCity');
  if (invCity) invCity.textContent = config.primaryLocation.displayLocation;

  // Optional background texture for invitation
  if (config.images.invitationBackground && config.images.invitationBackground.src) {
    const invSec = document.getElementById('invitation');
    invSec.style.backgroundImage = `url("${config.images.invitationBackground.src}")`;
    invSec.style.backgroundSize = 'cover';
    invSec.style.backgroundPosition = config.images.invitationBackground.objectPosition || 'center center';
  }

  // --- E. Section 3: Scratch-to-Reveal Card ---
  const scEyebrow = document.getElementById('scratchEyebrow');
  if (scEyebrow) scEyebrow.textContent = config.scratchSection.eyebrow;
  const scTitle = document.getElementById('scratchTitle');
  if (scTitle) scTitle.textContent = config.scratchSection.title;
  const scHint = document.getElementById('scratchHint');
  if (scHint) scHint.textContent = config.scratchSection.hint;

  const revWeekday = document.getElementById('revealWeekday');
  if (revWeekday) revWeekday.textContent = weddingDates.weekday.toUpperCase();
  const revDay = document.getElementById('revealDay');
  if (revDay) revDay.textContent = weddingDates.day;
  const revMonthYear = document.getElementById('revealMonthYear');
  if (revMonthYear) revMonthYear.textContent = `${weddingDates.month.toUpperCase()} · ${weddingDates.year}`;
  const revCity = document.getElementById('revealCity');
  if (revCity) revCity.textContent = config.primaryLocation.city;

  const scCanvas = document.getElementById('scratchCanvas');
  if (scCanvas && config.scratchSection.canvasAriaLabel) {
    scCanvas.setAttribute('aria-label', config.scratchSection.canvasAriaLabel);
  }
  const revFallbackBtn = document.getElementById('revealDate');
  if (revFallbackBtn) revFallbackBtn.textContent = config.scratchSection.revealFallbackButtonLabel;

  // --- F. Section 4: Our Beloved Families ---
  const famEyebrow = document.getElementById('familiesEyebrow');
  if (famEyebrow) famEyebrow.textContent = config.familiesSection.eyebrow;
  const famTitle = document.getElementById('familiesTitle');
  if (famTitle) famTitle.textContent = config.familiesSection.title;

  const gPHead = document.getElementById('groomParentsHeading');
  if (gPHead) gPHead.textContent = config.couple.groom.parentHeading;
  const gPNames = document.getElementById('groomParentsNames');
  if (gPNames) gPNames.textContent = config.couple.groom.parentsNames;
  const gPNote = document.getElementById('groomParentsNote');
  if (gPNote) gPNote.textContent = config.couple.groom.parentInviteNote;

  const bPHead = document.getElementById('brideParentsHeading');
  if (bPHead) bPHead.textContent = config.couple.bride.parentHeading;
  const bPNames = document.getElementById('brideParentsNames');
  if (bPNames) bPNames.textContent = config.couple.bride.parentsNames;
  const bPNote = document.getElementById('brideParentsNote');
  if (bPNote) bPNote.textContent = config.couple.bride.parentInviteNote;

  // --- G. Section 5: Events Timeline Header ---
  const evEyebrow = document.getElementById('eventsEyebrow');
  if (evEyebrow) evEyebrow.textContent = config.eventsSection.eyebrow;
  const evT1 = document.getElementById('eventsTitle1');
  if (evT1) evT1.textContent = config.eventsSection.mainTitleLine1;
  const evT2 = document.getElementById('eventsTitle2');
  if (evT2) evT2.textContent = config.eventsSection.mainTitleLine2;
  const evLead = document.getElementById('eventsLead');
  if (evLead) {
    const tmpl = config.eventsSection.leadParagraphTemplate || '{count} beautiful moments, one unforgettable story.';
    evLead.textContent = tmpl.replace('{count}', config.events.length);
  }

  // --- H. Section 6: Live Countdown Timer ---
  const cdEyebrow = document.getElementById('countdownEyebrow');
  if (cdEyebrow) cdEyebrow.textContent = config.countdownSection.eyebrow;
  const cdTitle = document.getElementById('countdownTitle');
  if (cdTitle) cdTitle.textContent = config.countdownSection.title;
  const daysPre = document.getElementById('daysPrefix');
  if (daysPre) daysPre.textContent = config.countdownSection.daysPrefix;
  const daysSuf = document.getElementById('daysSuffix');
  if (daysSuf) daysSuf.textContent = config.countdownSection.daysSuffix;

  const hrsLbl = document.getElementById('hoursLabel');
  if (hrsLbl) hrsLbl.textContent = config.countdownSection.hoursLabel;
  const minsLbl = document.getElementById('minutesLabel');
  if (minsLbl) minsLbl.textContent = config.countdownSection.minutesLabel;
  const secsLbl = document.getElementById('secondsLabel');
  if (secsLbl) secsLbl.textContent = config.countdownSection.secondsLabel;

  const cdFooter = document.getElementById('countdownFooterDate');
  if (cdFooter) {
    cdFooter.textContent = `${weddingDates.fullDateString} · ${config.primaryLocation.city}`;
  }

  // --- I. Section 7: The Venue ---
  const vEyebrow = document.getElementById('venueEyebrow');
  if (vEyebrow) vEyebrow.textContent = config.venueSection.eyebrow;
  const vTitle = document.getElementById('venueTitle');
  if (vTitle) vTitle.textContent = config.venueSection.title;
  const vName = document.getElementById('venueName');
  if (vName) vName.textContent = config.venueSection.venueName;
  const vAddr = document.getElementById('venueAddress');
  if (vAddr) vAddr.textContent = config.venueSection.fullAddress;
  const vCity = document.getElementById('venueCityState');
  if (vCity) vCity.textContent = config.primaryLocation.displayLocation;

  const vDirectionsBtn = document.getElementById('venueDirectionsBtn');
  const vDirectionsLabel = document.getElementById('venueDirectionsBtnLabel');
  if (vDirectionsLabel) vDirectionsLabel.textContent = config.venueSection.directionsButtonLabel;
  if (vDirectionsBtn) {
    const query = config.venueSection.googleMapsDestinationQuery || config.venueSection.venueName;
    vDirectionsBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  // --- J. Section 8: RSVP & Contact ---
  const rEyebrow = document.getElementById('rsvpEyebrow');
  if (rEyebrow) rEyebrow.textContent = config.rsvpSection.eyebrow;
  const rT1 = document.getElementById('rsvpTitle1');
  if (rT1) rT1.textContent = config.rsvpSection.mainTitleLine1;
  const rT2 = document.getElementById('rsvpTitle2');
  if (rT2) rT2.textContent = config.rsvpSection.mainTitleLine2;
  const rLead = document.getElementById('rsvpLead');
  if (rLead) rLead.textContent = config.rsvpSection.leadParagraph;

  const rWaBtn = document.getElementById('rsvpWhatsappBtn');
  const rWaLabel = document.getElementById('rsvpWhatsappBtnLabel');
  if (rWaLabel) rWaLabel.textContent = config.rsvpSection.whatsappButtonLabel;
  if (rWaBtn) {
    const phone = config.rsvpSection.whatsappPhoneNumber.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(config.rsvpSection.whatsappPrefilledMessage);
    rWaBtn.href = `https://wa.me/${phone}?text=${msg}`;
  }

  const rCallBtn = document.getElementById('rsvpCallBtn');
  const rCallLabel = document.getElementById('rsvpCallBtnLabel');
  if (rCallLabel) rCallLabel.textContent = config.rsvpSection.callButtonLabel;
  if (rCallBtn) {
    rCallBtn.href = `tel:${config.rsvpSection.callPhoneNumber.trim()}`;
  }

  // --- K. Section 9: Footer ---
  const fGroom = document.getElementById('footerGroomName');
  if (fGroom) fGroom.textContent = config.couple.groom.firstName;
  const fBride = document.getElementById('footerBrideName');
  if (fBride) fBride.textContent = config.couple.bride.firstName;
  const fHash = document.getElementById('footerHashtag');
  if (fHash) fHash.textContent = config.couple.hashtag;
  const fDateCity = document.getElementById('footerDateCity');
  if (fDateCity) {
    fDateCity.textContent = `${weddingDates.footerDateString} · ${config.primaryLocation.city.toUpperCase()}`;
  }
  const fThanks = document.getElementById('footerThanks');
  if (fThanks) fThanks.textContent = config.footerSection.gratitudeNote;

  // --- L. Navigation Dock Labels ---
  const nHome = document.getElementById('navHomeLabel');
  if (nHome) nHome.textContent = config.navigationDock.homeLabel;
  const nEvents = document.getElementById('navEventsLabel');
  if (nEvents) nEvents.textContent = config.navigationDock.eventsLabel;
  const nVenue = document.getElementById('navVenueLabel');
  if (nVenue) nVenue.textContent = config.navigationDock.venueLabel;
  const nRsvp = document.getElementById('navRsvpLabel');
  if (nRsvp) nRsvp.textContent = config.navigationDock.rsvpLabel;
}

/**
 * 4. Render Dynamic Ceremonies List (Arbitrary N Events)
 */
function renderEventsList() {
  const container = document.getElementById('eventsList');
  if (!container || !config.events) return;

  const tz = config.canonicalWeddingDate.timeZone || 'Asia/Kolkata';

  // Ensure events are rendered in chronological order by isoDate
  const sortedEvents = [...config.events].sort((a, b) => {
    if (a.isoDate && b.isoDate) {
      return a.isoDate.localeCompare(b.isoDate);
    }
    return 0;
  });

  container.innerHTML = sortedEvents.map((e, i) => {
    // Generate automatic numbering: 01, 02, 03...
    const autoNumber = String(i + 1).padStart(2, '0');

    // Automatically derive weekday and formatted date from isoDate if provided
    let derivedWeekday = e.day;
    let derivedFormattedDate = e.date;
    if (e.isoDate) {
      const d = new Date(e.isoDate);
      derivedWeekday = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'long' }).format(d);
      const dDay = new Intl.DateTimeFormat('en-US', { timeZone: tz, day: 'numeric' }).format(d);
      const dMonth = new Intl.DateTimeFormat('en-US', { timeZone: tz, month: 'long' }).format(d);
      const dYear = new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric' }).format(d);
      derivedFormattedDate = `${dDay} ${dMonth} ${dYear}`;
    }

    // Determine theme class or custom accent style
    const themeClass = typeof e.accentTheme === 'string' && !e.accentTheme.startsWith('#')
      ? `e-${e.accentTheme}`
      : 'e-wedding';

    let customColorStyle = '';
    if (typeof e.accentTheme === 'object' && e.accentTheme.primary) {
      customColorStyle = `--ac:${e.accentTheme.primary};--al:${e.accentTheme.light || e.accentTheme.primary};`;
    }

    const imgObjPos = e.objectPosition ? `style="object-position:${e.objectPosition}"` : '';

    // Multiple timings handling
    const timingsList = Array.isArray(e.timings) && e.timings.length > 0 ? e.timings : [e.time || ''];

    // Optional dress code & additional notes
    const dressHtml = e.dressCode ? `<p class="ev-note">👗 <b>Dress Code:</b> ${e.dressCode}</p>` : '';
    const noteHtml = e.additionalNotes ? `<p class="ev-note">ℹ️ ${e.additionalNotes}</p>` : '';
    const descHtml = e.description ? `<p class="ev-desc">${e.description}</p>` : '';

    return `
      <div class="event ${themeClass} rv" style="${customColorStyle}">
        <div class="arch">
          <div class="badge">
            <svg class="mandala" viewBox="0 0 200 200">${svgM}</svg>
            <b>${autoNumber}</b>
          </div>
          <div class="arch-in">
            <img src="${e.image}" alt="${e.alt || e.title}" ${imgObjPos} ${i > 0 ? 'loading="lazy"' : ''}>
          </div>
        </div>
        <article class="box ev-card" data-c="geo" style="--cs:50px;--co:-3px">
          <p class="ev-day">${derivedWeekday.toUpperCase()}</p>
          <h3><span class="foil">${e.title}</span></h3>
          <i class="ev-dv"></i>
          <ul class="ev-rows">
            <li>
              <svg><use href="#i-cal"/></svg>
              <div><b>DATE</b><span>${derivedFormattedDate}</span></div>
            </li>
            <li>
              <svg><use href="#i-clock"/></svg>
              <div>
                <b>${(e.timingsLabel || e.label || 'TIME').toUpperCase()}</b>
                ${timingsList.map(t => `<span>${t}</span>`).join('')}
              </div>
            </li>
            <li>
              <svg><use href="#i-pin"/></svg>
              <div><b>VENUE</b><span>${e.venue}</span></div>
            </li>
          </ul>
          ${descHtml}
          ${dressHtml}
          ${noteHtml}
        </article>
      </div>`;
  }).join('');
}

/**
 * 5. Inject Ornate Corner Elements & Mandalas
 */
function setupOrnaments() {
  document.querySelectorAll('[data-mandala]').forEach(el => {
    el.innerHTML = mImg(el.dataset.mandala === 'b' ? MB : MA);
  });

  document.querySelectorAll('[data-c]').forEach(el => {
    ['tl', 'tr', 'bl', 'br'].forEach(p => {
      const k = document.createElement('i');
      k.className = `k ${p} g-${el.dataset.c}`;
      el.appendChild(k);
    });
  });
}

/**
 * 6. Opening Curtain Transition & Rose Petal Physics
 */
const opening = document.getElementById('opening');
const invite = document.getElementById('invite');
const dock = document.getElementById('dock');
const petalBox = document.getElementById('petals');
const petalColors = ['#c2405c', '#e8a0a8', '#f3dfa8', '#d9576f', '#f6c7b6'];

function petalBurst(n) {
  if (!config.features || !config.features.enableFallingPetals) return;
  for (let i = 0; i < n; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = petalColors[i % petalColors.length];
    p.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
    p.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    p.style.animationDelay = (Math.random() * (n > 5 ? 2.5 : 0)) + 's';
    p.style.transform = `scale(${0.6 + Math.random() * 0.7})`;
    petalBox.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }
}

function sparkle(el) {
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const count = (config.features && config.features.sparkleCount) || 40;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'spark';
    const a = Math.random() * Math.PI * 2;
    const d = r.width * 0.35 + Math.random() * r.width * 0.45;
    s.style.left = cx + 'px';
    s.style.top = cy + 'px';
    s.style.setProperty('--x', Math.cos(a) * d + 'px');
    s.style.setProperty('--y', Math.sin(a) * d + 'px');
    s.style.animationDelay = (Math.random() * 0.2) + 's';
    document.body.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
  }
}

document.getElementById('openInvite').addEventListener('click', () => {
  if (config.features.enableHaptics && navigator.vibrate) {
    try { navigator.vibrate(20); } catch (_) {}
  }
  opening.classList.add('done');
  invite.classList.add('open');
  invite.setAttribute('aria-hidden', 'false');
  document.body.classList.remove('locked');
  window.scrollTo({ top: 0, behavior: 'instant' });

  startReveals();
  setTimeout(() => {
    petalBurst(24);
    drawCover();
  }, 500);

  if (config.features.enableFallingPetals) {
    const freq = config.features.ambientPetalFrequencyMs || 2600;
    setInterval(() => petalBurst(3), freq);
  }
});

/**
 * 7. Scroll Reveals & Navigation Dock Controller
 */
function startReveals() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  const links = [...dock.querySelectorAll('a')];
  const secs = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  const onScroll = () => {
    dock.classList.toggle('show', window.scrollY > window.innerHeight * 0.5);
    let idx = 0;
    secs.forEach((s, i) => {
      if (s.getBoundingClientRect().top < window.innerHeight * 0.45) idx = i;
    });
    links.forEach((a, i) => a.classList.toggle('on', i === idx));
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 8. Live Countdown Timer Engine (Timezone-Aware)
 */
const weddingTimestamp = weddingDates.epoch;

function tick() {
  const remaining = weddingTimestamp - Date.now();

  // If the wedding date has passed, show post-wedding message
  if (remaining <= 0) {
    const display = document.getElementById('countdownDisplay');
    if (display && !display.dataset.expired) {
      display.dataset.expired = 'true';
      const msg = config.canonicalWeddingDate.postWeddingMessage || 'Happily Married!';
      display.innerHTML = `<div class="cd-expired">${msg}</div>`;
    }
    return;
  }

  const v = {
    days: Math.floor(remaining / 864e5),
    hours: Math.floor((remaining / 36e5) % 24),
    minutes: Math.floor((remaining / 6e4) % 60),
    seconds: Math.floor((remaining / 1e3) % 60)
  };

  for (const k in v) {
    const el = document.getElementById(k);
    if (!el) continue;
    const s = String(v[k]).padStart(2, '0');
    if (el.textContent !== s) {
      el.textContent = s;
      if (k !== 'days') {
        el.classList.remove('pop');
        void el.offsetWidth; // trigger reflow
        el.classList.add('pop');
      }
    }
  }

  const secRing = document.getElementById('secRing');
  if (secRing) {
    secRing.style.strokeDashoffset = (590.6 * (1 - v.seconds / 60)).toFixed(1);
  }
}

tick();
setInterval(tick, 1000);

/**
 * 9. High-DPI HTML5 Scratch Medallion Canvas
 */
const canvas = document.getElementById('scratchCanvas');
const medal = document.getElementById('medal');
const revealBtn = document.getElementById('revealDate');
let drawing = false;
let revealed = false;
let dirty = false;

function drawCover() {
  if (revealed || dirty || !canvas) return;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);

  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const w = rect.width;
  const cx = w / 2;
  const cy = w / 2;

  // Gold foil gradient base
  const g = ctx.createLinearGradient(0, 0, w, w);
  g.addColorStop(0, '#8f6a2a');
  g.addColorStop(0.25, '#e9cf8c');
  g.addColorStop(0.45, '#fff3cf');
  g.addColorStop(0.6, '#c99a45');
  g.addColorStop(0.8, '#f2d996');
  g.addColorStop(1, '#8f6a2a');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, w);

  // Radial specular highlight
  const sh = ctx.createRadialGradient(cx * 0.7, cy * 0.6, 0, cx, cy, w * 0.7);
  sh.addColorStop(0, 'rgba(255,255,255,.35)');
  sh.addColorStop(1, 'rgba(80,50,10,.25)');
  ctx.fillStyle = sh;
  ctx.fillRect(0, 0, w, w);

  // Centre burgundy wax seal
  ctx.beginPath();
  ctx.arc(cx, cy, w * 0.2, 0, Math.PI * 2);
  const pg = ctx.createRadialGradient(cx - w * 0.05, cy - w * 0.06, 0, cx, cy, w * 0.2);
  pg.addColorStop(0, '#9a2a44');
  pg.addColorStop(1, '#3a0b17');
  ctx.fillStyle = pg;
  ctx.fill();

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#f3dfa8';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, w * 0.2 - 5, 0, Math.PI * 2);
  ctx.lineWidth = 0.8;
  ctx.strokeStyle = 'rgba(243,223,168,.6)';
  ctx.stroke();

  // Embossed Text on Seal
  ctx.fillStyle = '#f3dfa8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const topText = (config.scratchSection && config.scratchSection.coverTopText) || 'SCRATCH';
  const bottomText = (config.scratchSection && config.scratchSection.coverBottomText) || 'TO REVEAL';

  ctx.font = `700 ${Math.round(w * 0.05)}px Cinzel, Georgia, serif`;
  ctx.fillText(topText, cx, cy - w * 0.035);
  ctx.font = `500 ${Math.round(w * 0.04)}px Cinzel, Georgia, serif`;
  ctx.fillText(bottomText, cx, cy + w * 0.045);
}

function eraseAt(x, y) {
  if (revealed || !canvas) return;
  dirty = true;
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const ctx = canvas.getContext('2d');

  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.globalCompositeOperation = 'destination-out';

  const r = Math.max(40, rect.width * 0.18);
  const px = x - rect.left;
  const py = y - rect.top;

  const gr = ctx.createRadialGradient(px, py, r * 0.3, px, py, r);
  gr.addColorStop(0, 'rgba(0,0,0,1)');
  gr.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = gr;
  ctx.beginPath();
  ctx.arc(px, py, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function revealDate() {
  if (revealed) return;
  revealed = true;
  if (canvas) canvas.classList.add('gone');
  if (medal) medal.classList.add('done');
  if (revealBtn) revealBtn.style.visibility = 'hidden';

  if (canvas) sparkle(canvas);
  petalBurst(30);

  if (config.features.enableHaptics && navigator.vibrate) {
    try { navigator.vibrate([30, 40, 30]); } catch (_) {}
  }
}

function checkScratchPercentage() {
  drawing = false;
  if (revealed || !canvas || !canvas.width) return;
  try {
    const d = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    let total = 0;
    for (let i = 3; i < d.length; i += 64) {
      total++;
      if (d[i] < 90) cleared++;
    }
    const threshold = (config.features && config.features.scratchAutoRevealPercent ? config.features.scratchAutoRevealPercent / 100 : 0.4);
    if (cleared / total > threshold) {
      revealDate();
    }
  } catch (err) {
    // Graceful fallback if getImageData fails (e.g. cross-origin canvas)
    console.warn('Canvas check error:', err);
  }
}

if (canvas) {
  canvas.addEventListener('pointerdown', e => {
    drawing = true;
    if (medal) medal.classList.add('done');
    canvas.setPointerCapture(e.pointerId);
    eraseAt(e.clientX, e.clientY);
  });

  canvas.addEventListener('pointermove', e => {
    if (drawing) eraseAt(e.clientX, e.clientY);
  });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(name => {
    canvas.addEventListener(name, checkScratchPercentage);
  });

  new ResizeObserver(drawCover).observe(canvas);
  if (document.fonts) document.fonts.ready.then(drawCover);
}

if (revealBtn) {
  revealBtn.addEventListener('click', revealDate);
}

/**
 * 10. Bootstrap Application
 */
document.addEventListener('DOMContentLoaded', () => {
  hydrateContent();
  renderEventsList();
  setupOrnaments();
});

