"use client";

import Link from "next/link";
import { BODY_META, BODY_ORDER, BODY_WORKOUTS } from "@/lib/content";
import { BodySilhouette, SilhouetteCollage } from "@/components/BodySilhouette";
import { useDemoStore, useHasMounted } from "@/lib/store";

export default function TreinosHubPage() {
  const { protocolProgress } = useDemoStore();
  const mounted = useHasMounted();
  const interPct = mounted ? protocolProgress.inter : 0;

  return (
    <main className="pb-4 pt-2">
      <header className="px-5 pt-4">
        <h1 className="text-[34px] font-bold tracking-tight">Treinos</h1>
        <p className="mt-1.5 text-[15px] text-neutral-500">
          Escolha o grupo muscular ou um método
        </p>
      </header>

      <Link
        href="/treinos/fast"
        className="relative mx-4 mt-5 block overflow-hidden rounded-[18px] bg-gradient-to-br from-[#1C1C1E] to-[#3A3A3C] p-5 text-white shadow-sm transition active:scale-[0.99]"
      >
        <div className="kicker text-xs font-semibold uppercase tracking-wider text-white/60">
          Sessão rápida
        </div>
        <h3 className="mt-1 text-2xl font-bold">Fast Trainer</h3>
        <p className="mt-1 text-sm text-white/70">Quicky · 15 min · sem equipamento</p>
        <svg className="absolute right-4 top-4 h-16 w-16" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="#007AFF"
            strokeWidth="4"
            strokeDasharray="132"
            strokeDashoffset="40"
            strokeLinecap="round"
            transform="rotate(-90 32 32)"
          />
          <text x="32" y="36" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">
            15
          </text>
        </svg>
      </Link>

      <p className="px-5 pb-3 pt-6 text-xl font-bold">Protocolos</p>
      <Link href="/treinos/protocolo/inter" className="mx-4 mb-3 block overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04] transition active:opacity-90">
        <div className="relative min-h-[132px] bg-gradient-to-br from-[#1C3A5F] to-[#007AFF] p-5 text-white">
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold">
            Nível 2
          </span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-white/70">
            {interPct > 0 ? `Seu plano · ${interPct}%` : "Seu plano atual"}
          </p>
          <h3 className="text-[22px] font-bold">Intermediário</h3>
          <div className="absolute bottom-2 right-2 opacity-90">
            <SilhouetteCollage parts={["peito", "costas", "pernas"]} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-3">
          <span className="rounded-full bg-[#007AFF]/12 px-2.5 py-1 text-xs font-semibold text-[#007AFF]">
            8 semanas
          </span>
          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
            4× / semana
          </span>
          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
            45–60 min
          </span>
        </div>
      </Link>

      <Link href="/treinos/protocolo/avancado" className="mx-4 mb-3 block overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04] transition active:opacity-90">
        <div className="relative min-h-[132px] bg-gradient-to-br from-[#2C1F4A] to-[#5856D6] p-5 text-white">
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold">
            Nível 3
          </span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-white/70">
            Próximo nível
          </p>
          <h3 className="text-[22px] font-bold">Avançado</h3>
          <div className="absolute bottom-2 right-2 opacity-90">
            <SilhouetteCollage parts={["ombros", "costas", "gluteo"]} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-3">
          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
            12 semanas
          </span>
          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
            5–6× / semana
          </span>
          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
            PPL · RPE
          </span>
        </div>
      </Link>

      <p className="px-5 pb-3 pt-4 text-xl font-bold">Métodos</p>
      <Link href="/treinos/corpo/gluteo" className="mx-4 mb-2 flex overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04]">
        <div className="tone-f flex w-24 shrink-0 items-center justify-center p-2">
          <BodySilhouette part="gluteo" className="h-20 w-12" />
        </div>
        <div className="flex-1 p-4">
          <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-semibold text-orange-700">
            Destaque
          </span>
          <strong className="mt-2 block text-[15px]">Método Glúteo</strong>
          <p className="mt-1 text-xs text-neutral-500">12 treinos gravados · progressão</p>
        </div>
      </Link>
      <Link href="/treinos/corpo/full" className="mx-4 mb-2 flex overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04]">
        <div className="tone-h flex w-24 shrink-0 items-center justify-center p-2">
          <BodySilhouette part="full" className="h-20 w-12" />
        </div>
        <div className="flex-1 p-4">
          <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-600">
            Destaque
          </span>
          <strong className="mt-2 block text-[15px]">Full body</strong>
          <p className="mt-1 text-xs text-neutral-500">Sessões completas A · B · Express</p>
        </div>
      </Link>

      <p className="px-5 pb-3 pt-4 text-xl font-bold">Grupos musculares</p>
      <div className="mx-4 grid grid-cols-3 gap-2.5">
        {BODY_ORDER.map((id) => {
          const m = BODY_META[id];
          const count = BODY_WORKOUTS[id].length;
          return (
            <Link
              key={id}
              href={`/treinos/corpo/${id}`}
              className="overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04] transition active:scale-[0.98]"
            >
              <div className={`tone-${m.tone} flex h-28 items-center justify-center p-2`}>
                <BodySilhouette part={id} className="h-24 w-14" />
              </div>
              <div className="px-2 py-2.5 text-center">
                <div className="text-[13px] font-semibold">{m.label}</div>
                <div className="text-[11px] text-neutral-500">{count} treinos</div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
