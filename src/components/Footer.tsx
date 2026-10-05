import Link from "next/link";
import { INSTAGRAM_URL, NAV_LINKS, PLANITY_URL, SITE_NAME } from "@/lib/site";

const linkClass = "transition-colors hover:text-red-bright";

export function Footer() {
  return (
    <>
      <div className="h-px bg-line-soft" />
      <footer className="mx-auto flex max-w-[1440px] flex-col gap-10 px-page pt-14 pb-10">
        <div className="animate-stg-neon font-script text-[clamp(64px,12vw,180px)] leading-none text-red-bright">
          {SITE_NAME}
        </div>
        <div className="flex flex-wrap justify-between gap-5 text-sm text-subtle">
          <nav className="flex flex-wrap gap-6" aria-label="Pied de page">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap gap-6">
            <span>Saint-Étienne (42000)</span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className={linkClass}
            >
              Instagram ↗
            </a>
            <a
              href={PLANITY_URL}
              target="_blank"
              rel="noopener"
              className={linkClass}
            >
              Planity ↗
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
