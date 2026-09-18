"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Quote } from "lucide-react";
import { birthdayData } from "@/data/birthday";

export function FriendshipMessage() {
  const letter = birthdayData.friendshipLetter;

  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-gradient-to-tr from-purple-700/15 via-pink-700/15 to-rose-700/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Subtle illuminated outer border */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-orange-500/40 rounded-3xl blur-[2px]" />

        <div className="relative glass-panel rounded-3xl p-8 sm:p-12 md:p-14 overflow-hidden">
          {/* Subtle watermarked quote icon in background */}
          <Quote className="absolute -top-4 -right-4 w-32 h-32 sm:w-44 sm:h-44 text-white/[0.03] pointer-events-none rotate-12" />

          {/* Section pill */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-rose-300">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
              <span>{letter.badge}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span>Brotherhood Forever</span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8 space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {letter.title}
            </h2>
            <p className="text-sm sm:text-base font-semibold tracking-widest uppercase text-gradient-purple-pink">
              {letter.senderLine}
            </p>
          </div>

          {/* Emotional Letter Body */}
          <div className="space-y-5 text-slate-200 text-base sm:text-lg md:text-xl font-normal leading-relaxed">
            {letter.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? "font-semibold text-pink-300 text-lg sm:text-xl italic"
                    : idx === 3
                    ? "font-bold text-white text-xl sm:text-2xl text-gradient-gold"
                    : ""
                }
              >
                {p}
              </p>
            ))}
          </div>

          {/* Signoff */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>{letter.signoff}</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Shahzaman, Abubakar & Araiz
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
              <span className="text-xs text-slate-400 font-mono tracking-wider">
                CERTIFIED LIFETIME BOND
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
