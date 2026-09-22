"use client";

import { useMemo, useState } from "react";
import { workouts } from "@/lib/data";
import { useDemoStore, useHasMounted } from "@/lib/store";
import { WorkoutCard } from "@/components/WorkoutCard";
import type { WorkoutCategory } from "@/types";

const filters: Array<"Todos" | WorkoutCategory> = [
  "Todos",
  "Força",
  "HIIT",
  "Yoga",
  "Mobilidade",
  "Cardio",
  "Core",
];

export default function LibraryPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todos");
  const { owns } = useDemoStore();
  const mounted = useHasMounted();

  const list = useMemo(
    () =>
      filter === "Todos"
        ? workouts
        : workouts.filter((w) => w.category === filter),
    [filter]
  );

  return (
    <main className="px-4 pb-4 pt-6">
      <header className="mb-5">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
          Sob demanda
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Biblioteca
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Compra única por treino · preços em BRL
        </p>
      </header>

      <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              filter === f
                ? "bg-black text-white"
                : "bg-white text-neutral-600 ring-1 ring-black/[0.06]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {list.map((w) => (
          <WorkoutCard
            key={w.id}
            workout={w}
            owned={mounted ? owns(w.id) : false}
          />
        ))}
      </div>
    </main>
  );
}
