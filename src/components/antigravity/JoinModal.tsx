"use client";

import React from "react";
import { SOCIAL_LINKS } from "@/config/socials";
import { BuilderChip } from "@/components/ui/Logo";
import {
  X,
  MessageCircle,
  Mail,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { LinkedinIcon } from "@/components/ui/BrandIcons";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg ag-card-elevated p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <BuilderChip size={36} variant="purple" glow />
          <div>
            <h3 className="text-xl font-bold text-white">
              Join the AWS Builders Guild
            </h3>
            <span className="text-xs font-mono text-sky-400">
              IIT Jodhpur Chapter • 2026-27
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          Welcome to IIT Jodhpur’s dedicated cloud engineering community. Connect with peer
          builders, attend hands-on workshops, access free AWS Educate lab credits, and join
          student hackathon teams.
        </p>

        {/* Channels List */}
        <div className="space-y-3 mb-6">
          {/* WhatsApp Channel */}
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-emerald-300">
                  WhatsApp Discussion Hub
                </div>
                <div className="text-xs text-slate-400">
                  Daily discussions, workshop alerts & peer help
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-400" />
          </a>

          {/* Meetup / Official Chapter */}
          <a
            href={SOCIAL_LINKS.meetup}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                M
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-amber-300">
                  Official AWS Meetup Chapter
                </div>
                <div className="text-xs text-slate-400">
                  RSVP for upcoming offline & hybrid sessions
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-amber-400" />
          </a>

          {/* LinkedIn Network */}
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-sky-300">
                  LinkedIn Official Page
                </div>
                <div className="text-xs text-slate-400">
                  Member spotlights, recaps, and sponsor updates
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-sky-400" />
          </a>
        </div>

        {/* Benefits checklist */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2 mb-6">
          <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
            Guild Membership Benefits
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Access to 50+ GitHub production architectures</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
            <span>AWS certification prep vouchers & study cohorts</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Mentorship from alumni & AWS Community Builders</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="ag-button ag-button-secondary text-xs sm:text-sm w-full py-2.5"
        >
          Close
        </button>
      </div>
    </div>
  );
};
