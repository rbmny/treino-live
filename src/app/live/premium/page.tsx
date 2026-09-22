"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { premiumLive, formatBRL, PREMIUM_PRICE_BRL } from "@/lib/data";
import { useDemoStore, useHasMounted } from "@/lib/store";
import { LiveBadge } from "@/components/LiveBadge";
import { SubscribeModal } from "@/components/SubscribeModal";
import { IconLock, IconPlay } from "@/components/Icons";

function PremiumLiveInner() {
  const { premiumSubscribed, subscribePremium } = useDemoStore();
  const mounted = useHasMounted();
  const search = useSearchParams();
  const router = useRouter();
  const [subscribe, setSubscribe] = useState(false);
  const [inRoom, setInRoom] = useState(false);
  const locked = mounted ? !premiumSubscribed : true;

  useEffect(() => {
    if (!mounted) return;
    if (search.get("subscribed") !== "1") return;
    if (!premiumSubscribed) subscribePremium();
    router.replace("/live/premium", { scroll: false });
  }, [mounted, search, premiumSubscribed, subscribePremium, router]);

  if (inRoom && !locked) {
    return (
      <div className="relative flex min-h-dvh flex-col bg-neutral-950 text-white">
        <div
          className={`relative aspect-[9/14] max-h-[70dvh] w-full bg-gradient-to-br ${premiumLive.gradient}`}
        >
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <button
              onClick={() => setInRoom(false)}
              className="rounded-full bg-black/35 px-3 py-1.5 text-xs backdrop-blur"
            >
              Sair
            </button>
            <LiveBadge label="PREMIUM" />
          </div>
          <div className="absolute bottom-6 left-4 right-4">
            <p className="text-xs text-white">{premiumLive.trainer}</p>
            <h1 className="text-2xl font-semibold">{premiumLive.title}</h1>
            <p className="mt-2 text-sm text-white/90">
              Sala exclusiva · {premiumLive.viewerCount} assinantes
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-t-3xl bg-neutral-900 p-5">
          <p className="text-sm text-white/70">
            Chat premium mock — perguntas técnicas liberadas para assinantes.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="font-semibold text-fuchsia-300">Marina</span>{" "}
              Cadência na remada?
            </p>
            <p>
              <span className="font-semibold text-fuchsia-300">Ricky</span>{" "}
              3s excêntrico, 1s no topo. Foco em escápula.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="px-4 pb-4 pt-6">
      <header className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
          Exclusivo
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Premium Live
        </h1>
      </header>

      <div
        className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${premiumLive.gradient} p-5 text-white shadow-lg`}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10" />
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
        <div className="relative z-10 drop-shadow">
          <div className="flex items-center gap-2">
            <LiveBadge label="PREMIUM" />
            {locked && (
              <span className="inline-flex items-center gap-1 rounded-full bg-black/35 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
                <IconLock className="h-3 w-3" /> Assinantes
              </span>
            )}
          </div>
          <h2 className="mt-4 text-2xl font-semibold leading-tight text-white">
            {premiumLive.title}
          </h2>
          <p className="mt-2 text-sm font-medium text-white/95">{premiumLive.description}</p>
          <p className="mt-3 text-xs font-semibold text-white">{premiumLive.startsAt}</p>

          {locked ? (
            <button
              onClick={() => setSubscribe(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-900"
            >
              <IconLock className="h-4 w-4" />
              Desbloquear · {formatBRL(PREMIUM_PRICE_BRL)}/mês
            </button>
          ) : (
            <button
              onClick={() => setInRoom(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-900"
            >
              <IconPlay className="h-4 w-4" />
              Entrar na sala
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/[0.04]">
        <h3 className="font-semibold">O que você ganha</h3>
        <ul className="mt-3 space-y-2 text-sm text-neutral-600">
          <li>• Lives avançadas com técnica detalhada</li>
          <li>• Q&A ao vivo com o trainer</li>
          <li>• Acesso prioritário a novos formatos</li>
          <li>• Cancele quando quiser em Conta</li>
        </ul>
        {locked && (
          <button
            onClick={() => setSubscribe(true)}
            className="mt-5 w-full rounded-2xl bg-black py-3.5 text-sm font-semibold text-white"
          >
            Assinar Premium
          </button>
        )}
        {!locked && (
          <Link
            href="/account"
            className="mt-5 block text-center text-sm font-medium text-neutral-500"
          >
            Gerenciar assinatura
          </Link>
        )}
      </div>

      <SubscribeModal open={subscribe} onClose={() => setSubscribe(false)} />
    </main>
  );
}

export default function PremiumLivePage() {
  return (
    <Suspense
      fallback={
        <main className="px-4 pt-10 text-sm text-neutral-400">Carregando…</main>
      }
    >
      <PremiumLiveInner />
    </Suspense>
  );
}
