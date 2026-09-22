"use client";

import { useState } from "react";
import { IconCheck, IconClose } from "./Icons";
import { formatBRL } from "@/lib/data";
import { useDemoStore } from "@/lib/store";
import { startCheckout } from "@/lib/stripe-client";
import type { Workout } from "@/types";

export function CheckoutModal({
  open,
  onClose,
  workout,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  workout: Workout;
  onSuccess?: () => void;
}) {
  const { purchaseWorkout, user, signIn } = useDemoStore();
  const [step, setStep] = useState<"form" | "processing" | "done">("form");
  const [email, setEmail] = useState(user?.email ?? "");
  const [card, setCard] = useState("4242 4242 4242 4242");
  const [hint, setHint] = useState<string | null>(null);

  if (!open) return null;

  async function pay() {
    setStep("processing");
    setHint(null);
    const trimmed = email.trim();

    const stripe = await startCheckout({
      mode: "payment",
      productName: workout.title,
      unitAmountCents: Math.round(workout.priceBRL * 100),
      currency: "brl",
      successPath: `/workout/${workout.id}?paid=1`,
      cancelPath: `/workout/${workout.id}?canceled=1`,
      customerEmail: trimmed || undefined,
      metadata: {
        workoutId: workout.id,
        kind: "vod",
      },
    });

    if (stripe.ok) {
      // Redirecting to Stripe Hosted Checkout
      return;
    }

    // Demo fallback — keeps funnel working without Stripe keys
    if (stripe.demoFallback) {
      setHint(
        stripe.code === "STRIPE_SECRET_KEY_MISSING"
          ? "Stripe não configurado — concluindo em modo demo."
          : "Stripe indisponível — concluindo em modo demo."
      );
      await new Promise((r) => setTimeout(r, 700));
      if (!user && trimmed) signIn(trimmed);
      purchaseWorkout(workout.id);
      setStep("done");
      onSuccess?.();
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
            <p className="text-xs font-medium uppercase tracking-wider text-violet-500">
              Stripe Checkout · test / demo
            </p>
            <h2 className="text-lg font-semibold">Compra única</h2>
          </div>
          <button onClick={close} className="rounded-full bg-neutral-100 p-2">
            <IconClose />
          </button>
        </div>

        {step === "done" ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <IconCheck className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold">Pagamento confirmado</h3>
            <p className="mt-2 text-sm text-neutral-500">
              {workout.title} agora é seu. Assista quando quiser.
            </p>
            <button
              onClick={close}
              className="mt-6 w-full rounded-2xl bg-black py-3.5 text-sm font-semibold text-white"
            >
              Assistir agora
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 rounded-2xl bg-neutral-50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">{workout.title}</span>
                <span className="font-semibold">{formatBRL(workout.priceBRL)}</span>
              </div>
              <p className="mt-1 text-xs text-neutral-400">
                Compra única · tenta Stripe Checkout; sem keys → demo local
              </p>
            </div>

            <div className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs text-neutral-500">E-mail</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-400"
                  placeholder="voce@email.com"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-neutral-500">
                  Cartão (só no demo local)
                </span>
                <input
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 font-mono text-sm outline-none focus:ring-2 focus:ring-violet-400"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  defaultValue="12 / 28"
                  className="rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-400"
                  placeholder="MM / AA"
                />
                <input
                  defaultValue="123"
                  className="rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-400"
                  placeholder="CVC"
                />
              </div>
            </div>

            {hint && (
              <p className="mt-3 text-center text-[11px] text-amber-600">{hint}</p>
            )}

            <button
              onClick={pay}
              disabled={step === "processing" || !email.trim()}
              className="mt-5 w-full rounded-2xl bg-violet-600 py-3.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {step === "processing"
                ? "Processando…"
                : `Pagar ${formatBRL(workout.priceBRL)}`}
            </button>
            <p className="mt-3 text-center text-[11px] text-neutral-400">
              Com STRIPE_SECRET_KEY → Checkout hospedado. Sem key → localStorage.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
