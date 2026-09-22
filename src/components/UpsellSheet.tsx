"use client";

import Link from "next/link";
import { IconChevron, IconClose } from "./Icons";
import { formatBRL, PREMIUM_PRICE_BRL, workouts } from "@/lib/data";

export function UpsellSheet({
  open,
  onClose,
  onSubscribe,
}: {
  open: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}) {
  if (!open) return null;
  const sample = workouts.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <button className="absolute inset-0" aria-label="Fechar" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-t-3xl bg-white p-5 pb-8 shadow-2xl">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-neutral-200" />
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              Leve o treino além do free
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              Compre VODs avulsos ou assine o Premium Live.
            </p>
          </div>
          <button onClick={onClose} className="rounded-full bg-neutral-100 p-2">
            <IconClose className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={onSubscribe}
          className="mb-3 flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 p-4 text-left text-white"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-white/80">
              Assinatura
            </p>
            <p className="text-lg font-semibold">Premium Live</p>
            <p className="text-sm text-white/85">
              {formatBRL(PREMIUM_PRICE_BRL)}/mês · cancele quando quiser
            </p>
          </div>
          <IconChevron className="h-5 w-5 text-white/80" />
        </button>

        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-400">
          Ou compre um treino
        </p>
        <div className="space-y-2">
          {sample.map((w) => (
            <Link
              key={w.id}
              href={`/workout/${w.id}`}
              onClick={onClose}
              className="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">{w.title}</p>
                <p className="text-xs text-neutral-500">
                  {w.durationMin} min · {w.level}
                </p>
              </div>
              <span className="text-sm font-semibold">{formatBRL(w.priceBRL)}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/library"
          onClick={onClose}
          className="mt-4 block text-center text-sm font-medium text-neutral-600"
        >
          Ver biblioteca completa
        </Link>
      </div>
    </div>
  );
}
