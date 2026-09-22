"use client";

import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#f5f5f7] text-neutral-900">
      <div className="mx-auto min-h-dvh max-w-md bg-[#f5f5f7] pb-24 shadow-[0_0_80px_rgba(0,0,0,0.04)]">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
