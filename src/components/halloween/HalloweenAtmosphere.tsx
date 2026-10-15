"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Zap, Sparkles } from "lucide-react";
import { horrorAudio } from "./HorrorSoundManager";

export const HalloweenAtmosphere: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [witchActive, setWitchActive] = useState(true);
  const [witchCackled, setWitchCackled] = useState(false);

  useEffect(() => {
    const unsub = horrorAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      unsub();
    };
  }, []);

  const handleWitchClick = () => {
    setWitchCackled(true);
    horrorAudio.playWitchCackle();
    setTimeout(() => setWitchCackled(false), 2000);
  };

  const handleThunderClick = () => {
    horrorAudio.playThunder();
  };

  return (
    <>
      {/* 1. Hanging Spiderweb in Top Corners */}
      <div className="fixed top-0 left-0 pointer-events-none z-30 opacity-70 w-44 h-44">
        <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-600/50 fill-none stroke-current stroke-[0.8]">
          <path d="M0,0 L100,0 M0,0 L0,100 M0,0 L85,85 M0,0 L50,90 M0,0 L90,50" />
          <path d="M25,0 Q20,20 0,25 M50,0 Q40,40 0,50 M75,0 Q60,60 0,75 M100,0 Q80,80 0,100" />
          <path d="M35,15 Q30,30 15,35 M65,25 Q50,50 25,65" />
        </svg>
      </div>

      <div className="fixed top-0 right-0 pointer-events-none z-30 opacity-70 w-44 h-44 -scale-x-100">
        <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-600/50 fill-none stroke-current stroke-[0.8]">
          <path d="M0,0 L100,0 M0,0 L0,100 M0,0 L85,85 M0,0 L50,90 M0,0 L90,50" />
          <path d="M25,0 Q20,20 0,25 M50,0 Q40,40 0,50 M75,0 Q60,60 0,75 M100,0 Q80,80 0,100" />
          <path d="M35,15 Q30,30 15,35 M65,25 Q50,50 25,65" />
        </svg>
      </div>

      {/* 2. Hanging Interactive Spider */}
      <div className="fixed top-0 right-16 z-30 pointer-events-auto cursor-pointer animate-bounce duration-1000 group" onClick={handleWitchClick}>
        <div className="w-[1px] h-24 bg-neutral-500/60 mx-auto" />
        <div className="relative -mt-1 p-1 hover:scale-125 transition-transform" title="Click the creepy spider!">
          <div className="w-4 h-4 rounded-full bg-neutral-900 border border-orange-500/60 shadow-[0_0_8px_rgba(249,115,22,0.8)] relative">
            {/* Glowing Red Eyes */}
            <span className="absolute top-1 left-0.5 w-1 h-1 bg-red-500 rounded-full animate-ping" />
            <span className="absolute top-1 right-0.5 w-1 h-1 bg-red-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* 3. Roaming Horror Witch on Broomstick gliding across the moonlit sky */}
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

      {/* 4. Swarms of Flapping Bats gliding across */}
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

      {/* 5. Dense Rolling Ground Fog Layer at Viewport Bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-20 overflow-hidden select-none">
        <div
          className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent"
        />
        <div
          className="absolute -bottom-10 -left-full w-[300%] h-40 opacity-40 mix-blend-screen bg-repeat-x"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.2) 0%, rgba(249, 115, 22, 0.15) 30%, transparent 70%)",
            animation: "fogDrift 28s ease-in-out infinite alternate",
          }}
        />
      </div>



      <style jsx global>{`
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

        @keyframes fogDrift {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(30%);
          }
        }
      `}</style>
    </>
  );
};
