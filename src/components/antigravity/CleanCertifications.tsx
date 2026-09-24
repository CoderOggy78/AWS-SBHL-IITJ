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
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Intermediate":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Advanced":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-200";
    }
  };

  return (
    <section id="certifications" className="py-24 bg-neutral-50/70 border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-amber-50 text-amber-800 border border-amber-200 mb-3">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            100 Free Cloud Credentials
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
            Free Official AWS Badges & Certifications
          </h2>
          <p className="mt-3 text-base text-neutral-600">
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
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-black text-white border-black shadow-sm"
                    : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search badges (ML, Security, Cloud)..."
              className="w-full bg-white border border-neutral-200 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        {/* Certifications Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.slice(0, 9).map((cert) => (
            <div
              key={cert.id}
              className="ag-card-white p-6 flex flex-col justify-between hover:-translate-y-1 group bg-white shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-amber-700 uppercase tracking-wider font-semibold">
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

                <h3 className="text-base sm:text-lg font-bold text-neutral-950 group-hover:text-amber-600 transition-colors mb-2">
                  {cert.title}
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-4">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-3 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{cert.duration}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-100 text-[10px] text-neutral-700 border border-neutral-200">
                    {cert.credentialType}
                  </span>
                </div>

                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ag-btn-light text-xs w-full py-2 flex items-center justify-center gap-1.5 hover:bg-neutral-200"
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
