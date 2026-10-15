"use client";

import React, { useState, useRef, useEffect } from "react";
import { AppId } from "@/types/os";
import { SOCIAL_LINKS } from "@/config/socials";
import confetti from "canvas-confetti";

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
    { type: "system", text: "Microsoft Windows XP [Version 5.1.2600.5512]" },
    { type: "system", text: "(C) Copyright 1985-2001 Microsoft Corp. (AWS SBG IIT Jodhpur Node)" },
    { type: "system", text: "Type 'help' to view available commands or 'start [app]'." },
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
            "For more information on a specific command, type HELP command-name",
            "",
            "CLS        Clears the screen.",
            "DIR        Displays a list of files and subdirectories in a directory.",
            "VER        Displays the Windows version.",
            "WHOAMI     Displays the active builder user account and permissions.",
            "PROJECTS   Displays 50 active AWS Builder Lab project blueprints.",
            "ROADMAP    Opens Cloud Engineering Roadmap.",
            "CERTS      Opens 100 Free Cloud Certifications & Digital Badges.",
            "LEADS      Displays official Core Team organizational hierarchy.",
            "TEAM       Displays departmental breakdown.",
            "RESOURCES  Displays cloud library & whitepapers.",
            "ABOUT      Displays AWS Student Builder Group manifesto.",
            "CONTACT    Displays official WhatsApp, Meetup, and LinkedIn portals.",
            "START      Starts a separate window to run a specified program.",
            "DATE       Displays or sets the date.",
            "COFFEE     Dispenses developer coffee.",
          ].join("\n"),
        });
        break;

      case "ver":
        newOutputs.push({
          type: "output",
          text: "Microsoft Windows XP [Version 5.1.2600] Service Pack 3 (AWS SBG Cloud Node)",
        });
        break;

      case "whoami":
        newOutputs.push({
          type: "output",
          text: "IITJ-CLOUD-NODE\\StudentBuilder [Role: Cloud Engineer / Builder]",
        });
        break;

      case "dir":
        newOutputs.push({
          type: "output",
          text: [
            " Volume in drive C is AWS_BUILDER_XP",
            " Volume Serial Number is 4C28-11F2",
            "",
            " Directory of C:\\Documents and Settings\\Builder",
            "",
            "08/28/2026  05:30 PM    <DIR>          .",
            "08/28/2026  05:30 PM    <DIR>          ..",
            "08/28/2026  05:30 PM    <DIR>          My Documents",
            "08/28/2026  05:30 PM    <DIR>          BuilderLab",
            "08/28/2026  05:30 PM    <DIR>          CloudRoadmap",
            "08/28/2026  05:30 PM    <DIR>          Certifications",
            "08/28/2026  05:30 PM    <DIR>          CoreTeam",
            "08/28/2026  05:30 PM             9,535 README.txt",
            "08/28/2026  05:30 PM             1,084 LICENSE.txt",
            "               2 File(s)         10,619 bytes",
            "               7 Dir(s)   99,999,999,999 bytes free",
          ].join("\n"),
        });
        break;

      case "type":
        if (args[0]?.toLowerCase().includes("readme")) {
          newOutputs.push({
            type: "output",
            text: [
              "AWS Student Builder Group — Indian Institute of Technology Jodhpur",
              "==================================================================",
              "An interactive cloud operating experience exploring AWS architectures,",
              "software engineering, serverless microservices, and AI/ML.",
            ].join("\n"),
          });
        } else {
          newOutputs.push({
            type: "error",
            text: `The system cannot find the file specified: ${args[0]}`,
          });
        }
        break;

      case "leads":
        newOutputs.push({
          type: "output",
          text: [
            "AWS SBG IIT JODHPUR — CORE TEAM ORGANIZATIONAL STRUCTURE (2026-27)",
            "==================================================================",
            "",
            "[LEADERSHIP & ADVISORY]",
            "  • Vishwanath Barve      [Club Lead and Organizer]",
            "  • Ashwani Dwivedi Sir   [Club Co-Ordinator]",
            "",
            "[1. COMMUNITY MANAGEMENT TEAM]",
            "  • Quazi Arqam           [Team Lead]",
            "  • Harshpreet Singh      [Core Team Member]",
            "  • Lakshya Gupta         [Core Team Member]",
            "  • Anita Kumari          [Core Team Member]",
            "  • Sadaf Naaz            [Core Team Member]",
            "",
            "[2. TECHNICAL TEAM]",
            "  • Bishal Saha           [Team Lead]",
            "  • Satyam Mishra         [Core Team Member]",
            "  • Aryan Vishwakarma     [Core Team Member]",
            "  • Yash Gogawale         [Core Team Member]",
            "  • Tanmay Damre          [Core Team Member]",
            "",
            "[3. SOCIAL MEDIA TEAM]",
            "  • Rahul Wakhale         [Team Lead]",
            "  • Kavita Dixit          [Core Team Member]",
            "  • Shantanu Joshi        [Core Team Member]",
            "  • Tanuj Khatkar         [Core Team Member]",
            "  • Lipika Parida         [Core Team Member]",
          ].join("\n"),
        });
        break;

      case "team":
        newOutputs.push({
          type: "output",
          text: [
            "C:\\Documents and Settings\\Builder\\Team",
            "  ├── Leadership & Advisory\\      (Lead: Vishwanath Barve, Co-Ordinator: Ashwani Dwivedi Sir)",
            "  ├── Community Management Team\\  (Lead: Quazi Arqam)",
            "  ├── Technical Team\\             (Lead: Bishal Saha)",
            "  └── Social Media Team\\          (Lead: Rahul)",
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
          ].join("\n"),
        });
        break;

      case "roadmap":
        onOpenApp("roadmap");
        newOutputs.push({
          type: "system",
          text: "Starting Cloud Roadmap...",
        });
        break;

      case "certs":
      case "certifications":
        onOpenApp("certifications");
        newOutputs.push({
          type: "system",
          text: "Starting 100 Free Cloud Certifications & Badges...",
        });
        break;

      case "start":
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
          "terminal",
          "feed",
          "contact",
        ];
        if (validApps.includes(targetApp)) {
          onOpenApp(targetApp);
          newOutputs.push({
            type: "system",
            text: `Started program: [${targetApp}.exe]`,
          });
        } else {
          newOutputs.push({
            type: "error",
            text: `Cannot find file '${args[0]}'. Valid programs: ${validApps.join(", ")}`,
          });
        }
        break;

      case "about":
        newOutputs.push({
          type: "output",
          text: "Not Another Campus Club. AWS Student Builder Group @ IIT Jodhpur.",
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
          ].join("\n"),
        });
        break;

      case "date":
        newOutputs.push({
          type: "output",
          text: `The current date is: ${new Date().toLocaleDateString()}`,
        });
        break;

      case "cls":
        setOutputs([]);
        setInput("");
        return;

      case "sudo":
        if (args.join(" ") === "build-the-cloud") {
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#38bdf8", "#48b543", "#ffcc00", "#d13b19"],
            });
          } catch {}
          newOutputs.push({
            type: "output",
            text: "Administrator privileges enabled. ☁️ AWS Cloud deployed successfully.",
          });
        }
        break;

      case "coffee":
        newOutputs.push({
          type: "output",
          text: "☕ Coffee brewed successfully.",
        });
        break;

      default:
        newOutputs.push({
          type: "error",
          text: `'${cmd}' is not recognized as an internal or external command, operable program or batch file.`,
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
      className="p-3 h-full bg-black font-mono text-xs text-white select-text overflow-y-auto cursor-text flex flex-col justify-between"
    >
      <div className="space-y-1.5">
        {outputs.map((out, idx) => (
          <div key={idx} className="leading-relaxed">
            {out.type === "input" ? (
              <div className="flex items-center gap-1.5 text-white">
                <span className="text-white">C:\Documents and Settings\Builder&gt;</span>
                <span className="text-white font-bold">{out.text}</span>
              </div>
            ) : out.type === "error" ? (
              <div className="text-red-400 whitespace-pre-wrap">{out.text}</div>
            ) : out.type === "system" ? (
              <div className="text-slate-300 whitespace-pre-wrap">{out.text}</div>
            ) : (
              <div className="text-slate-200 whitespace-pre-wrap">{out.text}</div>
            )}
          </div>
        ))}

        {/* Command Prompt Input */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <span className="text-white shrink-0">C:\Documents and Settings\Builder&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent text-white outline-none border-none p-0 font-mono caret-white"
          />
        </div>

        <div ref={bottomRef} />
      </div>

      <div className="mt-4 pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex flex-wrap gap-3 pointer-events-none select-none">
        <span>HELP</span>
        <span>DIR</span>
        <span>PROJECTS</span>
        <span>ROADMAP</span>
        <span>LEADS</span>
        <span>START [APP]</span>
        <span>CLS</span>
      </div>
    </div>
  );
};
