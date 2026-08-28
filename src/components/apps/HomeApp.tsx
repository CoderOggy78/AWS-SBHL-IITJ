"use client";

import React, { useState } from "react";
import { AppId } from "@/types/os";
import { BuilderChip, AwsLogo } from "@/components/ui/Logo";
import {
  Server,
  Database,
  Cpu,
  Network,
  Activity,
  ArrowRight,
  Sparkles,
  Users,
  FolderGit2,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { SOCIAL_LINKS } from "@/config/socials";

interface HomeAppProps {
  onOpenApp: (id: AppId) => void;
}

export const HomeApp: React.FC<HomeAppProps> = ({ onOpenApp }) => {
  const [activePipelineStep, setActivePipelineStep] = useState<number | null>(null);

  const pipelineSteps = [
    {
      id: "developer",
      label: "Developer",
      sub: "VS Code / CDK",
      icon: Cpu,
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      details: "Builder commits code or infrastructure synthesizers via AWS CDK in TypeScript.",
    },
    {
      id: "gateway",
      label: "API Gateway",
      sub: "HTTP & WebSocket",
      icon: Network,
      color: "text-sky-400",
      border: "border-sky-500/40",
      bg: "bg-sky-500/10",
      details: "Low-latency REST / WebSocket endpoints managing throttling, validation, and authorization.",
    },
    {
      id: "compute",
      label: "Compute",
      sub: "Lambda / Fargate",
      icon: Server,
      color: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
      details: "Serverless function execution or containerized microservices scaling automatically to zero.",
    },
    {
      id: "database",
      label: "Database",
      sub: "DynamoDB / Aurora",
      icon: Database,
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      details: "Single-digit millisecond NoSQL persistence and high-availability Aurora clusters.",
    },
    {
      id: "monitoring",
      label: "Monitoring",
      sub: "CloudWatch / X-Ray",
      icon: Activity,
      color: "text-rose-400",
      border: "border-rose-500/40",
      bg: "bg-rose-500/10",
      details: "Distributed trace visualization, automated canary synthetics, and error metrics.",
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 font-sans">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <BuilderChip size={32} variant="purple" glow={true} />
          <div>
            <h2 className="text-base font-semibold text-white tracking-tight">
              AWS Student Builder Group
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Indian Institute of Technology Jodhpur
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={SOCIAL_LINKS.meetup}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-950/20 text-red-300 hover:bg-red-900/30 text-xs font-medium transition-colors"
          >
            <span>Official Meetup</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-500/30 bg-sky-950/20 text-sky-300 hover:bg-sky-900/30 text-xs font-medium transition-colors"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-950/40 text-sky-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            BUILDER-FIRST STUDENT COMMUNITY
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Build on AWS. <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Learn Together.
            </span> <br />
            Create What’s Next.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            AWS Student Builder Group at IIT Jodhpur is a builder-first student community exploring cloud computing, software engineering, AI/ML, DevOps, distributed systems, and modern engineering.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenApp("about")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-medium text-xs shadow-lg shadow-sky-500/20 transition-all hover:scale-102 active:scale-98"
            >
              <span>Explore the Community</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenApp("leads")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium text-xs transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>Meet the Builders</span>
            </button>

            <button
              onClick={() => onOpenApp("projects")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium text-xs transition-colors"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />
              <span>View Projects</span>
            </button>

            <a
              href={SOCIAL_LINKS.meetup}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40 text-purple-300 font-medium text-xs transition-colors cursor-pointer"
              title="Join us on official Meetup"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Join Us (Meetup)</span>
              <ExternalLink className="w-3 h-3 text-purple-400" />
            </a>
          </div>
        </div>

        {/* Cloud Status Panel Card */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
                  BUILDER CLOUD STATUS
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">ap-south-iitj</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Community:</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Builders:</span>
                <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Projects:</span>
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Building
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Events:</span>
                <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Incoming
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Cloud Status:</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Operational
                </span>
              </div>
            </div>

            <div className="pt-2 text-[10px] font-mono text-slate-500 flex justify-between">
              <span>Telemetry: 99.98% uptime</span>
              <span>Region: Asia Pacific (Mumbai / IITJ)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Dynamic Infrastructure Visualization */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
              <Network className="w-4 h-4 text-sky-400" />
              <span>Interactive Cloud Pipeline Architecture</span>
            </h3>
            <p className="text-xs text-slate-400">
              Click any node in the pipeline to inspect AWS service integration details.
            </p>
          </div>
          <span className="text-[10px] font-mono text-sky-400 px-2 py-0.5 rounded border border-sky-500/30 bg-sky-950/40">
            SIMULATED PACKET STREAM ACTIVE
          </span>
        </div>

        {/* Pipeline Nodes Row */}
        <div className="relative py-6">
          {/* Connecting Line with pulse */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 -translate-y-1/2 hidden md:block" />
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-sky-500 via-purple-500 to-emerald-500 -translate-y-1/2 hidden md:block opacity-40 animate-pulse" />

          <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {pipelineSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isSelected = activePipelineStep === idx;

              return (
                <div
                  key={step.id}
                  onClick={() => setActivePipelineStep(isSelected ? null : idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center ${
                    isSelected
                      ? `${step.border} ${step.bg} shadow-[0_0_20px_rgba(56,189,248,0.25)] scale-105`
                      : "border-slate-800 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-850"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${step.bg} ${step.color} mb-2.5`}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-200">{step.label}</p>
                  <p className="text-[11px] font-mono text-slate-400">{step.sub}</p>

                  <div className="mt-2 text-[10px] font-mono text-slate-500">
                    Step 0{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details Drawer for selected pipeline step */}
        {activePipelineStep !== null && (
          <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-950/30 text-xs text-slate-300 font-mono flex items-start gap-3 animate-in fade-in duration-200">
            <span className="text-sky-400 font-bold shrink-0">[NODE INFO]:</span>
            <div>
              <span className="text-white font-semibold">
                {pipelineSteps[activePipelineStep].label} ({pipelineSteps[activePipelineStep].sub})
              </span>
              <p className="text-slate-300 mt-1">
                {pipelineSteps[activePipelineStep].details}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Launch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => onOpenApp("about")}
          className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 hover:border-sky-500/40 hover:bg-slate-900/90 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-sky-400 font-semibold">01 // PHILOSOPHY</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-sky-400 transition-all" />
          </div>
          <h4 className="text-sm font-semibold text-white mb-1">Not Another Campus Club</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            We learn cloud by building with it. Break things, fix them, and ship meaningful student software.
          </p>
        </div>

        <div
          onClick={() => onOpenApp("projects")}
          className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 hover:border-purple-500/40 hover:bg-slate-900/90 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-purple-400 font-semibold">02 // BUILDER LAB</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-purple-400 transition-all" />
          </div>
          <h4 className="text-sm font-semibold text-white mb-1">Architecture & Code</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Explore active campus projects: Bedrock RAG pipelines, IoT streams, and serverless runtimes.
          </p>
        </div>

        <div
          onClick={() => onOpenApp("terminal")}
          className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/60 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold">03 // SHELL</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-emerald-400 transition-all" />
          </div>
          <h4 className="text-sm font-semibold text-white mb-1">Interactive Terminal</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Run commands, inspect system logs, query leadership directories, and explore easter eggs.
          </p>
        </div>
      </div>
    </div>
  );
};
