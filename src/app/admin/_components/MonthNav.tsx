import Link from "next/link";

const arrow =
  "grid size-12 place-items-center rounded-full bg-red text-2xl font-extrabold text-white transition-colors hover:bg-red-hover";

export function MonthNav({
  label,
  prevHref,
  nextHref,
}: {
  label: string;
  prevHref: string;
  nextHref: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-full border-[1.5px] border-chip p-1.5">
      <Link href={prevHref} aria-label="Période précédente" className={arrow}>
        ‹
      </Link>
      <p className="font-display text-[26px] tracking-[.04em] text-cream uppercase">
        {label}
      </p>
      <Link href={nextHref} aria-label="Période suivante" className={arrow}>
        ›
      </Link>
    </div>
  );
}
