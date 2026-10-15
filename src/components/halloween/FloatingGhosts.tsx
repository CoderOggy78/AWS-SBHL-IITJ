"use client";

import React, { useState } from "react";
import { horrorAudio } from "./HorrorSoundManager";

export const FloatingGhosts: React.FC = () => {
  const [screamingGhost, setScreamingGhost] = useState<number | null>(null);

  const handleGhostClick = (id: number) => {
    setScreamingGhost(id);
    horrorAudio.playWhisperStinger();
    setTimeout(() => setScreamingGhost(null), 2500);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none">
      {/* Ghost 1: Large ethereal white wraith floating diagonally across screen */}
      <div
        className="absolute pointer-events-auto cursor-pointer group"
        style={{
          top: "18%",
          left: "5%",
          animation: "ghostFloat1 24s ease-in-out infinite alternate",
        }}
        onClick={() => handleGhostClick(1)}
        title="An ethereal wandering ghost... click to hear its spectral wail!"
      >
        <div className="relative hover:scale-125 transition-transform duration-500">
          {/* Ethereal Glow Aura */}
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 animate-pulse" />

          <svg
            viewBox="0 0 100 130"
            className={`w-24 h-32 sm:w-32 sm:h-40 drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] filter ${
              screamingGhost === 1
                ? "scale-125 drop-shadow-[0_0_35px_rgba(239,68,68,1)] text-red-200"
                : "opacity-85 group-hover:opacity-100 text-white"
            }`}
          >
            {/* Spectral Translucent Flowing Body */}
            <path
              d="M50,15 C28,15 20,35 20,55 C20,78 12,95 8,120 C18,112 28,124 38,110 C48,125 58,110 68,124 C76,112 85,122 92,118 C88,95 80,78 80,55 C80,35 72,15 50,15 Z"
              fill="url(#ghostGrad1)"
              className="animate-pulse"
            />
            {/* Trailing arms reaching forward */}
            <path
              d="M20,60 Q5,75 10,90 Q18,80 22,68"
              fill="rgba(255,255,255,0.6)"
            />
            <path
              d="M80,60 Q95,75 90,90 Q82,80 78,68"
              fill="rgba(255,255,255,0.6)"
            />

            {/* Hollow Black Eyes with Red Sinister Center */}
            <ellipse cx="40" cy="45" rx="5" ry="8" fill="#09090b" />
            <circle cx="40" cy="46" r="1.5" fill="#ef4444" className="animate-ping" />

            <ellipse cx="60" cy="45" rx="5" ry="8" fill="#09090b" />
            <circle cx="60" cy="46" r="1.5" fill="#ef4444" className="animate-ping" />

            {/* Gaping Wailing Ghost Mouth */}
            <ellipse cx="50" cy="65" rx="6" ry="11" fill="#09090b" />

            <defs>
              <radialGradient id="ghostGrad1" cx="50%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#e2e8f0" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.1" />
              </radialGradient>
            </defs>
          </svg>

          {screamingGhost === 1 && (
            <span className="absolute -top-6 left-2 text-[11px] font-mono font-bold text-white bg-red-950/90 border border-red-500 px-2 py-0.5 rounded-full whitespace-nowrap shadow-[0_0_15px_rgba(239,68,68,1)] animate-bounce">
              BOOOO! 👻🩸
            </span>
          )}
        </div>
      </div>

      {/* Ghost 2: Drifting high-altitude spirit wandering right-to-left */}
      <div
        className="absolute pointer-events-auto cursor-pointer group"
        style={{
          top: "45%",
          right: "8%",
          animation: "ghostFloat2 28s ease-in-out infinite alternate",
        }}
        onClick={() => handleGhostClick(2)}
        title="Lost soul of the cloud graveyard... click to interact!"
      >
        <div className="relative hover:scale-125 transition-transform duration-500">
          <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full scale-150 animate-pulse" />

          <svg
            viewBox="0 0 100 130"
            className={`w-20 h-28 sm:w-28 sm:h-36 drop-shadow-[0_0_20px_rgba(147,197,253,0.7)] filter ${
              screamingGhost === 2
                ? "scale-125 drop-shadow-[0_0_35px_rgba(239,68,68,1)]"
                : "opacity-80 group-hover:opacity-100"
            }`}
          >
            <path
              d="M50,15 C30,15 22,35 22,55 C22,78 14,95 10,120 C20,112 30,124 40,110 C50,125 60,110 70,124 C78,112 86,122 92,118 C88,95 78,78 78,55 C78,35 70,15 50,15 Z"
              fill="url(#ghostGrad2)"
            />
            {/* Hollow Eyes */}
            <ellipse cx="42" cy="46" rx="4.5" ry="7" fill="#09090b" />
            <circle cx="42" cy="47" r="1.2" fill="#38bdf8" />

            <ellipse cx="58" cy="46" rx="4.5" ry="7" fill="#09090b" />
            <circle cx="58" cy="47" r="1.2" fill="#38bdf8" />

            {/* Creepy Slit Smile */}
            <path d="M42,66 Q50,74 58,66" stroke="#09090b" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            <defs>
              <radialGradient id="ghostGrad2" cx="50%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#e0f2fe" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
              </radialGradient>
            </defs>
          </svg>

          {screamingGhost === 2 && (
            <span className="absolute -top-6 right-0 text-[11px] font-mono font-bold text-cyan-300 bg-neutral-950/90 border border-cyan-500 px-2 py-0.5 rounded-full whitespace-nowrap shadow-[0_0_15px_rgba(56,189,248,1)] animate-bounce">
              JOIN US... 👻⚡
            </span>
          )}
        </div>
      </div>

      {/* Ghost 3: Deep lower mist spirit rising upwards */}
      <div
        className="absolute pointer-events-auto cursor-pointer group hidden md:block"
        style={{
          bottom: "15%",
          left: "25%",
          animation: "ghostFloat3 20s ease-in-out infinite alternate",
        }}
        onClick={() => handleGhostClick(3)}
      >
        <div className="relative hover:scale-125 transition-transform duration-500">
          <svg
            viewBox="0 0 100 130"
            className="w-16 h-24 sm:w-22 sm:h-30 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] opacity-70 group-hover:opacity-100"
          >
            <path
              d="M50,15 C32,15 25,35 25,55 C25,78 18,95 12,118 C22,112 32,122 40,110 C50,122 60,110 70,122 C78,112 86,120 90,116 C86,95 75,78 75,55 C75,35 68,15 50,15 Z"
              fill="rgba(255,255,255,0.85)"
            />
            <ellipse cx="43" cy="46" rx="4" ry="6" fill="#09090b" />
            <ellipse cx="57" cy="46" rx="4" ry="6" fill="#09090b" />
            <ellipse cx="50" cy="64" rx="5" ry="8" fill="#09090b" />
          </svg>
        </div>
      </div>

      <style jsx global>{`
        @keyframes ghostFloat1 {
          0% {
            transform: translate(0px, 0px) rotate(-3deg) scale(0.95);
          }
          33% {
            transform: translate(60px, -45px) rotate(4deg) scale(1.05);
          }
          66% {
            transform: translate(25px, 35px) rotate(-2deg) scale(1);
          }
          100% {
            transform: translate(90px, -20px) rotate(3deg) scale(1.08);
          }
        }

        @keyframes ghostFloat2 {
          0% {
            transform: translate(0px, 0px) rotate(2deg) scale(1);
          }
          50% {
            transform: translate(-70px, -60px) rotate(-4deg) scale(1.06);
          }
          100% {
            transform: translate(-30px, 40px) rotate(3deg) scale(0.92);
          }
        }

        @keyframes ghostFloat3 {
          0% {
            transform: translate(0px, 0px) scale(0.9);
          }
          50% {
            transform: translate(40px, -50px) scale(1.1);
          }
          100% {
            transform: translate(-20px, -80px) scale(1);
          }
        }
      `}</style>
    </div>
  );
};
