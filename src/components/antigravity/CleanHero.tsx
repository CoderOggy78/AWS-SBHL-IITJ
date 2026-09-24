"use client";

import React from "react";
import { WhiteParticles } from "./WhiteParticles";
import { BuilderChip } from "@/components/ui/Logo";
import { Laptop, ArrowRight } from "lucide-react";

interface CleanHeroProps {
  onOpenJoinModal: () => void;
}

export const CleanHero: React.FC<CleanHeroProps> = ({ onOpenJoinModal }) => {
  return (
    <section className="relative min-h-[75vh] sm:min-h-[82vh] flex flex-col justify-center items-center px-4 pt-12 pb-20 overflow-hidden bg-white text-center">
      {/* Background Particles (Image 1 style) */}
      <WhiteParticles />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Brand Eyebrow (Image 1 style) */}
        <div className="flex items-center gap-2 mb-6 select-none">
          <BuilderChip size={22} variant="purple" />
          <span className="text-sm font-semibold tracking-tight text-neutral-900">
            AWS Student Builder Group IITJ
          </span>
        </div>

        {/* Huge High-Contrast Headline (Exact Image 1 Style) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.08] max-w-4xl">
          Experience liftoff with the
          <br className="hidden sm:inline" /> student cloud builder group
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-neutral-600 max-w-2xl font-normal leading-relaxed">
          The official cloud engineering community at Indian Institute of Technology Jodhpur.
          Architecting real-world systems, serverless microservices, and AI with Amazon Bedrock.
        </p>

        {/* Action Buttons (Exact Image 1 Style) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onOpenJoinModal}
            className="ag-btn-black flex items-center gap-2 text-sm sm:text-base px-6 py-3 shadow-sm cursor-pointer"
          >
            <Laptop className="w-4 h-4" />
            <span>Join AWS SBG IITJ</span>
          </button>

          <a
            href="#lectures"
            className="ag-btn-light text-sm sm:text-base px-6 py-3 cursor-pointer"
          >
            <span>Free AWS Video Lectures</span>
          </a>
        </div>
      </div>
    </section>
  );
};
