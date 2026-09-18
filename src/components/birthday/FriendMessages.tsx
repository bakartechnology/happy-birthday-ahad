"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen } from "lucide-react";
import { birthdayData, FriendMessage } from "@/data/birthday";
import { fireSparkleMicroBurst } from "@/lib/confetti";

interface FriendMessagesProps {
  onPlayCardFlip: () => void;
}

export function FriendMessages({ onPlayCardFlip }: FriendMessagesProps) {
  const [openedCards, setOpenedCards] = useState<{ [id: string]: boolean }>({});

  const toggleCard = (id: string, event: React.MouseEvent) => {
    onPlayCardFlip();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireSparkleMicroBurst(x, y);

    setOpenedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenAll = () => {
    onPlayCardFlip();
    const allOpened: { [id: string]: boolean } = {};
    birthdayData.friendMessages.forEach((f) => {
      allOpened[f.id] = true;
    });
    setOpenedCards(allOpened);
  };

  return (
    <section id="friend-letters" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-pink-300 mb-3">
          <Mail className="w-3.5 h-3.5 text-pink-400" />
          <span>Top Secret Brotherhood Letters</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Personal Messages From The Boys 💌
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl mx-auto">
          Tap each envelope to unlock their individual notes and secret demands.
        </p>

        {/* Quick Open All Button */}
        <div className="mt-4">
          <button
            onClick={handleOpenAll}
            type="button"
            className="text-xs font-medium text-pink-400 hover:text-pink-300 underline underline-offset-4 cursor-pointer"
          >
            Or open all envelopes at once ✨
          </button>
        </div>
      </div>

      {/* Grid of 3 Friend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {birthdayData.friendMessages.map((friend: FriendMessage, index: number) => {
          const isOpen = openedCards[friend.id] || false;

          return (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Outer card glow */}
              <div
                className="absolute -inset-0.5 rounded-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none"
                style={{ background: friend.accentColor }}
              />

              <div
                onClick={(e) => toggleCard(friend.id, e)}
                className="relative glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer min-h-[340px] flex flex-col justify-between select-none"
              >
                {/* Envelope Top Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${friend.avatarColor} flex items-center justify-center text-xl shadow-lg text-white font-bold`}
                    >
                      {friend.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-tight">
                        {friend.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium">
                        {friend.role}
                      </span>
                    </div>
                  </div>

                  <div className="text-2xl filter drop-shadow">
                    {friend.envelopeEmoji}
                  </div>
                </div>

                {/* Body: Sealed Envelope vs Revealed Message */}
                <div className="my-auto py-4">
                  <AnimatePresence mode="wait">
                    {!isOpen ? (
                      <motion.div
                        key="sealed"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col items-center justify-center py-6 text-center space-y-3"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:border-pink-500/40 transition-all duration-300 shadow-inner">
                          <Mail className="w-8 h-8 text-pink-400 animate-pulse" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-200">
                            Letter from {friend.name}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Tap to crack wax seal 🔒
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="revealed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                          <MailOpen className="w-3.5 h-3.5" />
                          <span>Decrypted & Verified</span>
                        </div>

                        <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed italic">
                          &ldquo;{friend.message}&rdquo;
                        </p>

                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-amber-300/90 font-mono">
                          P.S. {friend.subNote}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer status */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono">
                    {isOpen ? "Opened 💌" : "Sealed envelope 🔒"}
                  </span>
                  <span className="text-pink-400 group-hover:translate-x-1 transition-transform font-medium flex items-center gap-1">
                    <span>{isOpen ? "Close" : "Open"}</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
