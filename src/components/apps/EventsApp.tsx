"use client";

import React, { useState } from "react";
import { EVENTS_DATA } from "@/data/events";
import { EventItem } from "@/types/os";
import { SOCIAL_LINKS } from "@/config/socials";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ExternalLink,
  Tag,
  Radio,
  Sparkles,
} from "lucide-react";

export const EventsApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = [
    "All",
    "Upcoming",
    "Workshops",
    "Builder Sessions",
    "Hackathons",
    "Cloud Labs",
    "Past",
  ];

  const filteredEvents = EVENTS_DATA.filter((event) => {
    if (activeTab === "All") return true;
    if (activeTab === "Upcoming") return event.status === "Upcoming" || event.status === "Registration Open";
    if (activeTab === "Past") return event.status === "Completed";
    return event.type === activeTab;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 font-sans select-none">
      {/* Top Header & Official Meetup Integration */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wide">
              COMMUNITY SESSIONS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Events & Workshops
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Hands-on cloud architectures, immersion days, and competitive hackathons at IIT Jodhpur.
          </p>
        </div>

        <a
          href={SOCIAL_LINKS.meetup}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-xs shadow-lg shadow-red-600/20 transition-all shrink-0"
        >
          <Radio className="w-4 h-4 animate-pulse" />
          <span>Join on Meetup.com</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "bg-sky-600 text-white font-semibold shadow-sm"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Events List Cards */}
      <div className="space-y-4 select-text">
        {filteredEvents.map((event) => {
          const isUpcoming = event.status === "Upcoming" || event.status === "Registration Open";
          return (
            <div
              key={event.id}
              className="p-5 md:p-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
            >
              <div className="space-y-3 flex-1 min-w-0">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      isUpcoming
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {event.status}
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sky-950/60 text-sky-400 border border-sky-500/30">
                    {event.type}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
                    {event.description}
                  </p>
                </div>

                {/* Metadata details */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>{event.date}</span>
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      <span>{event.time}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{event.venue}</span>
                  </div>
                  {event.speaker && (
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{event.speaker.name}</span>
                    </div>
                  )}
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {event.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full md:w-auto shrink-0 flex flex-col items-stretch sm:items-end gap-2">
                {event.registrationUrl ? (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs shadow-md shadow-sky-500/20 transition-all"
                  >
                    <span>Register on Meetup</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    disabled
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-500 text-xs font-mono cursor-not-allowed"
                  >
                    Archived Session
                  </button>
                )}

                <span className="text-[10px] font-mono text-slate-500 text-center sm:text-right">
                  Free Student Participation
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
