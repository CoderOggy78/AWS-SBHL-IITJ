"use client";

import React, { useState, useEffect, useRef } from "react";
import { AppId } from "@/types/os";
import { TEAM_MEMBERS } from "@/data/team";
import { INTERNS_DATA } from "@/data/interns";
import { PROJECTS_DATA } from "@/data/projects";

import { RESOURCES_DATA } from "@/data/resources";
import {
  Search,
  User,
  FolderGit2,
  Calendar,
  BookOpen,
  Terminal,
  ArrowRight,
  Command,
} from "lucide-react";

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  isOpen,
  onClose,
  onOpenApp,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Search indexing
  const q = query.toLowerCase().trim();

  const results: Array<{
    id: string;
    title: string;
    subtitle: string;
    appId: AppId;
    category: "People" | "Projects" | "Events" | "Resources" | "Apps";
    icon: React.ElementType;
  }> = [];

  // Index Team
  TEAM_MEMBERS.forEach((m) => {
    if (
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.focusAreas.some((f) => f.toLowerCase().includes(q))
    ) {
      results.push({
        id: m.id,
        title: m.name,
        subtitle: `${m.role} • ${m.category}`,
        appId: "leads",
        category: "People",
        icon: User,
      });
    }
  });

  // Index Interns
  INTERNS_DATA.forEach((intern) => {
    if (
      intern.name.toLowerCase().includes(q) ||
      intern.institute.toLowerCase().includes(q) ||
      (intern.track && intern.track.toLowerCase().includes(q))
    ) {
      results.push({
        id: intern.id,
        title: intern.name,
        subtitle: `Intern • ${intern.institute}`,
        appId: "internships",
        category: "People",
        icon: User,
      });
    }
  });

  // Index Projects
  PROJECTS_DATA.forEach((p) => {
    if (
      p.name.toLowerCase().includes(q) ||
      p.problem.toLowerCase().includes(q) ||
      p.technology.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        id: p.id,
        title: p.name,
        subtitle: `Project [${p.status}] • ${p.technology.slice(0, 3).join(", ")}`,
        appId: "projects",
        category: "Projects",
        icon: FolderGit2,
      });
    }
  });


  // Index Resources
  RESOURCES_DATA.forEach((r) => {
    if (
      r.title.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        id: r.id,
        title: r.title,
        subtitle: `${r.category} • ${r.type}`,
        appId: "resources",
        category: "Resources",
        icon: BookOpen,
      });
    }
  });

  // Index Core Apps
  const coreApps: Array<{ id: AppId; name: string; desc: string }> = [
    { id: "projects", name: "Builder Lab", desc: "50 real AWS project ideas and blueprints" },
    { id: "roadmap", name: "Cloud Roadmap", desc: "Beginner to Advanced engineering milestones" },
    { id: "certifications", name: "Free Certifications", desc: "100 free cloud courses and digital badges" },
    { id: "terminal", name: "Terminal", desc: "Interactive builder command line shell" },
    { id: "home", name: "Overview", desc: "Home dashboard and architecture pipeline" },
    { id: "about", name: "About SBG", desc: "Philosophy, focus tracks, and culture" },
    { id: "internships", name: "Internships", desc: "Student builder recruitment directory" },
    { id: "contact", name: "Join Us", desc: "WhatsApp, Meetup, and community links" },
  ];

  coreApps.forEach((a) => {
    if (a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q)) {
      results.push({
        id: a.id,
        title: a.name,
        subtitle: a.desc,
        appId: a.id,
        category: "Apps",
        icon: Terminal,
      });
    }
  });

  const displayResults = results.slice(0, 8);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, displayResults.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + displayResults.length) % Math.max(1, displayResults.length));
    } else if (e.key === "Enter" && displayResults[selectedIndex]) {
      e.preventDefault();
      onOpenApp(displayResults[selectedIndex].appId);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-slate-700/80 bg-slate-900/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search people, roles, projects, events, resources... (Cmd+K)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-sans"
          />
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800 text-[10px] font-mono text-slate-400">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-96 overflow-y-auto space-y-1">
          {displayResults.length > 0 ? (
            displayResults.map((item, idx) => {
              const ItemIcon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={`${item.category}-${item.id}`}
                  onClick={() => {
                    onOpenApp(item.appId);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? "bg-sky-600/90 text-white shadow-md"
                      : "hover:bg-slate-800/60 text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? "bg-white/20 text-white" : "bg-slate-800 text-sky-400"
                      }`}
                    >
                      <ItemIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{item.title}</p>
                      <p
                        className={`text-[11px] truncate ${
                          isSelected ? "text-sky-100" : "text-slate-400"
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono opacity-80 shrink-0">
                    <span className="px-1.5 py-0.5 rounded bg-black/20">{item.category}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-slate-500 font-mono">
              No matching records found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>Navigate: ↑ ↓</span>
          <span>Open: ↵</span>
          <span>Close: Esc</span>
        </div>
      </div>
    </div>
  );
};
