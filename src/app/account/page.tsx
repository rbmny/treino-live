"use client";

import { useState } from "react";
import Link from "next/link";
import { workouts, formatBRL, PREMIUM_PRICE_BRL } from "@/lib/data";
import { useDemoStore, useHasMounted } from "@/lib/store";
import { AuthModal } from "@/components/AuthModal";
import { PortalModal } from "@/components/PortalModal";
import { SubscribeModal } from "@/components/SubscribeModal";
import { IconChevron } from "@/components/Icons";

export default function AccountPage() {
  const {
    user,
    ownedWorkoutIds,
    premiumSubscribed,
    premiumRenewsAt,
    signOut,
    resetDemo,
  } = useDemoStore();
  const mounted = useHasMounted();
  const [auth, setAuth] = useState(false);
  const [portal, setPortal] = useState(false);
  const [subscribe, setSubscribe] = useState(false);

  const owned = workouts.filter((w) => ownedWorkoutIds.includes(w.id));
  const renewLabel = premiumRenewsAt
    ? new Date(premiumRenewsAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  if (!mounted) {
    return <main className="px-4 pt-10 text-sm text-neutral-400">Carregando…</main>;
  }

  return (
    <main className="px-4 pb-4 pt-6">
      <header className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
          Perfil
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Conta</h1>
      </header>

      {!user ? (
        <div className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-black/[0.04]">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-2xl">
            👋
          </div>
          <h2 className="text-lg font-semibold">Entre para salvar compras</h2>
          <p className="mt-2 text-sm text-neutral-500">
            Demo: magic link ou e-mail + senha. Tudo fica no localStorage.
          </p>
          <button
            onClick={() => setAuth(true)}
            className="mt-5 w-full rounded-2xl bg-black py-3.5 text-sm font-semibold text-white"
          >
            Entrar / criar conta
          </button>
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/[0.04]">
          <p className="text-xs text-neutral-400">Logado como</p>
          <p className="mt-1 text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-neutral-500">{user.email}</p>
          <button
            onClick={signOut}
            className="mt-4 text-sm font-medium text-red-500"
          >
            Sair
          </button>
        </div>
      )}

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-400">
          Assinatura
        </h2>
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/[0.04]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Premium Live</p>
              <p className="text-sm text-neutral-500">
                {formatBRL(PREMIUM_PRICE_BRL)}/mês
              </p>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                premiumSubscribed
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-neutral-100 text-neutral-500"
              }`}
            >
              {premiumSubscribed ? "Ativa" : "Inativa"}
            </span>
          </div>
          {premiumSubscribed && renewLabel && (
            <p className="mt-2 text-xs text-neutral-400">
              Renova em {renewLabel} (simulado)
            </p>
          )}
          <div className="mt-4 flex gap-2">
            {premiumSubscribed ? (
              <>
                <Link
                  href="/live/premium"
                  className="flex-1 rounded-2xl bg-black py-3 text-center text-sm font-semibold text-white"
                >
                  Ir para live
                </Link>
                <button
                  onClick={() => setPortal(true)}
                  className="flex-1 rounded-2xl bg-neutral-100 py-3 text-sm font-semibold"
                >
                  Gerenciar
                </button>
              </>
            ) : (
              <button
                onClick={() => setSubscribe(true)}
                className="w-full rounded-2xl bg-fuchsia-600 py-3 text-sm font-semibold text-white"
              >
                Assinar Premium
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-400">
          Compras ({owned.length})
        </h2>
        {owned.length === 0 ? (
          <div className="rounded-3xl bg-white p-5 text-sm text-neutral-500 shadow-sm ring-1 ring-black/[0.04]">
            Nenhuma compra ainda.{" "}
            <Link href="/library" className="font-medium text-neutral-900">
              Explorar biblioteca
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {owned.map((w) => (
              <Link
                key={w.id}
                href={`/workout/${w.id}`}
                className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/[0.04]"
              >
                <div>
                  <p className="text-sm font-medium">{w.title}</p>
                  <p className="text-xs text-neutral-500">
                    {formatBRL(w.priceBRL)} · {w.durationMin} min
                  </p>
                </div>
                <IconChevron className="h-4 w-4 text-neutral-300" />
              </Link>
            ))}
          </div>
        )}
      </section>

      <button
        onClick={resetDemo}
        className="mt-8 w-full text-center text-xs text-neutral-400"
      >
        Resetar dados demo (localStorage)
      </button>

      <AuthModal open={auth} onClose={() => setAuth(false)} />
      <PortalModal open={portal} onClose={() => setPortal(false)} />
      <SubscribeModal open={subscribe} onClose={() => setSubscribe(false)} />
    </main>
  );
}
