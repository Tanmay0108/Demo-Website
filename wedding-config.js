/**
 * ====================================================================
 * WEDDING INVITATION CENTRAL CONFIGURATION (wedding-config.js)
 * ====================================================================
 * 
 * Welcome! This is the SINGLE file you need to edit to customize your
 * wedding invitation website.
 * 
 * INSTRUCTIONS:
 * 1. Change any text inside the quotation marks "..." or '...'
 * 2. Keep the commas at the ends of lines.
 * 3. Save this file to see your changes immediately.
 * 
 * No HTML, CSS, or application JavaScript editing is required!
 * ====================================================================
 */

window.WEDDING_CONFIG = {

  // ------------------------------------------------------------------
  // 1. CANONICAL WEDDING DATE & TIME (SINGLE SOURCE OF TRUTH)
  // ------------------------------------------------------------------
  // Enter the primary wedding date and time ONCE here.
  // The website will automatically and accurately derive:
  // - Hero date display (e.g. "22 · 11 · 2026")
  // - Scratch-card weekday (e.g. "SUNDAY")
  // - Scratch-card day number (e.g. "22")
  // - Scratch-card month & year (e.g. "NOVEMBER · 2026")
  // - Live countdown target (accurate to Indian Standard Time)
  // - Footer wedding date (e.g. "22 NOVEMBER 2026")
  // - Post-wedding message once the date has passed
  //
  // NOTE: Uses unambiguous ISO-8601 format with explicit timezone offset (+05:30 for IST).
  canonicalWeddingDate: {
    isoTimestamp: "2026-12-19T21:00:00+05:30", // YYYY-MM-DDTHH:mm:ss+OFFSET
    timeZone: "Asia/Kolkata",                   // Standard IANA Timezone
    postWeddingMessage: "Happily Married! Thank you for blessing our union."
  },

  // ------------------------------------------------------------------
  // 2. PRIMARY WEDDING LOCATION (CENTRALIZED)
  // ------------------------------------------------------------------
  // Used consistently across Hero, Invitation, Scratch Card, Venue, and Footer.
  primaryLocation: {
    city: "Chandrapur",
    state: "Maharashtra",
    displayLocation: "CHANDRAPUR · MAHARASHTRA"
  },

  // ------------------------------------------------------------------
  // 3. SEO & SOCIAL SHARING METADATA
  // ------------------------------------------------------------------
  metadata: {
    siteTitle: "Shivam & Sayali | Wedding Invitation",
    metaDescription: "Join Shivam and Sayali as they celebrate their wedding in Chandrapur on 19 December 2026.",
    themeColor: "#2a0811", // Mobile browser status bar & address bar color

    // Set this to your actual deployed domain (e.g., "https://aarav-weds-kiara.netlify.app")
    deploymentUrl: "https://your-wedding-invitation.netlify.app",

    ogTitle: "Shivam & Sayali are getting married! 💍",
    ogDescription: "We invite you to celebrate our special day with us.",
    ogImage: "assets/images/social-preview.jpg" // Resolved to an absolute URL when deployed
  },

  // ------------------------------------------------------------------
  // 4. COUPLE & FAMILY INFORMATION
  // ------------------------------------------------------------------
  couple: {
    hashtag: "#ShivamWedsSayali",

    groom: {
      firstName: "Shivam",
      fullName: "Shivam Potnurwar",
      label: "THE GROOM",
      parentHeading: "GROOM'S PARENTS",
      parentsNames: "Subhash & Vaishali Potnurwar",
      parentInviteNote: "joyfully invite you to bless the couple"
    },

    bride: {
      firstName: "Sayali",
      fullName: "Sayali Totawar",
      label: "THE BRIDE",
      parentHeading: "BRIDE'S PARENTS",
      parentsNames: "Kishor & Shyamal Totawar",
      parentInviteNote: "and share in this cherished celebration"
    }
  },

  // ------------------------------------------------------------------
  // 5. RELIGIOUS INVOCATIONS
  // ------------------------------------------------------------------
  invocations: {
    openingMantra: "॥ श्री गणेशाय नमः ॥",
    weddingMantra: "॥ शुभ विवाह ॥"
  },

  // ------------------------------------------------------------------
  // 6. SECTION HEADINGS & TEXT LABELS
  // ------------------------------------------------------------------

  // Section 0: Opening Screen Cover
  openingScreen: {
    welcomeTag: "YOU ARE CORDIALLY INVITED",
    openButtonLabel: "Open Invitation"
  },

  // Section 1: Hero Landing
  heroSection: {
    togetherText: "TOGETHER WITH THEIR FAMILIES",
    scrollCueAriaLabel: "Scroll down to invitation"
  },

  // Section 2: Sacred Invitation Section
  invitationSection: {
    eyebrow: "A celebration of love",
    mainTitleLine1: "Two Hearts",
    mainTitleLine2: "one beautiful beginning",
    leadParagraph: "With immense joy in our hearts, we invite you to grace the wedding of"
  },

  // Section 3: Interactive Scratch-to-Reveal Card
  scratchSection: {
    eyebrow: "A little surprise",
    title: "Save Our Date",
    hint: "Scratch the golden seal to reveal",
    coverTopText: "SCRATCH",
    coverBottomText: "TO REVEAL",
    canvasAriaLabel: "Scratch to reveal the wedding date",
    revealFallbackButtonLabel: "TAP TO REVEAL INSTEAD"
  },

  // Section 4: Our Beloved Families Section
  familiesSection: {
    eyebrow: "With the blessings of",
    title: "Our Beloved Families"
  },

  // Section 5: Wedding Functions / Events Timeline Header
  eventsSection: {
    eyebrow: "The wedding week",
    mainTitleLine1: "Come Celebrate",
    mainTitleLine2: "with us",
    // {count} is automatically replaced with the actual number of events configured!
    leadParagraphTemplate: "{count} beautiful moments, one unforgettable story."
  },

  // Section 6: Live Countdown Timer
  countdownSection: {
    eyebrow: "Until we say “I do”",
    title: "Counting Every Moment",
    daysPrefix: "ONLY",
    daysSuffix: "DAYS TO GO",
    hoursLabel: "HOURS",
    minutesLabel: "MINUTES",
    secondsLabel: "SECONDS"
    // Note: The date underneath the timer is automatically derived from canonicalWeddingDate!
  },

  // Section 7: The Venue & Google Maps
  venueSection: {
    eyebrow: "Join us in Chandrapur",
    title: "The Venue",
    venueName: "Tadoba Wildlife Resort",
    fullAddress: "Tadoba Wildlife Resort, Moharli, Chandrapur, Maharashtra 442401",
    directionsButtonLabel: "Get Directions",
    googleMapsDestinationQuery: "Tadoba Wildlife Resort Chandrapur" // Used to generate the Google Maps directions link
  },

  // Section 8: RSVP & Family Contacts
  rsvpSection: {
    eyebrow: "Kindly respond",
    mainTitleLine1: "We Can't Wait",
    mainTitleLine2: "to celebrate with you",
    leadParagraph: "For RSVP and assistance, please contact our family.",
    whatsappButtonLabel: "RSVP on WhatsApp",
    callButtonLabel: "Call +91 7620861467",
    whatsappPhoneNumber: "917620861467", // Digits only (country code + number)
    whatsappPrefilledMessage: "Hello, I'd like to RSVP for Shivam and Sayali's wedding.",
    callPhoneNumber: "+917620861467" // Tel link format
  },

  // Section 9: Website Footer
  footerSection: {
    gratitudeNote: "Your presence is the most precious gift for us."
    // Note: Couple names, hashtag, and derived date are automatically inserted!
  },

  // Section 10: Persistent Bottom Floating Navigation Dock
  navigationDock: {
    homeLabel: "HOME",
    eventsLabel: "EVENTS",
    venueLabel: "VENUE",
    rsvpLabel: "RSVP"
  },

  // ------------------------------------------------------------------
  // 7. COMPLETE BACKGROUNDS & IMAGE CONFIGURATION
  // ------------------------------------------------------------------
  // Configure image paths and image positioning/cropping for every section.
  // objectPosition options: "center center", "top center", "center 30%", etc.
  images: {
    // Opening screen background
    openingScreen: {
      src: "assets/images/cover.jpg",
      alt: "A peacock in a palace garden at sunrise",
      objectPosition: "center center"
    },

    // Hero section couple portrait
    heroCouplePortrait: {
      src: "assets/images/hero.jpg",
      alt: "Aarav and Kiara together at a palace at sunset",
      objectPosition: "center 30%"
    },

    // Section backgrounds (optional custom photos or textures; leave src as "" to use default royal jaali pattern)
    invitationBackground: {
      src: "",
      opacity: 0.1,
      objectPosition: "center center"
    },
    familiesBackground: {
      src: "",
      opacity: 0.1,
      objectPosition: "center center"
    },
    eventsBackground: {
      src: "",
      opacity: 0.1,
      objectPosition: "center center"
    },
    countdownBackground: {
      src: "",
      opacity: 0.1,
      objectPosition: "center center"
    },
    rsvpBackground: {
      src: "",
      opacity: 0.1,
      objectPosition: "center center"
    },
    footerBackground: {
      src: "",
      opacity: 0.1,
      objectPosition: "center center"
    },

    // Scratch card custom textures (optional)
    scratchCard: {
      coverTextureSrc: "",      // Optional custom image overlay on the scratch cover
      revealBackgroundSrc: "",  // Optional custom background underneath the scratch layer
      objectPosition: "center center"
    },

    // Venue photo
    venuePhoto: {
      src: "assets/images/venue.jpg",
      alt: "Royal Garden Palace Jaipur",
      objectPosition: "center center"
    },

    // Social preview thumbnail (WhatsApp / Instagram / iMessage)
    socialPreview: {
      src: "assets/images/social-preview.jpg",
      alt: "Aarav & Kiara Wedding Invitation"
    }
  },

  // ------------------------------------------------------------------
  // 8. WEDDING FUNCTIONS / CEREMONIES (CHRONOLOGICAL ORDER)
  // ------------------------------------------------------------------
  // Chronological Order:
  // 1. Haldi     – 16 December 2026
  // 2. Mehendi   – 17 December 2026
  // 3. Sangeet   – 18 December 2026
  // 4. Wedding   – 19 December 2026
  // 5. Reception – 20 December 2026
  events: [
    {
      key: "haldi",
      title: "Haldi",
      isoDate: "2026-12-16",
      timingsLabel: "Time",
      timings: [
        "7:00 AM onwards"
      ],
      venue: "Our Sweet Home",
      description: "Bathed in auspicious turmeric, love, sunshine, and playful blessings.",
      dressCode: "Shades of Yellow & Ochre",
      additionalNotes: "",
      image: "assets/images/haldi.jpg",
      alt: "Shivam and Sayali at their sunlit Haldi ceremony",
      objectPosition: "center center",
      accentTheme: "haldi"
    },
    {
      key: "mehndi",
      title: "Mehendi",
      isoDate: "2026-12-17",
      timingsLabel: "Time",
      timings: [
        "8:00 PM onwards"
      ],
      venue: "Our Sweet Home",
      description: "An evening of vibrant henna, melodious folk songs, and joyful laughter.",
      dressCode: "Traditional Green / Floral Chic",
      additionalNotes: "",
      image: "assets/images/mehndi.jpg",
      alt: "Shivam and Sayali seated at their colorful Mehendi celebration",
      objectPosition: "center center",
      accentTheme: "mehndi"
    },
    {
      key: "sangeet",
      title: "Sangeet",
      isoDate: "2026-12-18",
      timingsLabel: "Time",
      timings: [
        "7:30 PM onwards"
      ],
      venue: "Tadoba WildLife Resort, Chandrapur",
      description: "A musical night of breathtaking dance performances, celebration, and cocktails.",
      dressCode: "Evening Glitz & Glamour",
      additionalNotes: "DJ and dancing until late.",
      image: "assets/images/sangeet.jpg",
      alt: "Shivam and Sayali dancing at their starlit Sangeet",
      objectPosition: "center center",
      accentTheme: "sangeet"
    },
    {
      key: "wedding",
      title: "Wedding",
      isoDate: "2026-12-19",
      timingsLabel: "Celebrations",
      timings: [
        "Baraat · 4:30 PM",
        "Varmala · 5:40 PM",
        "Dinner · 7:00 PM onwards"
      ],
      venue: "Tadoba Wildlife Resort, Chandrapur",
      description: "A beautiful celebration of love, togetherness, and new beginnings.",
      dressCode: "Regal Indian Traditional",
      additionalNotes: "Blessings and dinner follow the Varmala.",
      image: "assets/images/wedding.jpg",
      alt: "Shivam and Sayali standing together under their wedding mandap",
      objectPosition: "center 20%",
      accentTheme: "wedding"
    },
    {
      key: "reception",
      title: "Reception",
      isoDate: "2026-12-20",
      timingsLabel: "Time",
      timings: [
        "7:00 PM onwards"
      ],
      venue: "Balaji Celebration, Gadchandur",
      description: "An elegant evening to toast the newlywed couple.",
      dressCode: "Black Tie / Royal Formal",
      additionalNotes: "Dinner and formal greetings.",
      image: "assets/images/reception.jpg",
      alt: "Shivam and Sayali at their elegant evening reception",
      objectPosition: "center center",
      accentTheme: "reception"
    }
  ],

  // ------------------------------------------------------------------
  // 9. INTERACTIVE FEATURES & ACCESSIBILITY SETTINGS
  // ------------------------------------------------------------------
  features: {
    enableHaptics: true,          // Haptic vibrations on mobile (only if supported by device)
    enableFallingPetals: true,    // Falling rose petals animation
    ambientPetalFrequencyMs: 2600,// How often ambient petals fall (in milliseconds)
    scratchAutoRevealPercent: 40, // Area % scratched before auto-reveal triggers
    sparkleCount: 40              // Number of celebratory sparkles on reveal
  }

};
