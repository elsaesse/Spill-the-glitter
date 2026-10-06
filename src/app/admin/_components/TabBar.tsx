"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin", label: "Caisse", emoji: "💅" },
  { href: "/admin/historique", label: "Historique", emoji: "🧾" },
  { href: "/admin/depenses", label: "Dépenses", emoji: "🛍️" },
  { href: "/admin/bilan", label: "Bilan", emoji: "📊" },
] as const;

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation de la caisse"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line-soft bg-black/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-[14px]"
    >
      <ul className="mx-auto grid max-w-2xl grid-cols-4 gap-1 p-2">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-full px-1 py-2 font-display text-[13px] uppercase tracking-[.06em] transition-[translate,rotate,scale,background-color] duration-250 ease-[cubic-bezier(.3,1.6,.5,1)] motion-reduce:transition-none ${
                  active
                    ? "-rotate-2 scale-[1.04] bg-red text-white motion-reduce:rotate-0 motion-reduce:scale-100"
                    : "text-muted"
                }`}
              >
                <span aria-hidden className="text-[24px] leading-none">
                  {tab.emoji}
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
