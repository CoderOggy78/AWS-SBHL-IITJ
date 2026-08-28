"use client";

import React, { useState } from "react";
import { AppId } from "@/types/os";
import { BuilderChip } from "@/components/ui/Logo";
import {
  Network,
  Cpu,
  Server,
  Cloud,
  Globe,
  Bot,
  Layers,
  Sparkles,
  Users,
  Briefcase,
  Calendar,
  FolderGit2,
  ArrowRight,
} from "lucide-react";

interface CloudMapAppProps {
  onOpenApp: (id: AppId) => void;
}

export const CloudMapApp: React.FC<CloudMapAppProps> = ({ onOpenApp }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const techNodes = [
    { id: "cloud", name: "Cloud Architecture", icon: Cloud, appId: "resources" as AppId, desc: "VPC, multi-region, IAM security, and resilient topologies." },
    { id: "aiml", name: "AI / ML Systems", icon: Bot, appId: "projects" as AppId, desc: "Amazon Bedrock foundation models, RAG vector retrieval, and LLMs." },
    { id: "swe", name: "Software Engineering", icon: Cpu, appId: "projects" as AppId, desc: "Production TypeScript, Python systems, and low-latency APIs." },
    { id: "devops", name: "DevOps & CI/CD", icon: Layers, appId: "resources" as AppId, desc: "AWS CDK IaC synthesizers and GitHub Actions automation." },
    { id: "oss", name: "Open Source Blueprints", icon: Globe, appId: "projects" as AppId, desc: "Public GitHub student repositories and reference architecture kits." },
  ];

  const communityNodes = [
    { id: "events", name: "Events & Workshops", icon: Calendar, appId: "events" as AppId, desc: "Campus tech talks, immersion days, and cloud labs." },
    { id: "cohorts", name: "Builder Cohorts", icon: Users, appId: "contact" as AppId, desc: "WhatsApp groups, peer programming, and study sessions." },
    { id: "design", name: "UI/UX & Media", icon: Sparkles, appId: "about" as AppId, desc: "Visual branding, posters, diagrams, and frontend polish." },
    { id: "interns", name: "Student Internships", icon: Briefcase, appId: "internships" as AppId, desc: "Recruiting passionate student builders across campus." },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 font-sans select-none overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-mono text-sky-400 font-semibold uppercase">
              TOPOLOGY VISUALIZER
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Community Cloud Infrastructure Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Architectural representation of AWS Student Builder Group at IIT Jodhpur. Click any node to navigate.
          </p>
        </div>

        <button
          onClick={() => onOpenApp("leads")}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 text-xs font-mono text-slate-200 transition-colors"
        >
          Inspect Leadership →
        </button>
      </div>

      {/* Interactive Topology Graph Tree */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-950/70 relative overflow-hidden flex flex-col items-center">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf808_1px,transparent_1px),linear-gradient(to_bottom,#38bdf808_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Level 1: Root Node */}
        <div
          onClick={() => onOpenApp("home")}
          onMouseEnter={() => setHoveredNode("root")}
          onMouseLeave={() => setHoveredNode(null)}
          className="relative z-10 p-4 rounded-2xl border border-sky-500/60 bg-gradient-to-br from-sky-950/80 to-slate-900/90 shadow-[0_0_30px_rgba(56,189,248,0.25)] flex items-center gap-3 cursor-pointer hover:scale-105 transition-all"
        >
          <BuilderChip size={36} variant="blue" glow={true} />
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>REGION: ap-south-iitj</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              AWS Student Builder Group
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Indian Institute of Technology Jodhpur
            </p>
          </div>
        </div>

        {/* Connecting Trunk Line */}
        <div className="w-0.5 h-8 bg-gradient-to-b from-sky-500 to-purple-500 my-1 relative z-0" />

        {/* Level 2: Core Leadership Gateway Node */}
        <div
          onClick={() => onOpenApp("leads")}
          onMouseEnter={() => setHoveredNode("leadership")}
          onMouseLeave={() => setHoveredNode(null)}
          className="relative z-10 px-5 py-2.5 rounded-xl border border-purple-500/50 bg-purple-950/40 backdrop-blur-md text-center cursor-pointer hover:border-purple-400 transition-all hover:scale-102 shadow-lg"
        >
          <p className="text-xs font-mono font-bold text-purple-300">
            [GATEWAY NODE: LEADERSHIP & COORDINATION]
          </p>
          <p className="text-[11px] text-slate-300">
            Vishwanath Barve • Armaan Kachhawa • Ashwani Dwivedi • Tanmay Da
          </p>
        </div>

        {/* Splitting Trunk */}
        <div className="w-0.5 h-8 bg-slate-700 my-1 relative z-0" />

        {/* Level 3: Dual Main Branches (Technical Systems vs Community Systems) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl relative z-10 pt-2">
          {/* Branch 1: Technical Systems */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs font-mono font-bold text-sky-300 uppercase tracking-wider">
                  Technical Systems
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">5 Tracks</span>
            </div>

            <div className="space-y-2">
              {techNodes.map((node) => {
                const NodeIcon = node.icon;
                return (
                  <div
                    key={node.id}
                    onClick={() => onOpenApp(node.appId)}
                    className="p-3 rounded-xl border border-slate-800/90 bg-slate-950/60 hover:border-sky-500/50 hover:bg-slate-900/90 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-105 transition-transform">
                        <NodeIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors">
                          {node.name}
                        </p>
                        <p className="text-[11px] text-slate-400 leading-snug">
                          {node.desc}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Branch 2: Community Systems */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
                  Community & Programs
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">4 Tracks</span>
            </div>

            <div className="space-y-2">
              {communityNodes.map((node) => {
                const NodeIcon = node.icon;
                return (
                  <div
                    key={node.id}
                    onClick={() => onOpenApp(node.appId)}
                    className="p-3 rounded-xl border border-slate-800/90 bg-slate-950/60 hover:border-purple-500/50 hover:bg-slate-900/90 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform">
                        <NodeIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors">
                          {node.name}
                        </p>
                        <p className="text-[11px] text-slate-400 leading-snug">
                          {node.desc}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
