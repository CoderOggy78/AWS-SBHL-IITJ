"use client";

import React, { useState } from "react";
import { TEAM_MEMBERS } from "@/data/team";
import { INTERNS_DATA } from "@/data/interns";
import { TeamMember, InternItem } from "@/types/os";
import { BuilderChip } from "@/components/ui/Logo";
import {
  Users,
  ShieldCheck,
  Code,
  Globe,
  Share2,
  GraduationCap,
  Search,
  Mail,
  Folder,
  ChevronRight,
  ExternalLink,
  Building,
} from "lucide-react";

export const LeadsApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(TEAM_MEMBERS[0]);
  const [selectedIntern, setSelectedIntern] = useState<InternItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "All", label: "All Core Team", icon: Users },
    { id: "Leadership", label: "Leadership & Advisory", icon: ShieldCheck },
    { id: "Technical", label: "Technical Team", icon: Code },
    { id: "Community Management", label: "Community Management", icon: Globe },
    { id: "Social Media & Management", label: "Social Media & Mgmt", icon: Share2 },
    { id: "Interns", label: "Interns Directory", icon: GraduationCap, badge: `${INTERNS_DATA.length}` },
  ];

  const isInternView = selectedCategory === "Interns";

  const filteredMembers = TEAM_MEMBERS.filter((m) => {
    const matchesCategory =
      selectedCategory === "All" || m.category === selectedCategory;
    const matchesQuery =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.focusAreas.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const filteredInterns = INTERNS_DATA.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.institute.toLowerCase().includes(q) ||
      (item.track && item.track.toLowerCase().includes(q))
    );
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
      {/* Finder Top Toolbar */}
      <div className="h-12 px-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Folder className="w-4 h-4 text-sky-400" />
          <span>Roster</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-200">
            {categories.find((c) => c.id === selectedCategory)?.label || selectedCategory}
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-500 text-[11px]">
            {isInternView ? `${filteredInterns.length} Interns` : `${filteredMembers.length} Members`}
          </span>
        </div>

        {/* Search Input */}
        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isInternView ? "Search intern or college..." : "Filter by name, track..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>
      </div>

      {/* Finder Body: Sidebar + Main List + Inspector Pane */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (macOS Finder style) */}
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
                  if (cat.id === "Interns") {
                    setSelectedIntern(INTERNS_DATA[0]);
                  } else {
                    setSelectedMember(TEAM_MEMBERS[0]);
                  }
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
                {cat.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Middle Column: Member / Intern List */}
        <div className="flex-1 border-r border-slate-800/80 overflow-y-auto p-3 space-y-2">
          {isInternView ? (
            /* ================= INTERNS DIRECTORY ================= */
            filteredInterns.length > 0 ? (
              filteredInterns.map((intern, idx) => {
                const isSelected = selectedIntern?.id === intern.id;
                return (
                  <div
                    key={intern.id}
                    onClick={() => setSelectedIntern(intern)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "border-sky-500/60 bg-sky-950/30 shadow-md ring-1 ring-sky-500/30"
                        : "border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0 font-mono font-bold text-xs">
                        {String(idx + 1).padStart(2, "0")}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-semibold text-white truncate">
                          {intern.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate mt-0.5">
                          <Building className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{intern.institute}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 hidden xl:block">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                        {intern.track || "Intern"}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs font-mono text-slate-500">
                No matching intern records found.
              </div>
            )
          ) : (
            /* ================= CORE TEAM DIRECTORY ================= */
            filteredMembers.length > 0 ? (
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
            )
          )}
        </div>

        {/* Right Inspector Pane */}
        <div className="w-72 lg:w-84 bg-slate-950/80 p-5 overflow-y-auto hidden md:block select-text shrink-0">
          {isInternView ? (
            /* Intern Inspector */
            selectedIntern ? (
              <div className="space-y-5">
                <div className="flex flex-col items-center text-center space-y-2 pb-4 border-b border-slate-800">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-600 to-teal-600 p-0.5 shadow-xl">
                    <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-lg font-bold font-mono text-white">
                      {selectedIntern.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                      Intern Cohort (2026-27)
                    </span>
                    <h2 className="text-base font-bold text-white tracking-tight mt-1.5">
                      {selectedIntern.name}
                    </h2>
                    <p className="text-xs text-sky-300 font-mono mt-0.5">
                      {selectedIntern.domain || selectedIntern.track || "Cloud & Software Track"}
                    </p>
                  </div>
                </div>

                {/* College Information */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                    // Institute / College
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5">
                    <Building className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white leading-snug">
                        {selectedIntern.institute}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        AWS Student Builder Group Cohort
                      </p>
                    </div>
                  </div>
                </div>

                {/* Offer Letter & Domain Details */}
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono">Internship Domain</span>
                    <span className="text-emerald-400 font-semibold">{selectedIntern.domain || selectedIntern.track}</span>
                  </div>
                  {selectedIntern.offerLetter && (
                    <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-800/80">
                      <span className="text-slate-500 font-mono">Offer Letter Recipient</span>
                      <span className="text-white font-medium">{selectedIntern.offerLetter}</span>
                    </div>
                  )}
                </div>

                {/* Chapter Note */}
                <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-500/30 text-xs text-slate-300 font-mono">
                  <span className="text-sky-400 font-bold">IIT Jodhpur Chapter:</span>
                  <p className="text-slate-400 mt-1 leading-relaxed text-[11px]">
                    Actively participating in student builder projects, hands-on cloud architectures, and cross-college engineering workshops.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                Select an intern to view college credentials
              </div>
            )
          ) : (
            /* Core Team Member Inspector */
            selectedMember ? (
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
            )
          )}
        </div>
      </div>
    </div>
  );
};
