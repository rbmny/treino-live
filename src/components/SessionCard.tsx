"use client";

import type { BodyPartId } from "@/types";
import { BODY_META } from "@/lib/content";
import { BodySilhouette } from "./BodySilhouette";

export function SessionCard({
  part,
  title,
  caption,
  tag,
  onClick,
  done,
}: {
  part: BodyPartId;
  title: string;
  caption: string;
  tag?: string;
  onClick?: () => void;
  done?: boolean;
}) {
  const meta = BODY_META[part];
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-2 flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-black/[0.04] transition active:opacity-90"
    >
      <div
        className={`tone-${meta.tone} flex h-16 w-14 shrink-0 items-center justify-center rounded-xl p-1`}
      >
        <BodySilhouette part={part} className="h-14 w-10" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <strong className="text-[15px] font-semibold leading-tight">
            {title}
          </strong>
          {tag ? (
            <span className="rounded-full bg-[#007AFF]/12 px-2 py-0.5 text-[11px] font-semibold text-[#007AFF]">
              {tag}
            </span>
          ) : null}
          {done ? (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              Feito
            </span>
          ) : null}
        </div>
        <span className="mt-0.5 block text-xs text-neutral-500">{caption}</span>
      </div>
    </button>
  );
}

export function WorkoutRow({
  part,
  title,
  caption,
  onClick,
  play,
}: {
  part: BodyPartId;
  title: string;
  caption: string;
  onClick?: () => void;
  play?: boolean;
}) {
  const meta = BODY_META[part];
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-2 flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-black/[0.04] transition active:opacity-90"
    >
      <div
        className={`tone-${meta.tone} relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl p-1`}
      >
        <BodySilhouette part={part} className="h-12 w-9" />
        {play !== false && (
          <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/55 text-white">
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="currentColor">
              <path d="M3 1.5v9l8-4.5z" />
            </svg>
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <strong className="block text-[15px] font-semibold leading-tight">
          {title}
        </strong>
        <span className="mt-0.5 block text-xs text-neutral-500">{caption}</span>
      </div>
    </button>
  );
}
