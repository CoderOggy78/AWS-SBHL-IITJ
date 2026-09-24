"use client";

import React from "react";
import { ArrowRight, Sparkles, ExternalLink, Rocket } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

interface CTASectionProps {
  onLaunchOS: () => void;
  onOpenJoinModal: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onLaunchOS,
  onOpenJoinModal,
}) => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900 to-[#040812] p-8 sm:p-14 lg:p-20 text-center shadow-2xl">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/20 via-purple-500/20 to-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Antigravity Pill */}
          <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-sky-500/15 text-sky-400 border border-sky-500/30 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Ready for Liftoff
          </div>

          {/* Heading */}
          <h2 className="relative z-10 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Achieve new heights with the AWS Student Builders Guild
          </h2>

          <p className="relative z-10 mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Turn your ideas into production-ready cloud architectures. Join our community
            at IIT Jodhpur and build alongside passionate student developers and cloud mentors.
          </p>

          {/* Action CTAs */}
          <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenJoinModal}
              className="ag-button ag-button-primary text-sm sm:text-base px-7 py-3.5 shadow-xl shadow-sky-500/30 group"
            >
              <span>Join Guild Community</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://github.com/aws-sbg-iitj"
              target="_blank"
              rel="noopener noreferrer"
              className="ag-button ag-button-secondary text-sm sm:text-base px-6 py-3.5 flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Explore GitHub</span>
            </a>

            <button
              onClick={onLaunchOS}
              className="ag-button ag-button-secondary text-sm sm:text-base px-6 py-3.5 border-amber-500/30 hover:border-amber-500/60"
            >
              <span className="mr-2">🚀</span>
              <span>Launch Cloud OS</span>
            </button>
          </div>

          {/* Micro Guarantee Note */}
          <p className="relative z-10 mt-6 text-xs font-mono text-slate-400">
            Free membership • No cloud experience required • 100% Student-Driven
          </p>
        </div>
      </div>
    </section>
  );
};
