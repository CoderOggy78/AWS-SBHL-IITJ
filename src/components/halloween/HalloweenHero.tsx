"use client";

import React from "react";
import Image from "next/image";
import { Halloween3DScene } from "./Halloween3DScene";
import { Zap, Flame, Shield, ArrowRight, Skull, Sparkles } from "lucide-react";
import { horrorAudio } from "./HorrorSoundManager";

interface HalloweenHeroProps {
  onOpenJoinModal: () => void;
}

export const HalloweenHero: React.FC<HalloweenHeroProps> = ({ onOpenJoinModal }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-neutral-950">
      {/* 1. Cinematic Background Video Layer: Scary Halloween Mask */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <video
          src="/halloween/mask-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(220,38,38,0.25)_0%,_rgba(0,0,0,0.85)_80%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Sinister Horror Headline & CTAs (7 Cols) */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Sinister Edition Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-700/60 shadow-[0_0_20px_rgba(220,38,38,0.6)] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-mono font-semibold tracking-wider text-red-200 uppercase">
                🎃 ALL HALLOWS' EVE • NIGHTMARE EDITION
              </span>
            </div>

            {/* Main Headline with Horror Typography */}
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
                AWS STUDENT
              </h2>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-horror tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-red-600 drop-shadow-[0_0_40px_rgba(249,115,22,0.85)] leading-[1.05] py-1">
                BUILDERS GROUP
              </h1>
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-300 font-mono tracking-tight pt-1">
                IIT JODHPUR CHAPTER
              </h3>
            </div>

            {/* Gothic Atmospheric Description */}
            <p className="text-base sm:text-lg text-neutral-300/90 max-w-2xl font-light leading-relaxed">
              Summon resilient cloud-native architectures, serverless workloads that fear no graveyard crash,
              and AI/ML systems powered by Amazon Web Services. The darkness has awakened — enter the student builder group.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenJoinModal}
                className="group relative px-6 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:shadow-[0_0_45px_rgba(239,68,68,0.9)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer font-mono"
              >
                <span>🎃</span>
                <span>Join the Builders</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  horrorAudio.playWhisperStinger();
                  const target = document.getElementById("team-directory");
                  target?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-full bg-neutral-900/90 border border-neutral-700 hover:border-orange-500/70 text-neutral-200 hover:text-orange-400 font-mono text-sm tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Meet the Team</span>
              </button>
            </div>

            {/* Horror Stat Badges with SF Mono font */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-neutral-800/80">
              <div className="p-3.5 rounded-2xl bg-neutral-900/70 border border-orange-950/60 shadow-lg">
                <div className="text-xl sm:text-2xl font-black text-orange-400 font-mono">100+</div>
                <div className="text-[11px] text-neutral-400 font-mono uppercase mt-0.5">Free Badges</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-900/70 border border-red-950/60 shadow-lg">
                <div className="text-xl sm:text-2xl font-black text-red-400 font-mono">50+</div>
                <div className="text-[11px] text-neutral-400 font-mono uppercase mt-0.5">Dark Lectures</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-900/70 border border-emerald-950/60 shadow-lg">
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">99.99%</div>
                <div className="text-[11px] text-neutral-400 font-mono uppercase mt-0.5">Uptime SLA</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-900/70 border border-purple-950/60 shadow-lg">
                <div className="text-xl sm:text-2xl font-black text-purple-400 font-mono">15+</div>
                <div className="text-[11px] text-neutral-400 font-mono uppercase mt-0.5">Core Builders</div>
              </div>
            </div>
          </div>

          {/* Right Column: Seamless Ultra-Realistic 3D Jack-o'-Lantern floating with Fire Aura (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] lg:min-h-[540px]">
            {/* Volumetric Radial Fire Flame Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(249,115,22,0.4)_0%,_rgba(220,38,38,0.22)_45%,_transparent_75%)] blur-3xl pointer-events-none" />

            {/* Seamless 3D Canvas (No ugly square black box!) */}
            <div className="relative w-full h-[460px] sm:h-[520px] flex items-center justify-center">
              <Halloween3DScene className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
