"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Skull, Volume2, VolumeX } from "lucide-react";

interface HalloweenNavbarProps {
  onOpenJoinModal: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

export const HalloweenNavbar: React.FC<HalloweenNavbarProps> = ({
  onOpenJoinModal,
  soundEnabled = true,
  onToggleSound,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-neutral-950/90 backdrop-blur-md border-b border-orange-950/60 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-neutral-950/40 backdrop-blur-xs border-b border-neutral-900/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 group-hover:border-orange-500/60 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center p-1">
            <Image
              src="/brand/aws-sbg-chip-purple.png"
              alt="AWS SBG Logo"
              width={32}
              height={32}
              className="object-contain group-hover:scale-110 transition-transform"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-orange-400 transition-colors">
                AWS SBG IIT JODHPUR
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-red-950/80 text-red-400 border border-red-700/60 font-semibold shadow-[0_0_8px_rgba(220,38,38,0.5)] flex items-center gap-1">
                <Flame className="w-2.5 h-2.5 text-orange-400 animate-pulse" />
                HALLOWEEN
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono hidden sm:block">
              Student Builders Group • Nightmare Abyss Edition
            </p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-xs">
          <a
            href="#team-directory"
            className="text-neutral-400 hover:text-orange-400 transition-colors flex items-center gap-1.5 py-1"
          >
            <Skull className="w-3.5 h-3.5 text-orange-500" />
            Guild Council (Team)
          </a>
          <a
            href="#curriculum-roadmap"
            className="text-neutral-400 hover:text-orange-400 transition-colors py-1"
          >
            Path of Shadows
          </a>
          <a
            href="#video-library"
            className="text-neutral-400 hover:text-orange-400 transition-colors py-1"
          >
            Dark Archives
          </a>
          <a
            href="#certifications"
            className="text-neutral-400 hover:text-orange-400 transition-colors py-1"
          >
            Grimoire Badges
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Sound On / Off Button */}
          {onToggleSound && (
            <button
              onClick={onToggleSound}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono font-bold transition-all transform hover:scale-105 active:scale-95 cursor-pointer select-none ${
                soundEnabled
                  ? "bg-red-950/90 border-red-600/90 text-red-300 shadow-[0_0_15px_rgba(220,38,38,0.6)] hover:bg-red-900/90"
                  : "bg-neutral-900/90 border-neutral-700/70 text-neutral-400 hover:text-white hover:border-neutral-500"
              }`}
              title={soundEnabled ? "Turn Horror Music OFF" : "Turn Horror Music ON (Default)"}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                  <span className="hidden sm:inline">SOUND ON</span>
                  {/* Equalizer animation waves */}
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-2 bg-red-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-0.5 h-3 bg-red-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-0.5 h-1.5 bg-red-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="hidden sm:inline">SOUND OFF</span>
                </>
              )}
            </button>
          )}

          {/* Summon Guild CTA */}
          <button
            onClick={onOpenJoinModal}
            className="relative group px-4 py-2 rounded-full overflow-hidden font-medium text-xs sm:text-sm text-white shadow-[0_0_20px_rgba(234,88,12,0.5)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-amber-600 group-hover:opacity-90 transition-opacity" />
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent)]" />
            <span className="relative flex items-center gap-1.5 font-bold tracking-wide">
              <span>🎃</span>
              <span>Join Group</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
