"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Sparkles, Gift } from "lucide-react";
import { birthdayData } from "@/data/birthday";

interface BirthdayIntroProps {
  onOpen: () => void;
  onInteract: () => void;
}

export function BirthdayIntro({ onOpen, onInteract }: BirthdayIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpenCard = () => {
    onInteract();

    if (!containerRef.current) {
      onOpen();
      return;
    }

    // Cinematic GSAP veil lift transition
    const tl = gsap.timeline({
      onComplete: () => {
        onOpen();
      },
    });

    tl.to(buttonRef.current, {
      scale: 0.92,
      opacity: 0.5,
      duration: 0.15,
      ease: "power2.inOut",
    })
      .to(buttonRef.current, {
        scale: 1.15,
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.4,
        ease: "back.out(2)",
      })
      .to(
        containerRef.current,
        {
          opacity: 0,
          scale: 1.06,
          filter: "blur(20px)",
          duration: 0.8,
          ease: "power3.inOut",
        },
        "-=0.2"
      );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center px-4 sm:px-6 select-none bg-[#07070e]/95 backdrop-blur-2xl"
    >
      {/* Decorative center orb glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-purple-600/25 via-pink-600/20 to-orange-500/20 blur-[100px] pointer-events-none animate-pulse-glow" />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center">
        {/* Floating icon badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/15 backdrop-blur-xl shadow-2xl shadow-purple-950/60 group">
            <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
            <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-yellow-300 animate-bounce" />
          </div>
        </motion.div>

        {/* Salutation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4"
        >
          <span className="text-gradient-purple-pink">
            {birthdayData.intro.salutation}
          </span>
        </motion.h1>

        {/* Mystery Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-slate-300 font-medium max-w-md mx-auto mb-10 leading-relaxed"
        >
          {birthdayData.intro.mysteryLine}
        </motion.p>

        {/* Interactive CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full sm:w-auto"
        >
          <button
            ref={buttonRef}
            onClick={handleOpenCard}
            type="button"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-4.5 rounded-2xl text-base sm:text-lg font-bold text-white transition-all duration-300 overflow-hidden cursor-pointer"
          >
            {/* Pulsing gradient background */}
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 transition-all duration-300 group-hover:opacity-95 group-active:scale-95" />
            
            {/* Outer Glow */}
            <span className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

            {/* Shimmer sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent ease-out" />

            {/* Content */}
            <span className="relative flex items-center gap-2 tracking-wide drop-shadow-md">
              <span>{birthdayData.intro.ctaButton}</span>
            </span>
          </button>
        </motion.div>

        {/* Subtle touch hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-6 text-xs text-slate-400 tracking-wider uppercase font-mono"
        >
          Tap to unveil
        </motion.p>
      </div>
    </div>
  );
}
