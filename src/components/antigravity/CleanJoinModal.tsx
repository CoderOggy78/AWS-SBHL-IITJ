"use client";

import React from "react";
import { SOCIAL_LINKS } from "@/config/socials";
import { BuilderChip } from "@/components/ui/Logo";
import { X, MessageCircle, ExternalLink, CheckCircle2 } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/BrandIcons";

interface CleanJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CleanJoinModal: React.FC<CleanJoinModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div data-lenis-prevent className="relative w-full max-w-lg bg-[#070c18] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="p-1 rounded-lg bg-white/5 border border-white/10">
            <BuilderChip size={30} variant="cyan" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Join AWS Student Builder Group IITJ
            </h3>
            <span className="text-xs font-mono text-slate-400">
              IIT Jodhpur Chapter • 2026-27
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          Connect directly with fellow student builders, join study cohorts, and receive official
          updates on cloud engineering workshops and hackathons at IIT Jodhpur.
        </p>

        {/* Channels */}
        <div className="space-y-3 mb-6">
          {/* WhatsApp Channel */}
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#030712] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  WhatsApp Discussion Hub
                </div>
                <div className="text-xs text-slate-400">
                  Daily peer discussions, cohort updates & alerts
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>

          {/* Official Meetup Chapter */}
          <a
            href={SOCIAL_LINKS.meetup}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#030712] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center shrink-0 font-bold font-mono">
                M
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  Official AWS Meetup Chapter
                </div>
                <div className="text-xs text-slate-400">
                  RSVP for upcoming student builder meetups
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>

          {/* LinkedIn Page */}
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#030712] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center shrink-0">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  LinkedIn Official Page
                </div>
                <div className="text-xs text-slate-400">
                  Spotlights, session recaps, and announcements
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Benefits List */}
        <div className="p-4 rounded-xl bg-[#030712] border border-white/10 space-y-2 mb-6 text-xs text-slate-300">
          <div className="font-semibold text-white mb-1">
            Community Membership Highlights
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Zero membership fee — open to all IIT Jodhpur students</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Curated zero-to-hero cloud curriculum and certification study cohorts</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="ag-btn-light w-full py-2.5 text-sm cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
