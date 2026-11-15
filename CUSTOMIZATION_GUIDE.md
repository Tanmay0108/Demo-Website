# Complete Wedding Invitation Customization Guide 💍

Welcome! This guide is written especially for **non-technical users**. You can easily customize everything on your wedding invitation website — from names, dates, ceremonies, and timings to background images and venue details — **without touching any website code**.

---

## Quick Summary (The 2-Minute Version)

You only ever need to work with **two things**:
1. **The file `wedding-config.js`**: Contains all your text, dates, names, venues, and contact information.
2. **The folder `assets/images/`**: Contains all your photos and background images.

You do **not** need to touch `index.html`, `styles.css`, or `app.js`.

---

## Table of Contents
1. [Which File to Edit](#1-which-file-to-edit)
2. [Setting the Wedding Date & Timezone (Single Source of Truth)](#2-setting-the-wedding-date--timezone)
3. [Setting Centralized Wedding Location & City](#3-setting-centralized-wedding-location--city)
4. [Changing Couple & Family Names](#4-changing-couple--family-names)
5. [Adding, Removing, and Reordering Wedding Functions (Ceremonies)](#5-adding-removing-and-reordering-wedding-functions)
6. [Replacing Background Images & Adjusting Cropping](#6-replacing-background-images--adjusting-cropping)
7. [Replacing Ceremony Images](#7-replacing-ceremony-images)
8. [Configuring Venue, Google Maps & RSVP (WhatsApp / Phone)](#8-configuring-venue-google-maps--rsvp)
9. [Setting Deployment URL for WhatsApp / Social Link Previews](#9-setting-deployment-url-for-whatsapp--social-link-previews)
10. [How to Run the Website Locally on Your Computer](#10-how-to-run-the-website-locally-on-your-computer)
11. [How to Publish the Website Online for Guests](#11-how-to-publish-the-website-online-for-guests)

---

## 1. Which File to Edit

Open the file named **`wedding-config.js`** in any text editor:
* Windows: **Notepad**, **VS Code**, or **Notepad++**
* Mac: **TextEdit** (Plain Text mode) or **VS Code**

> 💡 **Important Rule**: When editing text in `wedding-config.js`, always keep the text inside quotation marks `"..."` and keep the commas at the ends of lines.
> 
> *Correct:* `firstName: "Rohan",`  
> *Incorrect:* `firstName: Rohan` (missing quotes and comma)

---

## 2. Setting the Wedding Date & Timezone

In this website, **you only set your wedding date ONCE**.

Look for **Section 1 (`canonicalWeddingDate`)** at the very top of `wedding-config.js`:

```javascript
canonicalWeddingDate: {
  isoTimestamp: "2026-11-22T21:00:00+05:30", // Format: YYYY-MM-DDTHH:mm:ss+OFFSET
  timeZone: "Asia/Kolkata",                   // Standard IANA Timezone
  postWeddingMessage: "Happily Married! Thank you for blessing our union."
}
```

### How to format your date:
* `2026-11-22` is November 22, 2026.
* `T21:00:00` is 9:00 PM (using 24-hour time: `19:00` = 7 PM, `11:00` = 11 AM).
* `+05:30` is Indian Standard Time (IST).

### What updates automatically from this single date?
* ✅ The Hero screen date pill (e.g., `22 · 11 · 2026`)
* ✅ The Scratch-card weekday (e.g., `SUNDAY`)
* ✅ The Scratch-card day number (e.g., `22`)
* ✅ The Scratch-card month & year (e.g., `NOVEMBER · 2026`)
* ✅ The live Countdown Timer (accurately calculating Days, Hours, Minutes, Seconds against Indian time, regardless of guest's timezone)
* ✅ The website footer date line
* ✅ When the wedding time passes, the countdown smoothly transitions to your `postWeddingMessage` ("Happily Married!")

---

## 3. Setting Centralized Wedding Location & City

Look for **Section 2 (`primaryLocation`)**:

```javascript
primaryLocation: {
  city: "Jaipur",
  state: "Rajasthan",
  displayLocation: "JAIPUR · RAJASTHAN"
}
```

This single entry is shared automatically across the Hero date, Invitation section, Scratch Card reveal, Venue header, and Footer, ensuring 100% consistency.

---

## 4. Changing Couple & Family Names

Look for **Section 4 (`couple: { ... }`)**:

```javascript
couple: {
  hashtag: "#AaravWedsKiara", // Your wedding hashtag

  groom: {
    firstName: "Aarav",                        // First name
    fullName: "Aarav Mehta",                  // Full name
    label: "THE GROOM",                       // Role label
    parentHeading: "GROOM'S PARENTS",         // Header above parents
    parentsNames: "Rajesh & Sunita Mehta",    // Groom's parents' names
    parentInviteNote: "joyfully invite you to bless the couple"
  },

  bride: {
    firstName: "Kiara",                        // First name
    fullName: "Kiara Shah",                   // Full name
    label: "THE BRIDE",                       // Role label
    parentHeading: "BRIDE'S PARENTS",         // Header above parents
    parentsNames: "Mahesh & Neeta Shah",      // Bride's parents' names
    parentInviteNote: "and share in this cherished celebration"
  }
}
```

---

## 5. Adding, Removing, and Reordering Wedding Functions

Look for **Section 8 (`events: [ ... ]`)**.

The website dynamically adjusts to **any number of ceremonies** (e.g., 2, 3, 5, or 7 events):

* **Automatic Numbering:** You do **not** need to type `01`, `02`, `03`... The website numbers each event automatically based on its order in the list!
* **Automatic Weekday & Date:** Enter `isoDate: "2026-11-20"`. The website automatically derives the weekday ("Friday") and readable date ("20 November 2026") in Indian Standard Time.
* **Multiple Timings:** Ideal for weddings with separate timings for Baraat, Varmala, and Pheras!

### Example Event Block:
```javascript
{
  key: "wedding",
  title: "Wedding",
  isoDate: "2026-11-22",
  timingsLabel: "Celebrations",
  timings: [
    "Baraat · 5:00 PM",
    "Varmala · 7:00 PM",
    "Pheras · 9:00 PM",
    "Dinner · 8:00 PM onwards"
  ],
  venue: "Royal Palace Lawn, Jaipur",
  description: "The sacred vows, pheras around the holy fire, and eternal beginnings.",
  dressCode: "Regal Indian Traditional",
  additionalNotes: "Blessings and dinner follow the Varmala.",
  image: "assets/images/wedding.jpg",
  objectPosition: "center 20%", // Adjust cropping (see Section 6)
  accentTheme: "wedding"        // Presets: "mehndi", "haldi", "sangeet", "wedding", "reception"
}
```

### Dynamic Section Header:
In Section 6 (`eventsSection`), the lead paragraph uses `{count}`:
```javascript
leadParagraphTemplate: "{count} beautiful moments, one unforgettable story."
```
If you have 4 events, it will display *"4 beautiful moments, one unforgettable story."*

---

## 6. Replacing Background Images & Adjusting Cropping

All image paths and cropping positions are configured in **Section 7 (`images: { ... }`)**:

```javascript
images: {
  openingScreen: {
    src: "assets/images/cover.jpg",
    alt: "A peacock in a palace garden at sunrise",
    objectPosition: "center center" // Cropping: "top center", "center 30%", "center bottom"
  },
  heroCouplePortrait: {
    src: "assets/images/hero.jpg",
    alt: "Aarav and Kiara together at a palace at sunset",
    objectPosition: "center 30%"
  },
  venuePhoto: {
    src: "assets/images/venue.jpg",
    alt: "Royal Garden Palace Jaipur",
    objectPosition: "center center"
  },
  socialPreview: {
    src: "assets/images/social-preview.jpg",
    alt: "Aarav & Kiara Wedding Invitation"
  }
}
```

### How to adjust photo cropping without CSS:
If a photo shows too much head space or cuts off someone's chin on mobile screens, change `objectPosition`:
* `"center 20%"` — Shifts focus higher toward faces.
* `"center 50%"` (or `"center center"`) — Standard center crop.
* `"top center"` — Keeps the top of the photo visible.

---

## 7. Replacing Ceremony Images

Inside `assets/images/`, replace these files with your own photos:
* `mehndi.jpg` — Photo for Mehndi card
* `haldi.jpg` — Photo for Haldi card
* `sangeet.jpg` — Photo for Sangeet card
* `wedding.jpg` — Photo for Wedding ceremony card
* `reception.jpg` — Photo for Reception card

**Recommended Photo Ratio**: Vertical portrait or 3:4 aspect ratio (around 800 x 1200 px).

---

## 8. Configuring Venue, Google Maps & RSVP

Look for **Section 6 (`venueSection`)** and **Section 8 (`rsvpSection`)**:

### Venue & Google Maps Directions:
```javascript
venueSection: {
  venueName: "Royal Garden Palace",
  fullAddress: "Royal Garden Palace, Amer Road, Jaipur, Rajasthan 302002",
  directionsButtonLabel: "Get Directions",
  googleMapsDestinationQuery: "Royal Garden Palace Jaipur" // Exact venue name on Google Maps
}
```
> When guests tap **"Get Directions"**, Google Maps automatically opens with a search/route directly to this venue!

### WhatsApp RSVP & Phone Call Button:
```javascript
rsvpSection: {
  whatsappPhoneNumber: "919016302607", // Country code + 10 digits (digits only, no "+" or spaces)
  whatsappPrefilledMessage: "Hello, I'd like to RSVP for Aarav and Kiara's wedding.",
  callPhoneNumber: "+919016302607"     // Full phone number for phone dialer
}
```

---

## 9. Setting Deployment URL for WhatsApp / Social Link Previews

When you send your wedding website link over WhatsApp or Instagram, a rich card with your photo and title appears.

In **Section 3 (`metadata`)**, set your final deployed website link:

```javascript
metadata: {
  siteTitle: "Aarav & Kiara | Wedding Invitation",
  deploymentUrl: "https://your-wedding-website.netlify.app", // Your actual website domain
  ogTitle: "Aarav & Kiara are getting married! 💍",
  ogDescription: "We invite you to celebrate our special day with us.",
  ogImage: "assets/images/social-preview.jpg"
}
```

The website automatically converts `ogImage` to a full public web address (`https://your-wedding-website.netlify.app/assets/images/social-preview.jpg`), ensuring WhatsApp previews display your photo!

---

## 10. How to Run the Website Locally on Your Computer

### Method A: Using Vite (Modern Development Server)
1. Open PowerShell or Terminal in the project folder.
2. Run (first time only):
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. The terminal will display a local link (e.g. `http://localhost:3000`). Click or open it in your browser!
5. To build for production:
   ```bash
   npm run build
   ```
6. To preview the production build:
   ```bash
   npm run preview
   ```

### Method B: Using Python (Zero Installation)
If Python is already installed on your system:
```bash
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

### Mobile Preview in Browser:
Press `F12` in Chrome/Edge → Click the **Device Toggle** icon (or press `Ctrl + Shift + M`) → Choose **iPhone 14** or **Pixel 7**.

---

## 11. How to Publish the Website Online for Guests

Once you are happy with the website, you can publish it online for free in less than 2 minutes:

### Option 1: Netlify Drop (Easiest — No code or accounts needed)
1. Run `npm run build` (or upload your project folder directly).
2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop your `dist/` folder (or website folder) onto the webpage.
4. Your website is immediately live with a free link (e.g., `https://our-royal-wedding.netlify.app`)!

### Option 2: Vercel
1. Run `npx vercel` in your terminal.
2. Follow the 3 prompts to deploy.

### Option 3: GitHub Pages
1. Push your project to a GitHub repository.
2. Go to **Settings** → **Pages** → Choose `main` branch → Click **Save**.

Copy your public link and send it to your guests on WhatsApp! 🎉
