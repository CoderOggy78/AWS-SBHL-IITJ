"use client";

import React from "react";
import { BuilderChip } from "@/components/ui/Logo";
import { Laptop } from "lucide-react";

interface CleanHeroProps {
  onOpenJoinModal: () => void;
}

export const CleanHero: React.FC<CleanHeroProps> = ({ onOpenJoinModal }) => {
  return (
    <section className="relative min-h-[640px] sm:min-h-[720px] lg:h-[86vh] lg:max-h-[850px] flex flex-col justify-center items-center px-4 pt-12 pb-16 overflow-hidden bg-[#030712] text-center">
      {/* Background Video Layer */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/videos/abstract-digital-flow.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric Vignette & Depth Gradient Overlays matching video palette */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-transparent to-[#030712] pointer-events-none" />

      {/* Seamless Bottom Obsidian Fade into the rest of the dark page (No white cutoff!) */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none z-10" />

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center">
        {/* Brand Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 mb-6 select-none px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
          <BuilderChip size={18} variant="cyan" />
          <span>AWS Student Builder Group IITJ</span>
        </div>

        {/* High-Contrast Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl">
          Experience liftoff with the
          <br className="hidden sm:inline" /> student cloud builder group
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
          The official cloud engineering community at Indian Institute of Technology Jodhpur.
          Architecting real-world systems, serverless microservices, and AI with Amazon Bedrock.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenJoinModal}
            className="flex items-center gap-2 text-sm px-6 py-3 rounded-xl font-semibold bg-white hover:bg-slate-100 text-slate-950 transition-colors border border-white/20 cursor-pointer"
          >
            <Laptop className="w-4 h-4" />
            <span>Join AWS SBG IITJ</span>
          </button>

          <a
            href="#lectures"
            className="flex items-center gap-2 text-sm px-6 py-3 rounded-xl font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-md transition-colors cursor-pointer"
          >
            <span>Free AWS Video Lectures</span>
          </a>
        </div>
      </div>
    </section>
  );
};
