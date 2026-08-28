"use client";

import React, { useState, useRef, useEffect } from "react";
import { AppId } from "@/types/os";
import { SOCIAL_LINKS } from "@/config/socials";
import { INTERNS_DATA } from "@/data/interns";
import confetti from "canvas-confetti";
import { Terminal as TerminalIcon, Sparkles } from "lucide-react";

interface TerminalAppProps {
  onOpenApp: (id: AppId) => void;
}

interface OutputEntry {
  type: "input" | "output" | "error" | "system";
  text: string;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({ onOpenApp }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [outputs, setOutputs] = useState<OutputEntry[]>([
    { type: "system", text: "AWS BUILDER OS SHELL (IIT Jodhpur Node)" },
    { type: "system", text: "Type 'help' to inspect available commands or 'open [app]'." },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputs]);

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    const newOutputs: OutputEntry[] = [...outputs, { type: "input", text: raw }];
    setHistory((prev) => [...prev, raw]);
    setHistoryIdx(-1);

    const parts = raw.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "help":
        newOutputs.push({
          type: "output",
          text: [
            "Available commands:",
            "  whoami        Inspect current user identity",
            "  cloud-status  Print real-time AWS SBG infrastructure status",
            "  leads         Display official Core Team organizational hierarchy",
            "  team          Display departmental tiers (Leadership, Tech, Community, Mgmt)",
            `  interns       List official 2026-27 interns directory & colleges (${INTERNS_DATA.length} interns)`,
            "  projects      List active builder lab projects",
            "  events        List scheduled workshops & sessions",
            "  resources     Display cloud learning library categories",
            "  about         Show AWS SBG manifesto",
            "  contact       Show official WhatsApp, Meetup & LinkedIn links",
            "  open <app>    Launch an application (e.g. 'open projects', 'open leads')",
            "  date          Print system time and region",
            "  clear         Clear the terminal screen",
            "  coffee        Refuel developer state",
          ].join("\n"),
        });
        break;

      case "whoami":
        newOutputs.push({
          type: "output",
          text: "> You are a builder exploring AWS Student Builder Group — IIT Jodhpur.",
        });
        break;

      case "cloud-status":
        newOutputs.push({
          type: "output",
          text: [
            "COMMUNITY ........ ONLINE",
            "BUILDERS ......... ACTIVE",
            "PROJECTS ......... BUILDING",
            "SYSTEM ........... OPERATIONAL",
            "REGION ........... ap-south-iitj",
          ].join("\n"),
        });
        break;

      case "leads":
        newOutputs.push({
          type: "output",
          text: [
            "AWS SBG IIT JODHPUR — CORE TEAM ORGANIZATIONAL STRUCTURE (2026-27)",
            "",
            "// LEADERSHIP & ADVISORY",
            "  • Vishwanath Barve      [Club Lead and Organizer]",
            "  • Ashwani Dwivedi Sir   [Club Co-Ordinator]",
            "  • Armaan Kachhawa       [Club Co-Lead]",
            "",
            "// 1. COMMUNITY MANAGEMENT TEAM",
            "  • Rahul Wakhale         [Team Lead]",
            "  • Lakshya Gupta         [Co-Lead]",
            "  • Dishant Chaudhary     [Core Team Member]",
            "  • Quazi Arqam           [Core Team Member]",
            "  • Sainesh P             [Core Team Member]",
            "",
            "// 2. TECHNICAL TEAM",
            "  • Harshpreet Singh      [Team Lead]",
            "  • Satyam Mishra         [Co-Lead]",
            "  • Tanmay Damre          [Core Team Member]",
            "  • Yash Gogawale         [Core Team Member]",
            "",
            "// 3. SOCIAL MEDIA & MANAGEMENT TEAM",
            "  • Lakshay Khandelwal    [Team Lead]",
            "  • Kavita Dixit          [Co-Lead]",
            "  • Bishal Saha           [Management Core]",
            "  • Tanujit Khatkar       [Core Team Member]",
            "  • Tanmay Srivastava     [Core Team Member]",
            "  • Vindhya Verma         [Core Team Member]",
            "",
            `Type 'interns' to list all ${INTERNS_DATA.length} student interns across partner institutes.`,
          ].join("\n"),
        });
        break;

      case "team":
        newOutputs.push({
          type: "output",
          text: [
            "AWS SBG IIT Jodhpur Departmental Structure:",
            "  Team/",
            "  ├── Leadership & Advisory/      (Lead: Vishwanath Barve, Co-Lead: Armaan Kachhawa, Co-Ordinator: Ashwani Dwivedi Sir)",
            "  ├── Technical Team/             (Lead: Harshpreet Singh, Co-Lead: Satyam Mishra)",
            "  ├── Community Management/       (Lead: Rahul Wakhale, Co-Lead: Lakshya Gupta)",
            "  ├── Social Media & Management/  (Lead: Lakshay Khandelwal, Co-Lead: Kavita Dixit)",
            `  └── Interns Directory/          (${INTERNS_DATA.length} Interns across IITs, NITs & Universities)`,
            "",
            "Run 'open team' or 'open leads' to inspect in Finder.",
          ].join("\n"),
        });
        break;

      case "interns":
        newOutputs.push({
          type: "output",
          text: [
            `AWS SBG IIT JODHPUR — OFFICIAL INTERNS DIRECTORY (${INTERNS_DATA.length} Students):`,
            "",
            ...INTERNS_DATA.map(
              (intern, i) =>
                `  [${String(i + 1).padStart(2, "0")}] ${intern.name.padEnd(28)} | ${intern.institute}`
            ),
            "",
            "Run 'open interns' to view full credentials and search.",
          ].join("\n"),
        });
        break;

      case "projects":
        newOutputs.push({
          type: "output",
          text: [
            "Active Builder Lab Projects:",
            "  [BUILDING]     Campus RAG Knowledge Base (Bedrock, OpenSearch, Lambda)",
            "  [SHIPPED]      IITJ Solar & Sensor Stream Pipeline (IoT Core, Kinesis)",
            "  [EXPERIMENTAL] Isolated Code Sandbox Engine (Fargate, MicroVM)",
            "  [IDEA]         IITJ Multi-Tier CDK Starter (AWS CDK, ECS, Aurora)",
            "Run 'open projects' to inspect full architecture diagrams.",
          ].join("\n"),
        });
        break;

      case "events":
        newOutputs.push({
          type: "output",
          text: [
            "Upcoming Events:",
            "  • AWS Builder Kickoff & Cloud Architecture Immersion",
            "  • Hands-on GenAI: Building RAG Pipelines with Amazon Bedrock",
            "  • Jodhpur Cloud Hack: 36-Hour Builder Challenge",
            `Meetup Page: ${SOCIAL_LINKS.meetup}`,
          ].join("\n"),
        });
        break;

      case "resources":
        newOutputs.push({
          type: "output",
          text: [
            "Cloud Learning Library:",
            "  • AWS Well-Architected Framework (6 Pillars)",
            "  • AWS CDK TypeScript Workshop",
            "  • Serverless Land Microservices Patterns",
            "  • Amazon Bedrock Generative AI Spec",
            "Run 'open resources' to explore documents.",
          ].join("\n"),
        });
        break;

      case "about":
        newOutputs.push({
          type: "output",
          text: [
            "Not Another Campus Club.",
            "The AWS Student Builder Group at IIT Jodhpur is a student-led technical community focused on learning by building.",
            "Philosophy: Learn deeply. Build together. Break things. Fix them. Ship something meaningful.",
          ].join("\n"),
        });
        break;

      case "contact":
        newOutputs.push({
          type: "output",
          text: [
            "Official AWS SBG IIT Jodhpur Links:",
            `  WhatsApp: ${SOCIAL_LINKS.whatsapp}`,
            `  LinkedIn: ${SOCIAL_LINKS.linkedin}`,
            `  Meetup:   ${SOCIAL_LINKS.meetup}`,
            `  Email:    ${SOCIAL_LINKS.email}`,
          ].join("\n"),
        });
        break;

      case "roadmap":
        onOpenApp("roadmap");
        newOutputs.push({
          type: "system",
          text: "Opening Cloud Engineering Roadmap (Beginner to Advanced)...",
        });
        break;

      case "certs":
      case "certifications":
        onOpenApp("certifications");
        newOutputs.push({
          type: "system",
          text: "Opening 100 Free Cloud Certifications & Badges...",
        });
        break;

      case "open":
        const targetApp = (args[0] || "").toLowerCase() as AppId;
        const validApps: AppId[] = [
          "home",
          "about",
          "leads",
          "team",
          "projects",
          "roadmap",
          "certifications",
          "resources",
          "internships",
          "terminal",
          "feed",
          "contact",
        ];
        if (validApps.includes(targetApp)) {
          onOpenApp(targetApp);
          newOutputs.push({
            type: "system",
            text: `Opening application: [${targetApp}]`,
          });
        } else {
          newOutputs.push({
            type: "error",
            text: `Error: Unknown application '${args[0]}'. Valid apps: ${validApps.join(", ")}`,
          });
        }
        break;

      case "date":
        newOutputs.push({
          type: "output",
          text: new Date().toString() + " (Region: ap-south-iitj)",
        });
        break;

      case "clear":
        setOutputs([]);
        setInput("");
        return;

      // Easter Eggs
      case "sudo":
        if (args.join(" ") === "build-the-cloud") {
          try {
            confetti({
              particleCount: 70,
              spread: 60,
              origin: { y: 0.6 },
              colors: ["#38bdf8", "#a855f7", "#ffffff"],
            });
          } catch {
            // Confetti fallback
          }
          newOutputs.push({
            type: "output",
            text: [
              "Permission granted.",
              "Initializing builders...",
              "☁️ Cloud deployed successfully.",
            ].join("\n"),
          });
        } else {
          newOutputs.push({
            type: "output",
            text: `sudo: ${args.join(" ")}: builder has superuser privileges.`,
          });
        }
        break;

      case "rm":
        if (args.join(" ") === "-rf procrastination") {
          newOutputs.push({
            type: "output",
            text: "Procrastination removed successfully.",
          });
        } else {
          newOutputs.push({
            type: "error",
            text: "rm: operation prohibited by AWS Builder OS safety sandbox.",
          });
        }
        break;

      case "coffee":
        newOutputs.push({
          type: "output",
          text: "Developer fuel initialized. ☕",
        });
        break;

      default:
        newOutputs.push({
          type: "error",
          text: `zsh: command not found: ${cmd}. Type 'help' for command manual.`,
        });
        break;
    }

