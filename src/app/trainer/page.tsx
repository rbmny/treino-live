"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { freeLive } from "@/lib/data";
import { LiveBadge } from "@/components/LiveBadge";

export default function TrainerPage() {
  const [live, setLive] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [title, setTitle] = useState(freeLive.title);

  useEffect(() => {
    if (!live) return;
    setViewers(42);
    const t = setInterval(() => {
      setViewers((v) => v + Math.floor(Math.random() * 8));
    }, 3000);
    return () => clearInterval(t);
  }, [live]);

  return (
    <main className="px-4 pb-8 pt-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
            Host
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Ir ao vivo
          </h1>
        </div>
        <Link href="/" className="text-sm font-medium text-neutral-500">
          App
        </Link>
      </header>

      <div className="overflow-hidden rounded-[28px] bg-neutral-900 text-white">
        <div
          className={`relative aspect-video bg-gradient-to-br ${freeLive.gradient}`}
        >
          {live ? (
            <>
              <div className="absolute left-3 top-3">
                <LiveBadge />
              </div>
              <div className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 text-xs backdrop-blur">
                {viewers} viewers
              </div>
              <p className="absolute inset-0 flex items-center justify-center text-sm text-white/70">
                Câmera / stream mock
              </p>
            </>
          ) : (
            <p className="absolute inset-0 flex items-center justify-center text-sm text-white/60">
              Preview offline
            </p>
          )}
        </div>

        <div className="space-y-4 p-5">
          <label className="block">
            <span className="mb-1.5 block text-xs text-white/50">
              Título da live (free)
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={live}
              className="w-full rounded-2xl bg-white/10 px-4 py-3 text-sm outline-none disabled:opacity-60"
            />
          </label>

          {!live ? (
            <button
              onClick={() => setLive(true)}
              className="w-full rounded-2xl bg-red-500 py-4 text-sm font-semibold"
            >
              Go live (free)
            </button>
          ) : (
            <div className="space-y-2">
              <Link
                href="/live/free"
                className="block w-full rounded-2xl bg-white py-3.5 text-center text-sm font-semibold text-neutral-900"
              >
                Abrir sala do viewer
              </Link>
              <button
                onClick={() => {
                  setLive(false);
                  setViewers(0);
                }}
                className="w-full rounded-2xl bg-white/10 py-3.5 text-sm font-semibold"
              >
                Encerrar live
              </button>
            </div>
          )}

          <p className="text-center text-[11px] text-white/40">
            Painel demo — sem WebRTC / Mux. Live free = top-of-funnel.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/[0.04]">
        <h3 className="font-semibold">Dica de funil</h3>
        <p className="mt-2 text-sm text-neutral-500">
          A live free não exige login. Use o upsell sheet na sala do viewer para
          empurrar VODs e Premium.
        </p>
      </div>
    </main>
  );
}
