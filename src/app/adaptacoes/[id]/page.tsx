"use client";

import { useParams } from "next/navigation";
import { BackNav } from "@/components/BackNav";
import { AdaptIcon } from "@/components/Illustrations";
import { WorkoutRow } from "@/components/SessionCard";
import { ADAPTATIONS } from "@/lib/content";
import { useDemoStore, useHasMounted } from "@/lib/store";
import { useToast } from "@/components/Toast";
import type { AdaptId } from "@/types";

export default function AdaptDetailPage() {
  const params = useParams();
  const id = String(params.id) as AdaptId;
  const adapt = ADAPTATIONS.find((a) => a.id === id) || ADAPTATIONS[0];
  const { saveAdaptation, adaptationsSaved } = useDemoStore();
  const mounted = useHasMounted();
  const { toast } = useToast();
  const saved = mounted && adaptationsSaved.includes(adapt.id);

  return (
    <main className="pb-6 pt-2">
      <BackNav href="/adaptacoes" label="Adaptações" />
      <div className={`tone-${adapt.tone} mx-4 mt-2 flex h-40 items-center justify-center rounded-[18px]`}>
        <AdaptIcon id={adapt.id} className="h-24 w-24" />
      </div>
      <header className="px-5 pt-4">
        <h1 className="text-[34px] font-bold tracking-tight">
          {adapt.id === "joelho"
            ? "Dores no joelho"
            : adapt.id === "coluna"
              ? "Dores na coluna"
              : adapt.label}
        </h1>
        <p className="mt-1 text-[15px] text-neutral-500">{adapt.heroSub}</p>
      </header>
      <p className="px-5 pt-3 text-sm leading-relaxed text-neutral-500">
        {adapt.prose}
      </p>
      <div className="mt-4 px-4">
        {adapt.items.map((w) => (
          <WorkoutRow
            key={w.t}
            part={w.part}
            title={w.t}
            caption={w.m}
            onClick={() => toast(`Abrindo: ${w.t}`)}
          />
        ))}
      </div>
      <div className="px-4 pt-4">
        <button
          onClick={() => {
            saveAdaptation(adapt.id);
            toast(
              saved
                ? "Já está no seu plano"
                : `Adaptação ${adapt.label} salva no plano`
            );
          }}
          className="w-full rounded-2xl bg-[#007AFF] py-3.5 text-[15px] font-semibold text-white"
        >
          {saved ? "No seu plano ✓" : "Acessar programa"}
        </button>
      </div>
    </main>
  );
}
