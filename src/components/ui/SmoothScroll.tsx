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
      {/* Page Content Wrapped */}
      {children}

      {/* Floating Quiet Back to Top Button */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-200 ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 shadow-lg backdrop-blur-md transition-colors cursor-pointer text-xs font-mono"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          <span>Top</span>
        </button>
      </div>
    </>
  );
};

