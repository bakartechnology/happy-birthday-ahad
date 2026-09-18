"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Note {
  freq: number;
  time: number;
  duration: number;
  isBass?: boolean;
}

// Full iconic "Happy Birthday To You" song notes
const HAPPY_BIRTHDAY_NOTES: Note[] = [
  // Phrase 1: "Happy Birthday to you"
  { freq: 261.63, time: 0.0, duration: 0.35 }, // C4 - Hap-
  { freq: 261.63, time: 0.4, duration: 0.25 }, // C4 - py
  { freq: 293.66, time: 0.75, duration: 0.5 }, // D4 - birth-
  { freq: 261.63, time: 1.35, duration: 0.5 }, // C4 - day
  { freq: 349.23, time: 1.95, duration: 0.55 }, // F4 - to
  { freq: 329.63, time: 2.6, duration: 1.0 }, // E4 - you
  { freq: 130.81, time: 0.0, duration: 1.8, isBass: true }, // C3 Bass
  { freq: 174.61, time: 1.95, duration: 1.8, isBass: true }, // F3 Bass

  // Phrase 2: "Happy Birthday to you"
  { freq: 261.63, time: 4.0, duration: 0.35 }, // C4 - Hap-
  { freq: 261.63, time: 4.4, duration: 0.25 }, // C4 - py
  { freq: 293.66, time: 4.75, duration: 0.5 }, // D4 - birth-
  { freq: 261.63, time: 5.35, duration: 0.5 }, // C4 - day
  { freq: 392.0, time: 5.95, duration: 0.55 }, // G4 - to
  { freq: 349.23, time: 6.6, duration: 1.1 }, // F4 - you
  { freq: 130.81, time: 4.0, duration: 1.8, isBass: true }, // C3 Bass
  { freq: 196.0, time: 5.95, duration: 1.8, isBass: true }, // G3 Bass

  // Phrase 3: "Happy Birthday dear Ahad"
  { freq: 261.63, time: 8.0, duration: 0.35 }, // C4 - Hap-
  { freq: 261.63, time: 8.4, duration: 0.25 }, // C4 - py
  { freq: 523.25, time: 8.75, duration: 0.55 }, // C5 - birth-
  { freq: 440.0, time: 9.4, duration: 0.55 }, // A4 - day
  { freq: 349.23, time: 10.05, duration: 0.55 }, // F4 - dear
  { freq: 329.63, time: 10.7, duration: 0.55 }, // E4 - A-
  { freq: 293.66, time: 11.35, duration: 1.1 }, // D4 - had!
  { freq: 174.61, time: 8.0, duration: 2.0, isBass: true }, // F3 Bass
  { freq: 220.0, time: 10.05, duration: 2.0, isBass: true }, // A3 Bass

  // Phrase 4: "Happy Birthday to you!"
  { freq: 466.16, time: 12.8, duration: 0.35 }, // Bb4 - Hap-
  { freq: 466.16, time: 13.2, duration: 0.25 }, // Bb4 - py
  { freq: 440.0, time: 13.55, duration: 0.55 }, // A4 - birth-
  { freq: 349.23, time: 14.2, duration: 0.55 }, // F4 - day
  { freq: 392.0, time: 14.85, duration: 0.55 }, // G4 - to
  { freq: 349.23, time: 15.5, duration: 1.6 }, // F4 - you!
  { freq: 233.08, time: 12.8, duration: 1.8, isBass: true }, // Bb3 Bass
  { freq: 174.61, time: 14.85, duration: 2.2, isBass: true }, // F3 Bass
];

const SONG_LOOP_DURATION = 18.5; // seconds per cycle (includes gentle rest)

