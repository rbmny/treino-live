"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type ToastCtx = { toast: (msg: string) => void };

const Ctx = createContext<ToastCtx>({ toast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((m: string) => {
    setMsg(m);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 2200);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <div
        className={`pointer-events-none fixed bottom-24 left-1/2 z-[60] max-w-[min(90vw,20rem)] -translate-x-1/2 rounded-2xl bg-neutral-900/95 px-4 py-2.5 text-center text-sm font-medium text-white shadow-lg transition ${
          msg ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        role="status"
      >
        {msg}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  return useContext(Ctx);
}
