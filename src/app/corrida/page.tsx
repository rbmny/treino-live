"use client";

import Link from "next/link";
import { RouteIllust, RouteLongIllust } from "@/components/Illustrations";
import { useDemoStore, useHasMounted } from "@/lib/store";

export default function CorridaHubPage() {
  const { corridaDone, corridaActive } = useDemoStore();
  const mounted = useHasMounted();
  const done5 = mounted
    ? corridaDone.filter((k) => k.startsWith("5k:")).length
    : 0;
  const done10 = mounted
    ? corridaDone.filter((k) => k.startsWith("10k:")).length
    : 0;

  return (
    <main className="pb-4 pt-2">
      <header className="px-5 pt-4">
        <h1 className="text-[34px] font-bold tracking-tight">Corrida</h1>
        <p className="mt-1.5 text-[15px] text-neutral-500">
          Do zero até a sua meta
          {mounted && corridaActive
            ? ` · ativo: ${corridaActive === "5k" ? "0→5 km" : "0→10 km"}`
            : ""}
        </p>
      </header>

      <Link
        href="/corrida/5k"
        className="mx-4 mt-5 block overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04] transition active:opacity-90"
      >
        <div className="tone-run5 relative flex h-36 items-end justify-between p-5">
          <div className="text-5xl font-bold tracking-tight text-[#007AFF]">
            5<small className="text-2xl">km</small>
          </div>
          <RouteIllust className="absolute right-2 top-4 h-20 w-36 opacity-90" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold">0 → 5 km</h3>
          <p className="mt-1 text-sm text-neutral-500">
            8 semanas · caminhada e corrida · 3× por semana
            {done5 > 0 ? ` · ${done5} feitos` : ""}
          </p>
        </div>
      </Link>

      <Link
        href="/corrida/10k"
        className="mx-4 mt-3 block overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04] transition active:opacity-90"
      >
        <div className="tone-run10 relative flex h-36 items-end justify-between p-5">
          <div className="text-5xl font-bold tracking-tight text-[#5856D6]">
            10<small className="text-2xl">km</small>
          </div>
          <RouteLongIllust className="absolute right-2 top-4 h-20 w-36 opacity-90" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold">0 → 10 km</h3>
          <p className="mt-1 text-sm text-neutral-500">
            12 semanas · endurance · 3–4× por semana
            {done10 > 0 ? ` · ${done10} feitos` : ""}
          </p>
        </div>
      </Link>

      <p className="px-5 pt-4 text-sm text-neutral-500">
        Comece pelo 5 km se você está há mais de 3 meses sem correr. O foco é
        consistência.
      </p>
    </main>
  );
}
