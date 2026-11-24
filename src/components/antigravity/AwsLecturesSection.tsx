"use client";

import React, { useState } from "react";
import { AWS_LECTURES, LECTURE_CATEGORIES, AwsLecture } from "@/data/lectures";
import {
  Play,
  Search,
  Clock,
  ExternalLink,
  X,
  Tv,
  ChevronDown,
  ChevronUp,
  Layers,
} from "lucide-react";

export const AwsLecturesSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLecture, setActiveLecture] = useState<AwsLecture | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const filteredLectures = AWS_LECTURES.filter((lec) => {
    const matchesCat =
      selectedCategory === "All" || lec.category === selectedCategory;
    const matchesQuery =
      lec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lec.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lec.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lec.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return AWS_LECTURES.length;
    return AWS_LECTURES.filter((l) => l.category === cat).length;
  };

  const getLevelBadge = (level: string) => {
    return "bg-white/5 text-slate-300 border-white/10";
  };

  const getCategoryBadge = (cat: string) => {
    return "bg-white/5 text-slate-300 border-white/10";
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(12);
    setIsExpanded(true);
  };

  return (
    <section id="lectures" className="py-24 bg-[#030712] border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-center max-w-3xl mx-auto mb-10 cursor-pointer select-none group"
          title="Click to toggle lecture library"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-900 border border-white/10 mb-3 group-hover:border-white/20 transition-colors">
            <Tv className="w-3.5 h-3.5 text-slate-400" />
            50 Curated Free YouTube Masterclasses • {isExpanded ? "Expanded" : "Click to Expand"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white flex items-center justify-center gap-3">
            <span>Free AWS Video Lectures & Courses</span>
            <span className="inline-flex p-1.5 rounded-lg bg-white/5 text-slate-300 group-hover:text-white transition-colors">
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
            </span>
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Master Cloud Computing, DevOps, Cloud Security, System Design, and Generative AI
            with 50 verified full-length YouTube courses and re:Invent masterclasses.
          </p>
        </div>

        {/* Menu Bar Control */}
        <div className="bg-[#060b17] border border-white/10 rounded-2xl p-3.5 sm:p-4 mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Menu Bar Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
              {LECTURE_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = getCategoryCount(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-2 border cursor-pointer shrink-0 ${
                      isActive
                        ? "bg-white text-slate-950 border-white/20 shadow-sm"
                        : "bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                        isActive
                          ? "bg-black/10 text-slate-900"
                          : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input & Expand / Collapse Toggle Button */}
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
                  placeholder="Search 50 lectures (IAM, Docker, S3)..."
                  className="w-full bg-[#030712] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              {/* Main Expand/Collapse Menu Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 border bg-white/5 hover:bg-white/10 text-slate-200 border-white/10 cursor-pointer shrink-0"
              >
                <span>{isExpanded ? "Collapse Library" : "Expand 50 Lectures"}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Collapsed State Teaser Banner */}
        {!isExpanded && (
          <div
            onClick={() => setIsExpanded(true)}
            className="p-6 sm:p-8 rounded-2xl bg-[#070c18] border border-white/10 hover:border-white/20 cursor-pointer transition-colors group flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6 text-slate-400" />
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-white transition-colors">
                  50 Comprehensive AWS Masterclasses Ready to Stream
                </h4>
                <p className="text-xs text-slate-400 mt-1 flex flex-wrap gap-x-3 gap-y-1 font-mono">
                  <span>Cloud Computing (10)</span>
                  <span>•</span>
                  <span>DevOps & Containers (10)</span>
                  <span>•</span>
                  <span>Cloud Security (10)</span>
                  <span>•</span>
                  <span>System Design (10)</span>
                  <span>•</span>
                  <span>Generative AI (10)</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 bg-white/5 group-hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 transition-colors shrink-0">
              <span>Open 50 lectures</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Expanded Lectures Grid */}
        {isExpanded && (
          <div className="animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-6 font-mono px-1">
              <span>
                Showing {Math.min(visibleCount, filteredLectures.length)} of {filteredLectures.length} courses in &ldquo;{selectedCategory}&rdquo;
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-slate-300 hover:text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Collapse Library</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLectures.slice(0, visibleCount).map((lec) => (
                <div
                  key={lec.id}
                  className="bg-[#070c18] border border-white/10 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-colors group overflow-hidden"
                >
                  {/* Thumbnail Container */}
                  <div
                    onClick={() => setActiveLecture(lec)}
                    className="relative aspect-video bg-neutral-950 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${lec.youtubeId}/hqdefault.jpg`}
                      alt={lec.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-white text-slate-950 flex items-center justify-center transition-transform">
                        <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-slate-200 border border-white/10 font-mono text-[10px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{lec.duration}</span>
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border ${getCategoryBadge(
                            lec.category
                          )}`}
                        >
                          {lec.category}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border ${getLevelBadge(
                            lec.level
                          )}`}
                        >
                          {lec.level}
                        </span>
                      </div>

                      <h3
                        onClick={() => setActiveLecture(lec)}
                        className="text-base font-bold text-white transition-colors line-clamp-2 cursor-pointer mb-1.5"
                      >
                        {lec.title}
                      </h3>

                      <div className="text-xs text-slate-400 font-medium mb-3">
                        Channel: <span className="text-slate-200">{lec.channel}</span> • {lec.instructor}
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                        {lec.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {lec.topics.slice(0, 3).map((topic, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] text-slate-300 border border-white/10"
                          >
                            {topic}
                          </span>
                        ))}
                        {lec.topics.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-400">
                            +{lec.topics.length - 3}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setActiveLecture(lec)}
                        className="ag-btn-light text-xs w-full py-2 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch Free Lecture</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {filteredLectures.length > visibleCount && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="ag-btn-black text-xs sm:text-sm px-8 py-3 cursor-pointer shadow-lg hover:scale-102 transition-all"
                >
                  <span>Load More Lectures ({filteredLectures.length - visibleCount} remaining)</span>
                </button>
              </div>
            )}

            {/* Bottom Collapse Button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => {
                  setIsExpanded(false);
                  document.getElementById("lectures")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="ag-btn-light text-xs sm:text-sm px-6 py-2.5 inline-flex items-center gap-2 cursor-pointer shadow-xs hover:border-cyan-400/50"
              >
                <span>Collapse Lecture Library</span>
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Video Player Modal */}
        {activeLecture && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-[#060c1d] rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/30 flex flex-col max-h-[92vh]">
              {/* Modal Topbar */}
              <div className="px-6 py-4 border-b border-cyan-500/20 flex items-center justify-between bg-[#040814]">
                <div className="flex items-center gap-2 truncate pr-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border ${getCategoryBadge(
                      activeLecture.category
                    )}`}
                  >
                    {activeLecture.category}
                  </span>
                  <span className="text-sm font-bold text-white truncate">
                    {activeLecture.title}
                  </span>
                </div>
                <button
                  onClick={() => setActiveLecture(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* YouTube Iframe Embed */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeLecture.youtubeId}?autoplay=1&rel=0`}
                  title={activeLecture.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Modal Bottom Information */}
              <div className="p-6 overflow-y-auto space-y-4 bg-[#060c1d]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {activeLecture.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Lecturer: <span className="text-cyan-300">{activeLecture.instructor}</span> • Channel: {activeLecture.channel} • Duration: {activeLecture.duration}
                    </p>
                  </div>

                  <a
                    href={`https://www.youtube.com/watch?v=${activeLecture.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ag-btn-light text-xs px-4 py-2 shrink-0 inline-flex items-center gap-1.5"
                  >
                    <span>Open in YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeLecture.description}
                </p>

                <div>
                  <div className="text-xs font-mono uppercase text-cyan-400 font-semibold mb-2">
                    Key Topics Covered
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLecture.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
