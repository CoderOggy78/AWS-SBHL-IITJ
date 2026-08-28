# AWS Builder OS — IIT Jodhpur
### Official Web Experience for AWS Student Builder Group at Indian Institute of Technology Jodhpur

[![Next.js 15+](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![AWS Region](https://img.shields.io/badge/AWS_Region-ap--south--1-orange?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com/)

An interactive, production-grade cloud operating system experience built specifically for the technical builder community at **Indian Institute of Technology Jodhpur**. 

Rather than a conventional static campus club landing page, this project implements **AWS Builder OS**, blending macOS desktop aesthetics with AWS cloud infrastructure metaphors, interactive windows, a functional command-line shell, hierarchical Finder directories, and an adaptive mobile layout.

---

## ☁️ Official Community Portals

- **LinkedIn**: [AWS Student Builder Group at IIT Jodhpur](https://www.linkedin.com/company/aws-student-builder-group-at-iit-jodhpur/)
- **Meetup Chapter**: [AWS SBG at IIT Jodhpur](https://www.meetup.com/aws-sbg-at-indian-institute-of-technology-jodhpur/)
- **WhatsApp Community**: [Official Builder Cohort](https://chat.whatsapp.com/JFbSaqFNsXeCYUpZu5w3OE)
- **GitHub**: [github.com/aws-sbg-iitj](https://github.com/aws-sbg-iitj)

---

## 🖥️ Builder OS Experience Flow

1. **Stage 1: Click to Begin**
   - Deep obsidian navy minimalist hero screen.
   - 9x9 crenellated electronic silicon chip glyph with ambient glow.
   - Dynamic canvas particle field with real-time mouse perturbation.
   - Built-in Web Audio API datacenter ambient synthesizer (no external audio files, muted by default).

2. **Stage 2: Cloud Journey Flythrough**
   - 3D forward-travel camera through cloud topology (API Gateway, Bedrock AI, Lambda Compute, DynamoDB clusters, Fargate MicroVMs).
   - Real-time bootloader telemetry streaming verification logs (`[OK] Cloud initialized`, `[OK] IIT Jodhpur node connected`).
   - Interactive Skip button (`[Esc]` / Space) for fast desktop access.

3. **Stage 3: macOS-Inspired Cloud OS**
   - **Top Menu Bar**: System health telemetry, digital clock, sound toggle, Spotlight trigger (`Cmd+K`), notification badge.
   - **Interactive Dock**: Glassmorphism dock with icon magnification physics, active indicator dots, and quick launches.
   - **Multi-Window Manager**: Draggable, resizable, minimizable windows with authentic macOS traffic lights and z-index elevation.
   - **Spotlight Search (`Cmd+K`)**: Instant modal searching across members, projects, workshops, and cloud docs.
   - **Interactive Shell (Terminal.app)**: Real shell interpreting `help`, `whoami`, `cloud-status`, `leads`, `projects`, `open <app>`, and developer easter eggs (`sudo build-the-cloud`, `coffee`, `rm -rf procrastination`).
   - **Mobile Experience**: Adaptive iOS builder shell for screens under 768px with touch-friendly app icons, full-screen slide sheets, and bottom navigation.

---

## 🏛️ Application Directory Architecture

| Application | Description |
| :--- | :--- |
| **Home.app** | Hero manifesto, dynamic Cloud Status dashboard, and interactive 5-stage cloud architecture pipeline. |
| **About.app** | Core manifesto, engineering philosophy ("Learn deeply. Build together. Break things. Fix them. Ship something meaningful."), and 8 disciplines. |
| **Leads.app** | Finder-style leadership directory featuring Vishwanath Barve, Armaan Kachhawa, Ashwani Dwivedi, and Core Leads with profile inspector. |
| **Team.app** | Hierarchical Finder folder tree (`Team/Leadership`, `Technical`, `Community Management`, `Social Media & Management`). |
| **Builder Lab** | Project cards with status filters (`IDEA`, `BUILDING`, `SHIPPED`, `EXPERIMENTAL`), interactive node topology diagrams, and tech specs. |
| **Events.app** | Scheduled immersion sessions, workshops, and hackathons linked directly to the official Meetup chapter. |
| **Resources.app**| Cloud library with categorized AWS whitepapers, architecture specs, and certification study guides. |
| **CloudMap.app** | Interactive architectural graph connecting leadership, technical systems, and community branches. |
| **Feed.app** | Verified chronological audit log of commits, releases, and milestones. |
| **Photos.app** | High-resolution gallery featuring the official modular grid poster, silicon chip branding, and workshop moments. |
| **Contact.app** | Direct access to official WhatsApp, LinkedIn, Meetup, and campus contact forms. |
| **Terminal.app** | Interactive zsh shell with system status commands and developer easter eggs. |

---

## 📂 Repository File Structure

```
aws-builder-iitj/
├── public/
│   └── brand/
│       ├── aws-sbg-chip-purple.png    # Official crenellated chip glyph
│       └── aws-sbg-theme-poster.png   # Official modular grid brand poster
├── src/
│   ├── app/
│   │   ├── globals.css                # Tailwind 4, glass tokens, custom scrollbars
│   │   ├── layout.tsx                 # Root layout with OpenGraph, SEO, and fonts
│   │   ├── not-found.tsx              # Kernel Panic themed 404 screen
│   │   ├── page.tsx                   # Main OS orchestration engine
│   │   ├── robots.ts                  # SEO crawler directives
│   │   └── sitemap.ts                 # Dynamic XML sitemap
│   ├── components/
│   │   ├── apps/                      # 13 standalone window applications
│   │   ├── desktop/                   # MenuBar, DesktopIcons, Wallpaper, Spotlight, NotificationCenter
│   │   ├── dock/                      # macOS Glass Dock with magnification
│   │   ├── intro/                     # BeginScreen & CloudJourney flythrough
│   │   ├── mobile/                    # iOS-adapted MobileOS shell
│   │   ├── ui/                        # Scalable Logo SVG & Web Audio Synthesizer
│   │   └── window/                    # WindowFrame with draggable traffic lights
│   ├── config/
│   │   └── socials.ts                 # LinkedIn, Meetup, WhatsApp, and GitHub URLs
│   ├── data/
│   │   ├── events.ts                  # Scheduled workshops and sessions
│   │   ├── feed.ts                    # Activity stream items
│   │   ├── projects.ts                # Builder lab projects and architecture nodes
│   │   ├── resources.ts               # AWS cloud library documents
│   │   └── team.ts                    # Leadership and team category data
│   └── types/
│       └── os.ts                      # TypeScript definitions
├── .env.example
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18.17.0+` or `v20+` (tested on Node 26)
- npm `v9+` or pnpm `v8+`

### Installation

```bash
# Clone the repository
git clone https://github.com/aws-sbg-iitj/aws-builder-os.git
cd aws-builder-os

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to launch AWS Builder OS.

---

## 🔧 Adding New Content

### 1. Adding Team Members
Edit `src/data/team.ts`:
```typescript
{
  id: "builder-id",
  name: "Builder Name",
  role: "Role in Club",
  category: "Technical", // "Leadership" | "Technical" | "Community Management" | "Social Media & Management" | "Advisors"
  affiliation: "AWS Student Builder Group",
  institute: "Indian Institute of Technology Jodhpur",
  bio: "Short biography...",
  focusAreas: ["Cloud", "DevOps"],
  linkedin: "https://linkedin.com/in/...",
}
```

### 2. Adding Builder Lab Projects
Edit `src/data/projects.ts`:
```typescript
{
  id: "project-slug",
  name: "Project Name",
  problem: "What challenge does this solve?",
  status: "BUILDING", // "IDEA" | "BUILDING" | "SHIPPED" | "EXPERIMENTAL"
  technology: ["Next.js", "AWS Lambda", "DynamoDB"],
  repository: "https://github.com/...",
  contributors: ["Student Contributor"],
  architectureSummary: "Client -> API Gateway -> Lambda -> DynamoDB",
  nodes: [ /* visual diagram nodes */ ],
  edges: [ /* data flow edges */ ],
}
```

### 3. Adding Events
Edit `src/data/events.ts`:
```typescript
{
  id: "session-slug",
  title: "Workshop Title",
  date: "Date String",
  venue: "Auditorium / Lab, IIT Jodhpur",
  type: "Workshop",
  status: "Upcoming",
  description: "Description of the session...",
  registrationUrl: "https://meetup.com/...",
  topics: ["Cloud", "Bedrock"],
}
```

---

## 🛡️ Disclaimer

> **Important Community Initiative Disclaimer**:
> The AWS Student Builder Group at IIT Jodhpur is a student developer community initiative and must not be represented as employment directly with Amazon Web Services or Amazon unless explicitly stated otherwise.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information. Built with pride by the student builders at Indian Institute of Technology Jodhpur.
