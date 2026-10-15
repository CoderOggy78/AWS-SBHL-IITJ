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
  ChevronDown,
  ChevronUp,
  Flame,
  Skull,
  Ghost,
} from "lucide-react";
import { horrorAudio } from "./HorrorSoundManager";

export const HalloweenTeamDirectory: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true); // Expanded by default for rich visibility
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "All", label: "All Warlocks & Builders", count: TEAM_MEMBERS.length, icon: Users },
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
      icon: Ghost,
    },
    {
      id: "Technical",
      label: "Technical Wizards",
      count: TEAM_MEMBERS.filter((m) => m.category === "Technical").length,
      icon: Code,
    },
    {
      id: "Social Media & Management",
      label: "Shadow Scribes (Media)",
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
        return "bg-red-950/80 text-red-400 border-red-700/60 shadow-[0_0_10px_rgba(220,38,38,0.4)]";
      case "Coordinator":
        return "bg-amber-950/80 text-amber-400 border-amber-700/60 shadow-[0_0_10px_rgba(245,158,11,0.4)]";
      case "Co-Lead":
        return "bg-purple-950/80 text-purple-400 border-purple-700/60 shadow-[0_0_10px_rgba(168,85,247,0.4)]";
      default:
        return "bg-orange-950/60 text-orange-400 border-orange-800/40";
    }
  };

  const getAvatarGradient = (cat: string) => {
    switch (cat) {
      case "Leadership":
        return "bg-gradient-to-tr from-red-600 to-amber-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]";
      case "Technical":
        return "bg-gradient-to-tr from-orange-600 to-yellow-500 text-neutral-950 font-black shadow-[0_0_15px_rgba(249,115,22,0.5)]";
      case "Community Management":
        return "bg-gradient-to-tr from-purple-700 to-emerald-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]";
      case "Social Media & Management":
        return "bg-gradient-to-tr from-rose-700 to-orange-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]";
      default:
        return "bg-neutral-800 text-orange-400";
    }
  };

  return (
    <section id="team-directory" className="py-24 bg-neutral-950 border-t border-neutral-900 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          onClick={() => {
            horrorAudio.playWhisperStinger();
            setIsExpanded(!isExpanded);
          }}
          className="text-center max-w-3xl mx-auto mb-12 cursor-pointer select-none group"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/80 border border-orange-700/60 text-xs font-mono text-orange-400 uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            <Skull className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span>AWS STUDENT BUILDERS GROUP • CORE TEAM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight group-hover:text-orange-400 transition-colors">
            Meet the Builders of the Shadows
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-light mt-3">
            The complete team roster behind AWS Student Builders Group at IIT Jodhpur.
            Leading cloud architecture, developer meetups, coding labs, and campus outreach.
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 mt-4 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 group-hover:border-orange-500/50 transition-colors">
            <span>{isExpanded ? "Collapse Council Roster" : "Expand Full Directory"}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-orange-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-orange-400" />
            )}
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  horrorAudio.playWhisperStinger();
                  setSelectedCategory(cat.id);
                  setIsExpanded(true);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-red-950 via-orange-950 to-neutral-900 border border-orange-500 text-orange-300 shadow-[0_0_18px_rgba(249,115,22,0.4)]"
                    : "bg-neutral-900/90 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-orange-400" : "text-neutral-500"}`} />
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? "bg-orange-500/20 text-orange-300 font-bold" : "bg-neutral-800 text-neutral-400"
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by full name, domain, or role..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-neutral-200 placeholder:text-neutral-500 focus:outline-hidden focus:border-orange-500 focus:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Members Grid (Only displayed when expanded) */}
        {isExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="group relative rounded-2xl bg-neutral-900/70 border border-neutral-800 p-5 hover:border-orange-500/60 hover:shadow-[0_0_25px_rgba(249,115,22,0.25)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top: Avatar and Tier Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="relative">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base font-mono border border-white/10 ${getAvatarGradient(
                          member.category
                        )}`}
                      >
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <span className="absolute -bottom-1 -right-1 text-xs">🎃</span>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${getTierBadge(
                        member.tier
                      )}`}
                    >
                      {member.tier || "Core Team"}
                    </span>
                  </div>

                  {/* Member Full Name */}
                  <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-xs text-orange-400/90 font-mono mt-1 font-medium">
                    {member.role}
                  </p>

                  {/* Institute */}
                  <p className="text-[11px] text-neutral-400 font-mono mt-0.5 truncate">
                    {member.institute}
                  </p>

                  {/* Bio */}
                  {member.bio && (
                    <p className="text-xs text-neutral-300/80 mt-3 font-light line-clamp-3 leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                </div>

                {/* Focus Areas Tags */}
                <div className="pt-4 mt-4 border-t border-neutral-800/80">
                  <div className="flex flex-wrap gap-1">
                    {member.focusAreas.slice(0, 3).map((area, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800/90 text-neutral-400"
                      >
                        {area}
                      </span>
                    ))}
                    {member.focusAreas.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-neutral-500">
                        +{member.focusAreas.length - 3}
                      </span>
                    )}
                  </div>

                  {member.email && (
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 group-hover:text-neutral-200">
                      <Mail className="w-3 h-3 text-orange-400" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
