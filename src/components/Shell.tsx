"use client";

import { BottomNav } from "./BottomNav";
import { ToastProvider } from "./Toast";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-dvh bg-[#F2F2F7] text-neutral-900">
        <div className="mx-auto min-h-dvh max-w-[430px] bg-[#F2F2F7] pb-24 shadow-[0_0_80px_rgba(0,0,0,0.04)]">
          {children}
        </div>
        <BottomNav />
      </div>
    </ToastProvider>
  );
}
