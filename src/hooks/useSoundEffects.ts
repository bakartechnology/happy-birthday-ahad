"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useSoundEffects() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize or resume AudioContext on interaction
  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;

    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    return audioCtxRef.current;
  }, []);

  // Subtle safe vibration
  const triggerHaptic = useCallback((pattern: number | number[] = 15) => {
    if (typeof window !== "undefined" && "navigator" in window && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Ignore devices with restricted vibration permissions
      }
    }
  }, []);

  // Dreamy pop sound
  const playPop = useCallback(() => {
    triggerHaptic(20);
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio fallback silent
    }
  }, [getAudioContext, soundEnabled, triggerHaptic]);

  // Candle blowing out wind / whoosh effect
  const playCandleBlow = useCallback(() => {
    triggerHaptic([30, 40, 50]);
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // Pink-ish noise buffer
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        data[i] = (b0 + b1 + b2 + b3 + white * 0.5362) * 0.08;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.4);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Fallback
    }
  }, [getAudioContext, soundEnabled, triggerHaptic]);

  // Card flip / tactile click
  const playCardFlip = useCallback(() => {
    triggerHaptic(12);
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Fallback
    }
  }, [getAudioContext, soundEnabled, triggerHaptic]);

  // Celebratory harp / chord fanfare
  const playFanfare = useCallback(() => {
    triggerHaptic([30, 20, 60]);
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // Pentatonic celebratory notes (C5, E5, G5, B5, C6)
      const frequencies = [523.25, 659.25, 783.99, 987.77, 1046.5];
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.65);
      });
    } catch {
      // Fallback
    }
  }, [getAudioContext, soundEnabled, triggerHaptic]);

  // Ambient gentle melody loop synthesizer
  const melodyLoopTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!soundEnabled) {
      if (melodyLoopTimerRef.current) clearInterval(melodyLoopTimerRef.current);
      return;
    }

    const chords = [
      [523.25, 659.25, 783.99], // C major
      [440.0, 523.25, 659.25],  // A minor
      [349.23, 440.0, 523.25],  // F major
      [392.0, 493.88, 587.33],  // G major
    ];

    let chordIndex = 0;

    const playAmbientChord = () => {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const chord = chords[chordIndex % chords.length];
        chordIndex++;

        chord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.02, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 2.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 2.9);
        });
      } catch {
        // ignore
      }
    };

    playAmbientChord();
    melodyLoopTimerRef.current = setInterval(playAmbientChord, 3000);

    return () => {
      if (melodyLoopTimerRef.current) clearInterval(melodyLoopTimerRef.current);
    };
  }, [soundEnabled, getAudioContext]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        getAudioContext();
      }
      return next;
    });
  }, [getAudioContext]);

  return {
    soundEnabled,
    toggleSound,
    playPop,
    playCandleBlow,
    playCardFlip,
    playFanfare,
    triggerHaptic,
  };
}
