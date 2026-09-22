"use client";

import { BackNav } from "@/components/BackNav";
import { EBOOK_CHAPTERS } from "@/lib/content";
import { useDemoStore, useHasMounted } from "@/lib/store";
import { useToast } from "@/components/Toast";

export default function EbookPage() {
  const { ebookChaptersRead, markEbookChapter, ownsShop, purchaseShopItem } =
    useDemoStore();
  const mounted = useHasMounted();
  const { toast } = useToast();
  const readCount = mounted ? ebookChaptersRead.length : 0;

  return (
    <main className="pb-6 pt-2">
      <BackNav href="/" label="Início" title="Ebook" />

      <div
        className="mx-4 mt-2 flex min-h-[220px] flex-col justify-between rounded-[18px] p-6 text-white shadow-sm"
        style={{ background: "linear-gradient(165deg,#1A3A2A,#52B788)" }}
      >
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Treino+
          </div>
          <h2 className="mt-3 text-3xl font-bold leading-tight">
            Nutrição
            <br />
            para quem
            <br />
            treina
          </h2>
        </div>
        <div className="text-sm text-white/80">
          Guia prático · 48 páginas
          {readCount > 0 ? ` · ${readCount}/7 lidos` : ""}
        </div>
      </div>

      <div className="mx-4 mt-4 flex flex-wrap justify-center gap-2">
        <span className="rounded-full bg-[#007AFF]/12 px-2.5 py-1 text-xs font-semibold text-[#007AFF]">
          7 capítulos
        </span>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium">
          PDF e app
        </span>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium">
          R$ 47
        </span>
      </div>

      <p className="px-5 pb-3 pt-5 text-xl font-bold">Capítulos</p>
      <div className="space-y-2 px-4">
        {EBOOK_CHAPTERS.map((c) => {
          const read = mounted && ebookChaptersRead.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                markEbookChapter(c.id);
                if (!ownsShop("shop-ebook")) purchaseShopItem("shop-ebook");
                toast(
                  read
                    ? `Capítulo ${c.n}: ${c.t}`
                    : `Marcado como lido · Cap. ${c.n}`
                );
              }}
              className={`flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm ring-1 transition ${
                read ? "ring-emerald-300" : "ring-black/[0.04]"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                  read
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-neutral-100 text-neutral-600"
                }`}
              >
                {read ? "✓" : c.n}
              </div>
              <div>
                <strong className="block text-[15px] font-semibold">{c.t}</strong>
                <span className="text-xs text-neutral-500">{c.m}</span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="px-5 pb-2 pt-5 text-xl font-bold">Prévia</p>
      <div className="mx-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/[0.04]">
        <h3 className="font-semibold">Cap. 2 — Proteína no dia a dia</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Para hipertrofia, uma meta prática é 1,6 a 2,2 g de proteína por kg.
          Distribua em 3–5 refeições.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Hidratação: 35–40 ml por kg. Em treinos longos, considere eletrólitos.
        </p>
      </div>

      <div className="space-y-2 px-4 pt-5">
        <button
          onClick={() => {
            const next = EBOOK_CHAPTERS.find(
              (c) => !ebookChaptersRead.includes(c.id)
            );
            if (next) {
              markEbookChapter(next.id);
              toast(`Continuando · Cap. ${next.n}: ${next.t}`);
            } else {
              toast("Todos os capítulos lidos 🎉");
            }
          }}
          className="w-full rounded-2xl bg-[#007AFF] py-3.5 text-[15px] font-semibold text-white"
        >
          Continuar leitura
        </button>
        <button
          onClick={() => toast("PDF baixado (demo)")}
          className="w-full rounded-2xl bg-neutral-200/80 py-3.5 text-[15px] font-semibold"
        >
          Baixar PDF
        </button>
      </div>
    </main>
  );
}
