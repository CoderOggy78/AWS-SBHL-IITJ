"use client";

import React, { useState, useRef, useEffect } from "react";
import { Skull } from "lucide-react";
import { horrorAudio } from "./HorrorSoundManager";

interface HalloweenIntroGateProps {
  onEnterArena: () => void;
}

export const HalloweenIntroGate: React.FC<HalloweenIntroGateProps> = ({ onEnterArena }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.9;

    let played = false;

    const playAudio = () => {
      if (played) return;
      audio
        .play()
        .then(() => {
          played = true;
          cleanup();
        })
        .catch(() => {
          // Will retry on next interaction event
        });
    };

    const events = [
      "mousemove",
      "pointermove",
      "mouseenter",
      "mouseover",
      "touchstart",
      "pointerdown",
      "mousedown",
      "wheel",
      "scroll",
      "keydown",
      "focus",
    ];

    const onUserActivity = () => {
      playAudio();
    };

    const cleanup = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, onUserActivity);
        document.removeEventListener(evt, onUserActivity);
      });
    };

    // 1. Attempt immediate autoplay on mount
    playAudio();

    // 2. Attach comprehensive high-priority listeners to start audio on ANY cursor movement or engagement
    events.forEach((evt) => {
      window.addEventListener(evt, onUserActivity, { passive: true });
      document.addEventListener(evt, onUserActivity, { passive: true });
    });

    return () => {
      cleanup();
      audio.pause();
    };
  }, []);

  const handleEnterClick = () => {
    setIsEntering(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    horrorAudio.startAmbience();
    horrorAudio.playThunder();
    setTimeout(() => {
      onEnterArena();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-black text-white overflow-hidden transition-all duration-1000 ${
        isEntering ? "opacity-0 scale-105 pointer-events-none filter blur-md" : "opacity-100"
      }`}
    >
      {/* Compulsory Horror Scream Audio */}
      <audio
        ref={audioRef}
        src="/halloween/horror-scream.mp3"
        autoPlay
        loop
        playsInline
      />

      {/* 1. Fullscreen Crystal-Clear Zombie Graveyard Video Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          src="/halloween/horror-intro.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Subtle cinematic gradient only at top & bottom so video is completely clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* 2. Top Header Bar: Minimal Subtle Brand */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-red-900/50 shadow-lg">
          <div className="w-7 h-7 rounded-lg overflow-hidden bg-black flex items-center justify-center">
            <img
              src="/brand/aws-sbg-chip-purple.png"
              alt="AWS SBG Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-tight text-white/90 font-mono">
            AWS SBG IIT JODHPUR • NIGHTMARE
          </span>
        </div>
      </div>

      {/* 3. Bottom: Clean, Compact Sleek 'ENTER THE HALLOWEEN ARENA' Button */}
      <div className="relative z-10 w-full pb-10 px-4 flex flex-col items-center justify-center">
        <div className="relative group">
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-orange-600/30 via-red-600/20 to-purple-600/30 blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition duration-300" />

          <button
            onClick={handleEnterClick}
            className="relative px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-neutral-950/80 hover:bg-neutral-900/90 backdrop-blur-xl border border-neutral-700/80 hover:border-orange-500/70 text-white shadow-[0_8px_32px_rgba(0,0,0,0.85)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none"
          >
            <span className="text-xl sm:text-2xl filter drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] group-hover:rotate-12 transition-transform">
              🎃
            </span>

            {/* Creepster Horror Font Headline */}
            <span className="font-horror text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-400 to-amber-300 drop-shadow-[0_2px_8px_rgba(249,115,22,0.6)] tracking-wider uppercase">
              ENTER THE HALLOWEEN ARENA
            </span>

            <Skull className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400/90 group-hover:text-orange-300 filter drop-shadow-[0_0_6px_rgba(249,115,22,0.7)] group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
