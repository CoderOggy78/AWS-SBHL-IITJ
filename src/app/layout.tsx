import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans-fallback",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-fallback",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aws-sbg-iitj.ac.in"),
  title: "AWS Student Builders Group IITJ | Halloween Nightmare Edition 🎃",
  description:
    "Official website of AWS Student Builders Group at Indian Institute of Technology Jodhpur — Halloween Nightmare Special. Master DevOps, Cloud Architecture, Cloud Security, System Design, and Generative AI with 50+ free lectures, badges, and cohorts.",
  keywords: [
    "AWS",
    "AWS Student Builder Group IITJ",
    "AWS SBG IITJ",
    "IIT Jodhpur",
    "Cloud Computing",
    "DevOps",
    "Cloud Security",
    "System Design",
    "Amazon Bedrock",
  ],
  authors: [{ name: "AWS Student Builder Group IITJ" }],
  icons: {
    icon: "/brand/aws-sbg-chip-purple.png",
    apple: "/brand/aws-sbg-chip-purple.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Creepster&family=Nosifer&family=Cinzel+Decorative:wght@700;900&family=Butcherman&family=Google+Sans+Flex:opsz,slnt,wdth,wght,ROND@8..144,-10..0,25..150,400..700,0..100&family=Google+Sans+Code:ital,wght@0,400..700;1,400..700&display=swap"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-neutral-950 text-white selection:bg-orange-500/30 selection:text-orange-200 font-sans overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
