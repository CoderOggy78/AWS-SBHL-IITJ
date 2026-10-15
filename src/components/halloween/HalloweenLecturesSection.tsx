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
  Flame,
  Skull,
} from "lucide-react";
import { horrorAudio } from "./HorrorSoundManager";

export const HalloweenLecturesSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
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
    switch (level) {
      case "Beginner":
        return "bg-emerald-950/80 text-emerald-400 border-emerald-700/60";
      case "Intermediate":
        return "bg-sky-950/80 text-sky-400 border-sky-700/60";
      case "Advanced":
        return "bg-purple-950/80 text-purple-400 border-purple-700/60";
      default:
        return "bg-neutral-900 text-neutral-400 border-neutral-800";
    }
  };

  return (
    <section id="video-library" className="py-24 bg-neutral-950 border-t border-neutral-900 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          onClick={() => {
            horrorAudio.playWhisperStinger();
            setIsExpanded(!isExpanded);
          }}
          className="text-center max-w-3xl mx-auto mb-10 cursor-pointer select-none group"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/80 border border-orange-700/60 text-xs font-mono text-orange-400 uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            <span>FORBIDDEN GRIMOIRE • 50 VERIFIED CLOUD LECTURES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight group-hover:text-orange-400 transition-colors">
            Free AWS Video Masterclasses
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-light mt-3">
            High-production AWS masterclasses curated from AWS re:Invent, freeCodeCamp, Stephane Maarek,
            and TechWorld with Nana. Embedded directly for distraction-free learning.
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 mt-4 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 group-hover:border-orange-500/50 transition-colors">
            <span>{isExpanded ? "Collapse Video Vault" : "Expand Full Video Vault"}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-orange-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-orange-400" />
            )}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {LECTURE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  horrorAudio.playWhisperStinger();
                  setSelectedCategory(cat);
                  setIsExpanded(true);
                  setVisibleCount(12);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-red-950 to-orange-950 border-orange-500 text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                    : "bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-950 border border-neutral-800">
                  {getCategoryCount(cat)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lectures, instructors, or AWS services..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-neutral-200 placeholder:text-neutral-500 focus:outline-hidden focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        {/* Video Cards Grid */}
        {isExpanded && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredLectures.slice(0, visibleCount).map((lec) => (
                <div
                  key={lec.id}
                  onClick={() => {
                    horrorAudio.playWhisperStinger();
                    setActiveLecture(lec);
                  }}
                  className="group relative rounded-2xl bg-neutral-900/70 border border-neutral-800 p-4 hover:border-orange-500/70 hover:shadow-[0_0_30px_rgba(249,115,22,0.25)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 mb-3.5">
                      <img
                        src={`https://img.youtube.com/vi/${lec.youtubeId}/hqdefault.jpg`}
                        alt={lec.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/10 transition-colors flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full bg-orange-600/90 text-white flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.8)] group-hover:scale-115 transition-transform">
                          <Play className="w-5 h-5 ml-0.5 fill-white" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-neutral-950/85 backdrop-blur-xs text-[10px] font-mono text-neutral-300 border border-neutral-800 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange-400" />
                        {lec.duration}
                      </span>
                    </div>

                    {/* Level & Category */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getLevelBadge(lec.level)}`}>
                        {lec.level}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {lec.category}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                      {lec.title}
                    </h4>

                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2 font-light">
                      {lec.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span className="text-neutral-300 font-medium">{lec.channel}</span>
                    <span className="text-orange-400 flex items-center gap-1 group-hover:underline">
                      Watch <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {filteredLectures.length > visibleCount && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-6 py-3 rounded-full bg-neutral-900 border border-neutral-700 hover:border-orange-500 text-xs font-mono text-neutral-200 hover:text-orange-400 shadow-md transition-all cursor-pointer"
                >
                  Load More Masterclasses ({filteredLectures.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Embedded YouTube Modal */}
      {activeLecture && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLecture(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-neutral-950 border border-orange-500/50 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white line-clamp-1">{activeLecture.title}</h3>
                <p className="text-xs font-mono text-orange-400">{activeLecture.channel} • {activeLecture.duration}</p>
              </div>
              <button
                onClick={() => setActiveLecture(null)}
                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Responsive iFrame */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeLecture.youtubeId}?autoplay=1`}
                title={activeLecture.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
