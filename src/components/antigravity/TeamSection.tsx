"use client";

import React, { useState } from "react";
import { TEAM_MEMBERS } from "@/data/team";
import { TeamMember } from "@/types/os";
import {
  Users,
  ShieldCheck,
  Code,
  Share2,
  Mail,
  Search,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export const TeamSection: React.FC = () => {
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

  const filteredMembers = TEAM_MEMBERS.filter((m) => {
    const matchesCategory =
      selectedCategory === "All" || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.focusAreas.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getTierBadge = (tier?: string) => {
    switch (tier) {
      case "Lead":
        return "bg-sky-500/15 text-sky-400 border-sky-500/30";
      case "Coordinator":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "Co-Lead":
        return "bg-purple-500/15 text-purple-400 border-purple-500/30";
      default:
        return "bg-white/5 text-slate-300 border-white/10";
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Leadership":
        return "from-amber-500 to-orange-500";
      case "Technical":
        return "from-emerald-500 to-teal-500";
      case "Community Management":
        return "from-sky-500 to-indigo-500";
      case "Social Media & Management":
        return "from-purple-500 to-pink-500";
      default:
        return "from-sky-500 to-blue-500";
    }
  };

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-[#050b14]/90 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Chapter Leadership & Teams (2026-27)
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Meet the Builders Behind the Guild
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Dedicated student organizers, technical leads, and community builders spearheading
            cloud innovation at Indian Institute of Technology Jodhpur.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`ag-button text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? "ag-button-primary shadow-sm"
                      : "ag-button-secondary text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-white/10 rounded-full">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search member or skill..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="ag-card p-6 flex flex-col justify-between hover:-translate-y-1 group relative overflow-hidden"
            >
              {/* Member Card Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  {/* Avatar Initial Ring */}
                  <div className="relative">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${getCategoryColor(
                        member.category
                      )} p-0.5 shadow-lg`}
                    >
                      <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg font-mono">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    </div>
                  </div>

                  {/* Tier Badge */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${getTierBadge(
                      member.tier
                    )}`}
                  >
                    {member.tier || "Core Team"}
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  {member.name}
                </h3>
                <div className="text-xs text-sky-400 font-medium mt-0.5">
                  {member.role}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {member.department || member.category}
                </div>

                {/* Bio snippet */}
                {member.bio && (
                  <p className="mt-3 text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>

              {/* Card Footer: Focus Areas & Email */}
              <div className="mt-5 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {member.focusAreas.slice(0, 3).map((focus, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 border border-white/5 text-slate-300"
                    >
                      {focus}
                    </span>
                  ))}
                  {member.focusAreas.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-400">
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
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-sky-500 hover:text-white transition-colors"
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

        {filteredMembers.length === 0 && (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
            <Users className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <div className="text-base font-medium text-white">No members found</div>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or filter category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
