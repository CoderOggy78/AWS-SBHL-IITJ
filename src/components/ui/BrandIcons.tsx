import React from "react";

export const LinkedinIcon: React.FC<{ className?: string; size?: number }> = ({
  className = "w-4 h-4",
  size = 16,
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const GithubIcon: React.FC<{ className?: string; size?: number }> = ({
  className = "w-4 h-4",
  size = 16,
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Classic 4-Color Windows XP Flying Flag Logo
export const WindowsXpLogo: React.FC<{ className?: string; size?: number }> = ({
  className = "w-5 h-5",
  size = 20,
}) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={className}
  >
    {/* Red Top-Left */}
    <path
      d="M3.5 6.5 C8 4.5, 12 7.5, 14.5 9 L14.5 17.5 C12 16, 8 13, 3.5 15 Z"
      fill="#f25022"
    />
    {/* Green Top-Right */}
    <path
      d="M16 9.5 C20.5 7.5, 25 10.5, 28.5 9.5 L28.5 18 C25 19, 20.5 16, 16 18 Z"
      fill="#7fba00"
    />
    {/* Blue Bottom-Left */}
    <path
      d="M3.5 16 C8 14, 12 17, 14.5 18.5 L14.5 27 C12 25.5, 8 22.5, 3.5 24.5 Z"
      fill="#00a4ef"
    />
    {/* Yellow Bottom-Right */}
    <path
      d="M16 19 C20.5 17, 25 20, 28.5 19 L28.5 27.5 C25 28.5, 20.5 25.5, 16 27.5 Z"
      fill="#ffb900"
    />
  </svg>
);

export const WindowsLogo: React.FC<{ className?: string; size?: number }> = ({
  className = "w-4 h-4",
  size = 16,
}) => (
  <WindowsXpLogo className={className} size={size} />
);

export const WidgetsIcon: React.FC<{ className?: string; size?: number }> = ({
  className = "w-4 h-4",
  size = 16,
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    <rect x="3" y="3" width="7" height="11" rx="1.5" />
    <rect x="14" y="3" width="7" height="6" rx="1.5" />
    <rect x="3" y="17" width="7" height="4" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
  </svg>
);
