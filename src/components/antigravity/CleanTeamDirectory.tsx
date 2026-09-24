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
    switch (tier) {
      case "Lead":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Coordinator":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Co-Lead":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-neutral-100 text-neutral-600 border-neutral-200";
    }
  };

  const getAvatarBg = (cat: string) => {
    switch (cat) {
      case "Leadership":
        return "bg-gradient-to-tr from-amber-400 to-orange-400 text-white";
      case "Technical":
        return "bg-gradient-to-tr from-sky-400 to-blue-600 text-white";
      case "Community Management":
        return "bg-gradient-to-tr from-purple-400 to-indigo-600 text-white";
      case "Social Media & Management":
        return "bg-gradient-to-tr from-pink-400 to-rose-500 text-white";
      default:
        return "bg-neutral-800 text-white";
    }
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    // Expand when clicking any upper category filter
    setIsExpanded(true);
  };

  return (
    <section id="directory" className="py-24 bg-neutral-50/80 border-t border-neutral-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Clickable Upper Side) */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-center max-w-3xl mx-auto mb-10 cursor-pointer select-none group"
          title="Click to toggle team directory"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-neutral-200/80 text-neutral-800 mb-3 group-hover:bg-neutral-300 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Core Directory (2026-27) • {isExpanded ? "Expanded" : "Click Upper Side to Expand"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 flex items-center justify-center gap-3">
            <span>AWS SBG IITJ Leadership & Team Directory</span>
            <span className="inline-flex p-1.5 rounded-full bg-neutral-200/80 text-neutral-700 group-hover:bg-black group-hover:text-white transition-all">
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </span>
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            Meet the student organizers, technical builders, and creative leads spearheading
            the chapter at Indian Institute of Technology Jodhpur.
          </p>
        </div>

        {/* Category Filters, Search & Expand Controls (The Upper Side Bar) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8 bg-white p-3.5 sm:p-4 rounded-3xl border border-neutral-200 shadow-2xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 border cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-black text-white border-black shadow-sm"
                      : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-neutral-100 text-neutral-600"
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
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsExpanded(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!isExpanded) setIsExpanded(true);
                }}
                placeholder="Search member or focus..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors"
              />
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border bg-neutral-950 text-white hover:bg-neutral-800 cursor-pointer shadow-sm shrink-0"
            >
              <span>{isExpanded ? "Collapse" : "Expand Roster"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Collapsed State Teaser Banner */}
        {!isExpanded && (
          <div
            onClick={() => setIsExpanded(true)}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200 hover:border-sky-300 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 group flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4 text-left">
              {/* Avatar stack preview of leads */}
              <div className="flex -space-x-2.5 overflow-hidden shrink-0">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 text-white flex items-center justify-center font-bold text-xs font-mono border-2 border-white shadow-xs">
                  VB
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-xs font-mono border-2 border-white shadow-xs">
                  AD
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-600 text-white flex items-center justify-center font-bold text-xs font-mono border-2 border-white shadow-xs">
                  QA
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 text-white flex items-center justify-center font-bold text-xs font-mono border-2 border-white shadow-xs">
                  BS
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 text-white flex items-center justify-center font-bold text-xs font-mono border-2 border-white shadow-xs">
                  R
                </div>
                <div className="w-11 h-11 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center font-bold text-xs font-mono border-2 border-white shadow-xs">
                  +12
                </div>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-sky-600 transition-colors">
                  All 17 Members & Team Leads at IIT Jodhpur
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Leadership & Advisory (2) • Community Management (5) • Technical Team (5) • Social Media (5)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-900 bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white px-5 py-2.5 rounded-full border border-neutral-200 transition-all shrink-0">
              <span>Click on upper side to expand directory</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </div>
        )}

        {/* Expanded Member Cards Grid */}
        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-6 font-mono px-1">
              <span>Showing {filteredMembers.length} of {TEAM_MEMBERS.length} members ({selectedCategory})</span>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-neutral-700 hover:text-black font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Collapse Roster</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="ag-card-white p-6 flex flex-col justify-between hover:-translate-y-1 group bg-white shadow-2xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      {/* Initials Avatar */}
                      <div
                        className={`w-13 h-13 rounded-2xl flex items-center justify-center font-bold text-base font-mono shadow-sm ${getAvatarBg(
                          member.category
                        )}`}
                      >
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${getTierBadge(
                          member.tier
                        )}`}
                      >
                        {member.tier || "Core Team"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-950 group-hover:text-sky-600 transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs font-semibold text-neutral-800 mt-0.5">
                      {member.role}
                    </div>
                    <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                      {member.department || member.category}
                    </div>

                    {member.bio && (
                      <p className="mt-3 text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-neutral-100">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {member.focusAreas.slice(0, 3).map((focus, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-neutral-100 text-neutral-700 border border-neutral-200/60"
                        >
                          {focus}
                        </span>
                      ))}
                      {member.focusAreas.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-neutral-100 text-neutral-500">
                          +{member.focusAreas.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span className="truncate text-[11px] font-mono">
                        {member.institute.replace("Indian Institute of Technology", "IIT")}
                      </span>
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="p-1.5 rounded-lg bg-neutral-100 hover:bg-black hover:text-white transition-colors"
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
                className="ag-btn-light text-xs sm:text-sm px-6 py-2.5 inline-flex items-center gap-2 cursor-pointer shadow-xs hover:bg-neutral-200"
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
