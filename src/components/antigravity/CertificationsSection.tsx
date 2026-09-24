"use client";

import React, { useState } from "react";
import {
  FREE_CERTIFICATIONS_DATA,
  CERTIFICATION_CATEGORIES,
  FreeCertCourse,
} from "@/data/certifications";
import {
  Award,
  Search,
  Sparkles,
  ExternalLink,
  Clock,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

export const CertificationsSection: React.FC = () => {
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
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "Intermediate":
        return "bg-sky-500/15 text-sky-400 border-sky-500/30";
      case "Advanced":
        return "bg-purple-500/15 text-purple-400 border-purple-500/30";
      default:
        return "bg-white/5 text-slate-300 border-white/10";
    }
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-[#070d1a]/90 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            100 Free Cloud Credentials
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Free Official Badges, Courses & Certifications
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Earn globally recognized cloud credentials from AWS Skill Builder, AWS Educate,
            and top universities without paying expensive exam fees.
          </p>
        </div>

        {/* Categories & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {CERTIFICATION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`ag-button text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "ag-button-primary shadow-sm"
                    : "ag-button-secondary text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search badges (ML, Security, Cloud)..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.slice(0, 9).map((cert) => (
            <div
              key={cert.id}
              className="ag-card p-6 flex flex-col justify-between hover:-translate-y-1 group relative overflow-hidden"
            >
              <div>
                {/* Header: Provider & Level */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
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

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {cert.description}
                </p>
              </div>

              {/* Meta details & Launch link */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{cert.duration}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-300 border border-white/5">
                    {cert.credentialType}
                  </span>
                </div>

                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ag-button ag-button-secondary text-xs w-full py-2 flex items-center justify-center gap-1.5 group-hover:border-amber-500/40 group-hover:text-white"
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
