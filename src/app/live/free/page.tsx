"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { freeLive } from "@/lib/data";
import { LiveBadge } from "@/components/LiveBadge";
import { UpsellSheet } from "@/components/UpsellSheet";
import { SubscribeModal } from "@/components/SubscribeModal";
import { IconClose } from "@/components/Icons";
import type { ChatMessage } from "@/types";

const MOCK_CHAT: ChatMessage[] = [
  { user: "Ana", text: "Primeira vez aqui! 💪" },
  { user: "Bruno", text: "Queima já começou" },
  { user: "Carla", text: "Som top hoje" },
  { user: "Diego", text: "Alguém do RJ?" },
  { user: "Elena", text: "Vamosooo" },
  { user: "Fábio", text: "Ricky mandando bem" },
];

const CHAT_KEY = "treino-live-free-chat";
const JOIN_KEY = "treino-live-free-joined";

function loadChat(): ChatMessage[] {
  if (typeof window === "undefined") return MOCK_CHAT.slice(0, 3);
  try {
    const raw = sessionStorage.getItem(CHAT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        const clean = parsed.filter(
          (m): m is ChatMessage =>
            !!m &&
            typeof m === "object" &&
            typeof (m as ChatMessage).user === "string" &&
            typeof (m as ChatMessage).text === "string"
        );
        if (clean.length) return clean;
      }
    }
  } catch {
    /* ignore */
  }
  return MOCK_CHAT.slice(0, 3);
}

function saveChat(messages: ChatMessage[]) {
  try {
    sessionStorage.setItem(CHAT_KEY, JSON.stringify(messages));
  } catch {
    /* ignore */
  }
}

export default function FreeLivePage() {
  const [viewers, setViewers] = useState(freeLive.viewerCount);
  const [chat, setChat] = useState<ChatMessage[]>(MOCK_CHAT.slice(0, 3));
  const [upsell, setUpsell] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [msg, setMsg] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const existing = loadChat();
    setChat(existing);

    // Join once per session → bump viewer mock
    const already = sessionStorage.getItem(JOIN_KEY);
    if (!already) {
      sessionStorage.setItem(JOIN_KEY, "1");
      setViewers((v) => v + 1);
      setJoined(true);
    } else {
      setJoined(true);
    }
  }, []);

  useEffect(() => {
    if (!joined) return;
    const t = setInterval(() => {
      setViewers((v) => Math.max(1, v + Math.floor(Math.random() * 5) - 1));
    }, 4000);
    return () => clearInterval(t);
  }, [joined]);

  useEffect(() => {
    let i = Math.max(3, chat.length);
    const t = setInterval(() => {
      if (i < MOCK_CHAT.length) {
        setChat((c) => {
          const incoming = MOCK_CHAT[i];
          if (!incoming) return c;
          // don't re-add if user already has longer session chat
          if (
            c.some(
              (m) =>
                m &&
                m.user === incoming.user &&
                m.text === incoming.text
            )
          ) {
            i += 1;
            return c;
          }
          const next = [...c, incoming];
          saveChat(next);
          i += 1;
          return next;
        });
      }
    }, 3500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joined]);

  useEffect(() => {
    const t = setTimeout(() => setUpsell(true), 12000);
    return () => clearTimeout(t);
  }, []);

  function sendChat(e: React.FormEvent) {
    e.preventDefault();
    if (!msg.trim()) return;
    setChat((c) => {
      const next = [...c, { user: "Você", text: msg.trim() }];
      saveChat(next);
      return next;
    });
    setMsg("");
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-neutral-950 text-white">
      <div
        className={`relative aspect-[9/14] max-h-[58dvh] w-full bg-gradient-to-br ${freeLive.gradient}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
        <svg
          className="absolute inset-0 m-auto h-40 w-40 text-white/25"
          viewBox="0 0 120 120"
          fill="currentColor"
        >
          <circle cx="60" cy="28" r="14" />
          <path d="M40 110l12-40 16 12 18-36M52 70l-10-22 22-4" />
        </svg>

        <div className="absolute left-4 top-4 right-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full bg-black/35 p-2 backdrop-blur"
            >
              <IconClose className="h-4 w-4" />
            </Link>
            <LiveBadge />
          </div>
          <div className="rounded-full bg-black/35 px-3 py-1.5 text-xs font-medium backdrop-blur">
            {viewers.toLocaleString("pt-BR")} assistindo
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-medium text-white/80">{freeLive.trainer}</p>
          <h1 className="text-xl font-semibold tracking-tight">
            {freeLive.title}
          </h1>
          <p className="mt-1 text-xs text-white/75">
            Grátis · sem login · sem pagamento
            {joined ? " · você entrou" : ""}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-t-3xl bg-neutral-900 px-4 pb-6 pt-4">
        <div className="mb-3 flex gap-2">
          <button
            onClick={() => setUpsell(true)}
            className="flex-1 rounded-2xl bg-white py-2.5 text-sm font-semibold text-neutral-900"
          >
            Ver treinos pagos
          </button>
          <button
            onClick={() => setSubscribe(true)}
            className="flex-1 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2.5 text-sm font-semibold"
          >
            Assinar Premium
          </button>
        </div>

        <div className="mb-2 max-h-48 flex-1 space-y-2 overflow-y-auto">
          {chat
            .filter((c) => c && c.user && c.text)
            .map((c, idx) => (
            <div key={`${c.user}-${idx}-${c.text.slice(0, 8)}`} className="text-sm">
              <span className="font-semibold text-orange-300">{c.user}</span>{" "}
              <span className="text-white/85">{c.text}</span>
            </div>
          ))}
        </div>

        <form onSubmit={sendChat} className="flex gap-2">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Comentar (demo)…"
            className="flex-1 rounded-full bg-white/10 px-4 py-2.5 text-sm outline-none placeholder:text-white/40"
          />
          <button
            type="submit"
            className="rounded-full bg-white/15 px-4 text-sm font-medium"
          >
            Enviar
          </button>
        </form>
      </div>

      <UpsellSheet
        open={upsell}
        onClose={() => setUpsell(false)}
        onSubscribe={() => {
          setUpsell(false);
          setSubscribe(true);
        }}
      />
      <SubscribeModal open={subscribe} onClose={() => setSubscribe(false)} />
    </div>
  );
}
