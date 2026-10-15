# AWS Student Builders Group IIT Jodhpur 🎃
### Official Web Experience — Halloween Nightmare Abyss Edition

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![AWS Region](https://img.shields.io/badge/AWS_Region-ap--south--1-ff9900?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

An immersive, production-grade web portal built for the technical builder community at the **Indian Institute of Technology Jodhpur (IITJ)**.

This release features the **Halloween Nightmare Abyss Edition** — transforming the official AWS SBG portal into a dark, horror movie-style experience blending cutting-edge WebGL 3D graphics, dynamic background video layers, continuous procedural horror audio, floating ethereal spirits, and gothic aesthetic design while preserving the complete official student chapter curriculum, team directory, and masterclasses.

---

## ☁️ Official Community Portals

- **LinkedIn**: [AWS Student Builder Group at IIT Jodhpur](https://www.linkedin.com/company/aws-student-builder-group-at-iit-jodhpur/)
- **Meetup Chapter**: [AWS SBG at IIT Jodhpur](https://www.meetup.com/aws-sbg-at-indian-institute-of-technology-jodhpur/)
- **WhatsApp Community**: [Official Builder Cohort](https://chat.whatsapp.com/JFbSaqFNsXeCYUpZu5w3OE)
- **GitHub Organization**: [github.com/aws-sbg-iitj](https://github.com/aws-sbg-iitj)

---

## 🎃 Halloween Nightmare Edition Highlights

### 1. 🎬 Cinematic Scary Mask Hero with 3D Jack-o'-Lantern
- **Live Background Video Layer**: High-definition Pixabay Scary Halloween Mask video (`mask-hero.mp4`) with smooth infinite loop playback beneath multi-tier blood-red and obsidian vignetting.
- **Interactive Three.js 3D Jack-o'-Lantern**: Custom WebGL pumpkin model built with procedural segmented geometry, realistic ribbed lobes, green twisted stem, carved triangular eyes, jagged fangs, and interior point light simulating real candle flicker with real-time mouse/pointer tracking.

### 2. 👻 3D Floating Ethereal White Ghosts (`FloatingGhosts.tsx`)
- Translucent, floating spirits with undulating spectral tails drifting organically across the viewport.
- Dynamic alpha transparency, subtle glow drop-shadows, and organic floating physics mimicking apparitions gliding through a haunted night.

### 3. 🌾 Haunted Scarecrow Guardian (`HauntedScarecrow.tsx`)
- Positioned at the **Path of Shadows** (Curriculum Roadmap).
- Features a carved glowing pumpkin head with flame-lit eye sockets, tattered dark trenchcoat, outstretched straw claws, and a perched sinister black crow watching over learners as they advance through cloud architecture milestones.

### 4. 🔊 Compulsory Continuous Horror Audio (`HorrorSoundManager.ts` & `HalloweenAtmosphere.tsx`)
- **Soundtrack**: Looping Pixabay Horror Scream SFX (`horror-scream.mp3`) paired with real-time Web Audio API procedural synthesis generating howling wind and low-frequency sub-bass atmospheric drones.
- **Seamless Autoplay Resilience**: High-priority passive listeners (`mousemove`, `pointermove`, `scroll`, `touchstart`) ensure the audio starts without delay even if strict browser zero-gesture autoplay policies intervene.

### 5. 🕷️ Spooky Interactive Atmospheric Layer
- **Dripping Viscous Blood Border**: SVG blood dripping header across the screen top with animated falling blood droplets.
- **Occult Witchcraft Summoning Circle**: Subtle geometric alchemical circle with pentagram runes rotating slowly in the dark background.
- **Sinister Lurking Grin**: Cheshire/Pennywise razor-sharp demonic smile with glowing yellow slit eyes lurking in the shadows (clickable for thunder stingers).
- **Annabelle Porcelain Doll**: Cracked vintage porcelain doll with blood tears watching from the corner (clickable for whisper stingers).
- **Roaming Witch on Broomstick**: Animated silhouette flying across the upper sky (clickable for witch cackles).
- **Cemetery Ground Layer**: Tombstones and animated skeletal zombie hands clawing out of the graveyard dirt.

### 6. 🏛️ Complete Guild & Curriculum Content Preserved
- **Council of Shadows (Team Directory)**: Dedicated tombstone-style cards for leadership and student builders with real names, roles, focus areas, and verified LinkedIn/GitHub links.
- **Path of Shadows (Curriculum Roadmap)**: Step-by-step zero-to-hero cloud developer curriculum covering Cloud Foundations, Core Compute & Networking, Security & DevSecOps, and Generative AI on AWS.
- **Dark Archives (50 Free Video Masterclasses)**: Filterable masterclass library categorized by AWS certifications and skill tracks.
- **Grimoire Badges (100 Free Badges & Certifications)**: Interactive catalog of free AWS skill badges and certification roadmaps.
- **Daylight Clean Theme Toggle**: Floating button to seamlessly toggle between the dark Halloween Nightmare Edition and the clean Google Antigravity Daylight theme.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16.3.3](https://nextjs.org/) (App Router, Turbopack) |
| **Runtime & UI** | [React 19.2.8](https://react.dev/) + React DOM |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict typing) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS |
| **3D Graphics** | [Three.js 0.186.1](https://threejs.org/) (Custom WebGL Canvas) |
| **Audio** | Web Audio API + HTML5 Audio Looper |
| **Typography** | Creepster, Nosifer, Cinzel Decorative, Plus Jakarta Sans, JetBrains Mono |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 📂 Repository File Structure

```
AWS-SBHL-IITJ/
├── public/
│   ├── brand/
│   │   ├── aws-sbg-chip-purple.png      # Official crenellated chip glyph
│   │   └── aws-sbg-theme-poster.png     # Official modular brand poster
│   └── halloween/
│       ├── mask-hero.mp4                # Scary Halloween Mask dynamic hero video
│       ├── horror-scream.mp3            # Atmospheric horror scream SFX
│       ├── graveyard-zombie-hand.jpg    # Atmospheric graveyard image
│       ├── haunted-house-red.jpg        # Haunted mansion background
│       └── jack-o-lantern-3d.jpg        # 3D pumpkin texture reference
├── src/
│   ├── app/
│   │   ├── globals.css                  # Tailwind v4, custom keyframes, scrollbars
│   │   ├── layout.tsx                   # Font imports (Creepster, Nosifer, Google Fonts) & SEO
│   │   ├── not-found.tsx                # Horror 404 page
│   │   ├── page.tsx                     # Main application entry point (Halloween / Clean toggle)
│   │   ├── robots.ts                    # Search engine crawler directives
│   │   └── sitemap.ts                   # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── halloween/                   # 🎃 Halloween Nightmare Edition Components
│   │   │   ├── HalloweenNavbar.tsx      # Dark gothic header with blood drips
│   │   │   ├── HalloweenHero.tsx        # Hero with mask video background & 3D Jack-o'-lantern
│   │   │   ├── Halloween3DScene.tsx     # Three.js WebGL Jack-o'-lantern implementation
│   │   │   ├── FloatingGhosts.tsx       # 3D floating ethereal white spirits
│   │   │   ├── HauntedScarecrow.tsx     # Haunted pumpkin scarecrow guardian
│   │   │   ├── HalloweenAtmosphere.tsx  # Blood drips, occult circle, witch, doll, audio loop
│   │   │   ├── HorrorSoundManager.ts    # Web Audio API horror sound synthesizer & manager
│   │   │   ├── HalloweenCurriculum.tsx  # Path of Shadows curriculum roadmap
│   │   │   ├── HalloweenTeamDirectory.tsx # Council of Shadows team directory
│   │   │   ├── HalloweenLecturesSection.tsx # Dark Archives 50 video masterclasses
│   │   │   ├── HalloweenCertifications.tsx # 100 free badges & certification guide
│   │   │   └── HalloweenFooter.tsx      # Graveyard footer with interactive sound buttons
│   │   └── antigravity/                 # ☀️ Clean Daylight Theme Components
│   │       ├── CleanNavbar.tsx
│   │       ├── CleanHero.tsx
│   │       ├── CleanTeamDirectory.tsx
│   │       ├── CleanCurriculum.tsx
│   │       ├── AwsLecturesSection.tsx
│   │       ├── CleanCertifications.tsx
│   │       ├── CleanFooter.tsx
│   │       └── CleanJoinModal.tsx
│   ├── config/
│   │   └── socials.ts                   # LinkedIn, Meetup, WhatsApp, GitHub links
│   └── data/
│       ├── team.ts                      # Leadership & builder cohort members
│       ├── events.ts                    # Workshops and sessions
│       └── projects.ts                  # Cloud lab projects
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.17.0+` or `v20+` (tested on Node.js 26)
- **Package Manager**: `npm` (v9+) or `pnpm` (v8+)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/CoderOggy78/AWS-SBHL-IITJ.git
cd AWS-SBHL-IITJ

# 2. Install dependencies
npm install

# 3. Launch development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the **Halloween Nightmare Edition**.

### Production Build

```bash
# Build the optimized production bundle
npm run build

# Start the production server
npm run start
```

---

## 👥 Adding New Team Members

To add or update members in the Council of Shadows team directory, edit [src/data/team.ts](file:///Users/oggy/Library/Mobile%20Documents/com~apple~CloudDocs/AWS%20SBGL%20WEBSITE%20IITJ/src/data/team.ts):

```typescript
{
  id: "member-slug",
  name: "Full Name",
  role: "Lead / Core Builder",
  category: "Leadership", // "Leadership" | "Technical" | "Community Management" | "Social Media & Management"
  affiliation: "AWS Student Builder Group",
  institute: "Indian Institute of Technology Jodhpur",
  bio: "Short builder bio...",
  focusAreas: ["Cloud Architecture", "Amazon Bedrock", "DevOps"],
  linkedin: "https://www.linkedin.com/in/...",
  github: "https://github.com/...",
}
```

---

## 🛡️ Disclaimer

> **Official Community Initiative Notice**:  
> The AWS Student Builder Group at IIT Jodhpur is an independent student developer community chapter and is not an offer of employment or a legal entity of Amazon Web Services (AWS) or Amazon.com, Inc. unless explicitly stated otherwise.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details. Built with 🧡 & 🎃 by the student builders at **Indian Institute of Technology Jodhpur**.
