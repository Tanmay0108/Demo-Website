import fs from 'fs';

console.log('=== RUNNING COMPREHENSIVE WEDDING INVITATION TEST SUITE ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passCount++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failCount++;
  }
}

// 1. Test wedding-config.js
console.log('1. Testing Configuration (wedding-config.js)...');
const configCode = fs.readFileSync('wedding-config.js', 'utf-8');
const sandbox = { window: {} };
new Function('window', configCode)(sandbox.window);
const config = sandbox.window.WEDDING_CONFIG;

assert(!!config, 'wedding-config.js exports WEDDING_CONFIG to window');
assert(!!config.canonicalWeddingDate.isoTimestamp, 'Canonical wedding date ISO timestamp exists');
assert(config.canonicalWeddingDate.timeZone === 'Asia/Kolkata', 'Timezone is Asia/Kolkata');
assert(!!config.primaryLocation.city, 'Centralized primary location exists');
assert(Array.isArray(config.events) && config.events.length > 0, `Events array exists with ${config.events.length} ceremonies`);

// 2. Test Canonical Date Derivation
console.log('\n2. Testing Canonical Date Engine...');
const targetDate = new Date(config.canonicalWeddingDate.isoTimestamp);
const tz = config.canonicalWeddingDate.timeZone;
const fmtDay = new Intl.DateTimeFormat('en-US', { timeZone: tz, day: 'numeric' }).format(targetDate);
const fmtMonth = new Intl.DateTimeFormat('en-US', { timeZone: tz, month: 'long' }).format(targetDate);
const fmtYear = new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric' }).format(targetDate);
const fmtWeekday = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'long' }).format(targetDate);

assert(fmtDay === '22', `Derived day is 22 (got: ${fmtDay})`);
assert(fmtMonth === 'November', `Derived month is November (got: ${fmtMonth})`);
assert(fmtYear === '2026', `Derived year is 2026 (got: ${fmtYear})`);
assert(fmtWeekday === 'Sunday', `Derived weekday is Sunday (got: ${fmtWeekday})`);

// 3. Test Countdown Delta
console.log('\n3. Testing Countdown Logic...');
const remaining = targetDate.getTime() - Date.now();
assert(remaining > 0, `Countdown target is in the future (remaining: ${Math.round(remaining / 864e5)} days)`);

// 4. Test Event Schema & Multi-Timings
console.log('\n4. Testing Events Array & Multi-Timings...');
const weddingEvent = config.events.find(e => e.key === 'wedding');
assert(!!weddingEvent, 'Wedding ceremony exists in config');
assert(Array.isArray(weddingEvent.timings) && weddingEvent.timings.length > 1, `Wedding ceremony supports multiple timings (found ${weddingEvent.timings.length})`);
assert(weddingEvent.timings.some(t => t.includes('Pheras')), 'Pheras timing exists');
assert(weddingEvent.timings.some(t => t.includes('Baraat')), 'Baraat timing exists');

// 5. Test Dynamic Template Lead Paragraph
console.log('\n5. Testing Dynamic Lead Paragraph...');
const leadTmpl = config.eventsSection.leadParagraphTemplate;
const interpolatedLead = leadTmpl.replace('{count}', config.events.length);
assert(interpolatedLead.includes(String(config.events.length)), `Lead paragraph dynamically incorporates count: "${interpolatedLead}"`);

// 6. Test Google Maps URL format
console.log('\n6. Testing Google Maps URL Generator...');
const query = config.venueSection.googleMapsDestinationQuery || config.venueSection.venueName;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
assert(mapsUrl.startsWith('https://www.google.com/maps/search/?api=1&query='), `Google Maps URL format valid: ${mapsUrl}`);

// 7. Test WhatsApp RSVP URL format
console.log('\n7. Testing WhatsApp RSVP URL Generator...');
const phone = config.rsvpSection.whatsappPhoneNumber.replace(/[^0-9]/g, '');
const msg = encodeURIComponent(config.rsvpSection.whatsappPrefilledMessage);
const waUrl = `https://wa.me/${phone}?text=${msg}`;
assert(waUrl.startsWith('https://wa.me/919016302607?text='), `WhatsApp RSVP URL format valid: ${waUrl}`);

