"use client";

import React, { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ArrowUp } from "lucide-react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

interface SmoothScrollProps {
  children?: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.2 : 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // RAF Loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Ensure manual scroll restoration so refreshes always start at top
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Always ensure page starts at the top hero section on load / refresh
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });

    // Clean any lingering anchor hash from previous sessions so refreshes don't jump down
    if (typeof window !== "undefined" && window.location.hash) {
      try {
        window.history.replaceState(null, "", window.location.pathname);
      } catch {
        // fallback
      }
    }

    // Track scroll progress and scroll-to-top visibility
    const onScroll = (e: any) => {
      const scrollY = e.scroll || window.scrollY || 0;
      const maxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      
      setScrollProgress(progress);
      setShowScrollTop(scrollY > 400);
    };

    lenis.on("scroll", onScroll);

    // Global anchor click interceptor for smooth glides
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -80, // Compensate for sticky top navbar (72px)
            duration: prefersReducedMotion ? 0.3 : 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. Neon Cyan Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-transform duration-75 origin-left"
          style={{
            transform: `scaleX(${scrollProgress})`,
          }}
        />
      </div>

      {/* 2. Page Content Wrapped */}
      {children}

      {/* 3. Floating Glass Back to Top Pill */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#050b18]/85 hover:bg-[#07122a]/95 text-slate-200 hover:text-white border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_4px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_0_24px_rgba(6,182,212,0.35)] backdrop-blur-xl transition-all cursor-pointer active:scale-95"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
          <span className="text-xs font-semibold tracking-tight">Top</span>
        </button>
      </div>
    </>
  );
};

