"use client";

import Link from "next/link";

export function BackNav({
  href,
  label,
  title,
}: {
  href: string;
  label: string;
  title?: string;
}) {
  return (
    <div className="relative flex min-h-11 items-center px-2">
      <Link
        href={href}
        className="z-10 flex min-h-11 items-center gap-0.5 px-1 py-2 text-[17px] text-[#007AFF]"
      >
        <svg
          viewBox="0 0 12 20"
          className="h-5 w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 2L2 10l8 8" />
        </svg>
        {label}
      </Link>
      {title && (
        <div className="pointer-events-none absolute inset-x-14 text-center text-[17px] font-semibold">
          {title}
        </div>
      )}
    </div>
  );
}
