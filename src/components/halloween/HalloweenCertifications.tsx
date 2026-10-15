"use client";

import React, { useState } from "react";
import {
  FREE_CERTIFICATIONS_DATA,
  CERTIFICATION_CATEGORIES,
} from "@/data/certifications";
import { Award, Search, ExternalLink, Clock, Flame, Sparkles } from "lucide-react";
import { horrorAudio } from "./HorrorSoundManager";

export const HalloweenCertifications: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const filteredCerts = FREE_CERTIFICATIONS_DATA.filter((cert) => {
    const matchesCat =
      selectedCategory === "All" || cert.category === selectedCategory;
    const matchesQuery =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

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
    <section id="certifications" className="py-24 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60 mb-3 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            100 Free Cloud Credentials & Digital Badges
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Official Free AWS Badges
          </h2>
          <p className="mt-3 text-base text-neutral-400 font-light">
            Earn globally recognized cloud credentials from AWS Skill Builder, AWS Educate,
            and leading academic partners without expensive exam fees.
          </p>
        </div>

        {/* Filter categories & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {CERTIFICATION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  horrorAudio.playWhisperStinger();
                  setSelectedCategory(cat);
                  setVisibleCount(12);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-amber-950 to-orange-950 border-orange-500 text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                    : "bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-neutral-200 hover:border-neutral-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search badges..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200 placeholder:text-neutral-500 focus:outline-hidden focus:border-orange-500"
            />
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCerts.slice(0, visibleCount).map((cert) => (
            <div
              key={cert.id}
              className="group rounded-2xl bg-neutral-900/70 border border-neutral-800 p-6 hover:border-orange-500/70 hover:shadow-[0_0_25px_rgba(249,115,22,0.25)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${getLevelBadge(cert.level)}`}>
                    {cert.level}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-orange-400" />
                    {cert.duration}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                  {cert.title}
                </h4>

                <p className="text-xs text-orange-400/90 font-mono mt-1">
                  {cert.provider}
                </p>

                <p className="text-xs text-neutral-400 mt-2.5 line-clamp-3 font-light leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-900/60">
                  FREE BADGE
                </span>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-orange-400 hover:text-orange-300 hover:underline"
                >
                  <span>Earn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredCerts.length > visibleCount && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="px-6 py-3 rounded-full bg-neutral-900 border border-neutral-700 hover:border-orange-500 text-xs font-mono text-neutral-200 hover:text-orange-400 shadow-md transition-all cursor-pointer"
            >
              Load More Badges ({filteredCerts.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
