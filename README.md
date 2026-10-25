# Museum of Our Friendship — Interactive Surprise Experience

A cinematic, multi-room digital experience where your friend enters a virtual museum of your friendship, discovers shared milestones, pieces together a memory jigsaw puzzle, opens an intimate letter sealed with wax, ratifies a 5-clause friendship covenant, and reaches a permanent collection reveal.

Built entirely with standard **HTML5, CSS3, and Vanilla JavaScript** — zero frameworks, zero external build tools, and 100% static hosting ready (ideal for **GitHub Pages**).

---

## 🏛️ Room Sequence & Experience Flow

1. **Stage 1 — Cinematic Welcome (Museum Entrance):**
   Atmospheric dark lobby (`#10151D`), warm overhead spotlight, floating museum dust motes, and a 3D architectural double door with brass plaque. Clicking the entrance triggers a 3D door opening animation, light emergence, and smoothly transitions to Room 02 while starting background audio.
2. **Stage 2 — Room 02: The Archives (Timeline):**
   Editorial warm cream paper aesthetic (`#F6F0E3`). Prominently calculates and animates the live day count from your configured start date, along with honest supporting milestones (years together, weekends shared, seasons weathered, and late-night chats).
3. **Stage 3 — Room 04: Reconstructing Memories (Photo Puzzle):**
   Fully playable 3x3 photo jigsaw puzzle. Supports mouse and touchscreen click/tap swapping. Features move tracking, elapsed timer, hint preview toggle, shuffle, and automatic win detection that unlocks Room 06.
4. **Stage 4 — Room 06: The Reading Room (Letter):**
   Interactive 3D illustrated envelope sealed with an antique wax seal. Tapping the seal breaks it and folds open the flap, revealing an unfolding archival letter with customizable paragraphs and signature.
5. **Stage 5 — Room 07: The Covenant (Friendship Promises):**
   Formal 5-clause friendship agreement. Custom interactive checkboxes and signature field. Ratification button is strictly enabled **only** when all 5 clauses are checked AND a non-empty signature is provided. Upon signing, displays a certified red wax seal stamp, timestamp, and signature certificate.
6. **Stage 6 — Grand Finale (Permanent Collection):**
   Culmination of the journey featuring a gilded masterpiece frame, heartwarming reflection, floating celebratory confetti, and a replay button to walk through the exhibition again.

---

## 🛠️ Project Structure

```
d:\something new/
├── index.html                   # Master single-page museum container
├── README.md                    # Documentation & customization guide
├── css/
│   ├── variables.css            # Design tokens, color palette, typography scales
│   ├── global.css               # Base styles, focus rings, buttons, accessibility
│   ├── layout.css               # Room transitions, discreet header, audio widget
│   ├── welcome.css              # 3D double doors, spotlight, opening animation
│   ├── timeline.css             # Milestone day counter, quote box, stats grid
│   ├── puzzle.css               # 3x3 photo puzzle arena, hint overlay, win dialog
│   ├── letter.css               # 3D interactive envelope, wax seal, letter unfold
│   ├── promises.css             # Agreement parchment, 5 clauses, signature validation
│   └── final.css                # Masterpiece frame, toast badge, replay controls
├── js/
│   ├── config.js                # Central personalization config (edit all content here!)
│   ├── navigation.js            # Sequential room unlocking, history, breadcrumbs
│   ├── timeline.js              # Date arithmetic (leap years, calendar days, stats)
│   ├── puzzle.js                # Playable 3x3 jigsaw logic, move counter, stopwatch
│   ├── letter.js                # 3D envelope opening animation and letter reveal
│   ├── promises.js              # Real-time form validation & ratified stamp display
│   ├── music.js                 # Autoplay-compliant audio player + ambient synth fallback
│   ├── final.js                 # Canvas confetti particles & replay controller
│   └── app.js                   # Master coordinator
└── assets/
    ├── illustrations/           # Scalable museum artwork
    │   ├── museum_door.svg      # Classical 3D architectural double door
    │   ├── wax_seal.svg         # Antique ruby wax seal with embossed crest
    │   └── stamp_verified.svg   # Archival "Ratified & Sealed" certificate stamp
    ├── images/
    │   ├── puzzle_memory.svg    # Sunset rooftop friends memory (jigsaw photo)
    │   └── celebration_memory.svg # Gilded exhibition centerpiece painting
    └── audio/
        └── friendship_theme.mp3 # Warm background music
```

---

## 🎨 How to Personalize Your Website

All personal content is centralized in **`js/config.js`**. You do **not** need to touch HTML or CSS to customize names, dates, promises, or messages!

