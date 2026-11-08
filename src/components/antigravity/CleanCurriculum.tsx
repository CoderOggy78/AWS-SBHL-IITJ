"use client";

import React, { useState } from "react";
import { CLOUD_ROADMAP_STAGES } from "@/data/roadmap";
import { Compass, CheckCircle2 } from "lucide-react";

export const CleanCurriculum: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<number>(0);
  const current = CLOUD_ROADMAP_STAGES[selectedPhase];

  return (
    <section id="curriculum" className="py-24 bg-[#030712] border-t border-cyan-500/15 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            Curriculum Roadmap 2026-27
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Zero-to-Hero Cloud Curriculum
          </h2>
          <p className="mt-3 text-base text-slate-300">
            A structured milestone pathway taking student developers from systems fundamentals
            to enterprise cloud architectures and generative AI with Amazon Bedrock.
          </p>
        </div>

        {/* Phase Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {CLOUD_ROADMAP_STAGES.map((stage, idx) => (
            <button
              key={stage.id}
              onClick={() => setSelectedPhase(idx)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedPhase === idx
                  ? "bg-gradient-to-br from-cyan-950/80 to-[#070e20] text-white border-cyan-400/60 shadow-[0_0_25px_rgba(6,182,212,0.25)] scale-102"
                  : "bg-[#060c1d]/80 text-slate-300 border-cyan-500/15 hover:bg-[#081226] hover:border-cyan-500/30"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className={selectedPhase === idx ? "text-cyan-400 font-bold" : "text-slate-400 font-bold"}>
                  Phase 0{idx + 1}
                </span>
                <span className={selectedPhase === idx ? "text-cyan-200" : "text-slate-500"}>
                  {stage.estimatedWeeks}
                </span>
              </div>
              <h4 className="text-sm font-bold mb-1 text-white line-clamp-1">
                {stage.title.split(": ")[1] || stage.title}
              </h4>
              <p className={`text-xs line-clamp-2 ${selectedPhase === idx ? "text-slate-300" : "text-slate-400"}`}>
                {stage.description}
              </p>
            </button>
          ))}
        </div>

        {/* Active Phase Deep Dive in Futuristic Box */}
        <div className="bg-[#060c1d]/90 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-cyan-500/25 shadow-2xl shadow-black/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  {current.level} • {current.estimatedWeeks}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {current.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {current.description}
              </p>

              <div>
                <div className="text-xs font-mono uppercase text-cyan-400 font-semibold mb-3">
                  Core Skills & Topics
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.keySkills.map((skill, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#030712] border border-cyan-500/20 text-xs text-slate-300">
                <span className="font-bold text-cyan-300">Milestone Checkpoint: </span>
                {current.checkpoint}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="p-5 rounded-2xl bg-[#030712] border border-cyan-500/20">
                <div className="text-xs font-mono uppercase text-cyan-400 font-semibold mb-3">
                  Featured AWS Services
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.awsServices.map((svc, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-cyan-300 border border-cyan-500/25 shadow-xs"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#030712] border border-cyan-500/20">
                <div className="text-xs font-mono uppercase text-cyan-400 font-semibold mb-3">
                  Recommended Credential
                </div>
                <div className="text-sm font-bold text-white">
                  {current.recommendedCert}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
