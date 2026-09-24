"use client";

import React, { useState } from "react";
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

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-sky-500/20 selection:text-black">
      {/* 1. Clean Top Navbar (Matches Reference Images 1 & 2) */}
      <CleanNavbar onOpenJoinModal={() => setJoinModalOpen(true)} />

      <main className="flex-1">
        {/* 2. Hero Section on Pure White with Multi-Color Particles (Matches Reference Image 1) */}
        <CleanHero onOpenJoinModal={() => setJoinModalOpen(true)} />

        {/* 3. Arched Curved Icon Ribbon & Statement with Blinking Cursor (Matches Reference Image 3) */}
        <IconRibbonSection />

        {/* 5. 2-Column Team Feature Showcases with Pastel Aura Cards (Matches Reference Images 4 & 5) */}
        <TeamFeatureShowcases onOpenJoinModal={() => setJoinModalOpen(true)} />

        {/* 6. Complete AWS SBG IITJ Team Directory (Expandable on upper side click) */}
        <CleanTeamDirectory />

        {/* 7. Zero-to-Hero Cloud Curriculum Roadmap */}
        <CleanCurriculum />

        {/* 8. Free AWS Video Lectures & Masterclasses (Expandable Library with Menu Bar) */}
        <AwsLecturesSection />

        {/* 9. 100 Free Badges & Certifications Grid */}
        <CleanCertifications />
      </main>

      {/* 9. Clean Antigravity Footer */}
      <CleanFooter />

      {/* 10. Community Onboarding Join Modal */}
      <CleanJoinModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
      />
    </div>
  );
}
