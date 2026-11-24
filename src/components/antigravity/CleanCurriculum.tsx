"use client";

import React, { useState } from "react";
import { CLOUD_ROADMAP_STAGES } from "@/data/roadmap";
import { Compass, CheckCircle2 } from "lucide-react";

export const CleanCurriculum: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<number>(0);
  const current = CLOUD_ROADMAP_STAGES[selectedPhase];

  return (
    <section id="curriculum" className="py-24 bg-[#030712] border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-900 border border-white/10 mb-3">
            <Compass className="w-3.5 h-3.5 text-slate-400" />
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
              className={`p-5 rounded-xl border text-left transition-colors cursor-pointer ${
                selectedPhase === idx
                  ? "bg-[#0d1527] text-white border-white/20 shadow-sm"
                  : "bg-[#070c18] text-slate-300 border-white/10 hover:bg-[#0a1122]"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className={selectedPhase === idx ? "text-white font-bold" : "text-slate-400 font-bold"}>
                  Phase 0{idx + 1}
                </span>
                <span className={selectedPhase === idx ? "text-slate-300" : "text-slate-500"}>
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

        {/* Active Phase Deep Dive */}
        <div className="bg-[#070c18] p-8 sm:p-10 rounded-2xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 text-slate-300 border border-white/10">
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
                <div className="text-xs font-mono uppercase text-slate-300 font-semibold mb-3">
                  Core Skills & Topics
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.keySkills.map((skill, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#040814] border border-white/10 text-xs text-slate-300">
                <span className="font-bold text-white">Milestone Checkpoint: </span>
                {current.checkpoint}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="p-5 rounded-xl bg-[#040814] border border-white/10">
                <div className="text-xs font-mono uppercase text-slate-300 font-semibold mb-3">
                  Featured AWS Services
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.awsServices.map((svc, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] text-slate-300 border border-white/10"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#040814] border border-white/10">
                <div className="text-xs font-mono uppercase text-slate-300 font-semibold mb-3">
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
