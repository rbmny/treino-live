"use client";

export function RouteIllust({ color = "#007AFF", className = "h-full w-full" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 160 90" fill="none" aria-hidden="true" className={className}>
      <path d="M8 70 C30 20, 50 80, 70 40 S110 10, 150 55" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <path d="M8 70 C30 20, 50 80, 70 40 S110 10, 150 55" stroke={color} strokeWidth="10" strokeLinecap="round" opacity="0.12" />
      <circle cx="8" cy="70" r="5" fill={color} />
      <circle cx="150" cy="55" r="5" fill={color} />
    </svg>
  );
}

export function RouteLongIllust({ color = "#5856D6", className = "h-full w-full" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 160 90" fill="none" aria-hidden="true" className={className}>
      <path d="M6 75 C25 30, 45 20, 60 50 S95 85, 120 35 S145 15, 154 40" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <path d="M6 75 C25 30, 45 20, 60 50 S95 85, 120 35 S145 15, 154 40" stroke={color} strokeWidth="10" strokeLinecap="round" opacity="0.12" />
      <circle cx="6" cy="75" r="5" fill={color} />
      <circle cx="154" cy="40" r="5" fill={color} />
    </svg>
  );
}

export function TimerRing({ mins = 15, progress = 1, unit = "min", className = "h-28 w-28" }: { mins?: number | string; progress?: number; unit?: string; className?: string }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.max(0, Math.min(1, progress)));
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={className}>
      <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="#007AFF"
        strokeWidth="8"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="56" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="700" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif">
        {mins}
      </text>
      <text x="60" y="78" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="12" fontWeight="600" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif">
        {typeof mins === "string" ? "" : unit}
      </text>
    </svg>
  );
}

export function BookMark({ className = "h-16 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 80" fill="none" aria-hidden="true" className={className}>
      <rect x="8" y="6" width="48" height="68" rx="4" fill="#fff" opacity="0.15" />
      <rect x="12" y="10" width="40" height="60" rx="2" fill="#fff" opacity="0.25" />
      <path d="M18 22h28M18 30h22M18 38h26" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function AdaptLipedema({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className={className}>
      <ellipse cx="40" cy="28" rx="10" ry="12" fill="#5AC8FA" opacity="0.35" />
      <path d="M28 42c2 8 4 18 4 26h16c0-8 2-18 4-26" fill="#5AC8FA" opacity="0.28" />
      <path d="M30 48c4 4 8 6 10 6s6-2 10-6" stroke="#0071A4" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <circle cx="34" cy="56" r="3" fill="#0071A4" opacity="0.35" />
      <circle cx="46" cy="58" r="2.5" fill="#0071A4" opacity="0.3" />
      <path d="M26 40h28" stroke="#0071A4" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

export function AdaptGravida({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className={className}>
      <ellipse cx="40" cy="16" rx="7" ry="8" fill="#FF2D55" opacity="0.3" />
      <path d="M40 24c-8 2-14 10-14 20 0 6 2 12 6 18h16c4-6 6-12 6-18 0-10-6-18-14-20z" fill="#FF2D55" opacity="0.22" />
      <ellipse cx="40" cy="42" rx="12" ry="10" fill="#FF2D55" opacity="0.35" />
      <path d="M28 62c2 4 6 8 12 8s10-4 12-8" stroke="#D70015" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function AdaptJoelho({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className={className}>
      <path d="M36 10c-2 12-2 22 0 32" stroke="#FF9500" strokeWidth="8" strokeLinecap="round" opacity="0.25" />
      <path d="M44 10c2 12 2 22 0 32" stroke="#FF9500" strokeWidth="8" strokeLinecap="round" opacity="0.25" />
      <circle cx="40" cy="44" r="12" fill="#FF9500" opacity="0.28" />
      <circle cx="40" cy="44" r="5" fill="#C93400" opacity="0.45" />
      <path d="M34 56c2 8 4 14 6 18M46 56c-2 8-4 14-6 18" stroke="#FF9500" strokeWidth="6" strokeLinecap="round" opacity="0.22" />
      <path d="M28 44h-6M58 44h-6M40 32v-5" stroke="#C93400" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function AdaptColuna({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className={className}>
      <ellipse cx="40" cy="12" rx="6" ry="7" fill="#5856D6" opacity="0.28" />
      <rect x="36" y="20" width="8" height="7" rx="2" fill="#5856D6" opacity="0.4" />
      <rect x="34" y="28" width="12" height="7" rx="2" fill="#5856D6" opacity="0.35" />
      <rect x="35" y="36" width="10" height="7" rx="2" fill="#5856D6" opacity="0.45" />
      <rect x="34" y="44" width="12" height="7" rx="2" fill="#5856D6" opacity="0.35" />
      <rect x="36" y="52" width="8" height="7" rx="2" fill="#5856D6" opacity="0.4" />
      <path d="M28 30c-4 2-8 8-8 14M52 30c4 2 8 8 8 14" stroke="#3634A3" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <path d="M40 60v10" stroke="#5856D6" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

export function ShopDumbbell({ className = "h-10 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" fill="none" aria-hidden="true" className={className}>
      <rect x="18" y="16" width="28" height="8" rx="3" fill="#007AFF" opacity="0.55" />
      <rect x="4" y="10" width="14" height="20" rx="3" fill="#1C1C1E" opacity="0.55" />
      <rect x="46" y="10" width="14" height="20" rx="3" fill="#1C1C1E" opacity="0.55" />
      <rect x="8" y="14" width="6" height="12" rx="2" fill="#007AFF" opacity="0.35" />
      <rect x="50" y="14" width="6" height="12" rx="2" fill="#007AFF" opacity="0.35" />
    </svg>
  );
}

export function ShopBands({ className = "h-12 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" fill="none" aria-hidden="true" className={className}>
      <ellipse cx="32" cy="24" rx="22" ry="10" stroke="#FF2D55" strokeWidth="4" opacity="0.55" />
      <ellipse cx="32" cy="24" rx="14" ry="16" stroke="#FF9500" strokeWidth="4" opacity="0.45" />
      <ellipse cx="32" cy="24" rx="8" ry="20" stroke="#34C759" strokeWidth="3.5" opacity="0.4" />
    </svg>
  );
}

export function ShopLock({ className = "h-14 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" fill="none" aria-hidden="true" className={className}>
      <rect x="8" y="24" width="32" height="26" rx="4" fill="#5856D6" opacity="0.45" />
      <path d="M16 24v-8a8 8 0 0 1 16 0v8" stroke="#3634A3" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <circle cx="24" cy="38" r="4" fill="#fff" opacity="0.7" />
      <rect x="22.5" y="38" width="3" height="7" rx="1" fill="#fff" opacity="0.7" />
    </svg>
  );
}

export function AdaptIcon({ id, className }: { id: string; className?: string }) {
  switch (id) {
    case "lipedema":
      return <AdaptLipedema className={className} />;
    case "gravida":
      return <AdaptGravida className={className} />;
    case "joelho":
      return <AdaptJoelho className={className} />;
    case "coluna":
      return <AdaptColuna className={className} />;
    default:
      return <AdaptColuna className={className} />;
  }
}
