import confetti from "canvas-confetti";

export const celebratoryColors = [
  "#a855f7", // Electric purple
  "#ec4899", // Vibrant pink
  "#f97316", // Warm coral
  "#e879f9", // Soft lavender
  "#fbbf24", // Golden yellow
  "#38bdf8", // Sky blue
  "#ffffff", // Crisp white
];

/**
 * Trigger a celebratory confetti cannon burst from bottom corners
 */
export function fireCelebrationConfetti() {
  if (typeof window === "undefined") return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: celebratoryColors,
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

/**
 * Gentle shower of stars and sparkles for birthday wish
 */
export function fireWishConfetti() {
  if (typeof window === "undefined") return;

  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#fbbf24", "#f43f5e", "#a855f7", "#ffffff", "#38bdf8"],
    shapes: ["star", "circle"],
    scalar: 1.1,
    ticks: 200,
    gravity: 0.8,
  });
}

/**
 * Small micro-burst for interactive buttons/cards
 */
export function fireSparkleMicroBurst(x = 0.5, y = 0.5) {
  if (typeof window === "undefined") return;

  confetti({
    particleCount: 30,
    spread: 45,
    origin: { x, y },
    colors: ["#ec4899", "#a855f7", "#fbbf24"],
    scalar: 0.7,
    ticks: 120,
    gravity: 1.2,
  });
}
