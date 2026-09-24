"use client";

import React, { useState } from "react";
import { CLOUD_ROADMAP_STAGES, RoadmapMilestone } from "@/data/roadmap";
import {
  Compass,
  CheckCircle2,
  Clock,
  Sparkles,
  Server,
  ArrowRight,
  Shield,
  Layers,
} from "lucide-react";

export const RoadmapSection: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);
  const current = CLOUD_ROADMAP_STAGES[selectedMilestone];

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-[#050b14]/80 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            Curriculum Roadmap 2026-27
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Zero-to-Hero Cloud Engineering
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A structured milestone pathway taking you from basic systems and Linux fundamentals
            to enterprise cloud architectures and generative AI systems.
          </p>
        </div>

        {/* Milestone Steps Timeline Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {CLOUD_ROADMAP_STAGES.map((stage, idx) => (
            <button
              key={stage.id}
              onClick={() => setSelectedMilestone(idx)}
              className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                selectedMilestone === idx
                  ? "bg-purple-950/40 border-purple-500 shadow-xl shadow-purple-500/10 scale-102"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono uppercase text-purple-400 font-bold">
                  Phase 0{idx + 1}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {stage.estimatedWeeks}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">
                {stage.title.split(": ")[1] || stage.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2">
                {stage.description}
              </p>
            </button>
          ))}
        </div>

        {/* Active Milestone Deep Dive Card */}
        <div className="ag-card-elevated p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Skills & Description */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  {current.level} • {current.estimatedWeeks}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {current.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Key Skills Checklist */}
              <div className="mb-6">
                <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-3">
                  Core Competencies & Skills
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.keySkills.map((skill, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkpoint */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[11px] font-mono uppercase text-emerald-400 font-semibold mb-1">
                  Milestone Checkpoint
                </div>
                <p className="text-xs text-slate-300">
                  {current.checkpoint}
                </p>
              </div>
            </div>

            {/* Right Column: AWS Services & Recommended Projects */}
            <div className="lg:col-span-5 space-y-6">
              {/* Featured AWS Services */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-3">
                  Target AWS Services
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.awsServices.map((svc, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Practice Projects */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-3">
                  Practice Build Blueprints
                </div>
                <div className="space-y-2">
                  {current.practiceProjects.map((proj, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-300 p-2 rounded-lg bg-white/5"
                    >
                      <Layers className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>{proj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Credential */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
                    Target Credential
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    {current.recommendedCert}
                  </div>
                </div>
                <a
                  href="#certifications"
                  className="ag-button ag-button-secondary text-xs px-3 py-1.5 shrink-0"
                >
                  View Prep ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
