"use client";

import { useParams } from "next/navigation";
import { BackNav } from "@/components/BackNav";
import { SessionCard } from "@/components/SessionCard";
import { SilhouetteCollage } from "@/components/BodySilhouette";
import { PROTO_ADV_BLOCKS, PROTO_INTER_SESSIONS } from "@/lib/content";
import { useDemoStore, useHasMounted } from "@/lib/store";
import { useToast } from "@/components/Toast";
import type { ProtocolLevel } from "@/types";

export default function ProtocoloPage() {
  const params = useParams();
  const level = (params.level === "avancado" ? "avancado" : "inter") as ProtocolLevel;
  const isInter = level === "inter";
  const { protocolProgress, startProtocol, bumpProtocol } = useDemoStore();
  const mounted = useHasMounted();
  const { toast } = useToast();
  const pct = mounted ? protocolProgress[level] : 0;

  const sessions = isInter ? PROTO_INTER_SESSIONS : PROTO_ADV_BLOCKS;

  function continueToday() {
    if (pct <= 0) startProtocol(level);
    else bumpProtocol(level, 12);
    toast(
      isInter
        ? `Protocolo Intermediário · ${Math.min(100, (pct || 0) + (pct <= 0 ? 8 : 12))}%`
        : `Protocolo Avançado · progresso atualizado`
    );
  }

  return (
    <main className="pb-6 pt-2">
      <BackNav href="/treinos" label="Treinos" title="Protocolo" />

      <div className="mx-4 mt-2 overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04]">
        <div
          className={`relative min-h-[132px] p-5 text-white ${
            isInter
              ? "bg-gradient-to-br from-[#1C3A5F] to-[#007AFF]"
              : "bg-gradient-to-br from-[#2C1F4A] to-[#5856D6]"
          }`}
        >
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold">
            {isInter ? "Nível 2" : "Nível 3"}
          </span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-white/70">
            {isInter ? "8 semanas · hipertrofia" : "12 semanas · periodização"}
            {pct > 0 ? ` · ${pct}%` : ""}
          </p>
          <h3 className="text-[22px] font-bold">
            {isInter ? "Intermediário" : "Avançado"}
          </h3>
          <div className="absolute bottom-2 right-2">
            <SilhouetteCollage
              parts={isInter ? ["peito", "costas", "pernas"] : ["ombros", "costas", "gluteo"]}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-3">
          {isInter ? (
            <>
              <span className="rounded-full bg-[#007AFF]/12 px-2.5 py-1 text-xs font-semibold text-[#007AFF]">
                4× / semana
              </span>
              <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium">
                45–60 min
              </span>
              <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium">
                Progressão linear
              </span>
            </>
          ) : (
            <>
              <span className="rounded-full bg-[#007AFF]/12 px-2.5 py-1 text-xs font-semibold text-[#007AFF]">
                5–6× / semana
              </span>
              <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium">
                60–75 min
              </span>
              <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium">
                PPL · RPE
              </span>
            </>
          )}
        </div>
      </div>

      <p className="px-5 pt-3 text-sm text-neutral-500">
        {isInter
          ? "Divisão ABC + full body. Para quem já treina há 6 meses ou mais."
          : "Para atletas experientes. Mesociclos de volume, intensidade e deload."}
      </p>

      {pct > 0 && (
        <div className="mx-5 mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-[#007AFF] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}

      <p className="px-5 pb-3 pt-5 text-xl font-bold">
        {isInter ? "Semana 3" : "Estrutura"}
      </p>
      <div className="px-4">
        {sessions.map((s) => (
          <SessionCard
            key={s.title}
            part={s.part}
            title={s.title}
            caption={s.caption}
            tag={s.tag || undefined}
            onClick={() => {
              bumpProtocol(level, 8);
              toast(`Abrindo: ${s.title}`);
            }}
          />
        ))}
      </div>

      <div className="space-y-2 px-4 pt-4">
        <button
          onClick={continueToday}
          className="w-full rounded-2xl bg-[#007AFF] py-3.5 text-center text-[15px] font-semibold text-white"
        >
          {isInter
            ? pct > 0
              ? "Continuar treino de hoje"
              : "Começar protocolo"
            : pct > 0
              ? "Continuar protocolo"
              : "Começar protocolo"}
        </button>
        <button
          onClick={() => toast(isInter ? "PDF do protocolo baixado (demo)" : "Ver Intermediário")}
          className="w-full rounded-2xl bg-neutral-200/80 py-3.5 text-center text-[15px] font-semibold text-neutral-800"
        >
          {isInter ? "Baixar PDF" : "Ver Intermediário"}
        </button>
      </div>
    </main>
  );
}
