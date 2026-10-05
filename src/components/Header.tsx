"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-charm.webp";
import { NAV_LINKS, PLANITY_URL, RED_PAGES, SITE_NAME } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY <= 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Le menu plein écran ne doit pas rester ouvert si on repasse en desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const onRed = RED_PAGES.includes(pathname) && atTop && !menuOpen;
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-60 flex items-center justify-between gap-3 px-page py-4 sm:gap-5 transition-[background,backdrop-filter] duration-400 ${
          atTop ? "bg-transparent" : "bg-black/82 backdrop-blur-[14px]"
        }`}
      >
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2.5 sm:gap-3">
          <Image
            src={logo}
            alt=""
            width={44}
            height={44}
            className="size-11 rounded-full"
          />
          <span
            className={`font-script text-[22px] leading-none whitespace-nowrap transition-colors sm:text-[30px] duration-300 ${
              onRed ? "text-cream" : "text-red-bright"
            }`}
          >
            {SITE_NAME}
          </span>
        </Link>

        <nav className="flex items-center gap-1.5" aria-label="Navigation principale">
          <div className="hidden items-center gap-1.5 min-[900px]:flex">
            {NAV_LINKS.filter((l) => l.href !== "/reserver").map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2.5 text-[13px] font-bold uppercase tracking-[.12em] transition-[background,color] duration-250 hover:bg-cream hover:text-black ${
                    active ? "bg-cream text-black" : "text-cream"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <a
            href={PLANITY_URL}
            target="_blank"
            rel="noopener"
            className={`ml-1 rounded-full px-4 py-2.5 font-display text-[15px] sm:ml-2 sm:px-5.5 sm:py-[11px] sm:text-[17px] uppercase tracking-[.04em] text-white transition-colors duration-300 hover:text-white ${
              onRed || menuOpen ? "bg-black" : "bg-red hover:bg-red-hover"
            }`}
          >
            Réserver
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="ml-1.5 size-[46px] cursor-pointer rounded-full border-[1.5px] border-cream bg-transparent font-display text-[13px] text-cream min-[900px]:hidden"
          >
            {menuOpen ? "FERMER" : "MENU"}
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-55 flex flex-col justify-center gap-1 bg-red px-7 pt-25 pb-10">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              className="font-display text-[clamp(52px,14vw,96px)] uppercase leading-[1.05] text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
