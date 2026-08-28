"use client";

import React, { useState } from "react";
import { SOCIAL_LINKS } from "@/config/socials";
import { AppId } from "@/types/os";
import { BuilderChip } from "@/components/ui/Logo";
import {
  MessageCircle,
  Radio,
  Mail,
  ExternalLink,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Send,
  MapPin,
} from "lucide-react";
import { LinkedinIcon } from "@/components/ui/BrandIcons";

interface ContactAppProps {
  onOpenApp: (id: AppId) => void;
}

export const ContactApp: React.FC<ContactAppProps> = ({ onOpenApp }) => {
  const [msgSent, setMsgSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const domains = [
    "Cloud Architecture",
    "Software Engineering",
    "AI / ML & Bedrock",
    "DevOps & IaC",
    "Design & UI/UX",
    "Community Management",
    "Content & Documentation",
    "Events & Logistics",
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMsgSent(true);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 font-sans select-none overflow-y-auto">
      {/* Join Us Hero */}
      <div className="space-y-4 pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-950/40 text-sky-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          STUDENT RECRUITMENT & COMMUNITY CONNECT
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          You Don&rsquo;t Need To Know Everything. <br />
          <span className="bg-gradient-to-r from-sky-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
            You Need To Want To Build.
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
          We&rsquo;re looking for curious students who learn quickly, take ownership, and enjoy building alongside others. Whether you are in your 1st year writing your first CLI or a senior scaling distributed containers, there is a place for you.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => onOpenApp("projects")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs shadow-lg shadow-sky-500/20 transition-all hover:scale-102"
          >
            <span>Explore Builder Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onOpenApp("leads")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium text-xs transition-colors"
          >
            <span>View Leadership Cohort</span>
          </button>
        </div>
      </div>

      {/* Official Community Communication Channels */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400">
          // OFFICIAL COMMUNITY PORTALS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* WhatsApp Channel */}
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 hover:border-emerald-500/60 transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-500/60 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                Official WhatsApp Community
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with IIT Jodhpur builders, ask questions, form hackathon teams, and stay updated on announcements.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
              Join WhatsApp Group ↗
            </span>
          </a>

          {/* LinkedIn Page */}
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-blue-500/30 bg-blue-950/20 hover:bg-blue-950/40 hover:border-blue-500/60 transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                  <LinkedinIcon className="w-6 h-6" size={24} />
                </div>
                <ExternalLink className="w-4 h-4 text-blue-500/60 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                Official LinkedIn Page
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Follow our professional company page for student project spotlights, keynote announcements, and industry mentor highlights.
              </p>
            </div>
            <span className="text-xs font-mono text-blue-400 flex items-center gap-1 font-semibold">
              Follow on LinkedIn ↗
            </span>
          </a>

          {/* Meetup Group */}
          <a
            href={SOCIAL_LINKS.meetup}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-red-500/30 bg-red-950/20 hover:bg-red-950/40 hover:border-red-500/60 transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400">
                  <Radio className="w-6 h-6" />
                </div>
                <ExternalLink className="w-4 h-4 text-red-500/60 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
                Official Meetup Chapter
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                RSVP for all scheduled tech workshops, cloud immersion days, hybrid livestreams, and campus builder challenges.
              </p>
            </div>
            <span className="text-xs font-mono text-red-400 flex items-center gap-1 font-semibold">
              RSVP on Meetup ↗
            </span>
          </a>
        </div>
      </div>

      {/* Domains Tags */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400">
          // DOMAINS YOU CAN CONTRIBUTE TO
        </h2>
        <div className="flex flex-wrap gap-2">
          {domains.map((dom, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/60 text-xs font-mono text-slate-300"
            >
              #{dom}
            </span>
          ))}
        </div>
      </div>

      {/* Direct Contact Form & Campus Location */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-800 select-text">
        <div className="lg:col-span-6 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Direct Message</h3>
            <p className="text-xs text-slate-400">
              Have questions about student sessions or collaborations? Send our team a note.
            </p>
          </div>

          {msgSent ? (
            <div className="p-6 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 text-center space-y-2">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-white">Message Dispatched</p>
              <p className="text-xs text-slate-300">
                We will reply back to {email} shortly. You can also reach out directly via WhatsApp.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <textarea
                  rows={4}
                  required
                  placeholder="Your message or query..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Note</span>
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Campus Information</h3>
            <p className="text-xs text-slate-400">
              AWS Student Builder Group at Indian Institute of Technology Jodhpur.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3 font-mono text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">IIT Jodhpur Campus</p>
                <p className="text-slate-400">
                  NH 62, Nagaur Road, Karwar, Jodhpur, Rajasthan 342037, India
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2 border-t border-slate-800">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Email: aws.sbg@iitj.ac.in</span>
            </div>

            <div className="flex items-center gap-2.5">
              <BuilderChip size={16} variant="purple" />
              <span>AWS Student Builder Group — Official IITJ Node</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
