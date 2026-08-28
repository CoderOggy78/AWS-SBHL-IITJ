"use client";

import React, { useState, useMemo } from "react";
import {
  FREE_CERTIFICATIONS_DATA,
  CERTIFICATION_CATEGORIES,
  FreeCertCourse,
} from "@/data/certifications";
import {
  Award,
  ExternalLink,
  Search,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Sparkles,
  Filter,
  Layers,
  ShieldCheck,
} from "lucide-react";

export const CertificationsApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCourse, setActiveCourse] = useState<FreeCertCourse>(
    FREE_CERTIFICATIONS_DATA[0]
  );

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = useMemo(() => {
    return FREE_CERTIFICATIONS_DATA.filter((c) => {
      const matchesCat =
        selectedCategory === "All" || c.category === selectedCategory;
      const matchesLvl =
        selectedLevel === "All" || c.level === selectedLevel;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.provider.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.credentialType.toLowerCase().includes(q);

      return matchesCat && matchesLvl && matchesQuery;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  const getCredentialBadge = (type: string) => {
    switch (type) {
      case "Digital Badge":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Free Certificate":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Exam Prep Guide":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      default:
        return "bg-sky-500/20 text-sky-300 border-sky-500/30";
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "Beginner":
        return "text-emerald-400 border-emerald-500/30 bg-emerald-950/30";
      case "Intermediate":
        return "text-sky-400 border-sky-500/30 bg-sky-950/30";
      case "Advanced":
        return "text-purple-400 border-purple-500/30 bg-purple-950/30";
      default:
        return "text-slate-400 border-slate-700 bg-slate-900";
    }
  };

  return (
    <div className="flex flex-col h-full font-sans select-none bg-slate-950/95 text-slate-100">
      {/* Top Header & Search Bar */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/70 space-y-3 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white tracking-tight">
                  Free Cloud Certifications & Badges
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 border border-amber-500/30 text-amber-300 font-semibold">
                  100 Curated Free Credentials
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Official AWS Skill Builder, AWS Educate digital badges, university accredited courses, and free exam preps
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 100 free courses, badges..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-900/90 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all font-mono"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {CERTIFICATION_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? "bg-amber-600 text-white font-semibold shadow-sm"
                  : "bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Level Filters & Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Filter Level:</span>
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  selectedLevel === lvl
                    ? "bg-slate-700 text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <span className="text-slate-400">
            Showing {filteredCourses.length} of {FREE_CERTIFICATIONS_DATA.length} Courses
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Courses List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-slate-800/80 p-3 space-y-2.5 overflow-y-auto shrink-0">
          {filteredCourses.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs font-mono">
              No free certification courses matched your criteria.
            </div>
          ) : (
            filteredCourses.map((course) => {
              const isSelected = activeCourse?.id === course.id;
              return (
                <div
                  key={course.id}
                  onClick={() => setActiveCourse(course)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-amber-400 bg-amber-950/30 shadow-lg ring-1 ring-amber-400/30"
                      : "border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/90 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono text-amber-400 font-semibold truncate">
                      {course.provider}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${getCredentialBadge(
                        course.credentialType
                      )}`}
                    >
                      {course.credentialType}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white mb-1.5 leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800/60">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded border ${getLevelBadge(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Inspector: Course Deep Dive */}
        <div className="flex-1 p-6 overflow-y-auto select-text hidden md:block">
          {activeCourse ? (
            <div className="space-y-6 max-w-3xl">
              {/* Header */}
              <div className="space-y-2 pb-5 border-b border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getCredentialBadge(
                      activeCourse.credentialType
                    )}`}
                  >
                    {activeCourse.credentialType}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getLevelBadge(
                      activeCourse.level
                    )}`}
                  >
                    {activeCourse.level} Level
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Duration: {activeCourse.duration}
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  {activeCourse.title}
                </h2>

                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <GraduationCap className="w-4 h-4" />
                  <span>Provider: {activeCourse.provider}</span>
                </div>
              </div>

              {/* Course Overview & Description */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-1.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>COURSE OVERVIEW & CURRICULUM</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeCourse.description}
                </p>
              </div>

              {/* What You Receive */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>CREDENTIAL & RECOGNITION</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 text-xs text-slate-300">
                    <p className="font-semibold text-white mb-1">100% Free Access</p>
                    <p className="text-[11px] text-slate-400">
                      No credit card or payment required. Completely free to enroll and complete.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 text-xs text-slate-300">
                    <p className="font-semibold text-white mb-1">Shareable Credential</p>
                    <p className="text-[11px] text-slate-400">
                      Earn a digital badge or verifiable certificate to showcase on your LinkedIn or resume.
                    </p>
                  </div>
                </div>
              </div>

              {/* Primary Action Button: Direct Link to Course */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={activeCourse.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-102 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Enroll Free / Open Course</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                </a>

                <span className="text-[11px] font-mono text-slate-500">
                  External Provider: {activeCourse.provider}
                </span>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 font-mono text-xs">
              Select a free certification course to inspect details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
