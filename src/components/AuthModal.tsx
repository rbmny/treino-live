"use client";

import { useState } from "react";
import { IconClose } from "./Icons";
import { useDemoStore } from "@/lib/store";

export function AuthModal({
  open,
  onClose,
  title = "Entrar na sua conta",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
}) {
  const { signIn } = useDemoStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"magic" | "password">("magic");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 700));
    if (mode === "magic") {
      setSent(true);
      await new Promise((r) => setTimeout(r, 900));
    }
    signIn(email);
    setBusy(false);
    setSent(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
      <button className="absolute inset-0" aria-label="Fechar" onClick={onClose} />
      <div className="relative w-full max-w-md animate-in rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Demo · localStorage
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-neutral-100 p-2 text-neutral-600"
          >
            <IconClose />
          </button>
        </div>

        <div className="mb-4 flex gap-2 rounded-2xl bg-neutral-100 p-1">
          <button
            type="button"
            onClick={() => setMode("magic")}
            className={`flex-1 rounded-xl py-2 text-sm font-medium ${
              mode === "magic" ? "bg-white shadow-sm" : "text-neutral-500"
            }`}
          >
            Magic link
          </button>
          <button
            type="button"
            onClick={() => setMode("password")}
            className={`flex-1 rounded-xl py-2 text-sm font-medium ${
              mode === "password" ? "bg-white shadow-sm" : "text-neutral-500"
            }`}
          >
            E-mail + senha
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block">
            <span className="mb-1.5 block text-sm text-neutral-500">E-mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base outline-none ring-black focus:ring-2"
            />
          </label>
          {mode === "password" && (
            <label className="block">
              <span className="mb-1.5 block text-sm text-neutral-500">
                Senha (qualquer)
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-base outline-none ring-black focus:ring-2"
              />
            </label>
          )}
          <button
            type="submit"
            disabled={busy}
            className="mt-2 w-full rounded-2xl bg-black py-3.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {busy
              ? sent
                ? "Link enviado… entrando"
                : "Aguarde…"
              : mode === "magic"
                ? "Enviar magic link"
                : "Entrar"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-neutral-400">
          Demo: nenhum e-mail real é enviado. O login fica só neste dispositivo.
        </p>
      </div>
    </div>
  );
}
