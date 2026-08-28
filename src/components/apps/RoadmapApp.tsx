"use client";

import React, { useState } from "react";
import { CLOUD_ROADMAP_STAGES, RoadmapMilestone } from "@/data/roadmap";
import {
  Compass,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Award,
  Layers,
  Cpu,
  BookOpen,
  Code2,
  Target,
  ChevronRight,
} from "lucide-react";
import { SOCIAL_LINKS } from "@/config/socials";

export const RoadmapApp: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>("stage-1");
  const [levelFilter, setLevelFilter] = useState<string>("All");

  const activeStage =
    CLOUD_ROADMAP_STAGES.find((s) => s.id === selectedStageId) ||
    CLOUD_ROADMAP_STAGES[0];

  const filteredStages = CLOUD_ROADMAP_STAGES.filter((s) => {
    if (levelFilter === "All") return true;
    return s.level === levelFilter;
  });

  const getLevelBadge = (level: "Beginner" | "Intermediate" | "Advanced") => {
    switch (level) {
      case "Beginner":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Intermediate":
        return "bg-sky-500/20 text-sky-300 border-sky-500/30";
      case "Advanced":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    }
  };

  return (
    <div className="flex flex-col h-full font-sans select-none bg-slate-950/95 text-slate-100">
      {/* Top Banner Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/70 space-y-2 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white tracking-tight">
                  Cloud Engineering Roadmap
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-semibold">
                  Beginner &rarr; Advanced
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Curated curriculum for student builders at IIT Jodhpur to master cloud infrastructure, serverless & GenAI
              </p>
            </div>
          </div>

          {/* Level Filter Pills */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="text-slate-500 text-[11px]">Level:</span>
            {["All", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                  levelFilter === lvl
                    ? "bg-emerald-600 text-white font-semibold shadow-sm"
                    : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
            <span>Stage 1: Foundations</span>
            <span>Stage 2: Core AWS</span>
            <span>Stage 3: Serverless</span>
            <span>Stage 4: Containers & IaC</span>
            <span>Stage 5: Enterprise & GenAI</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 h-1.5 rounded-full overflow-hidden bg-slate-900 border border-slate-800">
            {CLOUD_ROADMAP_STAGES.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setSelectedStageId(st.id)}
                className={`h-full transition-all rounded-full ${
                  st.id === activeStage.id
                    ? "bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
                title={st.title}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Roadmap Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Stages List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-slate-800/80 p-3 space-y-2.5 overflow-y-auto shrink-0">
          {filteredStages.map((stage, idx) => {
            const isSelected = activeStage.id === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-emerald-400 bg-emerald-950/30 shadow-lg ring-1 ring-emerald-400/30"
                    : "border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/90 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded border ${getLevelBadge(
                      stage.level
                    )}`}
                  >
                    {stage.level}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{stage.estimatedWeeks}</span>
                  </span>
                </div>

                <h3 className="text-xs font-bold text-white mb-1.5 leading-snug">
                  {stage.title}
                </h3>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2">
                  {stage.description}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] font-mono text-slate-400">
                  <span>{stage.awsServices.length} AWS Services</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                    Explore &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Stage Deep-Dive Inspector */}
        <div className="flex-1 p-6 overflow-y-auto select-text hidden md:block">
          <div className="space-y-6 max-w-3xl">
            {/* Stage Header */}
            <div className="space-y-2 pb-5 border-b border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getLevelBadge(
                    activeStage.level
                  )}`}
                >
                  {activeStage.level} Stage
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700 bg-slate-900 text-slate-300">
                  {activeStage.estimatedWeeks}
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-white tracking-tight">
                {activeStage.title}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed">
                {activeStage.description}
              </p>
            </div>

            {/* Core Competencies & Skills */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CORE COMPETENCIES & CONCEPTS TO MASTER</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeStage.keySkills.map((skill, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 text-xs text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-emerald-400 font-mono font-bold shrink-0">•</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AWS Services Stack */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>ESSENTIAL AWS SERVICES IN THIS PHASE</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeStage.awsServices.map((service, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-900 text-xs font-mono text-slate-200"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Hands-On Practice Projects */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>HANDS-ON PROJECTS TO SHIP BEFORE ADVANCING</span>
              </h3>
              <div className="space-y-2">
                {activeStage.practiceProjects.map((project, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 text-xs text-slate-200 flex items-start gap-2.5"
                  >
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950 border border-purple-500/30 text-purple-300 font-bold shrink-0">
                      0{i + 1}
                    </span>
                    <span className="leading-relaxed">{project}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Certification & Checkpoint */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
                  <Award className="w-3.5 h-3.5" />
                  <span>TARGET CERTIFICATION BENCHMARK</span>
                </div>
                <p className="text-xs font-semibold text-white">
                  {activeStage.recommendedCert}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <Target className="w-3.5 h-3.5" />
                  <span>PHASE EXIT CHECKPOINT</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeStage.checkpoint}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <a
                href={SOCIAL_LINKS.meetup}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join Study Group on Meetup</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <span className="text-[11px] font-mono text-slate-500">
                AWS Student Builder Group • IIT Jodhpur
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
