"use client";

import React, { useState } from "react";
import { TEAM_MEMBERS } from "@/data/team";
import { INTERNS_DATA } from "@/data/interns";
import { TeamMember, InternItem } from "@/types/os";
import {
  Folder,
  FolderOpen,
  FileCode,
  Users,
  ChevronRight,
  ChevronDown,
  HardDrive,
  ExternalLink,
  GraduationCap,
  Building,
  Shield,
  Sparkles,
} from "lucide-react";

export const TeamApp: React.FC = () => {
  const [activeFolder, setActiveFolder] = useState<string>("Leadership");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(TEAM_MEMBERS[0]);
  const [selectedIntern, setSelectedIntern] = useState<InternItem | null>(null);
  const [treeExpanded, setTreeExpanded] = useState<Record<string, boolean>>({
    Team: true,
  });

  const toggleTree = (key: string) => {
    setTreeExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const folders = [
    { id: "Leadership", label: "Leadership/", count: TEAM_MEMBERS.filter((m) => m.category === "Leadership").length },
    { id: "Technical", label: "Technical/", count: TEAM_MEMBERS.filter((m) => m.category === "Technical").length },
    { id: "Community Management", label: "Community Management/", count: TEAM_MEMBERS.filter((m) => m.category === "Community Management").length },
    { id: "Social Media & Management", label: "Social Media & Mgmt/", count: TEAM_MEMBERS.filter((m) => m.category === "Social Media & Management").length },
    { id: "Interns Directory", label: "Interns Directory/", count: INTERNS_DATA.length },
  ];

  const isInternFolder = activeFolder === "Interns Directory";
  const folderMembers = TEAM_MEMBERS.filter((m) => m.category === activeFolder);

  return (
    <div className="flex flex-col h-full font-sans select-none">
      {/* Path Bar / Breadcrumbs */}
      <div className="h-10 px-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <HardDrive className="w-3.5 h-3.5 text-slate-500" />
          <span>Macintosh HD</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Folder className="w-3.5 h-3.5 text-sky-400" />
          <span>Team</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-sky-300 font-semibold">{activeFolder}</span>
        </div>

        <div className="text-[10px] text-slate-500 hidden sm:block">
          {isInternFolder ? `${INTERNS_DATA.length} Interns` : `${folderMembers.length} Core Members`}
        </div>
      </div>

      {/* Main Finder Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Hierarchical Folder Tree Sidebar */}
        <div className="w-56 border-r border-slate-800 bg-slate-950/60 p-3 space-y-2 overflow-y-auto hidden sm:block shrink-0">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-1">
            Directory Tree (2026-27)
          </div>

          <div className="space-y-1 font-mono text-xs">
            {/* Root Team Folder */}
            <div>
              <div
                onClick={() => toggleTree("Team")}
                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-slate-900 text-slate-300 cursor-pointer"
              >
                {treeExpanded.Team ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                )}
                <FolderOpen className="w-4 h-4 text-sky-400" />
                <span className="font-semibold">Team/</span>
              </div>

              {/* Subfolders */}
              {treeExpanded.Team && (
                <div className="pl-5 pt-1 space-y-1">
                  {folders.map((f) => {
                    const isSelected = activeFolder === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => {
                          setActiveFolder(f.id);
                          if (f.id === "Interns Directory") {
                            setSelectedIntern(INTERNS_DATA[0]);
                          } else {
                            const first = TEAM_MEMBERS.find((m) => m.category === f.id);
                            if (first) setSelectedMember(first);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-2 py-1 rounded text-left transition-colors ${
                          isSelected
                            ? "bg-sky-600 text-white font-medium shadow-sm"
                            : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isSelected ? (
                            <FolderOpen className="w-3.5 h-3.5 text-sky-200 shrink-0" />
                          ) : (
                            <Folder className="w-3.5 h-3.5 text-sky-400/80 shrink-0" />
                          )}
                          <span className="truncate">{f.label}</span>
                        </div>
                        <span className="text-[10px] opacity-70 font-mono">
                          {f.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Directory Contents Grid */}
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Folder: /{activeFolder}
              </h2>
              <p className="text-xs text-slate-400">
                {isInternFolder
                  ? "Active student interns directory: Name & College/Institute details."
                  : "Core Team Organizational Structure (2026-27) hierarchy."}
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
              AWS SBG IIT JODHPUR
            </span>
          </div>

          {isInternFolder ? (
            /* ================= INTERNS GRID ================= */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {INTERNS_DATA.map((intern, i) => {
                const isSelected = selectedIntern?.id === intern.id;
                return (
                  <div
                    key={intern.id}
                    onClick={() => setSelectedIntern(intern)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-sky-500/80 bg-sky-950/40 shadow-lg ring-1 ring-sky-500/30"
                        : "border-slate-800/90 bg-slate-900/50 hover:bg-slate-900/90 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 rounded-md bg-slate-800 border border-slate-700 text-sky-400">
                          <GraduationCap className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">
                          #{String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="text-xs font-bold text-white leading-snug">
                        {intern.name}
                      </h3>

                      <div className="flex items-start gap-1.5 text-[11px] text-slate-300 mt-1">
                        <Building className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{intern.institute}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>{intern.track || "Intern"}</span>
                      <span className="text-emerald-400">Active</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ================= CORE MEMBERS GRID ================= */
            folderMembers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {folderMembers.map((member) => {
                  const isSelected = selectedMember?.id === member.id;
                  return (
                    <div
                      key={member.id}
                      onClick={() => setSelectedMember(member)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "border-sky-500/80 bg-sky-950/40 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/30"
                          : "border-slate-800/90 bg-slate-900/50 hover:bg-slate-900/90 hover:border-slate-700"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-sky-400">
                            <FileCode className="w-4 h-4" />
                          </div>
                          {member.tier && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                              {member.tier}
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-semibold text-white truncate">
                          {member.name}
                        </h3>
                        <p className="text-xs text-sky-300 font-medium truncate mt-0.5">
                          {member.role}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-1">
                          {member.affiliation} • {member.institute}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1">
                        {member.focusAreas.slice(0, 2).map((fa, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800"
                          >
                            {fa}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center text-xs font-mono text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                Directory empty for /{activeFolder}
              </div>
            )
          )}

          {/* Bottom Inspector Card for selected item */}
          {isInternFolder && selectedIntern && (
            <div className="mt-6 p-4 rounded-xl border border-slate-800 bg-slate-950/80 text-xs select-text">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sky-400 font-bold">
                    PREVIEW: {selectedIntern.name}
                  </span>
                  <span className="text-slate-500">—</span>
                  <span className="text-slate-300">{selectedIntern.track || "Intern Cohort"}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-sky-300 border border-slate-800">
                  {selectedIntern.institute}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 text-slate-300">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-mono">Domain:</span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-emerald-400">
                    {selectedIntern.domain || selectedIntern.track || "Builder"}
                  </span>
                </div>
                {selectedIntern.offerLetter && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500 font-mono">Offer Letter Issued:</span>
                    <span className="font-semibold text-white">
                      {selectedIntern.offerLetter}
                    </span>
                  </div>
                )}
                <div className="text-[11px] font-mono text-slate-400">
                  Status: <span className="text-emerald-400 font-semibold">Active Cohort (2026-27)</span>
                </div>
              </div>
            </div>
          )}

          {!isInternFolder && selectedMember && (
            <div className="mt-6 p-4 rounded-xl border border-slate-800 bg-slate-950/80 text-xs select-text">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sky-400 font-bold">
                    PREVIEW: {selectedMember.name}
                  </span>
                  <span className="text-slate-500">—</span>
                  <span className="text-slate-300">{selectedMember.role}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-sky-300 border border-slate-800">
                  {selectedMember.institute}
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed mb-3">
                {selectedMember.bio}
              </p>

              <div className="flex flex-wrap gap-1.5">
                <span className="text-slate-500 font-mono">Focus:</span>
                {selectedMember.focusAreas.map((fa, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-slate-300"
                  >
                    {fa}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