    setOutputs(newOutputs);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < history.length) {
          setHistoryIdx(nextIdx);
          setInput(history[nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInput("");
        }
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="p-4 h-full bg-[#080d1a] font-mono text-xs text-slate-200 select-text overflow-y-auto cursor-text flex flex-col justify-between"
    >
      <div className="space-y-2">
        {/* Terminal Header Info */}
        <div className="pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>aws-builder-iitj -- zsh (x86_64-apple-darwin24)</span>
          <span className="text-emerald-400">● LIVE</span>
        </div>

        {/* Output lines */}
        {outputs.map((out, idx) => (
          <div key={idx} className="leading-relaxed">
            {out.type === "input" ? (
              <div className="flex items-center gap-2 text-sky-400">
                <span className="text-purple-400">builder@iitj:~$</span>
                <span className="text-white font-semibold">{out.text}</span>
              </div>
            ) : out.type === "error" ? (
              <div className="text-rose-400 pl-4 whitespace-pre-wrap">{out.text}</div>
            ) : out.type === "system" ? (
              <div className="text-slate-500 italic pl-1 whitespace-pre-wrap">{out.text}</div>
            ) : (
              <div className="text-slate-300 pl-4 whitespace-pre-wrap">{out.text}</div>
            )}
          </div>
        ))}

        {/* Interactive Prompt Input */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-purple-400 shrink-0">builder@iitj:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent text-white outline-none border-none p-0 font-mono caret-sky-400"
          />
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Terminal Footer shortcuts */}
      <div className="mt-4 pt-2 border-t border-slate-900 text-[10px] text-slate-600 flex flex-wrap gap-3 pointer-events-none select-none">
        <span>Try: whoami</span>
        <span>cloud-status</span>
        <span>leads</span>
        <span>projects</span>
        <span>open [app]</span>
        <span>sudo build-the-cloud</span>
        <span>coffee</span>
      </div>
    </div>
  );
};
