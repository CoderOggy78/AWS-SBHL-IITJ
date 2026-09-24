"use client";

import React, { useState } from "react";
import { PROJECTS_DATA, PROJECT_DOMAINS } from "@/data/projects";
import { ProjectItem } from "@/types/os";
import {
  Layers,
  Search,
  Sparkles,
  ArrowRight,
  X,
  Server,
  Database,
  Cpu,
  Shield,
  Activity,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

export const BlueprintsSection: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    const matchesDomain =
      selectedDomain === "All" || proj.category === selectedDomain;
    const matchesQuery =
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.architectureSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technology.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDomain && matchesQuery;
  });

  const getDifficultyBadge = (diff?: string) => {
    switch (diff) {
      case "Beginner":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "Intermediate":
        return "bg-sky-500/15 text-sky-400 border-sky-500/30";
      case "Advanced":
        return "bg-purple-500/15 text-purple-400 border-purple-500/30";
      default:
        return "bg-white/5 text-slate-300 border-white/10";
    }
  };

  return (
    <section id="blueprints" className="py-24 relative overflow-hidden bg-[#050b14]/70 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-4">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            50+ Cloud Architecture Blueprints
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Production Blueprints for Student Builders
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Real AWS architecture implementations designed, tested, and documented by IIT
            Jodhpur builders. Ready to clone, inspect, and deploy.
          </p>
        </div>

        {/* Domain Tabs & Search Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {PROJECT_DOMAINS.slice(0, 6).map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`ag-button text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  selectedDomain === domain
                    ? "ag-button-primary shadow-sm"
                    : "ag-button-secondary text-slate-400 hover:text-white"
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (Bedrock, ECS, S3)..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, 9).map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="ag-card p-6 flex flex-col justify-between hover:-translate-y-1 cursor-pointer group relative overflow-hidden"
            >
              <div>
                {/* Header: Category & Difficulty */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider font-semibold">
                    {project.category}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border ${getDifficultyBadge(
                      project.difficulty
                    )}`}
                  >
                    {project.difficulty}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                  {project.name}
                </h3>

                {/* Architecture Summary */}
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {project.architectureSummary}
                </p>
              </div>

              {/* Technologies & Footer Action */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technology.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 border border-white/5 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technology.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-400">
                      +{project.technology.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-sky-400 font-medium group-hover:translate-x-1 transition-transform">
                  <span>Inspect Architecture ({project.nodes?.length || 0} nodes)</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Blueprint Detail Inspector */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto ag-card-elevated p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-sky-500/15 text-sky-400 border border-sky-500/30">
                  {selectedProject.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${getDifficultyBadge(
                    selectedProject.difficulty
                  )}`}
                >
                  {selectedProject.difficulty}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedProject.name}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {selectedProject.problem}
              </p>

              {/* Architecture Summary */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                <div className="text-xs font-mono text-sky-400 uppercase font-semibold mb-1">
                  Architecture Flow
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedProject.architectureSummary}
                </p>
              </div>

              {/* Node Topology */}
              <div className="mb-6">
                <div className="text-xs font-mono text-slate-400 uppercase font-semibold mb-3">
                  Architecture Pipeline Nodes ({selectedProject.nodes?.length || 0})
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(selectedProject.nodes || []).map((node) => (
                    <div
                      key={node.id}
                      className="p-3 rounded-xl bg-black/40 border border-white/10"
                    >
                      <div className="text-xs font-semibold text-white truncate">
                        {node.label}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 truncate">
                        {node.service}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack */}
              <div className="mb-6">
                <div className="text-xs font-mono text-slate-400 uppercase font-semibold mb-2">
                  AWS Services & Tools
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technology.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="ag-button ag-button-secondary text-xs sm:text-sm px-5 py-2.5"
                >
                  Close
                </button>
                <a
                  href="https://github.com/aws-sbg-iitj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ag-button ag-button-primary text-xs sm:text-sm px-5 py-2.5 flex items-center gap-2"
                >
                  <span>View GitHub Repository</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
