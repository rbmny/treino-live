"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome,
  IconLive,
  IconUser,
  IconDumbbell,
  IconBag,
} from "./Icons";

const items = [
  { href: "/", label: "Início", icon: IconHome },
  { href: "/treinos", label: "Treinos", icon: IconDumbbell },
  { href: "/live/free", label: "Live", icon: IconLive },
  { href: "/loja", label: "Loja", icon: IconBag },
  { href: "/account", label: "Perfil", icon: IconUser },
];

export function BottomNav() {
  const pathname = usePathname();
  const hide =
    pathname?.startsWith("/live/free") || pathname?.startsWith("/trainer");

  if (hide) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/5 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)] pt-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : href === "/live/free"
                ? pathname?.startsWith("/live")
                : pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-w-[3.6rem] flex-col items-center gap-0.5 rounded-2xl px-2 py-2 text-[10px] font-medium transition ${
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
