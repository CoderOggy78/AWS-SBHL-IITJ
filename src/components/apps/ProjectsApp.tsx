"use client";

import React, { useState, useMemo } from "react";
import { PROJECTS_DATA, PROJECT_DOMAINS } from "@/data/projects";
import { ProjectItem, ProjectStatus } from "@/types/os";
import { SOCIAL_LINKS } from "@/config/socials";
import {
  FolderGit2,
  ExternalLink,
  Network,
  Cpu,
  Layers,
  Search,
  Sparkles,
  ArrowRight,
  Code2,
  CheckCircle2,
  Clock,
  Tag,
  BookOpen,
  Filter,
  Users,
} from "lucide-react";

export const ProjectsApp: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectItem>(PROJECTS_DATA[0]);

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
  const statuses = ["ALL", "BUILDING", "SHIPPED", "EXPERIMENTAL", "IDEA"];

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      const matchesDomain = selectedDomain === "All" || p.category === selectedDomain;
      const matchesDiff = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
      const matchesStatus = selectedStatus === "ALL" || p.status === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.problem.toLowerCase().includes(q) ||
        p.technology.some((t) => t.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q));

      return matchesDomain && matchesDiff && matchesStatus && matchesQuery;
    });
  }, [selectedDomain, selectedDifficulty, selectedStatus, searchQuery]);

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "SHIPPED":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "BUILDING":
        return "bg-sky-500/20 text-sky-400 border-sky-500/30";
      case "EXPERIMENTAL":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "IDEA":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default:
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  const getDifficultyBadge = (diff?: string) => {
    switch (diff) {
      case "Beginner":
        return "text-emerald-400 border-emerald-500/30 bg-emerald-950/30";
      case "Intermediate":
        return "text-sky-400 border-sky-500/30 bg-sky-950/30";
      case "Advanced":
        return "text-purple-400 border-purple-500/30 bg-purple-950/30";
      default:
        return "text-slate-400 border-slate-700 bg-slate-900";
    }
  };

  return (
    <div className="flex flex-col h-full font-sans select-none bg-slate-950/95 text-slate-100">
      {/* Top Header & Search Bar */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/70 space-y-3 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white tracking-tight">
                  Builder Lab
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-950 border border-sky-500/30 text-sky-300 font-semibold">
                  50 Project Ideas
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Architectural blueprints, cloud prototypes, and project proposals for IIT Jodhpur builders
              </p>
            </div>
          </div>

          {/* Instant Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 50 projects, AWS services..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-900/90 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition-all font-mono"
            />
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {PROJECT_DOMAINS.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                selectedDomain === domain
                  ? "bg-sky-600 text-white font-semibold shadow-sm"
                  : "bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Sub-Filters: Difficulty & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-[11px]">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-slate-500">Difficulty:</span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  selectedDifficulty === diff
                    ? "bg-slate-700 text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-slate-500">Status:</span>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  selectedStatus === st
                    ? "bg-slate-700 text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: 50 Projects List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-slate-800/80 p-3 space-y-2.5 overflow-y-auto shrink-0">
          {filteredProjects.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs font-mono">
              No project ideas found matching your criteria.
            </div>
          ) : (
            filteredProjects.map((project) => {
              const isSelected = activeProject?.id === project.id;
              return (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-sky-400 bg-sky-950/40 shadow-lg ring-1 ring-sky-400/30"
                      : "border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/90 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono text-sky-400 font-semibold truncate">
                      {project.category}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded border shrink-0 ${getStatusBadge(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white mb-1.5 leading-snug">
                    {project.name}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2">
                    {project.problem}
                  </p>

                  <div className="flex flex-wrap items-center gap-1">
                    {project.difficulty && (
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${getDifficultyBadge(
                          project.difficulty
                        )}`}
                      >
                        {project.difficulty}
                      </span>
                    )}
                    {project.technology.slice(0, 2).map((tech, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technology.length > 2 && (
                      <span className="text-[9px] font-mono text-slate-500">
                        +{project.technology.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Inspector: Project Deep Dive */}
        <div className="flex-1 p-6 overflow-y-auto select-text hidden md:block">
          {activeProject ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-800">
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getStatusBadge(
                        activeProject.status
                      )}`}
                    >
                      {activeProject.status}
                    </span>
                    {activeProject.difficulty && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getDifficultyBadge(
                          activeProject.difficulty
                        )}`}
                      >
                        {activeProject.difficulty} Track
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-slate-500">
                      ID: {activeProject.id}
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold text-white tracking-tight">
                    {activeProject.name}
                  </h2>
                  <p className="text-xs font-mono text-sky-400">
                    Domain: {activeProject.category || "Cloud Computing"}
                  </p>
                </div>

                {/* Primary Action Button: Build With SBG (Redirects to official Meetup) */}
                <a
                  href={SOCIAL_LINKS.meetup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-sky-500/20 transition-all hover:scale-102 cursor-pointer"
                  title="Pitch or build this project at AWS SBG IIT Jodhpur"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Claim / Build Project</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </div>

              {/* Problem Statement */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <span>// PROBLEM STATEMENT & MOTIVATION</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeProject.problem}
                </p>
              </div>

              {/* Architecture Overview */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <Network className="w-3.5 h-3.5" />
                  <span>AWS ARCHITECTURE & DATA FLOW</span>
                </h3>
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-xs text-slate-300 leading-relaxed font-mono">
                  {activeProject.architectureSummary}
                </div>
              </div>

              {/* Architecture Nodes (if available) */}
              {activeProject.nodes && activeProject.nodes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Pipeline Components & Services
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {activeProject.nodes.map((node) => (
                      <div
                        key={node.id}
                        className="p-3 rounded-lg border border-slate-800 bg-slate-950/70 flex items-center gap-3 shadow-sm"
                      >
                        <div className="p-2 rounded-md bg-sky-500/10 text-sky-400">
                          <Cpu className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">
                            {node.label}
                          </p>
                          <p className="text-[10px] font-mono text-slate-400 truncate">
                            {node.service}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expected Deliverables */}
              {activeProject.deliverables && (
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>EXPECTED STUDENT DELIVERABLES</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {activeProject.deliverables.map((deliv, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 text-xs text-slate-300 flex items-start gap-2"
                      >
                        <span className="text-emerald-400 font-mono font-bold">✓</span>
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies & AWS Services */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>AWS SERVICES & TECH STACK</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technology.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-900 text-xs font-mono text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team Contributors */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Proposed for: AWS Student Builder Group • IIT Jodhpur</span>
                <span>Open for Student Contributions</span>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 font-mono text-xs">
              Select a project from the catalog
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
