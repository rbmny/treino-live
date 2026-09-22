import Link from "next/link";
import type { Workout } from "@/types";
import { formatBRL } from "@/lib/data";
import { WorkoutGlyph, IconLock, IconCheck } from "./Icons";

export function WorkoutCard({
  workout,
  owned,
}: {
  workout: Workout;
  owned?: boolean;
}) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/[0.04] transition active:scale-[0.98]"
    >
      <div
        className={`relative flex h-40 items-end justify-between bg-gradient-to-br ${workout.gradient} p-4 text-white`}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/10" />
        <div className="absolute inset-0 opacity-25">
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/25 blur-2xl" />
          <div className="absolute -bottom-8 left-8 h-24 w-24 rounded-full bg-black/25 blur-xl" />
        </div>
        <div className="relative z-10 drop-shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-wider text-white/90">
            {workout.category} · {workout.durationMin} min
          </p>
          <h3 className="mt-1 max-w-[12rem] text-lg font-semibold leading-tight text-white">
            {workout.title}
          </h3>
        </div>
        <div className="relative z-10 text-white/90">
          <WorkoutGlyph icon={workout.icon} className="h-14 w-14" />
        </div>
        <div className="absolute right-3 top-3 z-10">
          {owned ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-emerald-700">
              <IconCheck className="h-3 w-3" /> Seu
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/25 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
              <IconLock className="h-3 w-3" /> {formatBRL(workout.priceBRL)}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-sm text-neutral-500">{workout.level}</p>
        </div>
        <span className="text-sm font-semibold text-neutral-900">
          {owned ? "Assistir" : "Ver detalhes"}
        </span>
      </div>
    </Link>
  );
}
