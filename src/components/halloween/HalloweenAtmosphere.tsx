"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Volume2, VolumeX, Zap, Sparkles, Skull, Flame } from "lucide-react";
import { horrorAudio } from "./HorrorSoundManager";
import { FloatingGhosts } from "./FloatingGhosts";

interface HalloweenAtmosphereProps {
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

export const HalloweenAtmosphere: React.FC<HalloweenAtmosphereProps> = ({
  soundEnabled = true,
  onToggleSound,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [witchActive, setWitchActive] = useState(true);
  const [witchCackled, setWitchCackled] = useState(false);
  const [dollCreepy, setDollCreepy] = useState(false);
  const [smileCreepy, setSmileCreepy] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync audio playback with soundEnabled prop
  useEffect(() => {
    const audio = audioRef.current;
    if (soundEnabled) {
      if (audio) {
        audio.muted = false;
        audio.volume = 0.85;
        audio.play().catch(() => {
          // If unmuted autoplay blocked on initial mount, start muted and unmute on first motion
          audio.muted = true;
          audio.play().catch(() => {});
        });
      }
      horrorAudio.startAmbience();
    } else {
      if (audio) {
        audio.pause();
        audio.muted = true;
      }
      horrorAudio.stopAmbience();
    }
  }, [soundEnabled]);

  useEffect(() => {
    const unsub = horrorAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });

    const audio = audioRef.current;
    if (soundEnabled && audio) {
      audio.muted = false;
      audio.volume = 0.85;
      audio.play().catch(() => {
        // Fallback: start playback muted, immediately unmute on first gesture
        audio.muted = true;
        audio.play().catch(() => {});
      });
      horrorAudio.startAmbience();
    }

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

    const unlockAudio = () => {
      // ONLY unlock if sound is enabled (not turned off by user)
      if (!soundEnabled) return;
      if (audio) {
        if (audio.muted) {
          audio.muted = false;
        }
        audio.volume = 0.85;
        if (audio.paused) {
          audio.play().catch(() => {});
        }
      }
      horrorAudio.startAmbience();
    };

    events.forEach((evt) => {
      window.addEventListener(evt, unlockAudio, { passive: true, once: false });
      document.addEventListener(evt, unlockAudio, { passive: true, once: false });
    });

    return () => {
      unsub();
      events.forEach((evt) => {
        window.removeEventListener(evt, unlockAudio);
        document.removeEventListener(evt, unlockAudio);
      });
      if (audio) {
        audio.pause();
      }
    };
  }, [soundEnabled]);

  const handleWitchClick = () => {
    setWitchCackled(true);
    horrorAudio.playWitchCackle();
    setTimeout(() => setWitchCackled(false), 2000);
  };

  const handleDollClick = () => {
    setDollCreepy(true);
    horrorAudio.playWhisperStinger();
    setTimeout(() => setDollCreepy(false), 2500);
  };

  const handleSmileClick = () => {
    setSmileCreepy(true);
    horrorAudio.playThunder();
    setTimeout(() => setSmileCreepy(false), 2000);
  };

