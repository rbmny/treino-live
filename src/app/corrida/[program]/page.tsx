"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { BackNav } from "@/components/BackNav";
import { RouteIllust, RouteLongIllust } from "@/components/Illustrations";
import { RUN_10K_PHASES, RUN_5K_DAYS } from "@/lib/content";
import { useDemoStore, useHasMounted } from "@/lib/store";
import { useToast } from "@/components/Toast";
import { useState } from "react";

export default function CorridaProgramPage() {
  const params = useParams();
  const is5k = params.program !== "10k";
  const program = is5k ? "5k" : "10k";
  const { corridaDone, toggleCorridaDay, activateCorrida, corridaActive } =
    useDemoStore();
  const mounted = useHasMounted();
  const { toast } = useToast();
  const [week, setWeek] = useState(0);

  const days = is5k ? RUN_5K_DAYS : RUN_10K_PHASES;

  function dayKey(id: string) {
    return `${program}:w${week + 1}:${id}`;
  }

  function toggle(id: string, title: string) {
    const key = dayKey(id);
    const was = corridaDone.includes(key);
    toggleCorridaDay(key);
    toast(was ? `Desmarcado: ${title}` : `Concluído: ${title} ✓`);
  }

  return (
    <main className="pb-6 pt-2">
      <BackNav href="/corrida" label="Corrida" title="Programa" />

      <div
        className={`relative mx-4 mt-2 flex h-40 items-end overflow-hidden rounded-[18px] p-5 ${
          is5k ? "tone-run5" : "tone-run10"
        }`}
      >
        <div
          className={`text-6xl font-bold tracking-tight ${
            is5k ? "text-[#007AFF]" : "text-[#5856D6]"
          }`}
        >
          {is5k ? "5" : "10"}
          <small className="text-2xl">km</small>
        </div>
        <div className="absolute right-3 top-6 h-24 w-44 opacity-90">
          {is5k ? <RouteIllust /> : <RouteLongIllust />}
        </div>
      </div>

      <header className="px-5 pt-4">
        <h1 className="text-[34px] font-bold tracking-tight">
          0 → {is5k ? "5" : "10"} km
        </h1>
        <p className="mt-1 text-[15px] text-neutral-500">
          {is5k
            ? "8 semanas · caminhada e corrida"
            : "12 semanas · endurance"}
        </p>
      </header>

      <div className="mx-4 mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#007AFF]/12 px-2.5 py-1 text-xs font-semibold text-[#007AFF]">
          {is5k ? "3× / semana" : "3–4× / semana"}
        </span>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium">
          {is5k ? "~30 min" : "~45 min"}
        </span>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium">
          {is5k ? "Iniciante" : "Progressivo"}
        </span>
      </div>

      <p className="px-5 pb-2 pt-5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {is5k ? "Semanas" : "Fases"}
      </p>
      <div className="-mx-0 flex gap-2 overflow-x-auto px-4 pb-2">
        {is5k
          ? Array.from({ length: 8 }, (_, i) => (
              <button
                key={i}
                onClick={() => setWeek(i)}
                className={`shrink-0 rounded-2xl px-3.5 py-2 text-left ${
                  week === i
                    ? "bg-[#007AFF] text-white"
                    : "bg-white ring-1 ring-black/[0.06]"
                }`}
              >
                <b className="block text-sm">S{i + 1}</b>
                <span className="text-[10px] opacity-80">
                  {i === week ? "Atual" : i < week ? "Ok" : "—"}
                </span>
              </button>
            ))
          : [
              { label: "1–4", sub: "Base" },
              { label: "5–8", sub: "Construção" },
              { label: "9–12", sub: "Específico" },
            ].map((f, i) => (
              <button
                key={f.label}
                onClick={() => setWeek(i)}
                className={`shrink-0 rounded-2xl px-3.5 py-2 text-left ${
                  week === i
                    ? "bg-[#5856D6] text-white"
                    : "bg-white ring-1 ring-black/[0.06]"
                }`}
              >
                <b className="block text-sm">{f.label}</b>
                <span className="text-[10px] opacity-80">{f.sub}</span>
              </button>
            ))}
      </div>

      <p className="px-5 pb-3 pt-4 text-xl font-bold">
        {is5k ? `Semana ${week + 1} · plano` : "Progressão"}
      </p>
      <div className="space-y-2 px-4">
        {days.map((d) => {
          const key = dayKey(d.id);
          const done = mounted && corridaDone.includes(key);
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => toggle(d.id, d.title)}
              className={`flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm ring-1 transition active:opacity-90 ${
                done ? "ring-emerald-300" : "ring-black/[0.04]"
              }`}
            >
              <div
                className={`tone-${d.tone} flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl`}
              >
                <span className="text-lg font-bold leading-none">{d.num}</span>
                <small className="text-[10px] text-neutral-500">{d.label}</small>
              </div>
              <div className="min-w-0 flex-1">
                <strong className="block text-[15px] font-semibold leading-tight">
                  {d.title}
                </strong>
                <span className="mt-0.5 block text-xs text-neutral-500">
                  {d.sub}
                </span>
              </div>
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                  done
                    ? "bg-emerald-500 text-white"
                    : "bg-neutral-100 text-neutral-400"
                }`}
              >
                {done ? "✓" : ""}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-2 px-4 pt-5">
        <button
          onClick={() => {
            activateCorrida(program as "5k" | "10k");
            toast(
              `Programa 0 → ${is5k ? "5" : "10"} km ${
                mounted && corridaActive === program ? "já ativo" : "ativado"
              }`
            );
          }}
          className="w-full rounded-2xl bg-[#007AFF] py-3.5 text-[15px] font-semibold text-white"
        >
          {mounted && corridaActive === program
            ? "Programa ativo"
            : "Começar programa"}
        </button>
        {!is5k && (
          <Link
            href="/corrida/5k"
            className="block w-full rounded-2xl bg-neutral-200/80 py-3.5 text-center text-[15px] font-semibold"
          >
            Começar pelos 5 km
          </Link>
        )}
      </div>
    </main>
  );
}
