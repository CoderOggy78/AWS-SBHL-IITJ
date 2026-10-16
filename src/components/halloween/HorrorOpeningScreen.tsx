"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Skull, Flame, Volume2, VolumeX, ShieldAlert } from "lucide-react";
import { horrorAudio } from "./HorrorSoundManager";

interface HorrorOpeningScreenProps {
  onEnter: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

export const HorrorOpeningScreen: React.FC<HorrorOpeningScreenProps> = ({
  onEnter,
  soundEnabled = true,
  onToggleSound,
}) => {
  const [isEntering, setIsEntering] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [glitchText, setGlitchText] = useState("ENTER THE ARENA");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 1. Play background death costume video immediately
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    // 2. Play horror audio immediately without waiting for a click!
    const audio = audioRef.current;
    if (audio && soundEnabled) {
      audio.volume = 0.85;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser restricts unmuted autoplay: start muted and unmute on first mouse motion
          audio.muted = true;
          audio.play().catch(() => {});
        });
      }
      horrorAudio.startAmbience();
    }

    // Passive unlock on any cursor or touch movement
    const unlockAudio = () => {
      if (!soundEnabled) return;
      if (audio) {
        audio.muted = false;
        audio.volume = 0.85;
        if (audio.paused) {
          audio.play().catch(() => {});
        }
      }
      horrorAudio.startAmbience();
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

    events.forEach((evt) => {
      window.addEventListener(evt, unlockAudio, { passive: true });
    });

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, unlockAudio);
      });
    };
  }, [soundEnabled]);

  const handleMouseEnter = () => {
    horrorAudio.playWhisperStinger();
    setGlitchText("NO TURNING BACK");
    setTimeout(() => {
      setGlitchText("ENTER THE ARENA");
    }, 450);
  };

  const handleEnterClick = () => {
    if (isEntering) return;
    setIsEntering(true);

    horrorAudio.playGothicBell();
    horrorAudio.playThunder();

    // Start background loop audio for main home screen
    const mainAudio = document.getElementById("halloween-main-audio") as HTMLAudioElement | null;
    if (mainAudio) {
      mainAudio.currentTime = 0;
      mainAudio.volume = 0.85;
      mainAudio.play().catch(() => {});
    }
    horrorAudio.startAmbience();

    // Smooth cinematic blood fade transition to home screen
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-black select-none overflow-hidden transition-all duration-1000 ${
        isEntering ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Horror Music playing automatically from https://youtu.be/dTPiT-ZBMKw */}
      <audio
        ref={audioRef}
        autoPlay
        loop
        playsInline
        preload="auto"
      >
        <source src="/halloween/horror-bgm.webm" type="audio/webm" />
        <source src="/halloween/horror-bgm.m4a" type="audio/mp4" />
      </audio>

      {/* 1. Cinematic Background Video: Person in Cloak Touching Scythe (Pexels 10355541) - FULLY VISIBLE & VIVID */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          videoLoaded ? "opacity-95" : "opacity-40"
        } filter contrast-115 brightness-95 saturate-85 scale-100`}
      >
        <source src="/halloween/horror-scythe.mp4" type="video/mp4" />
        <source src="/halloween/horror-death.mp4" type="video/mp4" />
        <source
          src="https://videos.pexels.com/video-files/10355541/10355541-hd_1280_720_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* 2. Soft Edge Vignette (Keeps center and woman in death costume crisp and visible) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_50%,_transparent_40%,_rgba(0,0,0,0.6)_75%,_rgba(0,0,0,0.92)_100%)] pointer-events-none" />

      {/* 3. Subtle Film Grain / Scanline Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

      {/* 4. Dripping Blood Top Border */}
      <div className="absolute top-0 inset-x-0 h-14 pointer-events-none z-10">
        <svg
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          className="w-full h-14 fill-red-800/90 filter drop-shadow-[0_4px_12px_rgba(220,38,38,0.9)]"
        >
          <path d="M0,0 L1440,0 L1440,10 C1400,10 1390,32 1370,32 C1350,32 1340,10 1310,10 C1280,10 1270,42 1250,42 C1230,42 1220,10 1180,10 C1150,10 1140,26 1120,26 C1100,26 1090,10 1050,10 C1020,10 1010,50 980,50 C950,50 940,10 900,10 C860,10 850,32 830,32 C810,32 800,10 760,10 C730,10 720,46 690,46 C660,46 650,10 610,10 C570,10 560,30 540,30 C520,30 510,10 470,10 C440,10 430,40 400,40 C370,40 360,10 320,10 C290,10 280,52 250,52 C220,52 210,10 170,10 C140,10 130,34 110,34 C90,34 80,10 40,10 C20,10 10,22 0,22 Z" />
        </svg>
      </div>

      {/* 5. Top Bar Brand Flag */}
      <div className="absolute top-4 left-4 sm:left-8 z-30 flex items-center pointer-events-auto">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-red-900/60 shadow-lg">
          <Image
            src="/brand/aws-sbg-chip-purple.png"
            alt="AWS SBG Logo"
            width={24}
            height={24}
            className="object-contain filter drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"
          />
          <span className="font-extrabold text-xs tracking-tight text-white font-mono">
            AWS SBG IIT JODHPUR
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800">
            NIGHTMARE
          </span>
        </div>
      </div>

      {/* =========================================================================
          6. WRITTEN CONTENT & "ENTER THE ARENA" BUTTON - POSITIONED AT RIGHT BOTTOM!
          (Leaves the entire center & left open so the Death Costume Woman is visible!)
          ========================================================================= */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end items-end p-5 sm:p-10 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-end text-right max-w-lg bg-black/65 backdrop-blur-lg p-6 sm:p-7 rounded-3xl border border-red-900/70 shadow-[0_0_60px_rgba(0,0,0,0.95)]">
          {/* Sinister Warning Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-700/70 text-red-400 font-mono text-[11px] uppercase tracking-widest shadow-[0_0_15px_rgba(220,38,38,0.5)] mb-3 animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-spin" style={{ animationDuration: "6s" }} />
            <span>Restricted Sanctuary • Level 666</span>
          </div>

          {/* Ominous Chapter Title */}
          <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-red-500 tracking-tight font-sans drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
            AWS STUDENT BUILDER GROUP
          </h1>
          <p className="mt-1 text-xs sm:text-sm font-mono text-red-400 font-bold uppercase tracking-widest flex items-center gap-1.5 drop-shadow-[0_2px_8px_rgba(220,38,38,0.8)]">
            <Skull className="w-3.5 h-3.5 text-red-500" />
            <span>IIT JODHPUR • ARENA OF SHADOWS</span>
          </p>

          <p className="mt-2 text-xs text-neutral-300 font-mono leading-relaxed">
            Enter the haunted corridors of cloud architecture. 50+ Dark Lectures, 100+ Free Badges, and the Council of Shadows await.
          </p>

          {/* Blood-Drenched "ENTER THE ARENA" Button */}
          <div className="mt-5 relative group w-full sm:w-auto">
            {/* Pulsing blood aura behind button */}
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-700 to-orange-600 opacity-80 blur-lg group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />

            {/* Dripping blood SVG under button */}
            <div className="absolute -bottom-3 inset-x-2 h-5 pointer-events-none z-10 overflow-visible opacity-90">
              <svg viewBox="0 0 200 24" className="w-full h-full fill-red-700 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <path d="M0,0 L200,0 C190,4 185,16 180,16 C175,16 170,4 160,4 C150,4 145,22 140,22 C135,22 130,4 120,4 C110,4 105,18 100,18 C95,18 90,4 80,4 C70,4 65,24 60,24 C55,24 50,4 40,4 C30,4 25,14 20,14 C15,14 10,2 0,2 Z" />
              </svg>
            </div>

            <button
              onClick={handleEnterClick}
              onMouseEnter={handleMouseEnter}
              className="relative w-full sm:w-auto px-7 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-b from-red-950 via-neutral-950 to-red-950 border-2 border-red-600/90 text-white font-mono font-black text-sm sm:text-lg uppercase tracking-widest shadow-[0_0_30px_rgba(220,38,38,0.85)] hover:border-red-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 overflow-hidden"
            >
              <Flame className="w-5 h-5 text-red-500 animate-pulse" />
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-orange-300 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                {glitchText}
              </span>
              <Skull className="w-5 h-5 text-red-500 animate-bounce" style={{ animationDuration: "2s" }} />
            </button>
          </div>
        </div>
      </div>

      {/* 7. Jumpscare Blood Splatter Overlay when Entering */}
      {isEntering && (
        <div className="absolute inset-0 z-50 pointer-events-none bg-red-950/70 mix-blend-multiply animate-ping" />
      )}
    </div>
  );
};
