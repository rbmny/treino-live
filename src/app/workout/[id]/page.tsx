"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { getWorkout, formatBRL } from "@/lib/data";
import { useDemoStore, useHasMounted } from "@/lib/store";
import { CheckoutModal } from "@/components/CheckoutModal";
import { AuthModal } from "@/components/AuthModal";
import { WorkoutGlyph, IconPlay, IconLock, IconCheck } from "@/components/Icons";

function WorkoutDetailInner() {
  const params = useParams();
  const id = String(params?.id ?? "");
  const workout = getWorkout(id);
  const { owns, user, purchaseWorkout } = useDemoStore();
  const mounted = useHasMounted();
  const search = useSearchParams();
  const router = useRouter();
  const [checkout, setCheckout] = useState(false);
  const [auth, setAuth] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!mounted || !workout) return;
    if (search.get("paid") !== "1") return;
    if (!owns(workout.id)) purchaseWorkout(workout.id);
    // Strip query so refresh doesn't re-fire awkwardly
    router.replace(`/workout/${workout.id}`, { scroll: false });
  }, [mounted, workout, search, owns, purchaseWorkout, router]);

  if (!workout) {
    return (
      <main className="px-4 pt-10 text-center">
        <p className="text-neutral-500">Treino não encontrado.</p>
        <Link href="/library" className="mt-4 inline-block text-sm font-medium">
          Voltar à biblioteca
        </Link>
      </main>
    );
  }

  const owned = mounted && owns(workout.id);

  return (
    <main className="pb-8">
      <div
        className={`relative h-64 bg-gradient-to-br ${workout.gradient} text-white`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.25),transparent_55%)]" />
        <Link
          href="/library"
          className="absolute left-4 top-4 rounded-full bg-black/25 px-3 py-1.5 text-xs font-medium backdrop-blur"
        >
          Voltar
        </Link>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-white/80">
              {workout.category} · {workout.durationMin} min
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              {workout.title}
            </h1>
          </div>
          <WorkoutGlyph icon={workout.icon} className="h-16 w-16 text-white/90" />
        </div>
      </div>

      <div className="px-4 pt-5">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <span className="rounded-full bg-white px-2.5 py-1 ring-1 ring-black/[0.06]">
            {workout.level}
          </span>
          <span>{workout.trainer}</span>
          {owned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <IconCheck className="h-3 w-3" /> Comprado
            </span>
          )}
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
          {workout.description}
        </p>

        {playing && owned ? (
          <div className="mt-6 overflow-hidden rounded-3xl bg-neutral-900 aspect-video flex items-center justify-center text-white">
            <div className="text-center px-6">
              <IconPlay className="mx-auto h-12 w-12 opacity-80" />
              <p className="mt-3 text-sm text-white/70">
                Player demo — vídeo pré-gravado simulado
              </p>
              <p className="mt-1 text-xs text-white/40">{workout.title}</p>
            </div>
          </div>
        ) : owned ? (
          <button
            onClick={() => setPlaying(true)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-black py-4 text-sm font-semibold text-white"
          >
            <IconPlay className="h-5 w-5" />
            Assistir treino
          </button>
        ) : (
          <div className="mt-6 space-y-3">
            <button
              onClick={() => setCheckout(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 py-4 text-sm font-semibold text-white"
            >
              <IconLock className="h-4 w-4" />
              Comprar por {formatBRL(workout.priceBRL)}
            </button>
            {!user && mounted && (
              <button
                onClick={() => setAuth(true)}
                className="w-full text-center text-sm text-neutral-500"
              >
                Já tem conta? Entrar
              </button>
            )}
            <p className="text-center text-xs text-neutral-400">
              Compra única · checkout Stripe (demo)
            </p>
          </div>
        )}

        <div className="mt-8 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/[0.04]">
          <h3 className="font-semibold">Neste treino</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600">
            <li>• Aquecimento e ativação</li>
            <li>• Bloco principal guiado</li>
            <li>• Finalização e alongamento</li>
            <li>• Acesso vitalício neste demo</li>
          </ul>
        </div>
      </div>

      <CheckoutModal
        open={checkout}
        onClose={() => setCheckout(false)}
        workout={workout}
      />
      <AuthModal open={auth} onClose={() => setAuth(false)} />
    </main>
  );
}

export default function WorkoutDetailPage() {
  return (
    <Suspense fallback={<main className="px-4 pt-10 text-sm text-neutral-400">Carregando…</main>}>
      <WorkoutDetailInner />
    </Suspense>
  );
}
