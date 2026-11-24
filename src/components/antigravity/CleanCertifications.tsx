"use client";

import React, { useState } from "react";
import {
  FREE_CERTIFICATIONS_DATA,
  CERTIFICATION_CATEGORIES,
} from "@/data/certifications";
import { Award, Search, ExternalLink, Clock } from "lucide-react";

export const CleanCertifications: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
        return "bg-white/5 text-slate-300 border-white/10";
      case "Intermediate":
        return "bg-white/5 text-slate-300 border-white/10";
      case "Advanced":
        return "bg-white/5 text-slate-300 border-white/10";
      default:
        return "bg-white/5 text-slate-300 border-white/10";
    }
  };

  return (
    <section id="certifications" className="py-24 bg-[#030712] border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-900 border border-white/10 mb-3">
            <Award className="w-3.5 h-3.5 text-slate-400" />
            100 Free Cloud Credentials
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Free Official AWS Badges & Certifications
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Earn globally recognized cloud credentials from AWS Skill Builder, AWS Educate,
            and leading academic partners without expensive exam fees.
          </p>
        </div>

        {/* Filter categories & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {CERTIFICATION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-white text-slate-950 border-white/20 shadow-sm"
                    : "bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search badges (ML, Security, Cloud)..."
              className="w-full bg-[#060c1d] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        {/* Certifications Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.slice(0, 9).map((cert) => (
            <div
              key={cert.id}
              className="bg-[#070c18] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-slate-400 font-semibold">
                    {cert.provider}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border ${getLevelBadge(
                      cert.level
                    )}`}
                  >
                    {cert.level}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white transition-colors mb-2">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cert.duration}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-300 border border-white/10">
                    {cert.credentialType}
                  </span>
                </div>

                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ag-btn-light text-xs w-full py-2 flex items-center justify-center gap-1.5"
                >
                  <span>Start Course / Earn Badge</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
