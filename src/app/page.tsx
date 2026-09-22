"use client";

import Link from "next/link";
import { freeLive, formatBRL, PREMIUM_PRICE_BRL, workouts } from "@/lib/data";
import { useDemoStore, useHasMounted } from "@/lib/store";
import { LiveBadge } from "@/components/LiveBadge";
import { WorkoutCard } from "@/components/WorkoutCard";
import { IconChevron, IconPlay } from "@/components/Icons";

export default function HomePage() {
  const { owns } = useDemoStore();
  const mounted = useHasMounted();
  const featured = workouts.slice(0, 4);

  return (
    <main className="px-4 pb-4 pt-6">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
            Treino Live
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Descobrir
          </h1>
        </div>
        <Link
          href="/trainer"
          className="rounded-full bg-neutral-900/5 px-3 py-1.5 text-xs font-medium text-neutral-600"
        >
          Trainer
        </Link>
      </header>

      {/* Free live hero — top of funnel */}
      <section className="mb-8">
        <Link
          href="/live/free"
          className={`relative block overflow-hidden rounded-[28px] bg-gradient-to-br ${freeLive.gradient} p-5 text-white shadow-lg shadow-orange-500/20 transition active:scale-[0.99]`}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-white/25 blur-3xl" />
            <div className="absolute -bottom-16 left-10 h-44 w-44 rounded-full bg-black/15 blur-2xl" />
            {/* Inline illustration */}
            <svg
              className="absolute bottom-4 right-3 h-28 w-28 text-white/30"
              viewBox="0 0 120 120"
              fill="currentColor"
            >
              <circle cx="60" cy="28" r="14" />
              <path d="M40 110l12-40 16 12 18-36M52 70l-10-22 22-4" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <LiveBadge />
              <span className="text-xs font-medium text-white/85">
                Grátis · sem login
              </span>
            </div>
            <h2 className="mt-4 max-w-[15rem] text-2xl font-semibold leading-tight tracking-tight">
              {freeLive.title}
            </h2>
            <p className="mt-2 max-w-[16rem] text-sm text-white/85">
              {freeLive.description}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900">
              <IconPlay className="h-4 w-4" />
              Entrar na live
            </div>
            <p className="mt-3 text-xs text-white/75">
              {freeLive.viewerCount.toLocaleString("pt-BR")} assistindo agora
            </p>
          </div>
        </Link>
      </section>

      {/* Funnel cards */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold tracking-tight">
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

      {/* Featured VODs */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            Treinos em destaque
          </h2>
          <Link
            href="/library"
            className="inline-flex items-center text-sm font-medium text-neutral-500"
          >
            Ver todos <IconChevron className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {featured.map((w) => (
            <WorkoutCard
              key={w.id}
              workout={w}
              owned={mounted ? owns(w.id) : false}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
