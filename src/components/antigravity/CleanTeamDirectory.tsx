"use client";

import React, { useState } from "react";
import { TEAM_MEMBERS } from "@/data/team";
import {
  Users,
  ShieldCheck,
  Code,
  Share2,
  Search,
  Mail,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export const CleanTeamDirectory: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "All", label: "All Members", count: TEAM_MEMBERS.length, icon: Users },
    {
      id: "Leadership",
      label: "Leadership & Advisory",
      count: TEAM_MEMBERS.filter((m) => m.category === "Leadership").length,
      icon: ShieldCheck,
    },
    {
      id: "Community Management",
      label: "Community Management",
      count: TEAM_MEMBERS.filter((m) => m.category === "Community Management").length,
      icon: Users,
    },
    {
      id: "Technical",
      label: "Technical Team",
      count: TEAM_MEMBERS.filter((m) => m.category === "Technical").length,
      icon: Code,
    },
    {
      id: "Social Media & Management",
      label: "Social Media",
      count: TEAM_MEMBERS.filter((m) => m.category === "Social Media & Management").length,
      icon: Share2,
    },
  ];

  const filteredMembers = TEAM_MEMBERS.filter((member) => {
    const matchesCategory =
      selectedCategory === "All" || member.category === selectedCategory;
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.focusAreas.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getTierBadge = (tier?: string) => {
    return "bg-white/5 text-slate-300 border-white/10";
  };

  const getAvatarBg = (cat: string) => {
    return "bg-slate-800 text-slate-200 border border-white/10";
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setIsExpanded(true);
  };

  return (
    <section id="directory" className="py-24 bg-[#030712] border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-center max-w-3xl mx-auto mb-10 cursor-pointer select-none group"
          title="Click to toggle team directory"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-900 border border-white/10 mb-3 group-hover:border-white/20 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            Core Directory (2026-27) • {isExpanded ? "Expanded" : "Click to Expand"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white flex items-center justify-center gap-3">
            <span>AWS SBG IITJ Leadership & Team Directory</span>
            <span className="inline-flex p-1.5 rounded-lg bg-white/5 text-slate-300 group-hover:text-white transition-colors">
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
            </span>
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Meet the student organizers, technical builders, and creative leads spearheading
            the chapter at Indian Institute of Technology Jodhpur.
          </p>
        </div>

        {/* Category Filters, Search & Expand Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8 bg-[#060b17] p-3.5 sm:p-4 rounded-2xl border border-white/10 shadow-xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-2 border cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-white text-slate-950 border-white/20 shadow-sm"
                      : "bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                      isActive
                        ? "bg-black/10 text-slate-900"
                        : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar & Expand / Collapse Toggle Button */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsExpanded(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!isExpanded) setIsExpanded(true);
                }}
                placeholder="Search member or focus..."
                className="w-full bg-[#030712] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 border bg-white/5 hover:bg-white/10 text-slate-200 border-white/10 cursor-pointer shrink-0"
            >
              <span>{isExpanded ? "Collapse" : "Expand Roster"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Collapsed State Teaser Banner */}
        {!isExpanded && (
          <div
            onClick={() => setIsExpanded(true)}
            className="p-6 sm:p-8 rounded-2xl bg-[#070c18] border border-white/10 hover:border-white/20 cursor-pointer transition-colors group flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4 text-left">
              {/* Avatar stack preview of leads */}
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center font-bold text-xs font-mono border-2 border-[#030712]">
                  VB
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center font-bold text-xs font-mono border-2 border-[#030712]">
                  AD
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center font-bold text-xs font-mono border-2 border-[#030712]">
                  QA
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center font-bold text-xs font-mono border-2 border-[#030712]">
                  BS
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center font-bold text-xs font-mono border-2 border-[#030712]">
                  RW
                </div>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-white transition-colors">
                  All 17 Members & Team Leads at IIT Jodhpur
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Leadership & Advisory (2) • Community Management (5) • Technical Team (5) • Social Media (5)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-white/5 group-hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 transition-colors shrink-0">
              <span>View full directory</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Expanded Member Cards Grid */}
        {isExpanded && (
          <div className="animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-6 font-mono px-1">
              <span>Showing {filteredMembers.length} of {TEAM_MEMBERS.length} members ({selectedCategory})</span>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-slate-300 hover:text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Collapse Roster</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#070c18] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      {/* Initials Avatar */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm font-mono bg-slate-800 text-slate-200 border border-white/10"
                      >
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <span
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium border bg-white/5 text-slate-300 border-white/10"
                      >
                        {member.tier || "Core Team"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs font-semibold text-slate-300 mt-0.5">
                      {member.role}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {member.department || member.category}
                    </div>

                    {member.bio && (
                      <p className="mt-3 text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {member.focusAreas.slice(0, 3).map((focus, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-slate-300 border border-white/10"
                        >
                          {focus}
                        </span>
                      ))}
                      {member.focusAreas.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400">
                          +{member.focusAreas.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="truncate text-[11px] font-mono">
                        {member.institute.replace("Indian Institute of Technology", "IIT")}
                      </span>
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                          title={member.email}
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Collapse Button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => {
                  setIsExpanded(false);
                  document.getElementById("directory")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="ag-btn-light text-xs sm:text-sm px-6 py-2.5 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Collapse Directory</span>
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
