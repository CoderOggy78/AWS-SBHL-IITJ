"use client";

import React, { useState } from "react";
import { EVENTS_DATA } from "@/data/events";
import { ACTIVITY_FEED } from "@/data/feed";
import {
  Calendar,
  Activity,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const EventsFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"events" | "feed">("events");

  return (
    <section id="events" className="py-24 relative overflow-hidden bg-[#050b14]/70 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              Community Calendar & Live Pulse
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Stay in the Loop
            </h2>
            <p className="mt-3 text-base text-slate-300 max-w-xl">
              From hands-on Bedrock GenAI workshops to cloud architecture deep-dives and student
              project releases.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-white/5 p-1 rounded-full border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab("events")}
              className={`ag-button text-xs font-medium px-4 py-2 ${
                activeTab === "events"
                  ? "ag-button-primary"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Upcoming Workshops ({EVENTS_DATA.length})
            </button>
            <button
              onClick={() => setActiveTab("feed")}
              className={`ag-button text-xs font-medium px-4 py-2 ${
                activeTab === "feed"
                  ? "ag-button-primary"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Activity Pulse ({ACTIVITY_FEED.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Events Grid */}
        {activeTab === "events" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS_DATA.map((evt) => (
              <div
                key={evt.id}
                className="ag-card p-6 flex flex-col justify-between hover:-translate-y-1 group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider font-semibold">
                      {evt.type}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {evt.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {evt.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-400 font-mono mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {evt.topics.slice(0, 2).map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <a
                    href={evt.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ag-button ag-button-secondary text-xs px-3 py-1.5 flex items-center gap-1 group-hover:border-purple-500/40 group-hover:text-white"
                  >
                    <span>Register</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Activity Stream Feed */}
        {activeTab === "feed" && (
          <div className="ag-card-elevated p-6 sm:p-8 rounded-3xl border border-white/10">
            <div className="divide-y divide-white/5">
              {ACTIVITY_FEED.map((act) => (
                <div
                  key={act.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          {act.action}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400">
                          {act.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {act.detail}
                      </p>
                      <div className="text-[11px] font-mono text-slate-400 mt-1">
                        By {act.author} • Commit {act.hash}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-400 shrink-0 self-end sm:self-center">
                    {act.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
