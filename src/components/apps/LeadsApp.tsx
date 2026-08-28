"use client";

import React, { useState } from "react";
import { TEAM_MEMBERS } from "@/data/team";
import { TeamMember } from "@/types/os";
import { BuilderChip } from "@/components/ui/Logo";
import {
  Users,
  ShieldCheck,
  Code,
  Globe,
  Share2,
  Search,
  Mail,
  Folder,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export const LeadsApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(TEAM_MEMBERS[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "All", label: "All Core Team", icon: Users },
    { id: "Leadership", label: "Leadership & Advisory", icon: ShieldCheck },
    { id: "Technical", label: "Technical Team", icon: Code },
    { id: "Community Management", label: "Community Management", icon: Globe },
    { id: "Social Media & Management", label: "Social Media & Mgmt", icon: Share2 },
  ];

  const filteredMembers = TEAM_MEMBERS.filter((m) => {
    const matchesCategory =
      selectedCategory === "All" || m.category === selectedCategory;
    const matchesQuery =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.focusAreas.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const getTierBadge = (tier?: string) => {
    switch (tier) {
      case "Lead":
        return "bg-sky-500/20 text-sky-300 border-sky-500/40";
      case "Coordinator":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "Co-Lead":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      default:
        return "bg-slate-800 text-slate-400 border-slate-700/60";
    }
  };

  return (
    <div className="flex flex-col h-full font-sans">
      {/* Windows Explorer Command Bar & Breadcrumbs */}
      <div className="h-11 px-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between gap-3 select-none">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-slate-300 font-sans min-w-0">
          <span className="text-slate-400 hover:text-slate-200 cursor-pointer">This PC</span>
          <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
          <span className="text-slate-400 hover:text-slate-200 cursor-pointer">AWS SBG Node</span>
          <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950/60 border border-slate-800 text-sky-400 font-medium">
            <Folder className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="truncate">
              {categories.find((c) => c.id === selectedCategory)?.label || selectedCategory}
            </span>
          </div>
          <span className="text-slate-500 text-[11px] font-mono hidden sm:inline ml-1">
            ({filteredMembers.length} Members)
          </span>
        </div>

        {/* Windows Search Bar */}
        <div className="relative w-60 shrink-0">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads, roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1 bg-slate-950/70 border border-slate-700/80 rounded-md text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-400 font-sans"
          />
        </div>
      </div>

      {/* Explorer Body: Sidebar + Main List + Inspector Pane */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Pane */}
        <div className="w-52 border-r border-slate-800 bg-slate-950/50 p-3 space-y-1 hidden sm:block select-none overflow-y-auto shrink-0">
          <p className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500">
            Tiers & Teams (2026-27)
          </p>
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const first = cat.id === "All" ? TEAM_MEMBERS[0] : TEAM_MEMBERS.find((m) => m.category === cat.id);
                  if (first) setSelectedMember(first);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                  isSelected
                    ? "bg-sky-600 text-white font-medium shadow-sm"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <CatIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{cat.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Middle Column: Member List */}
        <div className="flex-1 border-r border-slate-800/80 overflow-y-auto p-3 space-y-2">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => {
              const isSelected = selectedMember?.id === member.id;
              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? "border-sky-500/50 bg-sky-950/30 shadow-md ring-1 ring-sky-500/30"
                      : "border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0 font-mono font-bold text-sm">
                    {member.name
                      .replace(" Sir", "")
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xs font-semibold text-white truncate">
                        {member.name}
                      </h3>
                      {member.tier && (
                        <span
                          className={`text-[10px] font-mono px-2 py-0.2 rounded-full border shrink-0 ${getTierBadge(
                            member.tier
                          )}`}
                        >
                          {member.tier}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-sky-300 font-medium truncate mt-0.5">
                      {member.role}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {member.affiliation} • {member.institute}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              No matching team records found.
            </div>
          )}
        </div>

        {/* Right Inspector Pane */}
        <div className="w-72 lg:w-84 bg-slate-950/80 p-5 overflow-y-auto hidden md:block select-text shrink-0">
          {selectedMember ? (
            <div className="space-y-5">
              <div className="flex flex-col items-center text-center space-y-2 pb-4 border-b border-slate-800">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-600 via-purple-600 to-indigo-600 p-0.5 shadow-xl">
                  <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-2xl font-bold font-mono text-white">
                    {selectedMember.name
                      .replace(" Sir", "")
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">
                    {selectedMember.name}
                  </h2>
                  <p className="text-xs font-medium text-sky-400">
                    {selectedMember.role}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {selectedMember.affiliation}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {selectedMember.institute}
                  </p>
                </div>
              </div>

              {selectedMember.bio && (
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                    // Overview
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>
              )}

              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                  // Focus Areas
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMember.focusAreas.map((focus, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>

              {selectedMember.responsibilities && (
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                    // Key Responsibilities
                  </p>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {selectedMember.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-sky-400 font-mono">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedMember.email && selectedMember.id !== "ashwani-dwivedi" && (
                <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium transition-colors"
                    title={`Email ${selectedMember.name}`}
                  >
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    <span>Contact via Email</span>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
              Select a member to inspect profile
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
