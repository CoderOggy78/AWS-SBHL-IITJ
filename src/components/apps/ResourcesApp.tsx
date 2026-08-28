"use client";

import React, { useState, useMemo } from "react";
import { RESOURCES_DATA, RESOURCE_CATEGORIES } from "@/data/resources";
import { ResourceItem, ResourceDifficulty, ResourceType } from "@/types/os";
import {
  Folder,
  FolderOpen,
  BookOpen,
  ExternalLink,
  Search,
  HardDrive,
  ChevronRight,
  Sparkles,
  FileText,
  Clock,
  Tag,
  PlayCircle,
  FileCode,
  GraduationCap,
  Layers,
  X,
  SlidersHorizontal,
} from "lucide-react";

export const ResourcesApp: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const resourceTypes = [
    { label: "All Types", value: "All" },
    { label: "Video Courses", value: "Video Course" },
    { label: "Research Papers", value: "Research Paper" },
    { label: "Engineering Blogs", value: "Engineering Blog" },
    { label: "Workshops", value: "Workshop" },
    { label: "Whitepapers", value: "Whitepaper" },
    { label: "Labs & Specs", value: "Lab & Spec" },
  ];

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    RESOURCES_DATA.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredResources = useMemo(() => {
    return RESOURCES_DATA.filter((item) => {
      const matchesCat = activeCategory === "All" || item.category === activeCategory;
      const matchesDiff =
        selectedDifficulty === "All" || item.difficulty === selectedDifficulty;
      
      let matchesType = true;
      if (selectedType === "Lab & Spec") {
        matchesType =
          item.type === "Lab & Tutorial" || item.type === "Architecture Spec" || item.type === "Official Docs";
      } else if (selectedType !== "All") {
        matchesType = item.type === selectedType;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q);

      return matchesCat && matchesDiff && matchesType && matchesQuery;
    });
  }, [activeCategory, selectedDifficulty, selectedType, searchQuery]);

  const getDifficultyBadge = (difficulty: ResourceDifficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "Intermediate":
        return "bg-sky-500/15 text-sky-400 border-sky-500/30";
      case "Advanced":
        return "bg-purple-500/15 text-purple-400 border-purple-500/30";
      default:
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case "Video Course":
      case "Video Series":
        return <PlayCircle className="w-3.5 h-3.5 text-red-400" />;
      case "Research Paper":
        return <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />;
      case "Engineering Blog":
        return <FileCode className="w-3.5 h-3.5 text-amber-400" />;
      case "Workshop":
        return <Sparkles className="w-3.5 h-3.5 text-pink-400" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-sky-400" />;
    }
  };

  const getActionButtonLabel = (type: ResourceType) => {
    switch (type) {
      case "Video Course":
      case "Video Series":
        return "Watch Free on YouTube";
      case "Research Paper":
        return "Read Research Paper";
      case "Engineering Blog":
        return "Read Blog Post";
      case "Workshop":
        return "Launch Workshop";
      default:
        return "Open Guide";
    }
  };

  return (
    <div className="flex flex-col h-full font-sans select-none bg-slate-950 text-slate-100">
      {/* Finder Navigation Bar */}
      <div className="h-12 px-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono overflow-x-auto">
          <HardDrive className="w-3.5 h-3.5 text-slate-500" />
          <span>Cloud Storage</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Folder className="w-3.5 h-3.5 text-amber-400" />
          <span>AWS 100 Library</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-amber-300 font-semibold truncate max-w-[180px]">
            {activeCategory}/
          </span>
        </div>

        {/* Search */}
        <div className="relative w-48 sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 100 AWS resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-7 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Main Body with Sidebar + Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Categories Sidebar */}
        <div className="w-60 border-r border-slate-800 bg-slate-950/70 p-3 space-y-1 overflow-y-auto hidden md:block shrink-0">
          <div className="flex items-center justify-between px-2 pb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              Curated Folders
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-amber-400 border border-slate-800">
              100 Total
            </span>
          </div>

          <button
            onClick={() => setActiveCategory("All")}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors text-left font-mono ${
              activeCategory === "All"
                ? "bg-amber-600 text-white font-semibold shadow-md"
                : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <FolderOpen className="w-3.5 h-3.5" />
              <span>All 100 Resources</span>
            </div>
            <span className="text-[10px] opacity-75">{RESOURCES_DATA.length}</span>
          </button>

          {RESOURCE_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors text-left ${
                  isSelected
                    ? "bg-amber-600 text-white font-medium shadow-md"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {isSelected ? (
                    <FolderOpen className="w-3.5 h-3.5 text-amber-200 shrink-0" />
                  ) : (
                    <Folder className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                  )}
                  <span className="truncate">{cat}</span>
                </div>
                <span className="text-[10px] font-mono opacity-60 ml-1">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Resources Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Filter Bar: Difficulty Tabs & Type Chips */}
          <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-900/40 space-y-2.5 shrink-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Difficulty Segmented Control */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                <span className="text-[10px] text-slate-500 px-2 uppercase tracking-wider hidden sm:inline">
                  Level:
                </span>
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      selectedDifficulty === diff
                        ? "bg-amber-600 text-white font-semibold shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              {/* Counter Pill */}
              <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Showing {filteredResources.length} of {RESOURCES_DATA.length} AWS Resources</span>
              </div>
            </div>

            {/* Type Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              {resourceTypes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setSelectedType(t.value)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all whitespace-nowrap border ${
                    selectedType === t.value
                      ? "bg-sky-500/20 text-sky-300 border-sky-500/40 font-semibold"
                      : "bg-slate-950/60 text-slate-400 border-slate-800/80 hover:text-slate-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Cards Grid */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto select-text space-y-4">
            {filteredResources.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-sm font-semibold text-slate-300">
                  No resources match your active filters
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing your search query or selecting &quot;All&quot; in category, level, or type.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSelectedDifficulty("All");
                    setSelectedType("All");
                    setSearchQuery("");
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredResources.map((item) => {
                  const isVideo = item.type === "Video Course" || item.type === "Video Series";
                  const isResearch = item.type === "Research Paper";

                  return (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-2xl border border-slate-800/90 bg-slate-900/50 hover:bg-slate-900/90 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-2.5">
                        {/* Top Badges */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="p-1 rounded-md bg-slate-950 border border-slate-800">
                              {getTypeIcon(item.type)}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                              {item.type}
                            </span>
                          </div>

                          <span
                            className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${getDifficultyBadge(
                              item.difficulty
                            )}`}
                          >
                            {item.difficulty}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                          {item.title}
                        </h3>

                        {/* Category & Duration */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span className="text-amber-400/90">{item.category}</span>
                          <div className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span>{item.readTime || "Guide"}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950/80 text-slate-400 border border-slate-800/80"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action */}
                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                        <span className="text-[10px] text-slate-500">{item.id}</span>

                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            isVideo
                              ? "bg-red-600/20 text-red-300 hover:bg-red-600 hover:text-white border border-red-500/30"
                              : isResearch
                              ? "bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30"
                              : "bg-amber-600/20 text-amber-300 hover:bg-amber-600 hover:text-white border border-amber-500/30"
                          }`}
                        >
                          <span>{getActionButtonLabel(item.type)}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

