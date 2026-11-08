"use client";

import React from "react";
import Image from "next/image";

interface BuilderChipProps {
  size?: number;
  className?: string;
  variant?: "cyan" | "blue" | "purple" | "white";
  glow?: boolean;
  useImage?: boolean;
}

export const BuilderChip: React.FC<BuilderChipProps> = ({
  size = 40,
  className = "",
  variant = "cyan",
  glow = false,
  useImage = false,
}) => {
  const colorMap = {
    cyan: "#38bdf8",
    blue: "#38bdf8",
    purple: "#a855f7",
    white: "#ffffff",
  };

  const fill = colorMap[variant] || colorMap.cyan;
  const glowStyle = glow
    ? {
        filter:
          variant === "purple"
            ? "drop-shadow(0 0 12px rgba(168, 85, 247, 0.6))"
            : "drop-shadow(0 0 12px rgba(56, 189, 248, 0.6))",
      }
    : {};

  if (useImage) {
    return (
      <div
        className={`relative flex items-center justify-center select-none ${className}`}
        style={{ width: size, height: size, ...glowStyle }}
      >
        <Image
          src="/brand/aws-sbg-chip-cyan.png"
          alt="AWS SBG IITJ Logo"
          width={size}
          height={size}
          className="object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size, ...glowStyle }}
    >
      <svg
        viewBox="0 0 286 286"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300"
      >
        <g fill={fill}>
          {/* Top Comb: 3 outer teeth & spine */}
          <rect x="62" y="31" width="162" height="31" />
          <rect x="62" y="0" width="34" height="31" />
          <rect x="126" y="0" width="34" height="31" />
          <rect x="190" y="0" width="34" height="31" />

          {/* Bottom Comb: 3 outer teeth & spine */}
          <rect x="62" y="224" width="162" height="31" />
          <rect x="62" y="255" width="34" height="31" />
          <rect x="126" y="255" width="34" height="31" />
          <rect x="190" y="255" width="34" height="31" />

          {/* Left Comb: 3 outer teeth & spine */}
          <rect x="31" y="62" width="31" height="162" />
          <rect x="0" y="62" width="31" height="34" />
          <rect x="0" y="126" width="31" height="34" />
          <rect x="0" y="190" width="31" height="34" />

          {/* Right Comb: 3 outer teeth & spine */}
          <rect x="224" y="62" width="31" height="162" />
          <rect x="255" y="62" width="31" height="34" />
          <rect x="255" y="126" width="31" height="34" />
          <rect x="255" y="190" width="31" height="34" />
        </g>
      </svg>
    </div>
  );
};

export const AwsLogo: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 32,
  className = "",
  color = "#ffffff",
}) => {
  return (
    <svg
      viewBox="0 0 100 60"
      width={size * 1.66}
      height={size}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Official AWS smile curve representation */}
      <path d="M12 28.5c0 4.2 2.2 6.8 6.1 6.8 2.6 0 4.6-1.3 5.8-3.4v2.9h6.4V16.8h-6.4v3.1c-1.2-2.1-3.2-3.4-5.8-3.4-3.9 0-6.1 2.6-6.1 6.8v5.2zm6.3-8.5c2.4 0 4 1.7 4 4.5v1.2c0 2.8-1.6 4.5-4 4.5s-4-1.7-4-4.5v-1.2c0-2.8 1.6-4.5 4-4.5zM33 16.8l5.8 17.7h5.9l4.3-13.6 4.3 13.6h5.9L65 16.8h-6.2l-3.3 12.1-4-12.1h-5.2l-4 12.1-3.3-12.1H33zm35.8 11.2c0 4.4 2.8 6.8 7.4 6.8 3.5 0 5.8-1.3 6.9-3.2l-4.7-2.6c-.5.9-1.3 1.4-2.3 1.4-1.3 0-2-.6-2.1-1.8h14.7c.1-.5.2-1.2.2-1.9 0-4.6-2.8-6.9-7.5-6.9-4.7 0-7.6 2.4-7.6 6.8v1.4zm9.9-4.2c1.2 0 1.9.7 2 1.7h-7.8c.1-1.1.9-1.7 2-1.7z" />
      <path d="M18.5 44c16.2 9.5 37.8 9.5 54 0 1.2-.7 2.4.3 1.7 1.4-3.9 5.8-14.7 10.6-28.7 10.6-14 0-24.8-4.8-28.7-10.6-.7-1.1.5-2.1 1.7-1.4z" fill="#f59e0b" />
      <path d="M74.8 40.5c.8-1 2.8-1.7 4.1-1.8.4 0 .7.3.5.7l-2.8 5.7c-.2.4-.6.5-1 .3l-4.9-3.4c-.4-.3-.3-.8.1-1 .8-.5 2.5-1.1 3.5-1.1.2 0 .4.3.5.6z" fill="#f59e0b" />
    </svg>
  );
};
