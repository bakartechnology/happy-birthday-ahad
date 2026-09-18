"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Share2, RotateCcw, Check } from "lucide-react";
import { birthdayData } from "@/data/birthday";
import { fireCelebrationConfetti } from "@/lib/confetti";

interface FinalCelebrationProps {
  onRestartCelebration: () => void;
  onPlayFanfare: () => void;
}

export function FinalCelebration({
  onRestartCelebration,
  onPlayFanfare,
}: FinalCelebrationProps) {
  const [copied, setCopied] = useState(false);
  const [heartCount, setHeartCount] = useState(7);
  const finalData = birthdayData.finalCelebration;

  const handleCelebrateAgain = () => {
    onPlayFanfare();
    fireCelebrationConfetti();
    onRestartCelebration();
  };

  const handleShare = async () => {
    const shareData = {
      title: "Happy Birthday Ahad 🎂",
      text: "A special birthday card for Ahad from Shahzaman, Abubakar & Araiz ❤️",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to copy
      }
    }

    if (typeof window !== "undefined") {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(window.location.href);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = window.location.href;
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback
      }
    }
  };

  const handleHeartClick = () => {
    setHeartCount((prev) => prev + 1);
    fireCelebrationConfetti();
  };

  return (
    <footer className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Decorative center halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-72 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-500/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Date Pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-pill mb-8 text-xs sm:text-sm font-bold tracking-widest uppercase text-pink-300 shadow-xl"
      >
        <Sparkles className="w-4 h-4 text-yellow-300" />
        <span>{finalData.dateBadge}</span>
      </motion.div>

      {/* Grand Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight mb-6"
      >
        <span className="block text-gradient-purple-pink">
          {finalData.title}
        </span>
      </motion.h2>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="text-lg sm:text-2xl font-bold text-slate-200 mb-10 max-w-xl mx-auto leading-relaxed"
      >
        {finalData.subheading}
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
      >
        {/* Celebrate Again CTA */}
        <button
          onClick={handleCelebrateAgain}
          type="button"
          className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 text-white font-bold text-base sm:text-lg shadow-2xl shadow-pink-900/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform duration-500" />
          <span>{finalData.actionRestart}</span>
        </button>

        {/* Share Link */}
        <button
          onClick={handleShare}
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-semibold text-base transition-all active:scale-95 cursor-pointer backdrop-blur-xl"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300">Link Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Share2 className="w-5 h-5 text-pink-400" />
              <span>{finalData.actionShare}</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Interactive Love Counter */}
      <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-panel text-xs sm:text-sm font-medium text-slate-300">
        <span>Tap to send love to Ahad:</span>
        <button
          onClick={handleHeartClick}
          type="button"
          aria-label="Send love heart"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 active:scale-90 transition-all cursor-pointer"
        >
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <span>{heartCount}</span>
        </button>
      </div>

      {/* Signoff watermark */}
      <div className="mt-16 pt-8 border-t border-white/5 text-xs text-slate-400">
        <p>
          Handcrafted with immense brotherhood by{" "}
          <span className="text-slate-300 font-semibold">Shahzaman</span>,{" "}
          <span className="text-slate-300 font-semibold">Abubakar</span> &{" "}
          <span className="text-slate-300 font-semibold">Araiz</span> ❤️
        </p>
        <p className="mt-1 text-slate-400 font-mono">
          Strictly sent at 12:00 AM • 19 September
        </p>
      </div>
    </footer>
  );
}
