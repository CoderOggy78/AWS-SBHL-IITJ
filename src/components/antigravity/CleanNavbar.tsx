"use client";

import React, { useState } from "react";
import { ChevronDown, Menu, X, Tv } from "lucide-react";
import { BuilderChip } from "@/components/ui/Logo";

interface CleanNavbarProps {
  onOpenJoinModal: () => void;
}

export const CleanNavbar: React.FC<CleanNavbarProps> = ({ onOpenJoinModal }) => {
  const [teamsDropdownOpen, setTeamsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#030712]/90 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none shrink-0 mr-3 xl:mr-6"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="relative flex items-center justify-center p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/25 transition-colors">
            <BuilderChip size={22} variant="cyan" />
          </div>
          <span className="font-semibold text-base sm:text-lg tracking-tight text-white group-hover:text-slate-200 transition-colors whitespace-nowrap">
            AWS Student Builder Group IITJ
          </span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-normal text-slate-300">
          {/* Teams Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setTeamsDropdownOpen(true)}
            onMouseLeave={() => setTeamsDropdownOpen(false)}
          >
            <button
              onClick={() => setTeamsDropdownOpen(!teamsDropdownOpen)}
              className="flex items-center gap-1 hover:text-white py-2 focus:outline-none cursor-pointer transition-colors"
            >
              <span>Teams</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  teamsDropdownOpen ? "rotate-180 text-white" : "text-slate-400"
                }`}
              />
            </button>

            {teamsDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 p-2 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl animate-in fade-in duration-100">
                <a
                  href="#team-technical"
                  onClick={() => setTeamsDropdownOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <div className="font-semibold text-white">Technical Team</div>
                  <div className="text-[11px] text-slate-400">Lead: Bishal Saha</div>
                </a>
                <a
                  href="#team-community"
                  onClick={() => setTeamsDropdownOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <div className="font-semibold text-white">Community Management</div>
                  <div className="text-[11px] text-slate-400">Lead: Quazi Arqam</div>
                </a>
                <a
                  href="#team-social"
                  onClick={() => setTeamsDropdownOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <div className="font-semibold text-white">Social Media Team</div>
                  <div className="text-[11px] text-slate-400">Lead: Rahul Wakhale</div>
                </a>
                <a
                  href="#team-leadership"
                  onClick={() => setTeamsDropdownOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <div className="font-semibold text-white">Leadership & Advisory</div>
                  <div className="text-[11px] text-slate-400">Vishwanath Barve • Ashwani Dwivedi Sir</div>
                </a>
                <a
                  href="#about"
                  onClick={() => setTeamsDropdownOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors border-t border-white/10 mt-1 pt-2"
                >
                  <div className="font-semibold text-white">About IITJ Chapter</div>
                  <div className="text-[11px] text-slate-400">Campus Cloud Excellence</div>
                </a>
              </div>
            )}
          </div>

          <a href="#lectures" className="hover:text-white transition-colors text-slate-300 flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5 text-slate-400" />
            <span>Free Lectures</span>
          </a>

          <a href="#curriculum" className="hover:text-white transition-colors text-slate-300">
            Curriculum
          </a>

          <a href="#research" className="hover:text-white transition-colors text-slate-300">
            Research
          </a>

          <a href="#certifications" className="hover:text-white transition-colors text-slate-300">
            Certifications
          </a>

          <a href="#directory" className="hover:text-white transition-colors text-slate-300">
            Directory
          </a>
        </nav>

        {/* Right: Join Button without download icon */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenJoinModal}
            className="ag-btn-black text-xs sm:text-sm font-semibold tracking-tight px-5 py-2.5"
          >
            <span>Join AWS SBG</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-cyan-500/20 bg-[#070e20] px-5 pt-3 pb-6 space-y-3">
          <a
            href="#lectures"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-cyan-400 py-1"
          >
            Free AWS Lectures (YouTube Library)
          </a>
          <a
            href="#team-technical"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 py-1"
          >
            Technical Team (Lead: Bishal Saha)
          </a>
          <a
            href="#team-community"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 py-1"
          >
            Community Management (Lead: Quazi Arqam)
          </a>
          <a
            href="#team-social"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 py-1"
          >
            Social Media Team (Lead: Rahul Wakhale)
          </a>
          <a
            href="#team-leadership"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 py-1"
          >
            Leadership & Advisory
          </a>
          <a
            href="#curriculum"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 py-1"
          >
            Curriculum Roadmap
          </a>
          <a
            href="#research"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 py-1"
          >
            Research Papers & CLI Labs
          </a>
          <a
            href="#certifications"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 py-1"
          >
            100 Free Badges & Certs
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinModal();
              }}
              className="ag-btn-black w-full py-2.5 text-sm"
            >
              Join AWS Student Builder Group
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
