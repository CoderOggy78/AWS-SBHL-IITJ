"use client";

import React, { useState } from "react";
import { CLOUD_ROADMAP_STAGES } from "@/data/roadmap";
import { Flame, CheckCircle2, Award, ChevronRight, Skull } from "lucide-react";
import { horrorAudio } from "./HorrorSoundManager";
import { HauntedScarecrow } from "./HauntedScarecrow";

export const HalloweenCurriculum: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<number>(0);
  const current = CLOUD_ROADMAP_STAGES[selectedPhase];

  return (
    <section id="curriculum-roadmap" className="py-24 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-red-950/80 text-red-400 border border-red-800/60 mb-3 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            Path of Shadows • Curriculum Roadmap
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Zero-to-Hero Dark Cloud Mastery
          </h2>
          <p className="mt-3 text-base text-neutral-400 font-light">
            A battle-tested milestone pathway taking student developers from systems fundamentals
            to enterprise cloud architectures, serverless fortresses, and GenAI with Amazon Bedrock.
          </p>
        </div>

        {/* Phase Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {CLOUD_ROADMAP_STAGES.map((stage, idx) => (
            <button
              key={stage.id}
              onClick={() => {
                horrorAudio.playWhisperStinger();
                setSelectedPhase(idx);
              }}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedPhase === idx
                  ? "bg-gradient-to-br from-red-950/80 via-neutral-900 to-orange-950/80 text-white border-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.4)] scale-102"
                  : "bg-neutral-900/60 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className={selectedPhase === idx ? "text-orange-400 font-bold" : "text-neutral-500 font-bold"}>
                  Grimoire Phase 0{idx + 1}
                </span>
                <span className={selectedPhase === idx ? "text-neutral-300" : "text-neutral-500"}>
                  {stage.estimatedWeeks}
                </span>
              </div>
              <h4 className="text-sm font-bold mb-1 line-clamp-1 text-white">
                {stage.title.split(": ")[1] || stage.title}
              </h4>
              <p className={`text-xs line-clamp-2 ${selectedPhase === idx ? "text-neutral-300" : "text-neutral-500"}`}>
                {stage.description}
              </p>
            </button>
          ))}
        </div>

        {/* Active Phase Deep Dive in Dark Obsidian Box */}
        <div className="rounded-3xl p-8 sm:p-12 bg-neutral-900/80 shadow-2xl border border-neutral-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Haunted Scarecrow Guarding the Grimoire Pathway */}
          <div className="absolute -bottom-6 -right-4 hidden xl:block pointer-events-auto z-0 opacity-85">
            <HauntedScarecrow variant="left" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-neutral-950 text-orange-400 border border-orange-900/60">
                  {current.level} • {current.estimatedWeeks}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {current.title}
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                {current.description}
              </p>

              <div>
                <div className="text-xs font-mono uppercase text-orange-400 font-semibold mb-3 flex items-center gap-1.5">
                  <Skull className="w-3.5 h-3.5" />
                  Core Skills & Necromancer Spells
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.keySkills.map((skill, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950/80 border border-orange-950/80 text-xs text-neutral-300">
                <span className="font-bold text-orange-400">Milestone Checkpoint: </span>
                {current.checkpoint}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                <div className="text-xs font-mono uppercase text-neutral-400 font-semibold mb-3">
                  Featured AWS Cloud Services
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.awsServices.map((svc: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-neutral-900 text-neutral-200 border border-neutral-800 hover:border-orange-500/50 transition-colors"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                <div className="text-xs font-mono uppercase text-neutral-400 font-semibold mb-2">
                  Target Certification
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{current.recommendedCert}</h5>
                    <p className="text-[11px] text-neutral-400 font-mono">Industry recognized AWS credential</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
