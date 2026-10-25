/**
 * FRIENDSHIP SURPRISE WEBSITE — CONFIGURATION FILE
 * 
 * Personalize your entire website from this single file.
 * All changes here instantly update the experience without touching any HTML/CSS/JS logic.
 */

const CONFIG = {
  // 1. PARTICIPANT DETAILS
  friendName: "My Favorite Person",
  senderName: "Your Forever Friend",

  // 2. FRIENDSHIP START DATE
  // Format: "YYYY-MM-DD". Used to compute days, years, weekends, and seasons.
  // Replace this date with the actual date your friendship began!
  friendshipStartDate: "2022-08-04",

  // 3. STAGE 1 — CINEMATIC WELCOME
  welcome: {
    badge: "PRIVATE EXHIBITION · ROOM 01",
    title: "Museum of Our Friendship",
    subtitle: "A digital archive of laughter, shared secrets, quiet support, and the little moments that became our greatest adventures.",
    doorPlaque: "EXHIBIT NO. 1 · ENTER ARCHIVE",
    enterButtonText: "Step Inside The Museum →",
    hintText: "Click the museum entrance or button below to step inside"
  },

  // 4. STAGE 2 — ROOM 2: FRIENDSHIP TIMELINE
  timeline: {
    roomNumber: "ROOM 02",
    roomLabel: "THE ARCHIVES",
    heading: "Every Single Day Matters",
    personalNote: "Some people stumble into our lives by chance, but staying by each other's side has been the most beautiful decision.",
    statsLabels: {
      days: "Days of Unconditional Friendship",
      years: "Years Shared Together",
      weekends: "Weekends of Laughs & Escapes",
      seasons: "Seasons Weathered Side by Side",
      conversations: "Late-Night Chats & Countless Laughs"
    },
    nextButtonText: "Explore The Memory Gallery →"
  },

  // 5. STAGE 3 — ROOM 4: PHOTO MEMORY PUZZLE
  puzzle: {
    roomNumber: "ROOM 04",
    roomLabel: "RECONSTRUCTING MEMORIES",
    heading: "Piece Together Our Memory",
    instructions: "Click to select and swap tiles, or drag them into position to reconstruct the picture. Use the Hint button if you need a peek!",
    imagePath: "assets/images/puzzle_memory.svg",
    gridSize: 3, // 3x3 = 9 tiles
    solvedHeading: "Memory Reconstructed!",
    solvedMessage: "Every piece of our story fits together just right. Ready for what comes next?",
    nextButtonText: "Proceed to The Reading Room →"
  },

  // 6. STAGE 4 — ROOM 6: THE READING ROOM (LETTER)
  letter: {
    roomNumber: "ROOM 06",
    roomLabel: "THE READING ROOM",
    heading: "A Letter Kept Just For You",
    instruction: "Tap the wax seal to open the letter",
    salutation: "Dearest Friend,",
    date: "A Day to Remember",
    paragraphs: [
      "If someone told me years ago how much of a safe harbor our friendship would become, I don't know if I would have understood the depth of it. Life moves at an impossible pace, seasons shift, and people come and go, but having you in my life has been one of the truest constants I could ever wish for.",
      "Thank you for being the person who answers the call when things get heavy, and the first person I want to celebrate with when good things happen. Thank you for the quiet understanding that requires no explanations, and for all the times we have laughed until our stomachs hurt over the most ridiculous things.",
      "You inspire me with your kindness, your resilience, and the gentle way you carry both strength and empathy. I hope this little museum reminds you of just how valued, respected, and irreplaceable you are to me.",
      "No matter where life takes us next or how busy the world becomes, you will always have a friend in me who shows up, listens, and believes in you unconditionally."
    ],
    closing: "With love and boundless gratitude,",
    signature: "Your Forever Friend",
    nextButtonText: "Review The Friendship Covenant →"
  },

  // 7. STAGE 5 — ROOM 7: FRIENDSHIP PROMISES (COVENANT)
  promises: {
    roomNumber: "ROOM 07",
    roomLabel: "THE COVENANT",
    heading: "The Friendship Agreement",
    subheading: "Check every clause and sign below to officially ratify our friendship pact for the future.",
    list: [
      {
        id: "promise-1",
        title: "Clause I — The Response Rule",
        text: "I promise to always reply to your texts, return urgent calls, or at least send an emergency audio note when life gets chaotic."
      },
      {
        id: "promise-2",
        title: "Clause II — The Showing Up Pact",
        text: "I promise to show up for you — not just for the loud celebrations, but especially when the world is quiet and heavy."
      },
      {
        id: "promise-3",
        title: "Clause III — Secret Vault Protection",
        text: "I promise to guard our secrets, late-night confessions, and embarrassing memories under strict perpetual confidentiality."
      },
      {
        id: "promise-4",
        title: "Clause IV — Fierce Loyalty",
        text: "I promise to defend you in any room you aren't in, and always remind you of your worth when you momentarily forget."
      },
      {
        id: "promise-5",
        title: "Clause V — The Last Slice Protocol",
        text: "I promise to split the last slice of pizza, the last dessert, or at least give you fair bidding rights without hard feelings."
      }
    ],
    signPlaceholder: "Type your full name to sign...",
    signButtonText: "Ratify & Seal Agreement",
    verifiedTitle: "Agreement Ratified & Legally Binding",
    verifiedText: "The archives have recorded your signature into the eternal friendship ledger.",
    nextButtonText: "Reveal The Grand Finale →"
  },

  // 8. STAGE 6 — FINAL SURPRISE
  final: {
    roomNumber: "GRAND FINALE",
    roomLabel: "PERMANENT COLLECTION",
    heading: "To Every Chapter Yet To Come",
    subheading: "Thank you for making the world a warmer, kinder place just by being in it.",
    imagePath: "assets/images/celebration_memory.svg",
    imageCaption: "Exhibit #07 · The Unbreakable Bond",
    message: "Some friendships are measured in years, but the best ones are measured in how safe you feel being entirely yourself. Here's to everything we've survived, everything we've built, and all the unwritten memories waiting around the corner.",
    toast: "Cheers to our eternal bond ✨",
    replayButtonText: "Relive The Museum Journey ↻"
  },

  // 9. AUDIO SETTINGS
  audio: {
    filePath: "assets/audio/friendship_theme.mp3",
    defaultVolume: 0.45,
    enableChimeFallback: true // Synthesizes a soothing ambient chord if audio file is unavailable or blocked
  }
};

// Freeze configuration to prevent accidental mutations at runtime
Object.freeze(CONFIG);
