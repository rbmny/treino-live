"use client";

import { useParams } from "next/navigation";
import { BackNav } from "@/components/BackNav";
import { BodySilhouette } from "@/components/BodySilhouette";
import { WorkoutRow } from "@/components/SessionCard";
import { BODY_META, BODY_WORKOUTS } from "@/lib/content";
import type { BodyPartId } from "@/types";
import { useToast } from "@/components/Toast";

const VALID: BodyPartId[] = [
  "peito",
  "costas",
  "biceps",
  "triceps",
  "ombros",
  "gluteo",
  "pernas",
  "full",
  "core",
];

export default function CorpoPage() {
  const params = useParams();
  const raw = String(params.part || "full");
  const part = (VALID.includes(raw as BodyPartId) ? raw : "full") as BodyPartId;
  const meta = BODY_META[part];
  const list = BODY_WORKOUTS[part];
  const { toast } = useToast();

  return (
    <main className="pb-6 pt-2">
      <BackNav href="/treinos" label="Treinos" title={meta.label} />
      <div className={`tone-${meta.tone} mx-4 mt-2 flex h-44 items-center justify-center rounded-[18px]`}>
        <BodySilhouette part={part} className="h-40 w-24" />
      </div>
      <header className="px-5 pt-4">
        <h1 className="text-[34px] font-bold tracking-tight">{meta.label}</h1>
        <p className="mt-1 text-[15px] text-neutral-500">
          {list.length} treinos · vídeos sob demanda
        </p>
      </header>
      <div className="mt-4 px-4">
        {list.map((w) => (
          <WorkoutRow
            key={w.t}
            part={part}
            title={w.t}
            caption={w.m}
            onClick={() => toast(`Reproduzindo: ${w.t}`)}
          />
        ))}
      </div>
    </main>
  );
}
