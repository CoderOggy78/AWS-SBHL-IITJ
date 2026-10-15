"use client";

import React, { useState } from "react";
import { horrorAudio } from "./HorrorSoundManager";

interface HauntedScarecrowProps {
  className?: string;
  variant?: "left" | "right";
}

export const HauntedScarecrow: React.FC<HauntedScarecrowProps> = ({
  className = "",
  variant = "right",
}) => {
  const [triggered, setTriggered] = useState(false);

  const handleClick = () => {
    setTriggered(true);
    horrorAudio.playThunder();
    setTimeout(() => setTriggered(false), 2200);
  };

  return (
    <div
      className={`select-none pointer-events-auto cursor-pointer group transition-transform duration-300 hover:scale-105 ${className}`}
      onClick={handleClick}
      title="The Cursed Cornfield Scarecrow... click if you dare awaken it!"
    >
      <div className="relative">
        {/* Sinister Red Ember Glow Behind Head */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-20 bg-orange-600/30 blur-xl rounded-full group-hover:bg-red-600/50 transition-colors animate-pulse" />

        <svg
          viewBox="0 0 140 220"
          className={`w-36 h-56 sm:w-48 sm:h-72 drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] filter transition-all ${
            triggered ? "scale-110 drop-shadow-[0_0_30px_rgba(239,68,68,1)]" : ""
          } ${variant === "left" ? "-scale-x-100" : ""}`}
          style={{ animation: "scarecrowSway 6s ease-in-out infinite alternate" }}
        >
          {/* Wooden Cross Post */}
          <rect x="65" y="60" width="10" height="155" fill="#451a03" stroke="#291203" strokeWidth="1" />
          <rect x="20" y="75" width="100" height="9" fill="#451a03" stroke="#291203" strokeWidth="1" />

          {/* Straw sticking out from neck and post */}
          <path d="M60,65 L50,80 M70,66 L78,82 M65,68 L60,86 M75,68 L88,80" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />

          {/* Tattered ragged coat */}
          <path
            d="M35,76 L65,70 L105,76 L112,145 L95,140 L88,160 L75,138 L65,162 L55,140 L42,158 L28,145 Z"
            fill="#18181b"
            stroke="#27272a"
            strokeWidth="1.5"
          />

          {/* Blood splatters on coat */}
          <circle cx="58" cy="110" r="3.5" fill="#991b1b" />
          <circle cx="62" cy="116" r="2" fill="#7f1d1d" />
          <path d="M85,105 Q87,120 85,132" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" />

          {/* Straw arms and clawing branch fingers */}
          <path d="M22,78 L5,85 L-2,98 M20,80 L2,88 M22,82 L8,102" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M118,78 L135,85 L142,98 M120,80 L138,88 M118,82 L132,102" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" />

          {/* Evil Carved Pumpkin Head */}
          <ellipse cx="70" cy="40" rx="26" ry="24" fill="#c2410c" stroke="#7c2d12" strokeWidth="1.5" />
          <ellipse cx="70" cy="40" rx="18" ry="24" fill="#ea580c" />
          <ellipse cx="70" cy="40" rx="8" ry="24" fill="#f97316" />

          {/* Twisted Pumpkin Stem */}
          <path d="M70,18 C70,8 78,5 82,2" stroke="#15803d" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Carved Sinister Slit Flame Eyes */}
          <polygon points="56,33 64,36 58,41" fill="#fef08a" stroke="#dc2626" strokeWidth="0.8" className="animate-pulse" />
          <polygon points="84,33 76,36 82,41" fill="#fef08a" stroke="#dc2626" strokeWidth="0.8" className="animate-pulse" />

          {/* Triangle Nose */}
          <polygon points="70,42 67,47 73,47" fill="#fef08a" />

          {/* Jagged demonic stitched smile with yellow flame glow inside */}
          <path
            d="M52,50 Q70,68 88,50 Q70,58 52,50 Z"
            fill="#fef08a"
            stroke="#7f1d1d"
            strokeWidth="1.5"
          />
          {/* Stitches across mouth */}
          <line x1="58" y1="51" x2="58" y2="57" stroke="#450a0a" strokeWidth="1.8" />
          <line x1="64" y1="53" x2="64" y2="61" stroke="#450a0a" strokeWidth="1.8" />
          <line x1="70" y1="54" x2="70" y2="62" stroke="#450a0a" strokeWidth="1.8" />
          <line x1="76" y1="53" x2="76" y2="61" stroke="#450a0a" strokeWidth="1.8" />
          <line x1="82" y1="51" x2="82" y2="57" stroke="#450a0a" strokeWidth="1.8" />

          {/* Perched Black Crow on Right Shoulder with glowing red eye */}
          <path d="M102,72 C106,62 118,60 124,65 C122,74 116,78 108,80 Z" fill="#09090b" />
          <polygon points="124,64 132,66 123,68" fill="#d97706" />
          <circle cx="120" cy="64" r="1.5" fill="#ef4444" className="animate-ping" />
        </svg>

        {triggered && (
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-orange-400 bg-neutral-950/95 border border-red-600 px-2.5 py-1 rounded-full whitespace-nowrap shadow-[0_0_15px_rgba(239,68,68,1)] animate-bounce z-20">
            THE CROWS ARE HUNGRY... 🎃🦅
          </span>
        )}
      </div>

      <style jsx>{`
        @keyframes scarecrowSway {
          0% {
            transform: rotate(-1.5deg);
          }
          100% {
            transform: rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
};
