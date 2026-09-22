import type { Workout } from "@/types";

type IconProps = { className?: string };

export function IconHome({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z" />
    </svg>
  );
}

export function IconLibrary({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 0 1 2-2h3v16H6a2 2 0 0 1-2-2V6zm7-2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7V4z" />
    </svg>
  );
}

export function IconLive({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
      <path strokeLinecap="round" d="M5.5 8.5a8 8 0 0 1 0 7M18.5 8.5a8 8 0 0 0 0 7M2.5 5.5a12 12 0 0 1 0 13M21.5 5.5a12 12 0 0 0 0 13" />
    </svg>
  );
}

export function IconUser({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM4 20a8 8 0 0 1 16 0" />
    </svg>
  );
}

export function IconLock({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v10H6V11z" />
    </svg>
  );
}

export function IconPlay({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.5v13l11-6.5L8 5.5z" />
    </svg>
  );
}

export function IconClose({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconCheck({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function IconChevron({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function WorkoutGlyph({
  icon,
  className = "w-16 h-16",
}: {
  icon: Workout["icon"];
  className?: string;
}) {
  const common = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.5 };
  switch (icon) {
    case "dumbbell":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <rect x="8" y="22" width="10" height="20" rx="2" fill="currentColor" opacity="0.9" />
          <rect x="46" y="22" width="10" height="20" rx="2" fill="currentColor" opacity="0.9" />
          <rect x="16" y="28" width="32" height="8" rx="2" fill="currentColor" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <path d="M32 8c4 10-8 14-4 26 2 6 8 10 12 10 10 0 16-10 12-22-8 4-10 10-10 10S38 18 32 8z" fill="currentColor" opacity="0.85" />
          <path d="M28 42c0-6 4-10 6-14 4 6 10 8 10 16a12 12 0 1 1-16-2z" fill="currentColor" />
        </svg>
      );
    case "lotus":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <ellipse cx="32" cy="40" rx="18" ry="8" fill="currentColor" opacity="0.35" />
          <path d="M32 14c4 8 4 18 0 28-4-10-4-20 0-28z" fill="currentColor" />
          <path d="M18 24c8 4 12 12 14 20-10-2-18-10-14-20z" fill="currentColor" opacity="0.75" />
          <path d="M46 24c-8 4-12 12-14 20 10-2 18-10 14-20z" fill="currentColor" opacity="0.75" />
        </svg>
      );
    case "stretch":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <circle cx="40" cy="14" r="5" fill="currentColor" />
          <path d="M18 52l14-18 8 6 10-14" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M32 34l-8-10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "run":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <circle cx="38" cy="12" r="5" fill="currentColor" />
          <path d="M20 54l8-14 10 4 6-12M28 40l-6-12 12-2 8 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
    case "abs":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <rect x="18" y="12" width="28" height="40" rx="8" stroke="currentColor" strokeWidth="3" fill="none" />
          <path d="M18 24h28M18 36h28M32 12v40" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
  }
}

export function IconDumbbell({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 8.5V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.5" />
      <rect x="5" y="8.5" width="14" height="10.5" rx="2" />
      <path d="M9 13h6" />
    </svg>
  );
}

export function IconBag({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.4 8.5h11.2l-.8 11.2a1.6 1.6 0 0 1-1.6 1.5H8.8a1.6 1.6 0 0 1-1.6-1.5L6.4 8.5z" />
      <path d="M9 8.5V7.2A3 3 0 0 1 12 4.2 3 3 0 0 1 15 7.2v1.3" />
    </svg>
  );
}

export function IconRun({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14.5" cy="5.2" r="1.5" />
      <path d="M5.5 20.5l3.4-6.5 3.1 2.3 2.4-4.6" />
      <path d="M8.9 14L7.4 11.2l3.4-2.3 2.9 1.1 3.6 1.6 2.1 5" />
    </svg>
  );
}
