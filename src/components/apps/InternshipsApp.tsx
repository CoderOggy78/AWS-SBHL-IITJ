"use client";

import React, { useState } from "react";
import { SOCIAL_LINKS } from "@/config/socials";
import { INTERNS_DATA } from "@/data/interns";
import {
  Briefcase,
  AlertTriangle,
  CheckCircle2,
  Send,
  ExternalLink,
  Code,
  Cloud,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Building,
  Search,
} from "lucide-react";

export const InternshipsApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"openings" | "process" | "interns" | "apply">("interns");
  const [internSearch, setInternSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    year: "2nd Year",
    domain: "Software Engineering",
    github: "",
    note: "",
  });

  const domains = [
    { name: "Software Engineering", desc: "Full-stack TypeScript, Next.js, and Python backend services.", icon: Code },
    { name: "Cloud Engineering", desc: "AWS infrastructure, IAM security, VPC networking, and Terraform/CDK.", icon: Cloud },
    { name: "DevOps", desc: "Continuous deployment pipelines, Docker containers, and CloudWatch alarms.", icon: Layers },
    { name: "AI / ML & GenAI", desc: "Foundation models, Amazon Bedrock, RAG pipelines, and embeddings.", icon: Cpu },
    { name: "Data Engineering", desc: "Stream processing, event ingestion with Kinesis, and DynamoDB schemas.", icon: Sparkles },
    { name: "UI / UX & Design", desc: "Modern web design systems, interactive Figma prototypes, and graphics.", icon: Sparkles },
    { name: "Community Management", desc: "Developer relations, organizing cohorts, WhatsApp/Meetup coordination.", icon: Briefcase },
    { name: "Events & Operations", desc: "Campus hackathons, workshop logistics, and speaker onboarding.", icon: Briefcase },
  ];

  const selectionSteps = [
    {
      step: "01",
      title: "Builder Application",
      desc: "Submit your student portfolio, GitHub repository link, and your chosen technical track.",
    },
    {
      step: "02",
      title: "Take-Home Mini Build",
      desc: "Solve a hands-on architectural problem or build a lightweight proof-of-concept on AWS.",
    },
    {
      step: "03",
      title: "Technical Conversation",
      desc: "30-minute peer review with SBG leads discussing your architecture choices and enthusiasm.",
    },
    {
      step: "04",
      title: "Cohort Onboarding",
      desc: "Receive your student AWS sandbox credits, join our private Discord/WhatsApp builder rooms, and start shipping!",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 font-sans select-none">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-950/40 text-rose-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          STUDENT BUILDER COHORTS
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Build With Us.
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
          We invite curious students at IIT Jodhpur who want to go beyond academic coursework to build real-world cloud systems, AI products, and developer tools alongside passionate peers.
        </p>

        {/* Tab Buttons - Clean horizontal scroll to prevent any tab clashing */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("interns")}
            className={`whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-xl text-xs font-mono transition-colors ${
              activeTab === "interns"
                ? "bg-rose-600 text-white font-semibold shadow-md"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            Interns Directory ({INTERNS_DATA.length})
          </button>
          <button
            onClick={() => setActiveTab("openings")}
            className={`whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-xl text-xs font-mono transition-colors ${
              activeTab === "openings"
                ? "bg-rose-600 text-white font-semibold shadow-md"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            Recruitment Tracks
          </button>
          <button
            onClick={() => setActiveTab("process")}
            className={`whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-xl text-xs font-mono transition-colors ${
              activeTab === "process"
                ? "bg-rose-600 text-white font-semibold shadow-md"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            Selection Process
          </button>
          <button
            onClick={() => setActiveTab("apply")}
            className={`whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-xl text-xs font-mono transition-colors ${
              activeTab === "apply"
                ? "bg-rose-600 text-white font-semibold shadow-md"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            Submit Application
          </button>
        </div>
      </div>

      {/* Prominent Official Disclaimer Box */}
      <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-950/20 text-amber-200/90 text-xs flex items-start gap-3 select-text shadow-lg">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-amber-300 font-mono uppercase tracking-wider">
            IMPORTANT COMMUNITY INITIATIVE DISCLAIMER:
          </span>
          <p className="text-amber-200/80 leading-relaxed">
            Internships and opportunities organized by the AWS Student Builder Group at IIT Jodhpur are community initiatives and must not be represented as employment or internships directly with Amazon Web Services or Amazon unless explicitly stated otherwise.
          </p>
        </div>
      </div>

      {/* Tab: Interns Directory */}
      {activeTab === "interns" && (
        <div className="space-y-5 select-text">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400">
                // OFFICIAL INTERNS DIRECTORY (2026-27)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Active student cohort representing institutes across India in the AWS Student Builder Group.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search intern or college..."
                value={internSearch}
                onChange={(e) => setInternSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {INTERNS_DATA.filter((intern) => {
              const q = internSearch.toLowerCase();
              return (
                intern.name.toLowerCase().includes(q) ||
                intern.institute.toLowerCase().includes(q) ||
                (intern.track && intern.track.toLowerCase().includes(q))
              );
            }).map((intern, idx) => (
              <div
                key={intern.id}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-rose-400 font-mono text-xs font-bold">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                      {intern.track || "Intern"}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {intern.name}
                  </h3>

                  <div className="flex items-start gap-1.5 text-xs text-slate-300 mt-1.5 leading-snug">
                    <Building className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>{intern.institute}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>AWS SBG Cohort</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Openings / Domains */}
      {activeTab === "openings" && (
        <div className="space-y-4 select-text">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400">
              // RECRUITMENT DOMAINS (OPEN FOR B.TECH & M.TECH STUDENTS)
            </h2>
            <span className="text-xs font-mono text-slate-500">8 Disciplines</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {domains.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/90 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="p-2 w-fit rounded-lg bg-slate-800 text-rose-400 mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">{d.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {d.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, domain: d.name }));
                      setActiveTab("apply");
                    }}
                    className="flex items-center gap-1 text-xs font-mono text-rose-400 hover:text-rose-300 pt-2"
                  >
                    <span>Apply for track</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Selection Process */}
      {activeTab === "process" && (
        <div className="space-y-4 select-text">
          <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400">
            // SELECTION TIMELINE & WORKFLOW
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {selectionSteps.map((s) => (
              <div
                key={s.step}
                className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-mono font-bold text-rose-400">
                    {s.step}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="text-sm font-bold text-white">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Application Form — redirects to Google Form */}
      {activeTab === "apply" && (
        <div className="max-w-xl mx-auto p-6 rounded-2xl border border-slate-800 bg-slate-900/70 flex flex-col items-center text-center gap-6">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/25">
            <Send className="w-6 h-6 text-white" />
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-white tracking-tight">
              Apply to AWS SBG Internship Cohort
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Fill out the official builder application form. It takes about 3–5 minutes. Our leadership team reviews every submission personally.
            </p>
          </div>

          {/* What to expect chips */}
          <div className="flex flex-wrap justify-center gap-2 text-[10px] font-mono">
            {["Software Engineering Track", "Cloud Projects", "Mentored Learning", "Team Collaboration"].map((chip) => (
              <span
                key={chip}
                className="px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-900 text-slate-300"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Primary CTA — opens Google Form in new tab */}
          <a
            href="https://forms.gle/11T5n9krmCHCx719A"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-rose-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Open Application Form</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          <p className="text-[10px] font-mono text-slate-600 tracking-wider">
            Opens in a new tab • Official Google Form • IIT Jodhpur AWS SBG
          </p>
        </div>
      )}
    </div>
  );
};