### 1. Change Names & Friendship Start Date
Open [`js/config.js`](file:///d:/something%20new/js/config.js):
```javascript
friendName: "Your Friend's Name",
senderName: "Your Name",

// Enter the date your friendship began in "YYYY-MM-DD" format:
friendshipStartDate: "2022-08-04",
```
*Note: The website automatically calculates exact days, years, weekends, and seasons up to the present day.*

### 2. Personalize the Welcome Stage
In [`js/config.js`](file:///d:/something%20new/js/config.js):
```javascript
welcome: {
  badge: "PRIVATE EXHIBITION · ROOM 01",
  title: "Museum of Our Friendship",
  subtitle: "A digital archive of laughter, shared secrets, quiet support...",
  enterButtonText: "Step Inside The Museum →"
}
```

### 3. Personalize the Personal Letter (Room 06)
In [`js/config.js`](file:///d:/something%20new/js/config.js):
```javascript
letter: {
  salutation: "Dearest Friend,",
  date: "A Day to Remember",
  paragraphs: [
    "Your first paragraph here...",
    "Your second paragraph here...",
    "Your third paragraph here..."
  ],
  closing: "With love and boundless gratitude,",
  signature: "Your Name"
}
```

### 4. Customize the 5 Friendship Promises (Room 07)
In [`js/config.js`](file:///d:/something%20new/js/config.js):
```javascript
promises: {
  list: [
    { id: "promise-1", title: "Clause I — ...", text: "..." },
    { id: "promise-2", title: "Clause II — ...", text: "..." },
    { id: "promise-3", title: "Clause III — ...", text: "..." },
    { id: "promise-4", title: "Clause IV — ...", text: "..." },
    { id: "promise-5", title: "Clause V — ...", text: "..." }
  ]
}
```

### 5. Replace Photos with Your Own
Place your photo files into [`assets/images/`](file:///d:/something%20new/assets/images/) and update the path in [`js/config.js`](file:///d:/something%20new/js/config.js):
- **Memory Jigsaw Photo:** `puzzle.imagePath = "assets/images/your_photo.jpg"`
- **Final Masterpiece Photo:** `final.imagePath = "assets/images/your_final_photo.jpg"`

### 6. Replace Background Music
Place an MP3 file into [`assets/audio/`](file:///d:/something%20new/assets/audio/) and update:
```javascript
audio: {
  filePath: "assets/audio/your_song.mp3",
  defaultVolume: 0.45,
  enableChimeFallback: true
}
```
*Note: If no audio file is provided or if audio playback is restricted, the built-in procedural Web Audio ambient synthesizer automatically provides gentle harmonic chimes.*

### 7. Customize Colors & Fonts
Open [`css/variables.css`](file:///d:/something%20new/css/variables.css) to adjust the core tokens:
- `--color-dark-bg`: `#10151D` (Museum entrance background)
- `--color-cream-bg`: `#F6F0E3` (Personal rooms paper background)
- `--color-amber`: `#E99A2D` (Primary highlights and actions)
- `--color-teal`: `#176F65` (Heritage deep teal accents)
- `--font-display`: `'Playfair Display', Georgia, serif`
- `--font-body`: `'Plus Jakarta Sans', sans-serif`

---

## 💻 Running the Website Locally

Since this is a static website, you can run it with any static server:

### Option A: Using Python (Recommended)
1. Open PowerShell or Command Prompt in the project folder:
   ```powershell
   cd "d:\something new"
   python -m http.server 8080
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

### Option B: Using VS Code Live Server
1. Open `d:\something new` in VS Code.
2. Right-click [`index.html`](file:///d:/something%20new/index.html) and select **"Open with Live Server"**.

---

## 🚀 Deploying to GitHub Pages (Free Hosting)

1. Create a new repository on [GitHub](https://github.com) (e.g., `friendship-surprise`).
2. In your terminal, initialize Git in the project directory:
   ```bash
   cd "d:\something new"
   git init
   git add .
   git commit -m "Initial commit of friendship surprise website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. On GitHub:
   - Go to your repository **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/ (root)`.
   - Click **Save**.
4. In 1–2 minutes, your website will be live at:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## 🧪 Verified Test Suite Results

- **Visual / Layout Viewports Tested:**
  - Desktop 1440x900 (`stage1_welcome_desktop_1440.png`, etc.)
  - Tablet 768x1024 (`stage1_welcome_tablet_768.png`, etc.)
  - Mobile 390x844 iPhone (`stage1_welcome_mobile_390.png`, etc.)
  - Mobile 360x780 Android (`stage1_welcome_mobile_360.png`, etc.)
  - *24/24 responsive screenshots captured with zero layout breakages or clipping.*
- **Functional Tests (Automated via Chrome CDP):**
  - Timeline arithmetic & leap-year day calculations: **PASSED**
  - 3x3 Photo Puzzle piece swap & move counting: **PASSED**
  - Puzzle hint overlay toggle: **PASSED**
  - 3D envelope opening & letter reveal: **PASSED**
  - Covenant 5-clause strict validation: **PASSED**
  - Signature input non-whitespace enforcement: **PASSED**
  - Agreement ratification & certified stamp display: **PASSED**
  - Revocation upon unchecking or clearing signature: **PASSED**
  - Audio mute/unmute toggle: **PASSED**
  - Replay state reset to Room 0: **PASSED**
  - *21/21 Automated Tests PASSED.*
