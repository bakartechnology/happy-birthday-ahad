"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Film, Sparkles } from "lucide-react";
import { birthdayData, MemoryVideo } from "@/data/birthday";

interface VideoCardProps {
  video: MemoryVideo;
  index: number;
}

function VideoCard({ video, index }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="relative flex flex-col items-center w-full max-w-xs sm:max-w-sm mx-auto"
    >
      {/* Outer ambient glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-purple-600/30 via-pink-600/30 to-orange-500/30 rounded-[36px] blur-xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Video Smartphone/Reel Frame */}
      <div
        onClick={togglePlay}
        className="relative w-full aspect-[9/16] rounded-[32px] overflow-hidden glass-panel border border-white/15 shadow-2xl bg-black/80 cursor-pointer group select-none"
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          src={video.src}
          playsInline
          autoPlay
          loop
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white">
            <span>{video.emoji}</span>
            <span>{video.tag}</span>
          </div>

          <button
            onClick={toggleMute}
            type="button"
            aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
            className="pointer-events-auto p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 transition-all active:scale-95"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-slate-300" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            )}
          </button>
        </div>

        {/* Center Pause/Play overlay (shows on hover or when paused) */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-[2px] transition-opacity duration-300 ${
            !isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-white" />
            ) : (
              <Play className="w-6 h-6 fill-white ml-0.5" />
            )}
          </div>
        </div>

        {/* Bottom subtle gradient overlay & Progress bar */}
        <div className="absolute inset-x-0 bottom-0 pt-16 pb-3 px-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
          <div className="space-y-1 mb-2">
            <h4 className="text-sm font-bold text-white leading-tight drop-shadow">
              {video.title}
            </h4>
            <p className="text-xs text-slate-300 drop-shadow line-clamp-2">
              {video.subtitle}
            </p>
          </div>

          {/* Thin Progress bar */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Under-Card Note */}
      <div className="mt-3 text-center">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-yellow-400" />
          <span>{video.date}</span>
        </span>
      </div>
    </motion.div>
  );
}

export function MemoriesReel() {
  const memories = birthdayData.memories;

  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 bg-gradient-to-tr from-purple-700/20 via-pink-600/15 to-orange-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-purple-300 mb-3">
          <Film className="w-3.5 h-3.5 text-pink-400" />
          <span>{memories.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          {memories.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl mx-auto">
          {memories.subtitle}
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 justify-items-center">
        {memories.videos.map((video, idx) => (
          <VideoCard key={video.id} video={video} index={idx} />
        ))}
      </div>
    </section>
  );
}