  return (
    <>
      {/* Continuous Loop Horror Audio on Homescreen (Imported from https://youtu.be/vy4QRqXdkv8: Ghost Sounds Effect / Horror Sounds Crying) */}
      <audio
        id="halloween-main-audio"
        ref={audioRef}
        loop
        autoPlay
        playsInline
      >
        <source src="/halloween/horror-bgm.webm" type="audio/webm" />
        <source src="/halloween/horror-bgm.m4a" type="audio/mp4" />
      </audio>

      {/* 0. MOVING 3D ETHEREAL WHITE GHOSTS FLOATING ACROSS SCREEN */}
      <FloatingGhosts />
      {/* =========================================================================
          1. DRIPPING VISCOUS BLOOD BORDER ACROSS SCREEN TOP
          ========================================================================= */}
      <div className="fixed top-0 inset-x-0 z-40 pointer-events-none select-none h-12 overflow-visible">
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="w-full h-12 fill-red-800/85 filter drop-shadow-[0_4px_10px_rgba(185,28,28,0.9)]"
        >
          <path d="M0,0 L1440,0 L1440,8 C1400,8 1390,28 1370,28 C1350,28 1340,8 1310,8 C1280,8 1270,36 1250,36 C1230,36 1220,8 1180,8 C1150,8 1140,22 1120,22 C1100,22 1090,8 1050,8 C1020,8 1010,44 980,44 C950,44 940,8 900,8 C860,8 850,26 830,26 C810,26 800,8 760,8 C730,8 720,40 690,40 C660,40 650,8 610,8 C570,8 560,24 540,24 C520,24 510,8 470,8 C440,8 430,34 400,34 C370,34 360,8 320,8 C290,8 280,46 250,46 C220,46 210,8 170,8 C140,8 130,28 110,28 C90,28 80,8 40,8 C20,8 10,20 0,20 Z" />
        </svg>

        {/* Animated Dripping Blood Drops */}
        <div className="absolute top-8 left-[17%] w-2 h-3.5 bg-red-700 rounded-full animate-ping opacity-75 shadow-[0_0_8px_rgba(220,38,38,1)]" />
        <div className="absolute top-10 left-[48%] w-2 h-4 bg-red-700 rounded-full animate-bounce opacity-85 shadow-[0_0_8px_rgba(220,38,38,1)]" />
        <div className="absolute top-9 left-[68%] w-2.5 h-4 bg-red-800 rounded-full animate-pulse opacity-90 shadow-[0_0_8px_rgba(220,38,38,1)]" />
        <div className="absolute top-7 left-[87%] w-1.5 h-3 bg-red-700 rounded-full animate-ping opacity-70 shadow-[0_0_8px_rgba(220,38,38,1)]" />
      </div>

      {/* =========================================================================
          2. OCCULT WITCHCRAFT SUMMONING CIRCLE (Subtle rotating esoteric seal in bg)
          ========================================================================= */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-15 select-none">
        <svg
          viewBox="0 0 400 400"
          className="w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] text-red-600/40 fill-none stroke-current stroke-[1.2]"
          style={{ animation: "occultRotate 90s linear infinite" }}
        >
          {/* Concentric rings */}
          <circle cx="200" cy="200" r="190" strokeDasharray="6 6" />
          <circle cx="200" cy="200" r="170" />
          <circle cx="200" cy="200" r="145" strokeDasharray="3 4" />
          <circle cx="200" cy="200" r="100" />
          <circle cx="200" cy="200" r="45" />

          {/* Pentagram star */}
          <polygon
            points="200,30 240,154 365,154 265,228 304,350 200,275 96,350 135,228 35,154 160,154"
            strokeWidth="1.5"
          />

          {/* Esoteric Alchemical runes around perimeter */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 200 200)`}>
              <line x1="200" y1="10" x2="200" y2="30" strokeWidth="2" />
              <circle cx="200" cy="20" r="3" fill="#dc2626" />
            </g>
          ))}
        </svg>
      </div>

      {/* =========================================================================
          3. SINISTER HORROR SMILE LURKING IN SHADOWS (Creepy glowing Cheshire/Pennywise grin)
          ========================================================================= */}
      <div
        className="fixed bottom-24 right-6 z-30 pointer-events-auto cursor-pointer group select-none transition-transform hover:scale-110"
        onClick={handleSmileClick}
        title="Something sinister is grinning in the darkness... click if you dare!"
      >
        <div className="relative p-2 rounded-2xl bg-black/60 backdrop-blur-xs border border-red-950/40 shadow-[0_0_25px_rgba(0,0,0,0.9)]">
          <svg
            viewBox="0 0 120 70"
            className={`w-24 h-14 transition-all duration-500 ${
              smileCreepy
                ? "scale-125 filter drop-shadow-[0_0_20px_rgba(239,68,68,1)]"
                : "opacity-75 group-hover:opacity-100 drop-shadow-[0_0_12px_rgba(220,38,38,0.7)]"
            }`}
          >
            {/* Sinister Glowing Slit Eyes */}
            <ellipse
              cx="38"
              cy="20"
              rx="9"
              ry="4"
              transform="rotate(-15 38 20)"
              fill="#fbbf24"
              className="animate-pulse"
            />
            <circle cx="39" cy="20" r="1.5" fill="#dc2626" />
            <ellipse
              cx="82"
              cy="20"
              rx="9"
              ry="4"
              transform="rotate(15 82 20)"
              fill="#fbbf24"
              className="animate-pulse"
            />
            <circle cx="81" cy="20" r="1.5" fill="#dc2626" />

            {/* Demonic razor-sharp wide curved bloody grin */}
            <path
              d="M15,38 Q60,75 105,38 Q60,52 15,38 Z"
              fill="#7f1d1d"
              stroke="#b91c1c"
              strokeWidth="1.5"
            />
            {/* Razor sharp jagged bloody fangs */}
            <path
              d="M25,41 L30,48 L35,42 L40,49 L45,43 L50,51 L55,44 L60,52 L65,44 L70,51 L75,43 L80,49 L85,42 L90,48 L95,41"
              stroke="#fef08a"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {smileCreepy && (
            <span className="absolute -top-6 right-0 text-[10px] font-mono font-bold text-red-400 bg-black/90 border border-red-600 px-2 py-0.5 rounded-full whitespace-nowrap shadow-[0_0_10px_rgba(239,68,68,0.9)] animate-bounce">
              NEVER SLEEP AGAIN... 👁️🩸
            </span>
          )}
        </div>
      </div>

      {/* =========================================================================
          4. HAUNTED ANNABELLE PORCELAIN DOLL (Creepy cracked face lurking in left shadow)
          ========================================================================= */}
      <div
        className="fixed bottom-24 left-6 z-30 pointer-events-auto cursor-pointer group select-none transition-transform hover:scale-110"
        onClick={handleDollClick}
        title="Annabelle's watchful eyes... click to hear her whisper!"
      >
        <div className="relative p-2.5 rounded-2xl bg-black/60 backdrop-blur-xs border border-red-950/40 shadow-[0_0_25px_rgba(0,0,0,0.9)]">
          {/* Cracked Doll Head SVG */}
          <svg
            viewBox="0 0 100 110"
            className={`w-18 h-20 transition-all duration-500 ${
              dollCreepy
                ? "scale-125 filter drop-shadow-[0_0_22px_rgba(239,68,68,1)]"
                : "opacity-75 group-hover:opacity-100 drop-shadow-[0_0_12px_rgba(147,51,234,0.6)]"
            }`}
          >
            {/* Hair pigtails */}
            <path d="M22,30 C10,35 6,55 12,70 C16,74 22,65 24,52 Z" fill="#78350f" />
            <path d="M78,30 C90,35 94,55 88,70 C84,74 78,65 76,52 Z" fill="#78350f" />
            {/* Red hair ribbons */}
            <circle cx="16" cy="58" r="4.5" fill="#dc2626" />
            <circle cx="84" cy="58" r="4.5" fill="#dc2626" />

            {/* Porcelain Face Oval */}
            <ellipse cx="50" cy="55" rx="30" ry="36" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="1.5" />

            {/* Hair bangs */}
            <path d="M22,38 Q50,22 78,38 Q50,30 22,38 Z" fill="#78350f" />

            {/* Cracks in Porcelain */}
            <path d="M50,24 L48,35 L54,42 L50,48" stroke="#71717a" strokeWidth="1" fill="none" />
            <path d="M68,52 L74,60 L71,68" stroke="#71717a" strokeWidth="0.8" fill="none" />

            {/* Glassy Unblinking Dolls Eyes */}
            <circle cx="38" cy="52" r="7" fill="#ffffff" stroke="#000" strokeWidth="0.8" />
            <circle cx="38" cy="52" r="4" fill="#0284c7" />
            <circle cx="38" cy="52" r="1.8" fill="#000000" />
            <circle cx="39.5" cy="50.5" r="1" fill="#ffffff" />

            <circle cx="62" cy="52" r="7" fill="#ffffff" stroke="#000" strokeWidth="0.8" />
            <circle cx="62" cy="52" r="4" fill="#0284c7" />
            <circle cx="62" cy="52" r="1.8" fill="#000000" />
            <circle cx="63.5" cy="50.5" r="1" fill="#ffffff" />

            {/* Rosy doll cheeks */}
            <circle cx="30" cy="65" r="5" fill="#f87171" opacity="0.45" />
            <circle cx="70" cy="65" r="5" fill="#f87171" opacity="0.45" />

            {/* Blood tear from right eye */}
            <path d="M62,59 Q63,68 62,76" stroke="#991b1b" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Stitched vintage doll smile */}
            <path d="M38,78 Q50,88 62,78" stroke="#b91c1c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <line x1="44" y1="78" x2="44" y2="84" stroke="#991b1b" strokeWidth="1.2" />
            <line x1="50" y1="80" x2="50" y2="86" stroke="#991b1b" strokeWidth="1.2" />
            <line x1="56" y1="78" x2="56" y2="84" stroke="#991b1b" strokeWidth="1.2" />
          </svg>

          {dollCreepy && (
            <span className="absolute -top-6 left-0 text-[10px] font-mono font-bold text-red-300 bg-black/90 border border-purple-600 px-2 py-0.5 rounded-full whitespace-nowrap shadow-[0_0_10px_rgba(168,85,247,0.9)] animate-bounce">
              MISS ME? 🪆🩸
            </span>
          )}
        </div>
      </div>

      {/* =========================================================================
          5. ROAMING WITCH ON BROOMSTICK GLIDING ACROSS SKY
          ========================================================================= */}
      {witchActive && (
        <div
          className="fixed top-24 left-0 z-20 pointer-events-auto cursor-pointer select-none transition-transform hover:scale-110"
          style={{
            animation: "witchFly 26s linear infinite",
          }}
          onClick={handleWitchClick}
          title="Click the Wicked Witch to hear her cackle!"
        >
          <div className="relative flex items-center">
            {/* Emerald Magic Trail / Stardust */}
            <div className="w-24 h-3 bg-gradient-to-r from-transparent via-emerald-500/40 to-emerald-400/80 blur-xs rounded-full -mr-3 animate-pulse" />

            {/* Flying Witch Silhouette SVG */}
            <svg
              viewBox="0 0 100 80"
              className={`w-16 h-14 fill-neutral-950 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)] ${
                witchCackled ? "animate-spin text-red-500" : ""
              }`}
            >
              {/* Broom handle */}
              <path d="M5,52 L95,43" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
              {/* Broom bristles */}
              <polygon points="5,52 0,46 2,58 10,54" fill="#ca8a04" />
              {/* Witch body sitting */}
              <path d="M42,50 C40,40 45,35 52,34 C58,34 62,38 60,48 Z" />
              {/* Robe fluttering back */}
              <path d="M42,50 C32,54 26,58 24,65 C32,60 40,56 46,51 Z" fill="#09090b" />
              {/* Witch pointed hat */}
              <polygon points="53,34 63,12 58,10 47,33" />
              <ellipse cx="53" cy="33" rx="10" ry="3" />
              {/* Head and hooked nose */}
              <circle cx="56" cy="33" r="4.5" />
              <path d="M59,33 L64,34 L59,36 Z" />
            </svg>

            {witchCackled && (
              <span className="absolute -top-6 left-12 text-xs font-mono font-bold text-emerald-400 bg-neutral-950/90 border border-emerald-500 px-2 py-0.5 rounded-full whitespace-nowrap shadow-[0_0_12px_rgba(16,185,129,0.9)] animate-bounce">
                HEE-HEE-HEE-HAAA! 🧹🎃
              </span>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          6. SWARM OF FLAPPING BATS
          ========================================================================= */}
      <div className="fixed top-12 left-0 right-0 h-48 pointer-events-none z-10 overflow-hidden">
        <div
          className="absolute flex gap-8 opacity-80"
          style={{ animation: "batSwarm 18s linear infinite" }}
        >
          {[1, 2, 3, 4, 5].map((idx) => (
            <svg
              key={idx}
              viewBox="0 0 40 24"
              className="w-8 h-6 fill-neutral-900 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{
                marginTop: `${(idx % 3) * 18}px`,
                animation: `batFlap 0.28s ease-in-out infinite alternate`,
                animationDelay: `${idx * 0.05}s`,
              }}
            >
              <path d="M20,12 C24,4 32,2 40,6 C34,14 28,15 23,17 C22,19 18,19 17,17 C12,15 6,14 0,6 C8,2 16,4 20,12 Z" />
            </svg>
          ))}
        </div>
      </div>

      {/* =========================================================================
          7. HAUNTED GRAVEYARD TOMBSTONES & ZOMBIE HAND CLAWING FROM BOTTOM FOG
          ========================================================================= */}
      <div className="fixed bottom-0 inset-x-0 h-32 pointer-events-none z-20 select-none overflow-hidden">
        {/* Rolling fog gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-transparent" />

        {/* Cemetery Silhouette with Tombstones, Crosses & Zombie Claw Hands */}
        <div className="absolute bottom-0 inset-x-0 h-24 flex items-end justify-between px-4 sm:px-12 opacity-85">
          {/* Left Tombstone (R.I.P.) */}
          <div className="relative">
            <svg viewBox="0 0 60 70" className="w-12 h-14 fill-neutral-900 text-neutral-800">
              <path d="M5,70 L5,25 C5,8 55,8 55,25 L55,70 Z" />
              <text x="18" y="38" fill="#71717a" fontSize="10" fontFamily="monospace" fontWeight="bold">
                R.I.P
              </text>
            </svg>
          </div>

          {/* Zombie Hand Clawing out of Graveyard Dirt */}
          <div className="relative mb-1">
            <svg
              viewBox="0 0 80 100"
              className="w-16 h-20 fill-neutral-900 drop-shadow-[0_0_12px_rgba(220,38,38,0.6)]"
              style={{ animation: "handRise 4s ease-in-out infinite alternate" }}
            >
              {/* Forearm */}
              <path d="M30,100 L32,60 C32,55 38,55 38,60 L36,100 Z" fill="#27272a" />
              {/* Palm */}
              <circle cx="35" cy="52" r="10" fill="#3f3f46" />
              {/* Clawing bony fingers */}
              <path d="M30,48 L22,34 L18,22" stroke="#52525b" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M34,45 L30,28 L27,15" stroke="#52525b" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M38,45 L38,26 L40,12" stroke="#52525b" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M42,47 L48,32 L53,20" stroke="#52525b" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M44,52 L52,45 L58,40" stroke="#52525b" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          {/* Crooked Cemetery Cross */}
          <div className="relative hidden sm:block">
            <svg viewBox="0 0 40 70" className="w-8 h-14 fill-neutral-900">
              <rect x="16" y="5" width="8" height="65" rx="1" />
              <rect x="5" y="22" width="30" height="8" rx="1" />
            </svg>
          </div>

          {/* Second Zombie Hand on Right */}
          <div className="relative mb-1">
            <svg
              viewBox="0 0 80 100"
              className="w-16 h-20 -scale-x-100 fill-neutral-900 drop-shadow-[0_0_12px_rgba(234,88,12,0.6)]"
              style={{ animation: "handRise 5s ease-in-out infinite alternate 1s" }}
            >
              {/* Forearm */}
              <path d="M30,100 L32,60 C32,55 38,55 38,60 L36,100 Z" fill="#27272a" />
              {/* Palm */}
              <circle cx="35" cy="52" r="10" fill="#3f3f46" />
              {/* Clawing bony fingers */}
              <path d="M30,48 L22,34 L18,22" stroke="#52525b" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M34,45 L30,28 L27,15" stroke="#52525b" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M38,45 L38,26 L40,12" stroke="#52525b" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M42,47 L48,32 L53,20" stroke="#52525b" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          {/* Right Tombstone */}
          <div className="relative">
            <svg viewBox="0 0 60 70" className="w-12 h-14 fill-neutral-900 text-neutral-800">
              <path d="M8,70 L8,28 C8,12 52,12 52,28 L52,70 Z" />
              <text x="16" y="38" fill="#71717a" fontSize="8" fontFamily="monospace" fontWeight="bold">
                CLOUD
              </text>
              <text x="14" y="50" fill="#71717a" fontSize="8" fontFamily="monospace">
                DEAD SLA
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Floating Sound Toggle Pill (Bottom Left) */}
      {onToggleSound && (
        <div className="fixed bottom-6 left-6 z-40 select-none">
          <button
            onClick={onToggleSound}
            className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full border backdrop-blur-md shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
              soundEnabled
                ? "bg-neutral-950/90 border-red-600/80 text-red-300 shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                : "bg-neutral-900/90 border-neutral-700/60 text-neutral-400"
            }`}
            title={soundEnabled ? "Mute Horror Music" : "Unmute Horror Music"}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-red-400 animate-pulse" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono font-bold leading-tight">HORROR BGM: PLAYING</span>
                  <span className="text-[9px] font-mono text-neutral-400 leading-tight">Ghost Sounds Crying</span>
                </div>
                <span className="flex items-end gap-0.5 h-3.5 ml-1">
                  <span className="w-0.5 h-2 bg-red-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-0.5 h-3.5 bg-red-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-0.5 h-1.5 bg-red-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-neutral-400" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono font-bold leading-tight">HORROR BGM: MUTED</span>
                  <span className="text-[9px] font-mono text-neutral-400 leading-tight">Click to Unmute</span>
                </div>
              </>
            )}
          </button>
        </div>
      )}

      <style jsx global>{`
        @keyframes occultRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes handRise {
          0% {
            transform: translateY(12px) rotate(-3deg);
          }
          100% {
            transform: translateY(0px) rotate(4deg);
          }
        }

        @keyframes witchFly {
          0% {
            transform: translate(-100px, 40px) scale(0.9) rotate(-3deg);
          }
          25% {
            transform: translate(25vw, 15px) scale(1) rotate(2deg);
          }
          50% {
            transform: translate(50vw, 45px) scale(1.05) rotate(-2deg);
          }
          75% {
            transform: translate(75vw, 20px) scale(1) rotate(3deg);
          }
          100% {
            transform: translate(110vw, 35px) scale(0.95) rotate(-3deg);
          }
        }

        @keyframes batSwarm {
          0% {
            transform: translate(-200px, 30px) scale(0.85);
          }
          100% {
            transform: translate(120vw, -10px) scale(1.1);
          }
        }

        @keyframes batFlap {
          0% {
            transform: scaleY(1);
          }
          100% {
            transform: scaleY(0.4);
          }
        }
      `}</style>
    </>
  );
};
