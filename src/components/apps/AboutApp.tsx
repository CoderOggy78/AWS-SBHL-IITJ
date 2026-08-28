"use client";

import React from "react";
import { AppId } from "@/types/os";
import { SOCIAL_LINKS } from "@/config/socials";
import { BuilderChip, AwsLogo } from "@/components/ui/Logo";
import {
  Cloud,
  Code2,
  Cpu,
  Boxes,
  Network,
  ShieldAlert,
  GitPullRequest,
  Sparkles,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface AboutAppProps {
  onOpenApp: (id: AppId) => void;
}

const DOMAINS = [
  {
    title: "Cloud Computing",
    desc: "Multi-region resilience, VPC architecture, serverless microservices, and cost optimization.",
    icon: Cloud,
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "Software Engineering",
    desc: "Production TypeScript, Python systems, high-concurrency async runtimes, and clean API design.",
    icon: Code2,
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "AI / Machine Learning",
    desc: "Amazon Bedrock foundation models, RAG document search, SageMaker fine-tuning, and LLM inference.",
    icon: Cpu,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "DevOps & IaC",
    desc: "AWS CDK TypeScript synthesizers, GitHub Actions CI/CD pipelines, and zero-trust IAM boundaries.",
    icon: Boxes,
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Distributed Systems",
    desc: "Event-driven architectures, Kinesis event streaming, DynamoDB single-table design, and idempotency.",
    icon: Network,
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Infrastructure & Security",
    desc: "Firewalls, TLS termination, KMS envelope encryption, and SOC-ready observability.",
    icon: ShieldAlert,
    color: "from-rose-500 to-red-600",
  },
  {
    title: "Open Source",
    desc: "Student-crafted reference blueprints, community toolkits, and open collaborative codebases.",
    icon: GitPullRequest,
    color: "from-teal-500 to-cyan-600",
  },
  {
    title: "AWS Technologies",
    desc: "Hands-on mastery of 200+ AWS services with student credits and official certifications.",
    icon: Sparkles,
    color: "from-blue-500 to-sky-600",
  },
];

const PHILOSOPHY_STEPS = [
  { step: "01", title: "Learn deeply", desc: "No shallow tutorials. We dissect RFCs, distributed consensus, and real system internals." },
  { step: "02", title: "Build together", desc: "Peer programming, code reviews, and cross-discipline teams building in public." },
  { step: "03", title: "Break things", desc: "Chaos engineering, inducing load, simulating network drops, and understanding failure modes." },
  { step: "04", title: "Fix them", desc: "Debugging root causes, reading stack traces, optimizing latency, and patching memory leaks." },
  { step: "05", title: "Ship something meaningful", desc: "Deploying production software that students and researchers across campus actually use." },
];

export const AboutApp: React.FC<AboutAppProps> = ({ onOpenApp }) => {
  return (
    <div className="p-6 md:p-8 space-y-8 font-sans">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          COMMUNITY MANIFESTO
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Not Another Campus Club.
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
          The AWS Student Builder Group at IIT Jodhpur is a student-led technical community focused on learning by building. We believe that real engineering intuition is earned at the keyboard, deploying infrastructure, inspecting logs, and delivering software.
        </p>
      </div>

      {/* Philosophy Carousel / Cards */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-widest text-sky-400">
          // OUR PHILOSOPHY
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {PHILOSOPHY_STEPS.map((item) => (
            <div
              key={item.step}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500">{item.step}</span>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="text-sm font-bold text-white tracking-tight">{item.title}.</p>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Tracks / Domains */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-widest text-sky-400">
            // WHAT WE EXPLORE
          </h2>
          <span className="text-xs font-mono text-slate-500">8 Core Disciplines</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DOMAINS.map((domain, idx) => {
            const IconComp = domain.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80 hover:border-sky-500/40 transition-all group"
              >
                <div
                  className={`w-9 h-9 rounded-lg bg-gradient-to-br ${domain.color} flex items-center justify-center text-white mb-3 shadow-md`}
                >
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-sky-300 transition-colors">
                  {domain.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {domain.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-950/90 to-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-semibold text-white">Want to build with us?</h4>
          <p className="text-xs text-slate-400">
            Check out leadership directories, active project repositories, or join our community cohorts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenApp("leads")}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            Leads Directory
          </button>
          <a
            href={SOCIAL_LINKS.meetup}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-medium text-white shadow-md shadow-sky-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Join us on official Meetup"
          >
            <span>Join on Meetup</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
