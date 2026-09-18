"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laugh, Shuffle, Flame } from "lucide-react";
import { birthdayData } from "@/data/birthday";
import { fireSparkleMicroBurst } from "@/lib/confetti";

interface JokeSectionProps {
  onPlayPop: () => void;
}

export function JokeSection({ onPlayPop }: JokeSectionProps) {
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [reactions, setReactions] = useState<{ [key: number]: { lol: number; dead: number } }>({});

  const jokes = birthdayData.jokes;
  const currentJoke = jokes[currentJokeIndex];

  const handleNextJoke = () => {
    onPlayPop();
    fireSparkleMicroBurst(0.5, 0.4);
    setCurrentJokeIndex((prev) => (prev + 1) % jokes.length);
  };

  const handleReaction = (type: "lol" | "dead") => {
    onPlayPop();
    setReactions((prev) => {
      const current = prev[currentJokeIndex] || { lol: 0, dead: 0 };
      return {
        ...prev,
        [currentJokeIndex]: {
          ...current,
          [type]: current[type] + 1,
        },
      };
    });
  };

  const currentCount = reactions[currentJokeIndex] || { lol: 4, dead: 2 };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-purple-300 mb-3">
          <Laugh className="w-3.5 h-3.5 text-pink-400" />
          <span>The Roast & Banter Corner</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Surviving Another Year 😂
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          Real friendship is built on 10% love and 90% harmless emotional damage.
        </p>
      </div>

      {/* Interactive Joke Deck Card */}
      <div className="relative">
        {/* Glow backdrop behind joke card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-amber-500/30 rounded-3xl blur-xl opacity-75" />

        <div className="relative glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl min-h-[300px] flex flex-col justify-between overflow-hidden">
          {/* Top card bar: index indicator & badge */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <span className="text-xs font-mono font-medium tracking-wider text-slate-400 uppercase">
              Truth #{currentJoke.id} of {jokes.length}
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-medium text-pink-300">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>100% Certified Fact</span>
            </div>
          </div>

          {/* Animated Joke Content */}
          <div className="relative my-auto py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentJoke.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="text-3xl sm:text-4xl filter drop-shadow-md">
                  {currentJoke.emoji}
                </div>

                <p className="text-lg sm:text-xl font-semibold text-slate-200 leading-snug">
                  {currentJoke.setup}
                </p>

                <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gradient-purple-pink leading-snug">
                  {currentJoke.punchline}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Controls: Next joke & quick reactions */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            {/* Reaction Pill Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => handleReaction("lol")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer"
              >
                <span>😂</span>
                <span>{currentCount.lol}</span>
              </button>
              <button
                type="button"
                onClick={() => handleReaction("dead")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer"
              >
                <span>💀</span>
                <span>{currentCount.dead}</span>
              </button>
            </div>

            {/* Next Joke Trigger Button */}
            <button
              onClick={handleNextJoke}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm shadow-lg shadow-pink-900/30 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              <span>Tap for another joke 😂</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
