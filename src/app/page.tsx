"use client";

import React, { useState, useEffect } from "react";
import { CleanNavbar } from "@/components/antigravity/CleanNavbar";
import { CleanHero } from "@/components/antigravity/CleanHero";
import { CloudGuyAnimation } from "@/components/antigravity/CloudGuyAnimation";
import { TeamFeatureShowcases } from "@/components/antigravity/TeamFeatureShowcases";
import { CleanTeamDirectory } from "@/components/antigravity/CleanTeamDirectory";
import { CleanCurriculum } from "@/components/antigravity/CleanCurriculum";
import { AwsLecturesSection } from "@/components/antigravity/AwsLecturesSection";
import { CloudResearchPapers } from "@/components/antigravity/CloudResearchPapers";
import { CleanCertifications } from "@/components/antigravity/CleanCertifications";
import { CleanFooter } from "@/components/antigravity/CleanFooter";
import { CleanJoinModal } from "@/components/antigravity/CleanJoinModal";
import SplashCursor from "@/components/ui/SplashCursor";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export default function HomePage() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  // Guarantee that refreshing the page always lands at the top main screen
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (window.location.hash) {
        try {
          window.history.replaceState(null, "", window.location.pathname);
        } catch {
          // ignore
        }
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Interactive WebGL2 Fluid Splash Cursor */}
        <SplashCursor
          rainbow
          size={1}
          force={1}
          swirl={3}
          trail={1}
          clickSplash
          colorSpeed={0.55}
          intensity={0.8}
          zIndex={30}
        />

        {/* 1. Sleek Frosted Glass Top Navbar */}
        <CleanNavbar onOpenJoinModal={() => setJoinModalOpen(true)} />

        <main className="flex-1">
          {/* 2. Futuristic Digital Flow Video Hero Section */}
          <CleanHero onOpenJoinModal={() => setJoinModalOpen(true)} />

          {/* 3. Interactive 3D Club Animation: Builder Sitting on Cloud */}
          <CloudGuyAnimation />

          {/* 4. 2-Column Team Feature Showcases with Neon Aura Glow Cards */}
          <TeamFeatureShowcases onOpenJoinModal={() => setJoinModalOpen(true)} />

          {/* 5. Complete AWS SBG IITJ Team Directory */}
          <CleanTeamDirectory />

          {/* 6. Zero-to-Hero Cloud Curriculum Roadmap */}
          <CleanCurriculum />

          {/* 7. Free AWS Video Lectures & Masterclasses */}
          <AwsLecturesSection />

          {/* 8. Seminal Cloud & Distributed Systems Research Papers + CLI Labs */}
          <CloudResearchPapers />

          {/* 9. 100 Free Badges & Certifications Grid */}
          <CleanCertifications />
        </main>

        {/* 9. Sleek Obsidian Dark Footer */}
        <CleanFooter />

        {/* 10. Community Onboarding Join Modal */}
        <CleanJoinModal
          isOpen={joinModalOpen}
          onClose={() => setJoinModalOpen(false)}
        />
      </div>
    </SmoothScroll>
  );
}
