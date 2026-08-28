import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aws-sbg-iitj.ac.in"),
  title: "AWS Builder OS — IIT Jodhpur | AWS Student Builder Group",
  description:
    "Official website for the AWS Student Builder Group at Indian Institute of Technology Jodhpur. A macOS-inspired cloud operating system for student developers exploring cloud computing, software engineering, AI/ML, and DevOps.",
  keywords: [
    "AWS",
    "AWS Student Builder Group",
    "IIT Jodhpur",
    "Indian Institute of Technology Jodhpur",
    "Cloud Computing",
    "DevOps",
    "Software Engineering",
    "Bedrock",
    "Builder OS",
  ],
  authors: [{ name: "AWS Student Builder Group at IIT Jodhpur" }],
  openGraph: {
    title: "AWS Builder OS — IIT Jodhpur",
    description:
      "A macOS-inspired cloud operating system built specifically for the AWS technical builder community at IIT Jodhpur.",
    url: "https://aws-sbg-iitj.ac.in",
    siteName: "AWS Builder OS — IIT Jodhpur",
    images: [
      {
        url: "/brand/aws-sbg-theme-poster.png",
        width: 1200,
        height: 630,
        alt: "AWS Student Builder Group at IIT Jodhpur",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/brand/aws-sbg-chip-purple.png",
    apple: "/brand/aws-sbg-chip-purple.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#070b14",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#070b14] text-slate-100 selection:bg-sky-500/30 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
