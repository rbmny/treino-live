"use client";

import Link from "next/link";
import { freeLive, formatBRL, PREMIUM_PRICE_BRL } from "@/lib/data";
import { useDemoStore, useHasMounted } from "@/lib/store";
import { LiveBadge } from "@/components/LiveBadge";
import { IconChevron, IconPlay } from "@/components/Icons";
import { BodySilhouette } from "@/components/BodySilhouette";
import {
  AdaptColuna,
  BookMark,
  RouteIllust,
} from "@/components/Illustrations";

export default function HomePage() {
  const { user, protocolProgress, streak, corridaDone, ebookChaptersRead } =
    useDemoStore();
  const mounted = useHasMounted();
  const name = mounted && user?.name ? user.name.split(" ")[0] : "você";
  const interPct = mounted ? protocolProgress.inter || 0 : 0;
  const runDone = mounted ? corridaDone.filter((k) => k.startsWith("5k:")).length : 0;
  const chapters = mounted ? ebookChaptersRead.length : 0;

  return (
    <main className="pb-4 pt-2">
      <header className="mb-3 px-5 pt-4">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-[34px] font-bold leading-tight tracking-tight">
              Olá, {name}
            </h1>
            <p className="mt-1.5 text-[15px] text-neutral-500">
              {interPct > 0
                ? `Protocolo Inter · ${interPct}% · streak ${mounted ? streak : 0}`
                : "Live grátis · protocolos · corrida · loja"}
            </p>
          </div>
          <Link
            href="/trainer"
            className="rounded-full bg-neutral-900/5 px-3 py-1.5 text-xs font-medium text-neutral-600"
          >
            Trainer
          </Link>
        </div>
      </header>

      {/* Free live hero — funnel */}
      <section className="mb-6 px-4">
        <Link
          href="/live/free"
          className={`relative block overflow-hidden rounded-[18px] bg-gradient-to-br ${freeLive.gradient} p-5 text-white shadow-lg shadow-orange-500/20 transition active:scale-[0.985]`}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-black/10 to-black/30" />
            <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-16 left-10 h-44 w-44 rounded-full bg-black/25 blur-2xl" />
          </div>
          <div className="relative z-10 drop-shadow">
            <div className="flex items-center gap-2">
              <LiveBadge />
              <span className="text-xs font-semibold text-white">
                Grátis · sem login
              </span>
            </div>
            <h2 className="mt-4 max-w-[15rem] text-[26px] font-bold leading-tight tracking-tight text-white">
              {freeLive.title}
            </h2>
            <p className="mt-2 max-w-[16rem] text-sm font-medium text-white/95">
              {freeLive.description}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-md">
              <IconPlay className="h-4 w-4" />
              Entrar na live
            </div>
            <p className="mt-3 text-xs font-medium text-white/90">
              {freeLive.viewerCount.toLocaleString("pt-BR")} assistindo agora
            </p>
          </div>
        </Link>
      </section>

      {/* Continuar */}
      <p className="px-5 pb-3 text-xl font-bold tracking-tight">Continuar</p>
      <div className="-mx-0 mb-6 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none">
        <Link
          href="/treinos/protocolo/inter"
          className="flex w-[148px] shrink-0 flex-col overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04] transition active:opacity-90"
        >
          <div className="tone-a flex h-24 items-center justify-center p-2">
            <BodySilhouette part="peito" className="h-20 w-12" />
          </div>
          <div className="p-3">
            <strong className="block text-[15px] font-semibold leading-tight">
              Treino A · Peito
            </strong>
            <span className="mt-1 block text-xs text-neutral-500">
              Continuar · {interPct || 0}%
            </span>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-neutral-100">
              <span
                className="block h-full rounded-full bg-[#007AFF]"
                style={{ width: `${interPct || 0}%` }}
              />
            </div>
          </div>
        </Link>
        <Link
          href="/treinos/fast"
          className="flex w-[148px] shrink-0 flex-col overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04] transition active:opacity-90"
        >
          <div className="tone-fast flex h-24 items-center justify-center p-2">
            <BodySilhouette part="full" className="h-20 w-12" />
          </div>
          <div className="p-3">
            <strong className="block text-[15px] font-semibold leading-tight">
              Fast Trainer
            </strong>
            <span className="mt-1 block text-xs text-neutral-500">
              15 min · Quicky
            </span>
          </div>
        </Link>
        <Link
          href="/corrida/5k"
          className="flex w-[148px] shrink-0 flex-col overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04] transition active:opacity-90"
        >
          <div className="tone-run5 flex h-24 items-center justify-center p-3">
            <RouteIllust className="h-12 w-20" />
          </div>
          <div className="p-3">
            <strong className="block text-[15px] font-semibold leading-tight">
              0 → 5 km
            </strong>
            <span className="mt-1 block text-xs text-neutral-500">
              {runDone > 0 ? `${runDone} dias feitos` : "Semana 1 pronta"}
            </span>
          </div>
        </Link>
      </div>

      {/* Funnel cards */}
      <section className="mb-6 px-4">
        <h2 className="mb-3 px-1 text-xl font-bold tracking-tight">
          Continue evoluindo
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/library"
            className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/[0.04] transition active:scale-[0.98]"
          >
            <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h6v12H4zm8-2h8v16h-8z" />
              </svg>
            </div>
            <p className="text-sm font-semibold">Biblioteca VOD</p>
            <p className="mt-1 text-xs text-neutral-500">
              Compra única a partir de {formatBRL(14.9)}
            </p>
          </Link>
          <Link
            href="/live/premium"
            className="rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 p-4 text-white shadow-sm transition active:scale-[0.98]"
          >
            <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
              </svg>
            </div>
            <p className="text-sm font-semibold">Premium Live</p>
            <p className="mt-1 text-xs text-white/80">
              {formatBRL(PREMIUM_PRICE_BRL)}/mês
            </p>
          </Link>
        </div>
      </section>

      {/* Explorar — modules only, no Métodos / Por grupo */}
      <p className="px-5 pb-3 text-xl font-bold tracking-tight">Explorar</p>
      <div className="space-y-3 px-4">
        <Link
          href="/adaptacoes"
          className="flex overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04] transition active:opacity-90"
        >
          <div className="tone-i flex w-28 shrink-0 items-center justify-center">
            <AdaptColuna className="h-16 w-16" />
          </div>
          <div className="flex-1 p-4">
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-600">
              Programas
            </span>
            <strong className="mt-2 block text-[15px] font-semibold">
              Adaptações
            </strong>
            <p className="mt-1 text-xs text-neutral-500">
              Lipedema, gestação, joelho e coluna
            </p>
          </div>
          <IconChevron className="mr-3 mt-6 h-4 w-4 self-start text-neutral-300" />
        </Link>
        <Link
          href="/ebook"
          className="flex overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04] transition active:opacity-90"
        >
          <div
            className="flex w-28 shrink-0 items-center justify-center"
            style={{ background: "linear-gradient(165deg,#1A3A2A,#52B788)" }}
          >
            <BookMark className="h-14 w-11" />
          </div>
          <div className="flex-1 p-4">
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              Novo
            </span>
            <strong className="mt-2 block text-[15px] font-semibold">
              Ebook de nutrição
            </strong>
            <p className="mt-1 text-xs text-neutral-500">
              Guia prático · 48 páginas
              {chapters > 0 ? ` · ${chapters}/7 lidos` : ""}
            </p>
          </div>
        </Link>
        <Link
          href="/corrida"
          className="flex overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04] transition active:opacity-90"
        >
          <div className="tone-run5 flex w-28 shrink-0 items-center justify-center p-3">
            <RouteIllust className="h-14 w-20" />
          </div>
          <div className="flex-1 p-4">
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-600">
              Corrida
            </span>
            <strong className="mt-2 block text-[15px] font-semibold">
              0 → 5 e 0 → 10 km
            </strong>
            <p className="mt-1 text-xs text-neutral-500">
              Programas progressivos com rota
            </p>
          </div>
        </Link>
        <Link
          href="/treinos"
          className="flex overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04] transition active:opacity-90"
        >
          <div className="tone-h flex w-28 shrink-0 items-center justify-center p-2">
            <BodySilhouette part="full" className="h-20 w-12" />
          </div>
          <div className="flex-1 p-4">
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-[#007AFF]">
              Hub
            </span>
            <strong className="mt-2 block text-[15px] font-semibold">
              Todos os treinos
            </strong>
            <p className="mt-1 text-xs text-neutral-500">
              Protocolos · Fast · grupos musculares
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
