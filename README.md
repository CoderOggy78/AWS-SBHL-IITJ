# AWS Student Builders Group IIT Jodhpur
### Official Web Experience for AWS Student Builders Group at Indian Institute of Technology Jodhpur

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![AWS Region](https://img.shields.io/badge/AWS_Region-ap--south--1-ff9900?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

An interactive, production-grade web portal built specifically for the technical builder community at **Indian Institute of Technology Jodhpur (IITJ)**.

Designed with a clean, modern aesthetic inspired by Google Antigravity, featuring verified AWS masterclasses, zero-to-hero cloud curriculum, complete team directory, and free certifications & badges.

---

## ☁️ Official Community Portals

- **LinkedIn**: [AWS Student Builder Group at IIT Jodhpur](https://www.linkedin.com/company/aws-student-builder-group-at-iit-jodhpur/)
- **Meetup Chapter**: [AWS SBG at IIT Jodhpur](https://www.meetup.com/aws-sbg-at-indian-institute-of-technology-jodhpur/)
- **WhatsApp Community**: [Official Builder Cohort](https://chat.whatsapp.com/JFbSaqFNsXeCYUpZu5w3OE)
- **GitHub Organization**: [github.com/aws-sbg-iitj](https://github.com/aws-sbg-iitj)

---

## 🏛️ Platform Highlights

1. **Clean Antigravity Aesthetics**
   - Clean daylight design with pastel aura gradients and modern Google Sans Flex typography.
   - Interactive multi-color canvas particles and smooth responsiveness across all screen sizes.

2. **Zero-to-Hero Cloud Curriculum**
   - 4-phase structured builder curriculum spanning Cloud Foundations, Serverless Microservices, DevOps & CI/CD Pipelines, and Generative AI with Amazon Bedrock.

3. **50+ Verified YouTube Masterclasses**
   - Categorized video library spanning Cloud Fundamentals, Solutions Architecture, Serverless & Containers, DevOps & Security, and Generative AI.

4. **100+ Free Badges & AWS Certifications**
   - Direct paths to earn AWS Knowledge Badges, Skill Builder credentials, and prepare for industry AWS certifications.

5. **Complete Team Directory**
   - Detailed rosters and showcases for Technical, Community Management, and Social Media teams.

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

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build the optimized production bundle
npm run build

# Start the production server
npm run start
```

---

## 👥 Adding New Team Members

To add or update members in the team directory, edit `src/data/team.ts`:

```typescript
{
  id: "member-slug",
  name: "Full Name",
  role: "Lead / Core Builder",
  category: "Leadership", // "Leadership" | "Technical" | "Community Management" | "Social Media & Management"
  affiliation: "AWS Student Builders Group",
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
> The AWS Student Builders Group at IIT Jodhpur is an independent student developer community chapter and is not an offer of employment or a legal entity of Amazon Web Services (AWS) or Amazon.com, Inc. unless explicitly stated otherwise.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details. Built with 🧡 by the student builders at **Indian Institute of Technology Jodhpur**.
