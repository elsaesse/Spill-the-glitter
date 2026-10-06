import Link from "next/link";

const arrow =
  "grid size-12 place-items-center rounded-2xl bg-wine/30 text-2xl text-rose transition-colors hover:bg-wine/50";

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
    <div className="flex items-center justify-between rounded-[24px] border border-plum-line bg-plum p-2">
      <Link href={prevHref} aria-label="Période précédente" className={arrow}>
        ‹
      </Link>
      <p className="text-xl font-extrabold text-white">{label}</p>
      <Link href={nextHref} aria-label="Période suivante" className={arrow}>
        ›
      </Link>
    </div>
  );
}
