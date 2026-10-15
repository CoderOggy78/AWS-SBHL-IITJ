"use client";

import React, { useState, useEffect } from "react";
// Halloween Nightmare Components
import { HalloweenNavbar } from "@/components/halloween/HalloweenNavbar";
import { HalloweenHero } from "@/components/halloween/HalloweenHero";
import { HalloweenTeamDirectory } from "@/components/halloween/HalloweenTeamDirectory";
import { HalloweenCurriculum } from "@/components/halloween/HalloweenCurriculum";
import { HalloweenLecturesSection } from "@/components/halloween/HalloweenLecturesSection";
import { HalloweenCertifications } from "@/components/halloween/HalloweenCertifications";
import { HalloweenFooter } from "@/components/halloween/HalloweenFooter";
import { HalloweenAtmosphere } from "@/components/halloween/HalloweenAtmosphere";

// Clean Daylight Components (for toggle)
import { CleanNavbar } from "@/components/antigravity/CleanNavbar";
import { CleanHero } from "@/components/antigravity/CleanHero";
import { IconRibbonSection } from "@/components/antigravity/IconRibbonSection";
import { TeamFeatureShowcases } from "@/components/antigravity/TeamFeatureShowcases";
import { CleanTeamDirectory } from "@/components/antigravity/CleanTeamDirectory";
import { CleanCurriculum } from "@/components/antigravity/CleanCurriculum";
import { AwsLecturesSection } from "@/components/antigravity/AwsLecturesSection";
import { CleanCertifications } from "@/components/antigravity/CleanCertifications";
import { CleanFooter } from "@/components/antigravity/CleanFooter";
import { CleanJoinModal } from "@/components/antigravity/CleanJoinModal";

export default function HomePage() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  // Default to ultra-realistic very dark Halloween theme as requested
  const [theme, setTheme] = useState<"halloween" | "clean">("halloween");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "halloween" ? "clean" : "halloween"));
  };

  const isHalloween = theme === "halloween";

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${
        isHalloween
          ? "bg-neutral-950 text-white selection:bg-orange-500/30 selection:text-orange-200 theme-halloween"
          : "bg-white text-neutral-900 selection:bg-sky-500/20 selection:text-black"
      }`}
    >
      {isHalloween ? (
        <>
          {/* Spooky Atmospheric Layer (Flying Witch on Broomstick, Bat Swarms, Ground Fog, Spiderwebs, Procedural Horror Audio) */}
          <HalloweenAtmosphere />

          {/* Dark Gothic Top Navbar */}
          <HalloweenNavbar
            onOpenJoinModal={() => setJoinModalOpen(true)}
          />

          <main className="flex-1">
            {/* 1. Ultra-Realistic Horror Hero with 3D Three.js Jack-o'-Lantern & Haunted Mansion */}
            <HalloweenHero onOpenJoinModal={() => setJoinModalOpen(true)} />

            {/* 2. Council of Shadows: Complete AWS SBG IITJ Team Directory with Updated Full Names */}
            <HalloweenTeamDirectory />

            {/* 4. Path of Shadows: Zero-to-Hero Cloud Curriculum Roadmap */}
            <HalloweenCurriculum />

            {/* 5. Forbidden Grimoire: 50 Free AWS Masterclasses Video Library */}
            <HalloweenLecturesSection />

            {/* 6. 100 Free Badges & Official AWS Certifications Grid */}
            <HalloweenCertifications />
          </main>

          {/* Gothic Graveyard Footer */}
          <HalloweenFooter />
        </>
      ) : (
        <>
          {/* Classic Daylight Google Antigravity Clean Theme */}
          <CleanNavbar onOpenJoinModal={() => setJoinModalOpen(true)} />

          {/* Floating theme toggle button for daylight mode to switch back to Halloween */}
          <button
            onClick={toggleTheme}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 text-white border border-orange-500/80 shadow-[0_0_20px_rgba(249,115,22,0.5)] font-mono text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>🎃</span>
            <span>Switch to Halloween Nightmare</span>
          </button>

          <main className="flex-1">
            <CleanHero onOpenJoinModal={() => setJoinModalOpen(true)} />
            <IconRibbonSection />
            <TeamFeatureShowcases onOpenJoinModal={() => setJoinModalOpen(true)} />
            <CleanTeamDirectory />
            <CleanCurriculum />
            <AwsLecturesSection />
            <CleanCertifications />
          </main>

          <CleanFooter />
        </>
      )}

      {/* Community Onboarding Join Modal */}
      <CleanJoinModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
      />
    </div>
  );
}
