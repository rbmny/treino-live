"use client";

import Link from "next/link";
import { BackNav } from "@/components/BackNav";
import { AdaptIcon } from "@/components/Illustrations";
import { ADAPTATIONS } from "@/lib/content";
import { useDemoStore, useHasMounted } from "@/lib/store";

export default function AdaptacoesPage() {
  const { adaptationsSaved } = useDemoStore();
  const mounted = useHasMounted();

  return (
    <main className="pb-6 pt-2">
      <BackNav href="/" label="Início" />
      <header className="px-5">
        <h1 className="text-[34px] font-bold tracking-tight">Adaptações</h1>
        <p className="mt-1.5 text-[15px] text-neutral-500">
          Programas seguros para condições específicas
        </p>
      </header>

      <div className="mx-4 mt-5 grid grid-cols-2 gap-3">
        {ADAPTATIONS.map((a) => {
          const saved = mounted && adaptationsSaved.includes(a.id);
          return (
            <Link
              key={a.id}
              href={`/adaptacoes/${a.id}`}
              className="overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04] transition active:scale-[0.98]"
            >
              <div
                className={`tone-${a.tone} flex h-28 items-center justify-center`}
              >
                <AdaptIcon id={a.id} className="h-16 w-16" />
              </div>
              <div className="p-3">
                <strong className="block text-[15px] font-semibold">
                  {a.label}
                  {saved ? " ✓" : ""}
                </strong>
                <span className="mt-0.5 block text-xs text-neutral-500">
                  {a.sub}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
