"use client";

import React, { useState } from "react";
import { RESEARCH_PAPERS, ResearchPaper } from "@/data/researchPapers";
import {
  BookOpen,
  Terminal,
  ExternalLink,
  Copy,
  Check,
  Search,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export const CloudResearchPapers: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPapers = RESEARCH_PAPERS.filter((paper) => {
    const matchesLevel =
      selectedLevel === "All" || paper.level === selectedLevel;
    const matchesQuery =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.awsServices.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesQuery;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((curr) => (curr === id ? null : curr));
    }, 2000);
  };

  const getLevelBadge = (level: ResearchPaper["level"]) => {
    switch (level) {
      case "Foundations":
        return "bg-white/5 text-slate-300 border-white/10";
      case "Intermediate":
        return "bg-white/5 text-slate-300 border-white/10";
      case "Expert":
        return "bg-white/5 text-slate-300 border-white/10";
    }
  };

  return (
    <section id="research" className="py-24 bg-[#030712] border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono text-slate-300 bg-slate-900 border border-white/10 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            Distributed Systems & Cloud Papers • Level 100 to 400
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Seminal Research Papers for Cloud Builders
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Master the peer-reviewed foundational literature behind Amazon Dynamo, Firecracker microVMs,
            Aurora, and Bedrock AI agents—paired with interactive terminal CLI labs to test the systems theory in practice.
          </p>
        </div>

        {/* Controls: Level Switcher & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Level Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#060b17] border border-white/10 w-full md:w-auto">
            {["All", "Foundations", "Intermediate", "Expert"].map((level) => {
              const count =
                level === "All"
                  ? RESEARCH_PAPERS.length
                  : RESEARCH_PAPERS.filter((p) => p.level === level).length;
              return (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    selectedLevel === level
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{level === "All" ? "All Papers" : level}</span>
                  <span
                    className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-md ${
                      selectedLevel === level
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

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search papers, topics, AWS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-[#060b17] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        {/* Papers Grid */}
        <div className="space-y-8">
          {filteredPapers.map((paper) => {
            const isCopied = copiedId === paper.id;
            return (
              <div
                key={paper.id}
                className="group relative rounded-2xl p-6 sm:p-8 bg-[#070c18] border border-white/10 hover:border-white/20 transition-colors flex flex-col lg:flex-row gap-8 items-start"
              >
                {/* Left Side: Paper Details & Key Insights */}
                <div className="flex-1 space-y-4">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-medium border ${getLevelBadge(
                        paper.level
                      )}`}
                    >
                      {paper.levelCode} • {paper.level}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-slate-400">
                      {paper.venue} ({paper.year})
                    </span>
                    {paper.awsServices.map((svc) => (
                      <span
                        key={svc}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/10"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>

                  {/* Title & Authors */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white transition-colors leading-snug">
                      {paper.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400 font-medium">
                      By {paper.authors}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {paper.summary}
                  </p>

                  {/* Key Takeaways */}
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                      Core Architecture Principles
                    </div>
                    <ul className="space-y-1.5">
                      {paper.keyInsights.map((insight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* PDF Download Button */}
                  <div className="pt-2">
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>Read Original Whitepaper (PDF)</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                    </a>
                  </div>
                </div>

                {/* Right Side: Hands-On Terminal CLI Lab */}
                <div className="w-full lg:w-[480px] shrink-0 rounded-xl bg-[#02050c] border border-white/10 overflow-hidden shadow-xl">
                  {/* Terminal Header */}
                  <div className="px-4 py-2.5 bg-[#070c18] border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 ml-2 flex items-center gap-1">
                        <Terminal className="w-3 h-3 text-slate-400" />
                        terminal lab
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(paper.id, paper.cliSnippet.command)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors cursor-pointer"
                      title="Copy CLI command"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-300">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Terminal Body */}
                  <div className="p-4 space-y-3 font-mono text-xs">
                    <div>
                      <div className="text-[11px] text-slate-300 font-semibold mb-1">
                        # {paper.cliSnippet.title}
                      </div>
                      <pre className="p-3 rounded-lg bg-black/60 border border-white/5 text-slate-200 overflow-x-auto text-[11px] leading-relaxed select-all">
                        <code>{paper.cliSnippet.command}</code>
                      </pre>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-normal border-l-2 border-slate-700 pl-2.5 font-sans">
                      <span className="font-semibold text-slate-200">Systems Takeaway: </span>
                      {paper.cliSnippet.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredPapers.length === 0 && (
            <div className="text-center py-12 rounded-2xl bg-[#060b17] border border-white/10 text-slate-400 text-sm">
              No research papers found matching &quot;{searchQuery}&quot;. Try adjusting your search query or level filter.
            </div>
          )}
        </div>

        {/* Semester-wise Builder Reading Track Banner */}
        <div className="mt-16 rounded-2xl p-8 bg-[#070c18] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-300 uppercase tracking-wide">
              <Cpu className="w-4 h-4 text-slate-400" />
              AWS SBG IITJ Academic Reading Groups
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              Join the Weekly Cloud Systems Paper Discussion Circle
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Every Sunday at IIT Jodhpur, student builders deconstruct one seminal computer systems paper,
              trace the algorithms, and reproduce the benchmarks on AWS free tier.
            </p>
          </div>

          <a
            href="https://chat.whatsapp.com/EDN3Vn9QyJpB9zVn8Hw8tH"
            target="_blank"
            rel="noopener noreferrer"
            className="ag-btn-black shrink-0 text-xs sm:text-sm px-5 py-2.5"
          >
            <span>Join Reading Circle</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

