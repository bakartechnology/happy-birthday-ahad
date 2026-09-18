"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wind, Gift, CheckCircle2 } from "lucide-react";
import { birthdayData } from "@/data/birthday";
import { fireWishConfetti } from "@/lib/confetti";

interface BirthdayCakeProps {
  onPlayCandleBlow: () => void;
  onScrollToSurprise: () => void;
}

export function BirthdayCake({ onPlayCandleBlow, onScrollToSurprise }: BirthdayCakeProps) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const cake = birthdayData.cake;

  const handleMakeWish = () => {
    if (!candlesLit) return;

    onPlayCandleBlow();
    setCandlesLit(false);

    // Confetti shower for wish
    setTimeout(() => {
      fireWishConfetti();
      setWishMade(true);
    }, 400);
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWishMade(false);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-3xl mx-auto text-center">
      {/* Glow highlight */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[480px] h-80 rounded-full transition-all duration-1000 blur-[130px] pointer-events-none ${
          candlesLit
            ? "bg-amber-500/20"
            : "bg-gradient-to-r from-pink-500/30 to-purple-600/30 scale-125"
        }`}
      />

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-amber-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{cake.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {cake.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-md mx-auto">
          {cake.subtitle}
        </p>
      </div>

      {/* Virtual Cake Stage */}
      <div className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl flex flex-col items-center justify-center">
        {/* Cake Container with motion */}
        <motion.div
          animate={
            wishMade
              ? { scale: [1, 1.08, 1], y: [0, -8, 0] }
              : { y: [0, -4, 0] }
          }
          transition={{ duration: 4, repeat: wishMade ? 0 : Infinity, ease: "easeInOut" }}
          className="relative my-4 flex flex-col items-center"
        >
          {/* Candles Flame Area */}
          <div className="flex items-end justify-center gap-6 sm:gap-8 mb-1">
            {[1, 2, 3].map((candleIndex) => (
              <div key={candleIndex} className="flex flex-col items-center">
                {/* Flame or Extinguished Smoke */}
                <div className="h-9 flex items-end justify-center">
                  <AnimatePresence mode="wait">
                    {candlesLit ? (
                      <motion.div
                        key="flame"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="animate-candle-flame"
                      >
                        {/* Flame Teardrop SVG */}
                        <div className="w-4 h-7 sm:w-5 sm:h-8 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-100 shadow-[0_0_20px_#f59e0b]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0, y: 0, scale: 0.5 }}
                        animate={{ opacity: [0.7, 0.4, 0], y: -24, scale: 1.5 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="text-xs text-slate-400 font-mono"
                      >
                        💨
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Candle Wick */}
                <div className="w-0.5 h-2.5 bg-slate-400" />

                {/* Candle Stick */}
                <div
                  className={`w-3.5 sm:w-4 h-12 rounded-t-sm bg-gradient-to-b ${
                    candleIndex === 1
                      ? "from-purple-400 to-purple-600"
                      : candleIndex === 2
                      ? "from-pink-400 to-pink-600"
                      : "from-amber-400 to-amber-600"
                  } shadow-md`}
                />
              </div>
            ))}
          </div>

          {/* Cake Top Tier */}
          <div className="relative w-44 sm:w-56 h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 shadow-xl border-t-2 border-white/40 flex items-center justify-center overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute top-0 inset-x-0 flex justify-around opacity-40">
              <span className="w-4 h-3 bg-white rounded-b-full" />
              <span className="w-5 h-4 bg-white rounded-b-full" />
              <span className="w-4 h-2 bg-white rounded-b-full" />
              <span className="w-6 h-5 bg-white rounded-b-full" />
              <span className="w-4 h-3 bg-white rounded-b-full" />
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-white/90 uppercase drop-shadow">
              AHAD • 19 SEP
            </span>
          </div>

          {/* Cake Base Tier */}
          <div className="relative w-60 sm:w-72 h-18 sm:h-20 rounded-2xl bg-gradient-to-r from-purple-800 via-fuchsia-900 to-purple-800 -mt-2 shadow-2xl border-t-2 border-white/20 flex items-center justify-around px-4">
            <span className="text-xl">🍓</span>
            <span className="text-xl">✨</span>
            <span className="text-xl">🍫</span>
            <span className="text-xl">✨</span>
            <span className="text-xl">🍓</span>
          </div>

          {/* Cake Plate Stand */}
          <div className="w-68 sm:w-80 h-3 rounded-full bg-slate-300/40 -mt-1 shadow-2xl border border-white/30" />
        </motion.div>

        {/* Interaction Area */}
        <div className="mt-8 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!wishMade ? (
              <motion.div
                key="make-wish-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-3"
              >
                <button
                  onClick={handleMakeWish}
                  type="button"
                  className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white text-base sm:text-lg bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 shadow-xl shadow-orange-950/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <Wind className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>{cake.wishButton}</span>
                </button>
                <p className="text-xs text-slate-400">
                  Tap to blow out the candles and make your secret wish!
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="wished-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-lg sm:text-xl">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>{cake.wishedTitle}</span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base max-w-sm">
                  {cake.wishedSubtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={onScrollToSurprise}
                    type="button"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-pink-950/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Gift className="w-4 h-4" />
                    <span>{cake.nextSurpriseButton}</span>
                  </button>

                  <button
                    onClick={handleRelight}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
                  >
                    <span>🕯️ Re-light candles</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
