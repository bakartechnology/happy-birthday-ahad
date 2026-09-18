"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Sparkles, Heart, ChevronDown } from "lucide-react";
import { birthdayData } from "@/data/birthday";
import { fireCelebrationConfetti } from "@/lib/confetti";

interface BirthdayHeroProps {
  onScrollToExplore: () => void;
}

export function BirthdayHero({ onScrollToExplore }: BirthdayHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Immediate celebratory confetti burst upon entrance
    const timer = setTimeout(() => {
      fireCelebrationConfetti();
    }, 400);

    // Subtle GSAP entrance for hero elements
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { scale: 0.85, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "elastic.out(1, 0.75)" }
      );
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-16 pb-12 overflow-hidden"
    >
      {/* Decorative Floating Balloons/Orbs */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [-4, 4, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 left-4 sm:left-12 opacity-70 pointer-events-none hidden sm:block"
      >
        <div className="text-4xl sm:text-5xl filter drop-shadow-[0_10px_20px_rgba(236,72,153,0.4)]">
          🎈
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [10, -12, 10], rotate: [4, -4, 4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-20 right-4 sm:right-14 opacity-70 pointer-events-none hidden sm:block"
      >
        <div className="text-4xl sm:text-5xl filter drop-shadow-[0_10px_20px_rgba(168,85,247,0.4)]">
          ✨
        </div>
      </motion.div>

      {/* Exact Time Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill mb-6 text-xs sm:text-sm font-semibold tracking-wider text-pink-300 uppercase shadow-lg shadow-pink-950/30"
      >
        <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
        <span>{birthdayData.hero.badge}</span>
      </motion.div>

      {/* Main Headline */}
      <div className="max-w-4xl mx-auto mb-6">
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] text-white"
        >
          <span className="block text-gradient-silver mb-2">
            IT&apos;S YOUR DAY,
          </span>
          <span className="block text-gradient-purple-pink drop-shadow-2xl">
            {birthdayData.recipient.name.toUpperCase()}! 🎉
          </span>
        </h1>
      </div>

      {/* Subheadline & Senders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-2xl mx-auto space-y-4 mb-10"
      >
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-200/90 tracking-wide flex items-center justify-center gap-2">
          <span>{birthdayData.hero.subheadline}</span>
        </p>

        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl glass-panel text-sm sm:text-base font-medium text-slate-300">
          <span>From</span>
          <strong className="text-white font-semibold flex items-center gap-1.5">
            <span>{birthdayData.senders.formattedNames}</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          </strong>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto pt-2 leading-relaxed">
          {birthdayData.hero.description}
        </p>
      </motion.div>

      {/* Interactive Trigger Confetti Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <button
          onClick={() => fireCelebrationConfetti()}
          type="button"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-purple-900/20 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>Shower More Confetti! 🎊</span>
        </button>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={onScrollToExplore}
      >
        <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors duration-200">
          <span className="text-[11px] uppercase tracking-widest font-mono">Scroll for surprises</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
