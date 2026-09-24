"use client";

import React from "react";
import { SOCIAL_LINKS } from "@/config/socials";
import { BuilderChip } from "@/components/ui/Logo";
import { X, MessageCircle, Mail, ExternalLink, CheckCircle2 } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/BrandIcons";

interface CleanJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CleanJoinModal: React.FC<CleanJoinModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-2xl text-neutral-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-3">
          <BuilderChip size={32} variant="purple" />
          <div>
            <h3 className="text-xl font-bold text-neutral-950">
              Join AWS Student Builder Group IITJ
            </h3>
            <span className="text-xs font-mono text-neutral-500">
              IIT Jodhpur Chapter • 2026-27
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
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
            className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-950 group-hover:text-emerald-700">
                  WhatsApp Discussion Hub
                </div>
                <div className="text-xs text-neutral-600">
                  Daily peer discussions, cohort updates & alerts
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-600" />
          </a>

          {/* Official Meetup Chapter */}
          <a
            href={SOCIAL_LINKS.meetup}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center shrink-0 font-bold">
                M
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-950 group-hover:text-amber-800">
                  Official AWS Meetup Chapter
                </div>
                <div className="text-xs text-neutral-600">
                  RSVP for upcoming student builder meetups
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-amber-700" />
          </a>

          {/* LinkedIn Page */}
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-neutral-950 group-hover:text-sky-700">
                  LinkedIn Official Page
                </div>
                <div className="text-xs text-neutral-600">
                  Spotlights, session recaps, and announcements
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-sky-600" />
          </a>
        </div>

        {/* Benefits List */}
        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2 mb-6 text-xs text-neutral-700">
          <div className="font-semibold text-neutral-900 mb-1">
            Community Membership Highlights
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>Zero membership fee — open to all IIT Jodhpur students</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
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
