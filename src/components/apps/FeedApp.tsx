"use client";

import React from "react";
import { ACTIVITY_FEED } from "@/data/feed";
import {
  Activity,
  GitCommit,
  Calendar,
  Users,
  BookOpen,
  FolderGit2,
  ExternalLink,
} from "lucide-react";

export const FeedApp: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "project":
        return <FolderGit2 className="w-4 h-4 text-sky-400" />;
      case "event":
        return <Calendar className="w-4 h-4 text-purple-400" />;
      case "community":
        return <Users className="w-4 h-4 text-emerald-400" />;
      case "resource":
        return <BookOpen className="w-4 h-4 text-amber-400" />;
      default:
        return <GitCommit className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 font-sans select-none overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-mono text-sky-400 font-semibold uppercase">
              LIVE TELEMETRY STREAM
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Build & Community Feed
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time audit log of commits, workshops, architectures, and community milestones.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900">
            STREAM: VERIFIED
          </span>
        </div>
      </div>

      {/* Commit / Activity Stream List */}
      <div className="space-y-3 select-text">
        {ACTIVITY_FEED.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700 transition-all flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-850 shrink-0 mt-0.5">
                {getCategoryIcon(item.category)}
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xs font-bold text-white tracking-tight">
                    {item.action}
                  </h3>
                  {item.hash && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                      #{item.hash}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.detail}
                </p>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 pt-0.5">
                  <span>Author: {item.author}</span>
                  <span>•</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-950 border border-slate-850 shrink-0 hidden sm:block">
              {item.category}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center font-mono text-xs text-slate-500">
        Showing latest verified community log events. Connected to IIT Jodhpur webhook listener.
      </div>
    </div>
  );
};
