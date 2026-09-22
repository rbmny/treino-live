"use client";

import Link from "next/link";
import { useState } from "react";
import { BodySilhouette } from "@/components/BodySilhouette";
import {
  BookMark,
  ShopBands,
  ShopDumbbell,
  ShopLock,
} from "@/components/Illustrations";
import { SHOP_PRODUCTS } from "@/lib/content";
import { formatBRL } from "@/lib/data";
import { useDemoStore, useHasMounted } from "@/lib/store";
import { useToast } from "@/components/Toast";
import { IconCheck } from "@/components/Icons";

function ShopArt({ art }: { art: string }) {
  switch (art) {
    case "dumbbell":
      return <ShopDumbbell className="h-10 w-16" />;
    case "bookmark":
      return <BookMark className="h-14 w-11" />;
    case "bands":
      return <ShopBands className="h-12 w-16" />;
    case "lock":
      return <ShopLock className="h-14 w-12" />;
    case "gluteo":
      return <BodySilhouette part="gluteo" className="h-20 w-12" />;
    case "full":
      return <BodySilhouette part="full" className="h-20 w-12" />;
    default:
      return null;
  }
}

export default function LojaPage() {
  const { ownsShop, purchaseShopItem, subscribePremium } = useDemoStore();
  const mounted = useHasMounted();
  const { toast } = useToast();
  const [buying, setBuying] = useState<string | null>(null);

  async function buy(id: string, title: string) {
    if (ownsShop(id)) {
      toast("Já adquirido");
      return;
    }
    setBuying(id);
    await new Promise((r) => setTimeout(r, 500));
    purchaseShopItem(id);
    if (id === "shop-annual") subscribePremium();
    setBuying(null);
    toast(`${title} adicionado ✓`);
  }

  return (
    <main className="pb-4 pt-2">
      <header className="px-5 pt-4">
        <h1 className="text-[34px] font-bold tracking-tight">Loja</h1>
        <p className="mt-1.5 text-[15px] text-neutral-500">
          Digitais e físicos selecionados
        </p>
      </header>

      <div className="mx-4 mt-5 grid grid-cols-2 gap-3">
        {SHOP_PRODUCTS.map((p) => {
          const owned = mounted && ownsShop(p.id);
          const inner = (
            <>
              <div
                className={`flex h-32 items-center justify-center ${
                  p.tone ? `tone-${p.tone}` : ""
                }`}
                style={
                  p.style
                    ? {
                        backgroundImage:
                          "linear-gradient(165deg,#1A3A2A,#52B788)",
                      }
                    : undefined
                }
              >
                <ShopArt art={p.art} />
              </div>
              <div className="p-3">
                <strong className="block text-[14px] font-semibold leading-tight">
                  {p.t}
                </strong>
                <div className="mt-0.5 text-xs text-neutral-500">{p.sub}</div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold">
                    {formatBRL(p.priceBRL)}
                  </span>
                  {owned ? (
                    <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
                      <IconCheck className="h-3 w-3" /> Seu
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-[#007AFF]">
                      {buying === p.id ? "…" : "Comprar"}
                    </span>
                  )}
                </div>
              </div>
            </>
          );

          if (p.href && owned) {
            return (
              <Link
                key={p.id}
                href={p.href}
                className="overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/[0.04]"
              >
                {inner}
              </Link>
            );
          }

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                if (owned && p.href) return;
                buy(p.id, p.t);
              }}
              className="overflow-hidden rounded-[14px] bg-white text-left shadow-sm ring-1 ring-black/[0.04] transition active:scale-[0.98]"
            >
              {inner}
            </button>
          );
        })}
      </div>

      <div className="mx-4 mt-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/[0.04]">
        <Link href="/library" className="flex items-center justify-between">
          <div>
            <strong className="text-[15px]">Biblioteca VOD</strong>
            <p className="mt-0.5 text-xs text-neutral-500">
              Treinos sob demanda · compra única
            </p>
          </div>
          <span className="text-sm font-semibold text-[#007AFF]">Ver</span>
        </Link>
      </div>

      <p className="px-5 pt-4 text-sm text-neutral-500">
        Assinantes têm acesso a protocolos, vídeos, Fast Trainer, corrida e
        adaptações.
      </p>
    </main>
  );
}
