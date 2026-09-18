"use client";

import React, { useMemo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function BackgroundAmbience() {
  const prefersReduced = useReducedMotion();

  // Generate deterministic stars to avoid SSR hydration mismatch
  const stars = useMemo(() => {
    const starList = [];
    for (let i = 0; i < 40; i++) {
      // Deterministic pseudo-random based on index
      const top = ((i * 37 + 13) % 98) + 1;
      const left = ((i * 47 + 29) % 98) + 1;
      const size = (i % 3) + 1;
      const opacity = (((i * 19) % 6) + 4) / 10;
      const delay = (i % 5) * 0.8;
      starList.push({ top, left, size, opacity, delay });
    }
    return starList;
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Deep atmospheric backdrop */}
      <div className="absolute inset-0 bg-[#07070e]" />

      {/* Large Glowing Ambient Orbs */}
      <div
        className={`absolute -top-40 -left-40 w-96 h-96 md:w-[600px] md:h-[600px] rounded-full bg-purple-700/20 blur-[130px] ${
          prefersReduced ? "" : "animate-pulse-glow"
        }`}
      />
      <div
        className={`absolute top-1/3 -right-32 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full bg-pink-600/15 blur-[140px] ${
          prefersReduced ? "" : "animate-pulse-glow"
        }`}
        style={{ animationDelay: "2s" }}
      />
      <div
        className={`absolute -bottom-32 left-1/4 w-96 h-96 md:w-[550px] md:h-[550px] rounded-full bg-orange-600/15 blur-[150px] ${
          prefersReduced ? "" : "animate-pulse-glow"
        }`}
        style={{ animationDelay: "4s" }}
      />
      <div className="absolute top-2/3 left-10 w-72 h-72 rounded-full bg-fuchsia-600/10 blur-[120px]" />

      {/* Subtle Starfield */}
      {stars.map((star, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bg-white transition-opacity"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: star.size > 2 ? "0 0 6px rgba(255, 255, 255, 0.8)" : "none",
            animation: prefersReduced
              ? "none"
              : `pulseGlow ${3 + (idx % 4)}s ease-in-out infinite ${star.delay}s`,
          }}
        />
      ))}

      {/* Subtle noise grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
