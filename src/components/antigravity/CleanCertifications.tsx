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
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      case "Intermediate":
        return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
      case "Advanced":
        return "bg-purple-500/15 text-purple-300 border-purple-500/30";
      default:
        return "bg-white/5 text-slate-300 border-white/10";
    }
  };

  return (
    <section id="certifications" className="py-24 bg-[#030712] border-t border-cyan-500/15 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
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
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {CERTIFICATION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-neutral-950 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                    : "bg-white/[0.03] text-slate-300 border-white/10 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-500/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search badges (ML, Security, Cloud)..."
              className="w-full bg-[#060c1d] border border-cyan-500/25 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all"
            />
          </div>
        </div>

        {/* Certifications Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.slice(0, 9).map((cert) => (
            <div
              key={cert.id}
              className="bg-[#060c1d]/85 backdrop-blur-md border border-cyan-500/15 rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.18)] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    {cert.provider}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border ${getLevelBadge(
                      cert.level
                    )}`}
                  >
                    {cert.level}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{cert.duration}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950/40 text-[10px] text-cyan-300 border border-cyan-500/25">
                    {cert.credentialType}
                  </span>
                </div>

                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ag-btn-light text-xs w-full py-2 flex items-center justify-center gap-1.5 hover:border-cyan-400/50"
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
