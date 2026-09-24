"use client";

import React, { useState } from "react";
import { ChevronDown, Menu, X, ArrowDownToLine, Tv } from "lucide-react";
import { BuilderChip } from "@/components/ui/Logo";

interface CleanNavbarProps {
  onOpenJoinModal: () => void;
}

export const CleanNavbar: React.FC<CleanNavbarProps> = ({ onOpenJoinModal }) => {
  const [teamsDropdownOpen, setTeamsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="relative flex items-center justify-center p-1 rounded-xl bg-neutral-100 group-hover:bg-neutral-200 transition-colors">
            <BuilderChip size={26} variant="purple" />
          </div>
          <span className="font-semibold text-base sm:text-lg tracking-tight text-neutral-900 group-hover:text-sky-600 transition-colors">
            AWS Student Builder Group IITJ
          </span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-normal text-neutral-700">
          {/* Teams Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setTeamsDropdownOpen(true)}
            onMouseLeave={() => setTeamsDropdownOpen(false)}
          >
            <button
              onClick={() => setTeamsDropdownOpen(!teamsDropdownOpen)}
              className="flex items-center gap-1 hover:text-black py-2 focus:outline-none cursor-pointer"
            >
              <span>Teams</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  teamsDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {teamsDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 p-2 bg-white rounded-2xl border border-black/10 shadow-xl animate-in fade-in duration-150">
                <a
                  href="#team-technical"
                  onClick={() => setTeamsDropdownOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs font-medium text-neutral-800 hover:bg-neutral-100 hover:text-black"
                >
                  <div className="font-semibold">Technical Team</div>
                  <div className="text-[11px] text-neutral-500">Lead: Bishal Saha</div>
                </a>
                <a
                  href="#team-community"
                  onClick={() => setTeamsDropdownOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs font-medium text-neutral-800 hover:bg-neutral-100 hover:text-black"
                >
                  <div className="font-semibold">Community Management</div>
                  <div className="text-[11px] text-neutral-500">Lead: Quazi Arqam</div>
                </a>
                <a
                  href="#team-social"
                  onClick={() => setTeamsDropdownOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs font-medium text-neutral-800 hover:bg-neutral-100 hover:text-black"
                >
                  <div className="font-semibold">Social Media Team</div>
                  <div className="text-[11px] text-neutral-500">Lead: Rahul</div>
                </a>
                <a
                  href="#team-leadership"
                  onClick={() => setTeamsDropdownOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs font-medium text-neutral-800 hover:bg-neutral-100 hover:text-black"
                >
                  <div className="font-semibold">Leadership & Advisory</div>
                  <div className="text-[11px] text-neutral-500">Vishwanath Barve • Ashwani Dwivedi Sir</div>
                </a>
              </div>
            )}
          </div>

          <a href="#lectures" className="hover:text-black transition-colors font-medium text-sky-700 flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5" />
            <span>Free Lectures</span>
          </a>

          <a href="#curriculum" className="hover:text-black transition-colors">
            Curriculum
          </a>

          <a href="#certifications" className="hover:text-black transition-colors">
            Certifications
          </a>

          <a href="#directory" className="hover:text-black transition-colors">
            Directory
          </a>

          <a href="#about" className="hover:text-black transition-colors">
            About IITJ
          </a>
        </nav>

        {/* Right: Join Button (Rocket removed as requested) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenJoinModal}
            className="ag-btn-black flex items-center gap-1.5 text-xs sm:text-sm font-medium"
          >
            <span>Join AWS SBG</span>
            <ArrowDownToLine className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-black focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-black/10 bg-white px-5 pt-3 pb-6 space-y-3">
          <a
            href="#lectures"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-sky-700 py-1"
          >
            Free AWS Lectures (YouTube Library)
          </a>
          <a
            href="#team-technical"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800 py-1"
          >
            Technical Team (Lead: Bishal Saha)
          </a>
          <a
            href="#team-community"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800 py-1"
          >
            Community Management (Lead: Quazi Arqam)
          </a>
          <a
            href="#team-social"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800 py-1"
          >
            Social Media Team (Lead: Rahul)
          </a>
          <a
            href="#team-leadership"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800 py-1"
          >
            Leadership & Advisory
          </a>
          <a
            href="#curriculum"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800 py-1"
          >
            Curriculum Roadmap
          </a>
          <a
            href="#certifications"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-800 py-1"
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