export function useSoundEffects() {
  // Enabled by default as requested!
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const melodyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeNodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);

  // Safe AudioContext getter
  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;

    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(1, ctx.currentTime);
        masterGain.connect(ctx.destination);

        audioCtxRef.current = ctx;
        masterGainRef.current = masterGain;
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }

    return audioCtxRef.current;
  }, []);

  // Safe Haptic feedback
  const triggerHaptic = useCallback((pattern: number | number[] = 15) => {
    if (typeof window !== "undefined" && "navigator" in window && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Fallback
      }
    }
  }, []);

  // Clear scheduled active oscillators
  const stopAllActiveMusicNodes = useCallback(() => {
    if (melodyTimeoutRef.current) {
      clearTimeout(melodyTimeoutRef.current);
      melodyTimeoutRef.current = null;
    }
    activeNodesRef.current.forEach(({ osc, gain }) => {
      try {
        gain.gain.cancelScheduledValues(0);
        gain.gain.value = 0;
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignore
      }
    });
    activeNodesRef.current = [];
  }, []);

  // Play a single crystalline music-box note
  const playMusicBoxNote = useCallback(
    (ctx: AudioContext, master: GainNode, note: Note, baseStartTime: number) => {
      const startTime = baseStartTime + note.time;
      const stopTime = startTime + note.duration + 0.3;

      if (note.isBass) {
        // Warm soft bass note
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(note.freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.045, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, stopTime);

        osc.connect(gain);
        gain.connect(master);

        osc.start(startTime);
        osc.stop(stopTime);

        activeNodesRef.current.push({ osc, gain });
      } else {
        // Dual-oscillator music-box chime: pure sine + bell octave overtone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(note.freq, startTime);

        // Bell shimmer at double frequency
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(note.freq * 2, startTime);

        // Primary note envelope
        gain1.gain.setValueAtTime(0, startTime);
        gain1.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
        gain1.gain.exponentialRampToValueAtTime(0.0001, stopTime);

        // Shimmer envelope (crisp initial ping)
        gain2.gain.setValueAtTime(0, startTime);
        gain2.gain.linearRampToValueAtTime(0.04, startTime + 0.015);
        gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + note.duration * 0.6);

        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(master);
        gain2.connect(master);

        osc1.start(startTime);
        osc2.start(startTime);
        osc1.stop(stopTime);
        osc2.stop(stopTime);

        activeNodesRef.current.push({ osc: osc1, gain: gain1 });
        activeNodesRef.current.push({ osc: osc2, gain: gain2 });
      }
    },
    []
  );

  const scheduleSongRef = useRef<() => void>(() => {});

  // Play full cycle of "Happy Birthday" melody
  const scheduleHappyBirthdaySong = useCallback(() => {
    const ctx = getAudioContext();
    const master = masterGainRef.current;
    if (!ctx || !master || !soundEnabled) return;

    stopAllActiveMusicNodes();

    const now = ctx.currentTime + 0.1;

    HAPPY_BIRTHDAY_NOTES.forEach((note) => {
      playMusicBoxNote(ctx, master, note, now);
    });

    // Schedule next seamless loop
    melodyTimeoutRef.current = setTimeout(() => {
      scheduleSongRef.current();
    }, SONG_LOOP_DURATION * 1000);
  }, [getAudioContext, playMusicBoxNote, soundEnabled, stopAllActiveMusicNodes]);

  useEffect(() => {
    scheduleSongRef.current = scheduleHappyBirthdaySong;
  }, [scheduleHappyBirthdaySong]);

  // Handle soundEnabled state change
  useEffect(() => {
    if (soundEnabled) {
      // If browser already allows audio context, start immediately
      const ctx = getAudioContext();
      if (ctx && ctx.state === "running") {
        scheduleHappyBirthdaySong();
      }
    } else {
      stopAllActiveMusicNodes();
    }

    return () => {
      stopAllActiveMusicNodes();
    };
  }, [soundEnabled, getAudioContext, scheduleHappyBirthdaySong, stopAllActiveMusicNodes]);

  // Global listener for first user interaction to unlock browser audio policy
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleFirstUserGesture = () => {
      const ctx = getAudioContext();
      if (ctx) {
        if (ctx.state === "suspended") {
          ctx.resume().then(() => {
            if (soundEnabled) {
              scheduleHappyBirthdaySong();
            }
          });
        } else if (soundEnabled) {
          scheduleHappyBirthdaySong();
        }
      }
      // Remove once triggered
      window.removeEventListener("pointerdown", handleFirstUserGesture);
      window.removeEventListener("keydown", handleFirstUserGesture);
    };

    window.addEventListener("pointerdown", handleFirstUserGesture, { once: true });
    window.addEventListener("keydown", handleFirstUserGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstUserGesture);
      window.removeEventListener("keydown", handleFirstUserGesture);
    };
  }, [getAudioContext, scheduleHappyBirthdaySong, soundEnabled]);

  // Toggle button handler
  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        const ctx = getAudioContext();
        if (ctx && ctx.state === "suspended") {
          ctx.resume();
        }
      } else {
        stopAllActiveMusicNodes();
      }
      return next;
    });
  }, [getAudioContext, stopAllActiveMusicNodes]);

  // Dreamy pop sound
  const playPop = useCallback(() => {
    triggerHaptic(20);
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      const master = masterGainRef.current;
      if (!ctx || !master) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(master);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Fallback
    }
  }, [getAudioContext, soundEnabled, triggerHaptic]);

  // Candle blowing out wind/whoosh sound
  const playCandleBlow = useCallback(() => {
    triggerHaptic([30, 40, 50]);
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      const master = masterGainRef.current;
      if (!ctx || !master) return;

      const bufferSize = ctx.sampleRate * 0.45;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        data[i] = (b0 + b1 + b2 + b3 + white * 0.5362) * 0.09;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(950, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.45);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      noise.start();
    } catch {
      // Fallback
    }
  }, [getAudioContext, soundEnabled, triggerHaptic]);

  // Card flip click
  const playCardFlip = useCallback(() => {
    triggerHaptic(14);
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      const master = masterGainRef.current;
      if (!ctx || !master) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(master);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Fallback
    }
  }, [getAudioContext, soundEnabled, triggerHaptic]);

  // Celebratory fanfare harp chime
  const playFanfare = useCallback(() => {
    triggerHaptic([30, 20, 60]);
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      const master = masterGainRef.current;
      if (!ctx || !master) return;

      // Celebrate chords
      const frequencies = [523.25, 659.25, 783.99, 1046.5];
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.setValueAtTime(0.16, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.7);

        osc.connect(gain);
        gain.connect(master);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.75);
      });
    } catch {
      // Fallback
    }
  }, [getAudioContext, soundEnabled, triggerHaptic]);

  return {
    soundEnabled,
    toggleSound,
    playPop,
    playCandleBlow,
    playCardFlip,
    playFanfare,
    triggerHaptic,
    startBirthdayMelody: scheduleHappyBirthdaySong,
  };
}
