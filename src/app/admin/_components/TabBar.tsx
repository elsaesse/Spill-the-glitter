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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-plum-line bg-[#14080e]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-4 gap-1 p-2">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 rounded-2xl border px-1 py-2 text-[15px] font-bold transition-colors ${
                  active
                    ? "border-plum-line bg-plum text-rose"
                    : "border-transparent text-muted"
                }`}
              >
                <span aria-hidden className="text-[28px] leading-none">
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
