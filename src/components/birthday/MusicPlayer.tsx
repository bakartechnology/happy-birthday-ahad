"use client";

import React from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function MusicPlayer({ soundEnabled, onToggleSound }: MusicPlayerProps) {
  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        onClick={onToggleSound}
        type="button"
        aria-label={soundEnabled ? "Mute birthday music" : "Play birthday music"}
        className={`group flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-xl shadow-lg cursor-pointer ${
          soundEnabled
            ? "bg-purple-900/50 border-purple-400/50 text-purple-100 shadow-purple-900/40 hover:bg-purple-800/60"
            : "bg-white/5 border-white/10 text-slate-300 hover:border-white/25 hover:text-white"
        }`}
      >
        <div className="relative flex items-center justify-center">
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-pink-400 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
          )}
        </div>

        <span className="flex items-center gap-1.5 font-semibold tracking-wide">
          {soundEnabled ? (
            <>
              <Music className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
              <span>Birthday Music ON</span>
            </>
          ) : (
            <span>Music OFF</span>
          )}
        </span>

        {/* Animated equalizer visualizer when active */}
        {soundEnabled && (
          <div className="flex items-center gap-0.5 h-3.5 ml-1" aria-hidden="true">
            <span className="w-0.5 h-2.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-0.5 h-3.5 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-0.5 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            <span className="w-0.5 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "450ms" }} />
          </div>
        )}
      </button>
    </div>
  );
}
