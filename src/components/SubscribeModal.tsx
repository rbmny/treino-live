"use client";

import { useState } from "react";
import { IconCheck, IconClose } from "./Icons";
import { formatBRL, PREMIUM_PERIOD, PREMIUM_PRICE_BRL } from "@/lib/data";
import { useDemoStore } from "@/lib/store";
import { getPremiumPriceId, startCheckout } from "@/lib/stripe-client";

const perks = [
  "Lives premium exclusivas",
  "Q&A ao vivo com o trainer",
  "Acesso prioritário a novos formatos",
  "Cancele quando quiser",
];

export function SubscribeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { subscribePremium, user, signIn } = useDemoStore();
  const [step, setStep] = useState<"form" | "processing" | "done">("form");
  const [email, setEmail] = useState(user?.email ?? "");
  const [hint, setHint] = useState<string | null>(null);

  if (!open) return null;

  async function subscribe() {
    setStep("processing");
    setHint(null);
    const trimmed = email.trim();
    const priceId = getPremiumPriceId();

    const stripe = await startCheckout({
      mode: "subscription",
      priceId,
      successPath: "/live/premium?subscribed=1",
      cancelPath: "/live/premium?canceled=1",
      customerEmail: trimmed || undefined,
      metadata: { kind: "premium" },
    });

    if (stripe.ok) {
      return;
    }

    if (stripe.demoFallback) {
      setHint(
        !priceId
          ? "Sem NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID — demo local."
          : "Stripe indisponível — concluindo em modo demo."
      );
      await new Promise((r) => setTimeout(r, 700));
      if (!user && trimmed) signIn(trimmed);
      subscribePremium();
      setStep("done");
      return;
    }
  }

  function close() {
    setStep("form");
    setHint(null);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4">
      <button className="absolute inset-0" aria-label="Fechar" onClick={close} />
      <div className="relative w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-fuchsia-500">
              Stripe Subscription · test / demo
            </p>
            <h2 className="text-lg font-semibold">Treino Premium</h2>
          </div>
          <button onClick={close} className="rounded-full bg-neutral-100 p-2">
            <IconClose />
          </button>
        </div>

        {step === "done" ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-600">
              <IconCheck className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold">Assinatura ativa</h3>
            <p className="mt-2 text-sm text-neutral-500">
              Bem-vindo ao Premium. Entre na live exclusiva agora.
            </p>
            <button
              onClick={close}
              className="mt-6 w-full rounded-2xl bg-black py-3.5 text-sm font-semibold text-white"
            >
              Ir para Premium Live
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-400 p-5 text-white">
              <p className="text-sm text-white/80">Assinatura mensal</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight">
                {formatBRL(PREMIUM_PRICE_BRL)}
                <span className="text-base font-normal text-white/80">
                  /{PREMIUM_PERIOD}
                </span>
              </p>
              <ul className="mt-4 space-y-2">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm">
                    <IconCheck className="h-4 w-4 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>

            <label className="block">
              <span className="mb-1 block text-xs text-neutral-500">E-mail</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fuchsia-400"
                placeholder="voce@email.com"
              />
            </label>
            <label className="mt-3 block">
              <span className="mb-1 block text-xs text-neutral-500">
                Cartão (só no demo local)
              </span>
              <input
                defaultValue="4242 4242 4242 4242"
                className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 font-mono text-sm outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
            </label>

            {hint && (
              <p className="mt-3 text-center text-[11px] text-amber-600">{hint}</p>
            )}

            <button
              onClick={subscribe}
              disabled={step === "processing" || !email.trim()}
              className="mt-5 w-full rounded-2xl bg-fuchsia-600 py-3.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {step === "processing"
                ? "Ativando…"
                : `Assinar por ${formatBRL(PREMIUM_PRICE_BRL)}/${PREMIUM_PERIOD}`}
            </button>
            <p className="mt-3 text-center text-[11px] text-neutral-400">
              Com Price id + secret → Checkout. Sem config → localStorage.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
