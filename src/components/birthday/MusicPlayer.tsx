"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";

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
        aria-label={soundEnabled ? "Mute audio effects" : "Enable celebratory audio"}
        className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-xl ${
          soundEnabled
            ? "bg-purple-900/40 border-purple-500/50 text-purple-200 shadow-lg shadow-purple-900/30"
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

        <span className="hidden sm:inline">
          {soundEnabled ? "Sound ON" : "Sound OFF"}
        </span>

        {/* Animated equalizer waves when active */}
        {soundEnabled && (
          <div className="flex items-center gap-0.5 h-3" aria-hidden="true">
            <span className="w-0.5 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-0.5 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-0.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        )}
      </button>
    </div>
  );
}
