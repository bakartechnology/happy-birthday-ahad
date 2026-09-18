export interface FriendMessage {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  accentColor: string;
  envelopeEmoji: string;
  message: string;
  subNote: string;
}

export interface Joke {
  id: number;
  setup: string;
  punchline: string;
  emoji: string;
}

export interface MemoryVideo {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  tag: string;
  date: string;
  emoji: string;
}

export interface BirthdayData {
  recipient: {
    name: string;
    nickname: string;
    date: string;
    formattedDate: string;
    time: string;
    tagline: string;
  };
  senders: {
    names: string[];
    formattedNames: string;
    groupTitle: string;
  };
  intro: {
    salutation: string;
    mysteryLine: string;
    ctaButton: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    description: string;
  };
  jokes: Joke[];
  friendshipLetter: {
    badge: string;
    title: string;
    senderLine: string;
    paragraphs: string[];
    signoff: string;
  };
  memories: {
    badge: string;
    title: string;
    subtitle: string;
    videos: MemoryVideo[];
  };
  cake: {
    badge: string;
    title: string;
    subtitle: string;
    wishButton: string;
    wishedTitle: string;
    wishedSubtitle: string;
    nextSurpriseButton: string;
  };
  friendMessages: FriendMessage[];
  finalCelebration: {
    badge: string;
    title: string;
    subheading: string;
    dateBadge: string;
    actionRestart: string;
    actionShare: string;
  };
}

export const birthdayData: BirthdayData = {
  recipient: {
    name: "Ahad",
    nickname: "Bhai",
    date: "19 September",
    formattedDate: "19 • SEPTEMBER",
    time: "12:00 AM",
    tagline: "The Legend Was Born",
  },
  senders: {
    names: ["Shahzaman", "Abubakar", "Araiz"],
    formattedNames: "Shahzaman, Abubakar & Araiz",
    groupTitle: "From Your Three Idiots ❤️",
  },
  intro: {
    salutation: "Hey Ahad...",
    mysteryLine: "Someone has something very important to tell you 👀",
    ctaButton: "Open Your Birthday Card 🎁",
  },
  hero: {
    badge: "12:00 AM • 19 SEPTEMBER ⏰",
    headline: "IT'S YOUR DAY, AHAD! 🎉",
    subheadline: "Happy Birthday! 🎂",
    description: "Welcome to your official birthday universe. Crafted with 0% budget and 1000% pure brotherly love.",
  },
  jokes: [
    {
      id: 1,
      setup: "Ahad, congratulations! 🎉",
      punchline: "You have successfully survived another year of life on this chaotic planet.",
      emoji: "🏆",
    },
    {
      id: 2,
      setup: "Don't worry about getting older...",
      punchline: "Age is just a number. A VERY suspiciously increasing number. 😂",
      emoji: "📈",
    },
    {
      id: 3,
      setup: "We genuinely wanted to buy you something expensive...",
      punchline: "Then we remembered we're your best friends. 😭😂",
      emoji: "💸",
    },
    {
      id: 4,
      setup: "The Golden Friendship Formula:",
      punchline: "Three friends + One birthday + Zero budget = Perfect combination! 🤝😂",
      emoji: "🧮",
    },
    {
      id: 5,
      setup: "A quick scientific study reveals:",
      punchline: "Birthdays are statistically proven to be great for you. People who have the most live the longest! 🧠✨",
      emoji: "🔬",
    },
    {
      id: 6,
      setup: "Happy Birthday to someone who is smart, funny & legendary...",
      punchline: "...and reminds us three surprisingly a lot of ourselves! 😉🔥",
      emoji: "👑",
    },
  ],
  friendshipLetter: {
    badge: "Straight From The Heart",
    title: "From Your Three Idiots ❤️",
    senderLine: "Shahzaman • Abubakar • Araiz",
    paragraphs: [
      "Ahad, jokes aside...",
      "We're genuinely so grateful and happy to have you as a friend in our lives.",
      "May this year bring you abundant happiness, breakthrough success, unforgettable adventures, and obviously...",
      "A lot less unnecessary drama! 😂❤️",
      "Keep smiling, keep elevating, and keep being the solid, dependable brother you are.",
    ],
    signoff: "Happy Birthday, bro! Always got your back. 🎂✨",
  },
  memories: {
    badge: "Cinema of Memories 🎬",
    title: "Golden Moments With The Boys ✨",
    subtitle: "Real evidence that we actually hang out and survive each other's chaotic energy 😂",
    videos: [
      {
        id: "bike-ride",
        src: "/videos/memory-bike-ride.mp4",
        title: "The Ride of Legends 🛵💨",
        subtitle: "Bike pe load zyada, dimagh kam, aur yaari full! 😂",
        tag: "On The Road",
        date: "Memory Reel #1",
        emoji: "🔥",
      },
      {
        id: "hangout",
        src: "/videos/memory-hangout.mp4",
        title: "Food, Chaos & Laughs 🍔🍕",
        subtitle: "Khaana peena aur Ahad se treat mangna is a permanent mood! 🤝",
        tag: "Hangout Vibes",
        date: "Memory Reel #2",
        emoji: "🍟",
      },
    ],
  },
  cake: {
    badge: "Interactive Ritual",
    title: "The Virtual Cake Ceremony 🎂",
    subtitle: "Make a wish, take a deep breath, and blow out the candles!",
    wishButton: "Make a Wish ✨",
    wishedTitle: "Wish Sent to the Universe! ✨",
    wishedSubtitle: "Now don't tell us what you wished for... or it won't come true 👀",
    nextSurpriseButton: "Open Friendship Letters 💌",
  },
  friendMessages: [
    {
      id: "shahzaman",
      name: "Shahzaman",
      role: "The Mastermind",
      avatarColor: "from-purple-500 to-indigo-600",
      accentColor: "rgba(168, 85, 247, 0.4)",
      envelopeEmoji: "👑",
      message: "Happy Birthday Ahad! 🎂 Stay happy, stay successful, and bhai party pending hai. 😂❤️",
      subNote: "Treat kab de rahe ho? 🍔🍕",
    },
    {
      id: "abubakar",
      name: "Abubakar",
      role: "The Co-Conspirator",
      avatarColor: "from-pink-500 to-rose-600",
      accentColor: "rgba(244, 63, 94, 0.4)",
      envelopeEmoji: "🎁",
      message: "Happy Birthday bro! 🎉 May your life be full of success, happiness and good memories. Aur cake mein mera share bhoolna mat. 😂",
      subNote: "50% slice is mine, legally. 🍰",
    },
    {
      id: "araiz",
      name: "Araiz",
      role: "The Finisher",
      avatarColor: "from-amber-400 to-orange-500",
      accentColor: "rgba(249, 115, 22, 0.4)",
      envelopeEmoji: "🚀",
      message: "Happy Birthday Ahad! ❤️ Have an amazing year ahead. Enjoy your day... and yes, party ka intezar rahega. 😂🎂",
      subNote: "Location send karo jaldi. 📍",
    },
  ],
  finalCelebration: {
    badge: "19 SEPTEMBER • MIDNIGHT",
    title: "Happy Birthday, Ahad! 🎂🎉",
    subheading: "With lots of love from Shahzaman, Abubakar & Araiz ❤️",
    dateBadge: "19 • SEPTEMBER",
    actionRestart: "Celebrate Again 🎉",
    actionShare: "Share The Joy 📲",
  },
};
