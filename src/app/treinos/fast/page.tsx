"use client";

import { useEffect, useRef, useState } from "react";
import { BackNav } from "@/components/BackNav";
import { WorkoutRow } from "@/components/SessionCard";
import { TimerRing } from "@/components/Illustrations";
import { FAST_WORKOUTS } from "@/lib/content";
import { useDemoStore } from "@/lib/store";
import { useToast } from "@/components/Toast";

type Status = "ready" | "go" | "rest" | "done";

export default function FastPage() {
  const { finishFastSession } = useDemoStore();
  const { toast } = useToast();
  const [status, setStatus] = useState<Status>("ready");
  const [idx, setIdx] = useState(0);
  const [lap, setLap] = useState(1);
  const [left, setLeft] = useState(0);
  const [span, setSpan] = useState(40);

  const statusRef = useRef(status);
  const idxRef = useRef(idx);
  const lapRef = useRef(lap);
  statusRef.current = status;
  idxRef.current = idx;
  lapRef.current = lap;

  useEffect(() => {
    if (status !== "go" && status !== "rest") return;
    const id = setInterval(() => {
      setLeft((s) => {
        if (s > 1) return s - 1;
        // hit zero → advance
        const st = statusRef.current;
        const i = idxRef.current;
        const L = lapRef.current;
        const w = FAST_WORKOUTS[i];

        if (st === "go") {
          setStatus("rest");
          setSpan(w.rest);
          return w.rest;
        }

        // after rest
        if (i < FAST_WORKOUTS.length - 1) {
          const n = i + 1;
          setIdx(n);
          setStatus("go");
          setSpan(FAST_WORKOUTS[n].work);
          return FAST_WORKOUTS[n].work;
        }
        if (L < 4) {
          setLap(L + 1);
          setIdx(0);
          setStatus("go");
          setSpan(FAST_WORKOUTS[0].work);
          toast(`Round ${L + 1} de 4`);
          return FAST_WORKOUTS[0].work;
        }
        setStatus("done");
        finishFastSession();
        toast("Treino completo! Streak atualizado 🔥");
        return 0;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [status, finishFastSession, toast]);

  function start() {
    setLap(1);
    setIdx(0);
    setStatus("go");
    setLeft(FAST_WORKOUTS[0].work);
    setSpan(FAST_WORKOUTS[0].work);
    toast("Timer iniciado");
  }

  function stop() {
    setStatus("ready");
    setLeft(0);
  }

  const shown =
    status === "ready" ? 15 : status === "done" ? "✓" : left;
  const pct =
    status === "ready" || status === "done"
      ? 0.7
      : span > 0
        ? left / span
        : 0;

  const cur = FAST_WORKOUTS[idx];

  return (
    <main className="pb-6 pt-2">
      <BackNav href="/treinos" label="Treinos" title="Fast Trainer" />

      <button
        type="button"
        onClick={status === "ready" || status === "done" ? start : undefined}
        className="relative mx-4 mt-2 block w-[calc(100%-2rem)] overflow-hidden rounded-[22px] bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] p-6 text-left text-white"
      >
        <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
          {status === "go"
            ? `Round ${lap}/4 · Trabalho`
            : status === "rest"
              ? `Round ${lap}/4 · Descanso`
              : status === "done"
                ? "Concluído"
                : "Sessão rápida"}
        </div>
        <h2 className="mt-1 text-3xl font-bold">
          {status === "ready" || status === "done" ? "Quicky" : cur.t}
        </h2>
        <p className="mt-1 text-sm text-white/65">
          {status === "ready"
            ? "Circuito HIIT · 4 rounds · sem equipamento"
            : status === "done"
              ? "Ótimo trabalho — streak atualizado"
              : status === "rest"
                ? `Descanso · ${left}s`
                : `${left}s restantes`}
        </p>
        <div className="mt-4 flex justify-center">
          <TimerRing mins={shown} progress={pct} unit={status === "ready" ? "min" : "seg"} className="h-32 w-32" />
        </div>
      </button>

      <div className="mx-4 mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#007AFF]/12 px-2.5 py-1 text-xs font-semibold text-[#007AFF]">
          40s / 20s
        </span>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium">
          4 rounds
        </span>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium">
          Bodyweight
        </span>
      </div>

      <p className="px-5 pb-3 pt-5 text-xl font-bold">Exercícios</p>
      <div className="px-4">
        {FAST_WORKOUTS.map((w, i) => (
          <WorkoutRow
            key={w.t}
            part={w.part}
            title={w.t}
            caption={
              status !== "ready" && status !== "done" && i === idx
                ? `${status === "go" ? "Agora" : "Descanso"} · ${w.m}`
                : w.m
            }
            onClick={() => toast(`Exercício: ${w.t}`)}
          />
        ))}
      </div>

      <div className="space-y-2 px-4 pt-4">
        {status === "ready" || status === "done" ? (
          <button
            onClick={start}
            className="w-full rounded-2xl bg-[#007AFF] py-3.5 text-[15px] font-semibold text-white"
          >
            {status === "done" ? "Treinar de novo" : "Iniciar agora"}
          </button>
        ) : (
          <button
            onClick={stop}
            className="w-full rounded-2xl bg-red-500 py-3.5 text-[15px] font-semibold text-white"
          >
            Parar timer
          </button>
        )}
        <button
          onClick={() => toast("Outras opções: 10 min · 20 min")}
          className="w-full rounded-2xl bg-neutral-200/80 py-3.5 text-[15px] font-semibold"
        >
          Ver outras durações
        </button>
      </div>
    </main>
  );
}
