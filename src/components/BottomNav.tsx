"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconLibrary, IconLive, IconUser } from "./Icons";

const items = [
  { href: "/", label: "Descobrir", icon: IconHome },
  { href: "/library", label: "Biblioteca", icon: IconLibrary },
  { href: "/live/premium", label: "Premium", icon: IconLive },
  { href: "/account", label: "Conta", icon: IconUser },
];

export function BottomNav() {
  const pathname = usePathname();
  const hide =
    pathname?.startsWith("/live/free") || pathname?.startsWith("/trainer");

  if (hide) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/5 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)] pt-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-w-[4.5rem] flex-col items-center gap-0.5 rounded-2xl px-3 py-2 text-[11px] font-medium transition ${
                active ? "text-black" : "text-neutral-400"
              }`}
            >
              <Icon className={`h-6 w-6 ${active ? "opacity-100" : "opacity-70"}`} />
              <span>{label}</span>
              {active && (
                <span className="mt-0.5 h-1 w-1 rounded-full bg-black" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