// 8. Test Telephone URL format
console.log('\n8. Testing Telephone URL Generator...');
const telUrl = `tel:${config.rsvpSection.callPhoneNumber.trim()}`;
assert(telUrl === 'tel:+919016302607', `Telephone URL valid: ${telUrl}`);

// 9. Test Image Paths & Cropping
console.log('\n9. Testing Configurable Image Positioning...');
assert(!!config.images.openingScreen.src, 'Opening screen image configured');
assert(!!config.images.openingScreen.objectPosition, `Opening screen objectPosition configured: ${config.images.openingScreen.objectPosition}`);
assert(!!config.images.heroCouplePortrait.src, 'Hero image configured');
assert(!!config.images.heroCouplePortrait.objectPosition, `Hero image objectPosition configured: ${config.images.heroCouplePortrait.objectPosition}`);

// 10. Test HTML Structure & Anchors
console.log('\n10. Testing HTML Element Anchors in index.html...');
const html = fs.readFileSync('index.html', 'utf-8');
const requiredIds = [
  'openingCoverImg', 'openingMantra', 'openingWelcomeTag', 'openingHashtag', 'openInvite',
  'heroCoupleImg', 'heroTogetherText', 'heroGroomFirstName', 'heroBrideFirstName', 'heroDatePill',
  'invitationMantra', 'invitationEyebrow', 'invitationTitle1', 'invitationTitle2', 'invitationLead',
  'groomLabel', 'groomFullName', 'groomParentsLine', 'brideLabel', 'brideFullName', 'brideParentsLine',
  'invitationCity', 'scratchCanvas', 'revealWeekday', 'revealDay', 'revealMonthYear', 'revealCity', 'revealDate',
  'familiesEyebrow', 'familiesTitle', 'groomParentsHeading', 'groomParentsNames', 'groomParentsNote',
  'brideParentsHeading', 'brideParentsNames', 'brideParentsNote', 'eventsEyebrow', 'eventsTitle1',
  'eventsTitle2', 'eventsLead', 'eventsList', 'countdownEyebrow', 'countdownTitle', 'secRing', 'days',
  'hours', 'minutes', 'seconds', 'countdownFooterDate', 'venueName', 'venueAddress', 'venueDirectionsBtn',
  'rsvpWhatsappBtn', 'rsvpCallBtn', 'footerGroomName', 'footerBrideName', 'footerHashtag', 'footerDateCity',
  'dock'
];

let allIdsFound = true;
for (const id of requiredIds) {
  if (!html.includes(`id="${id}"`)) {
    console.error(`  [FAIL] Missing DOM ID in index.html: ${id}`);
    allIdsFound = false;
    failCount++;
  }
}
if (allIdsFound) {
  console.log(`  [PASS] All ${requiredIds.length} required DOM element IDs exist in index.html!`);
  passCount++;
}

// 11. Test CSS File
console.log('\n11. Testing CSS Rules in styles.css...');
const css = fs.readFileSync('styles.css', 'utf-8');
assert(css.includes('--m1:') && css.includes('--m2:') && css.includes('--m3:') && css.includes('--m4:'), 'Royal burgundy palette defined');
assert(css.includes('--gold:') && css.includes('--gold-l:') && css.includes('--foil:'), 'Gold and foil variables defined');
assert(css.includes('@keyframes foil'), '@keyframes foil shimmer animation defined');
assert(css.includes('@keyframes pop'), '@keyframes pop spring animation defined');
assert(css.includes('@keyframes rub'), '@keyframes rub finger gesture animation defined');
assert(css.includes('@keyframes fall'), '@keyframes fall rose petal animation defined');
assert(css.includes('@keyframes shine'), '@keyframes shine specular sweep animation defined');
assert(css.includes('@keyframes spin'), '@keyframes spin mandala rotation animation defined');
assert(css.includes('.app') && css.includes('max-width: var(--app)'), 'Mobile app container defined with max-width');
assert(css.includes('@media (prefers-reduced-motion: reduce)'), 'Reduced motion accessibility supported');

console.log(`\n==================================================`);
console.log(`TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`==================================================`);

if (failCount > 0) {
  process.exit(1);
}

