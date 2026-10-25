/**
 * ROMANTIC SURPRISE WEBSITE — CONFIGURATION FILE
 * 
 * Personalize your entire website from this single file.
 * All changes here instantly update the experience without touching any HTML/CSS/JS logic.
 */

const CONFIG = {
  // 1. PARTICIPANT DETAILS
  friendName: "My Favorite Person",
  senderName: "With All My Love",

  // 2. RELATIONSHIP DURATION & START DATE
  // Explicit number of days (e.g. 940). If set to null, it will be calculated from friendshipStartDate.
  friendshipDays: 940,

  // Format: "YYYY-MM-DD". Used to compute days, years, weekends, and seasons when friendshipDays is null.
  // Replace this date with the actual date your relationship began!
  friendshipStartDate: "2024-03-29",

  // 3. STAGE 1 — CINEMATIC WELCOME
  welcome: {
    badge: "FOR YOU, MY LOVE · ROOM 01",
    title: "Every Little Piece of Us",
    subtitle: "A little world created just for you — to celebrate our story, the laughs we share, the quiet comfort of your hand in mine, and every memory that made me fall for you.",
    doorPlaque: "OUR LOVE STORY · ENTER",
    enterButtonText: "Step Inside Our Story →",
    hintText: "Click the doors or the button above to step inside"
  },

  // 4. STAGE 2 — ROOM 2: OUR STORY TIMELINE
  timeline: {
    roomNumber: "ROOM 02",
    roomLabel: "OUR STORY",
    heading: "Every Single Day With You Matters",
    personalNote: "Out of all the people in the world, having you by my side and being able to love you is the easiest, most beautiful thing I've ever done.",
    statsLabels: {
      days: "Days of Loving You",
      years: "Years by Your Side",
      weekends: "Weekends Together",
      seasons: "Seasons Hand in Hand",
      conversations: "Late-Night Talks & Sweet Moments"
    },
    // Number of late-night chats/conversations
    lateNightChats: 380,
    nextButtonText: "Explore Our Memories →"
  },

  // 5. STAGE 3 — ROOM 4: PHOTO MEMORY PUZZLE
  puzzle: {
    roomNumber: "ROOM 04",
    roomLabel: "OUR MOMENTS",
    heading: "Piece Together Our Memory",
    instructions: "Click or tap two tiles to swap their positions until this special memory of us is fully restored. Use the Hint button if you need a peek!",
    imagePath: "assets/images/puzzle_memory.svg",
    gridSize: 3, // 3x3 = 9 tiles
    solvedHeading: "Memory Reconstructed! 💕",
    solvedMessage: "Every piece of our story fits together just right. I have a little letter waiting for you in the next room...",
    nextButtonText: "Read My Letter to You →"
  },

  // 6. STAGE 4 — ROOM 6: LOVE LETTER
  letter: {
    roomNumber: "ROOM 06",
    roomLabel: "FROM MY HEART",
    heading: "A Letter Just For You",
    instruction: "Tap the wax seal to open my letter",
    salutation: "My Love,",
    date: "A Moment For Us",
    paragraphs: [
      "If someone had told me back when we first met how much you would mean to me today. The world moves so fast, seasons change, and life gets busy, but having you in my life has been the safest, happiest constant I could ever ask for.i am grareful at god for thid priceless gift of my life",
      "Thank you for being my favourite person to talk to, my favourite laugh to hear, and the first person I want to turn to my future wife. Thank you for the support,encouragement, which you provided me at that time when nobody with me. and for all the times we have laughed until our stomachs hurt over the silliest things.",
      "You inspire me every day with your kindness, your resilience, and the gentle warmth you bring only for me. Being able to love you, hold your hand, and watch you smile is something I cherish more than words can say.",
      "No matter where life takes us next or what each new day brings, I'm right here beside you. You have my whole heart, my quiet support, and my love, always."
    ],
    closing: "With all my love,",
    signature: "Yours, Always",
    nextButtonText: "Our Promises to Each Other →"
  },

  // 7. STAGE 5 — ROOM 7: ROMANTIC PROMISES
  promises: {
    roomNumber: "ROOM 07",
    roomLabel: "OUR PROMISES",
    heading: "Promises From My Heart",
    subheading: "A relationship is built on the little choices we make every day. Here are five promises I make to you — check each one, then sign below to seal them together.",
    list: [
      {
        id: "promise-1",
        title: "Promise I — Listening & Open Communication",
        text: "We promise to always listen to each other with an open heart, to talk through things honestly and gently, and to always make sure we feel heard, understood, and safe with each other."
      },
      {
        id: "promise-2",
        title: "Promise II — Making Time For Us",
        text: "We promise to always prioritize our time together — not just when it's easy, but deliberately making time for chat, little talks on call and video calls, and quiet moments just for the two of us."
      },
      {
        id: "promise-3",
        title: "Promise III — Respect & Understanding",
        text: "We promise to respect each other's feelings, thoughts, and boundaries, encouraging each other in our own dreams and loving each other for exactly who we are."
      },
      {
        id: "promise-4",
        title: "Promise IV — Being Your Safe Harbor",
        text: "We promise to stand by each other through difficult and stressful days, offering comfort when life feels heavy and reminding each other of our strength whenever we need it."
      },
      {
        id: "promise-5",
        title: "Promise V — Teamwork & Kindness First",
        text: "We promise that whenever we disagree, we will choose kindness and understanding over pride, remembering that we are on the same team and that our love always comes first."
      }
    ],
    signPlaceholder: "Type your name to seal our promises...",
    signButtonText: "Seal Our Promises With Love 💕",
    verifiedTitle: "Our Promises Sealed & Held Close",
    verifiedText: "Every promise here is held close in my heart, today and for all the days ahead.",
    nextButtonText: "One Last Thing Just For You →"
  },

  // 8. STAGE 6 — FINAL SURPRISE
  final: {
    roomNumber: "OUR STORY",
    roomLabel: "ALWAYS",
    heading: "To Every Chapter Yet To Come",
    subheading: "Thank you for being my girlfriend, my favorite person, and the sweetest part of my life.",
    imagePath: "assets/images/celebration_memory.svg",
    imageCaption: "Exhibit #07 · You & Me, Always",
    message: "Out of all the memories we've made so far, my favourite one will always be the day you came into my life. Thank you for your warmth, your laughs, and the quiet happiness of having you beside me. Here's to us, and to every beautiful memory waiting ahead.",
    toast: "With all my love, today and always 💕",
    replayButtonText: "Experience Our Story Again ↻"
  },

  // 9. AUDIO SETTINGS
  audio: {
    filePath: "assets/audio/my-love-song.mp3",
    defaultVolume: 0.45,
    enableChimeFallback: true // Synthesizes a soothing ambient chord if audio file is unavailable or blocked
  }
};

// Freeze configuration to prevent accidental mutations at runtime
Object.freeze(CONFIG);
