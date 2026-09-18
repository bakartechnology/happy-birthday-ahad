"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Film, Sparkles, RefreshCw } from "lucide-react";
import { birthdayData, MemoryVideo } from "@/data/birthday";

interface VideoCardProps {
  video: MemoryVideo;
  index: number;
}

function VideoCard({ video, index }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Safe play executor that handles mobile policy and low-power modes
  const attemptPlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;

    el.defaultMuted = true;
    el.muted = isMuted;
    el.playsInline = true;
    el.setAttribute("playsinline", "true");
    el.setAttribute("webkit-playsinline", "true");

    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch(() => {
          // Autoplay was blocked by browser or low-power mode
          setIsPlaying(false);
        });
    }
  }, [isMuted]);

  // Pause video cleanly
  const attemptPause = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    setIsPlaying(false);
  }, []);

  // Set up DOM properties and IntersectionObserver for high performance (60-120fps on all screens from 320px to 4K)
  useEffect(() => {
    const el = videoRef.current;
    const container = containerRef.current;
    if (!el) return;

    // Direct DOM property enforcement for iOS Safari & Android WebViews
    el.defaultMuted = true;
    el.muted = true;
    el.playsInline = true;
    el.setAttribute("playsinline", "true");
    el.setAttribute("webkit-playsinline", "true");

    // IntersectionObserver: Play when in view, pause when out of view (saves battery, CPU & GPU on 4K)
    let observer: IntersectionObserver | null = null;
    if (typeof window !== "undefined" && "IntersectionObserver" in window && container) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              attemptPlay();
            } else {
              attemptPause();
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(container);
    } else {
      attemptPlay();
    }

    // Global listener on first user interaction to kickstart video if browser blocked initial autoplay
    const handleUserGesture = () => {
      if (videoRef.current && videoRef.current.paused) {
        attemptPlay();
      }
    };
    window.addEventListener("pointerdown", handleUserGesture, { once: true });
    window.addEventListener("touchstart", handleUserGesture, { once: true });

    return () => {
      if (observer && container) observer.unobserve(container);
      window.removeEventListener("pointerdown", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
    };
  }, [attemptPlay, attemptPause]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;

    if (isPlaying) {
      attemptPause();
    } else {
      attemptPlay();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;

    const nextMuted = !isMuted;
    el.muted = nextMuted;
    setIsMuted(nextMuted);

    // If unmuting while paused, resume playback
    if (!nextMuted && el.paused) {
      attemptPlay();
    }
  };

  const handleTimeUpdate = () => {
    const el = videoRef.current;
    if (!el) return;
    const current = el.currentTime;
    const total = el.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasError(false);
    const el = videoRef.current;
    if (el) {
      el.load();
      attemptPlay();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex flex-col items-center w-full max-w-[300px] sm:max-w-[340px] mx-auto transform-gpu"
    >
      {/* Outer ambient glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-purple-600/30 via-pink-600/30 to-orange-500/30 rounded-[36px] blur-xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Video Frame */}
      <div
        onClick={togglePlay}
        className="relative w-full aspect-[9/16] rounded-[30px] sm:rounded-[34px] overflow-hidden glass-panel border border-white/20 shadow-2xl bg-[#090813] cursor-pointer group select-none transition-transform duration-300 active:scale-[0.99]"
      >
        {/* HTML5 Native Video element */}
        <video
          ref={videoRef}
          src={video.src}
          playsInline
          autoPlay
          loop
          muted={isMuted}
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
          onTimeUpdate={handleTimeUpdate}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover will-change-transform"
        />

        {/* Top Badges & Audio Toggle */}
        <div className="absolute top-3 sm:top-4 inset-x-3 sm:inset-x-4 flex items-center justify-between pointer-events-none z-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white shadow-lg">
            <span>{video.emoji}</span>
            <span>{video.tag}</span>
          </div>

          <button
            onClick={toggleMute}
            type="button"
            aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
            className={`pointer-events-auto p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 active:scale-90 shadow-xl ${
              !isMuted
                ? "bg-pink-600/80 border-pink-400 text-white shadow-pink-900/50"
                : "bg-black/60 border-white/20 text-slate-200 hover:text-white hover:bg-black/80"
            }`}
          >
            {!isMuted ? (
              <Volume2 className="w-4 h-4 text-white animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-300" />
            )}
          </button>
        </div>

        {/* Play / Pause Animated Overlay Button */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 z-10 ${
            !isPlaying
              ? "opacity-100 bg-black/45 backdrop-blur-[2px]"
              : "opacity-0 group-hover:opacity-100 bg-black/20"
          }`}
        >
          {hasError ? (
            <div className="flex flex-col items-center gap-2 p-4 text-center">
              <button
                onClick={handleRetry}
                type="button"
                className="p-3 rounded-full bg-pink-600 text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
              >
                <RefreshCw className="w-6 h-6" />
              </button>
              <span className="text-xs text-white font-medium">Tap to reload video</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-purple-600/90 to-pink-600/90 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-white" />
                ) : (
                  <Play className="w-7 h-7 fill-white ml-1" />
                )}
              </div>
              {!isPlaying && (
                <span className="text-xs font-semibold tracking-wider text-white uppercase drop-shadow bg-black/50 px-3 py-1 rounded-full border border-white/10">
                  Tap to play
                </span>
              )}
            </div>
          )}
        </div>

        {/* Buffering Spinner */}
        {isBuffering && isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-10 h-10 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Bottom Metadata & Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 pt-16 pb-3 px-4 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none z-20">
          <div className="space-y-1 mb-2">
            <h4 className="text-sm sm:text-base font-bold text-white leading-tight drop-shadow">
              {video.title}
            </h4>
            <p className="text-xs text-slate-300 drop-shadow line-clamp-2">
              {video.subtitle}
            </p>
          </div>

          {/* Glowing Progress bar */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-100"
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

      {/* Videos Grid - Fully responsive from 320px mobile to 4K */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 justify-items-center">
        {memories.videos.map((video, idx) => (
          <VideoCard key={video.id} video={video} index={idx} />
        ))}
      </div>
    </section>
  );
}
