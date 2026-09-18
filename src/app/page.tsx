"use client";

import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BackgroundAmbience } from "@/components/birthday/BackgroundAmbience";
import { MusicPlayer } from "@/components/birthday/MusicPlayer";
import { BirthdayIntro } from "@/components/birthday/BirthdayIntro";
import { BirthdayHero } from "@/components/birthday/BirthdayHero";
import { JokeSection } from "@/components/birthday/JokeSection";
import { FriendshipMessage } from "@/components/birthday/FriendshipMessage";
import { BirthdayCake } from "@/components/birthday/BirthdayCake";
import { FriendMessages } from "@/components/birthday/FriendMessages";
import { FinalCelebration } from "@/components/birthday/FinalCelebration";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export default function BirthdayPage() {
  const [cardOpened, setCardOpened] = useState(false);
  const jokeSectionRef = useRef<HTMLDivElement>(null);
  const surpriseSectionRef = useRef<HTMLDivElement>(null);

  const {
    soundEnabled,
    toggleSound,
    playPop,
    playCandleBlow,
    playCardFlip,
    playFanfare,
  } = useSoundEffects();

  const handleOpenCard = () => {
    setCardOpened(true);
    playFanfare();
  };

  const handleScrollToJokes = () => {
    jokeSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToSurprise = () => {
    const lettersElement = document.getElementById("friend-letters");
    if (lettersElement) {
      lettersElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRestartCelebration = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-[#07070e] text-slate-100 selection:bg-pink-500 selection:text-white">
      {/* Dynamic Ambient Background */}
      <BackgroundAmbience />

      {/* Floating Audio Toggle */}
      <MusicPlayer
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Cinematic Opening Veil Screen */}
      <AnimatePresence>
        {!cardOpened && (
          <BirthdayIntro
            onOpen={handleOpenCard}
            onInteract={playPop}
          />
        )}
      </AnimatePresence>

      {/* Main Interactive Birthday Journey */}
      {cardOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col"
        >
          {/* Section 1: Grand Birthday Reveal */}
          <BirthdayHero onScrollToExplore={handleScrollToJokes} />

          {/* Section 2: Funny Friendship Roasts & Jokes */}
          <div ref={jokeSectionRef}>
            <JokeSection onPlayPop={playPop} />
          </div>

          {/* Section 3: Emotional Message From The Three Idiots */}
          <FriendshipMessage />

          {/* Section 4: Interactive Birthday Cake & Wish Ceremony */}
          <div ref={surpriseSectionRef}>
            <BirthdayCake
              onPlayCandleBlow={playCandleBlow}
              onScrollToSurprise={handleScrollToSurprise}
            />
          </div>

          {/* Section 5: Individual Letters From Shahzaman, Abubakar & Araiz */}
          <FriendMessages onPlayCardFlip={playCardFlip} />

          {/* Section 6: Grand Finale & Share */}
          <FinalCelebration
            onRestartCelebration={handleRestartCelebration}
            onPlayFanfare={playFanfare}
          />
        </motion.div>
      )}
    </main>
  );
}
