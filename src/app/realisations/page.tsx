import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/Tilt";
import charm from "@/assets/photos/charm.webp";
import frenchRose from "@/assets/photos/french-rose.webp";
import frenchRougePois from "@/assets/photos/french-rouge-pois.webp";
import marbreBlanc from "@/assets/photos/marbre-blanc.webp";
import salon from "@/assets/photos/salon.webp";
import setsColores from "@/assets/photos/sets-colores.webp";
import setsPois from "@/assets/photos/sets-pois.webp";
import post2 from "@/assets/post-2.webp";
import post4 from "@/assets/post-4.webp";
import { INSTAGRAM_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Une sélection de sets réalisés au salon Spill the Glitter à Saint-Étienne : french, léopard, pois, chrome, charms 3D.",
};

type Tile = {
  alt: string;
  src: StaticImageData;
  rows: 1 | 2;
  cols: 1 | 2;
  /** Cadrage du `object-fit: cover` (classe Tailwind), si le centre ne convient pas. */
  position?: string;
};

// 15 cellules au total : la grille se remplit sans trou à 3 et à 5 colonnes.
// Le charm et le salon sont des images verticales, d'où leurs tuiles hautes.
// TODO: post-2 et post-4 sont des captures Instagram basse résolution, à remplacer.
const tiles: Tile[] = [
  { alt: "Sets longs aux designs colorés", src: setsColores, rows: 2, cols: 1 },
  { alt: "Set léopard et pois", src: setsPois, rows: 1, cols: 1 },
  { alt: "French rose sur ongles courts", src: frenchRose, rows: 1, cols: 2 },
  { alt: "Le charm Spill the Glitter", src: charm, rows: 2, cols: 1, position: "object-[55%_58%]" },
  { alt: "Set chrome étoiles", src: post4, rows: 1, cols: 1 },
  { alt: "French rouge à pois argentés", src: frenchRougePois, rows: 2, cols: 1 },
  { alt: "Le salon", src: salon, rows: 2, cols: 1, position: "object-[50%_45%]" },
  { alt: "Nail art marbré blanc et doré", src: marbreBlanc, rows: 1, cols: 2 },
  { alt: "Set french et pois", src: post2, rows: 1, cols: 1 },
];

const rowSpan = { 1: "row-span-1", 2: "row-span-2" } as const;
const colSpan = { 1: "col-span-1", 2: "col-span-2" } as const;

export default function RealisationsPage() {
  return (
    <section className="mx-auto flex max-w-[1440px] flex-col gap-12 px-page pt-[clamp(130px,16vw,190px)] pb-[clamp(80px,10vw,140px)]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h1 className="m-0 font-display text-[clamp(84px,14vw,220px)] font-normal uppercase leading-[.84]">
          <Reveal n={1} as="span" className="block">
            Les
          </Reveal>
          <Reveal n={2} as="span" className="block text-red">
            Sets
          </Reveal>
        </h1>
        <Reveal
          n={3}
          as="p"
          className="m-0 max-w-[360px] text-[17px] leading-[1.6] text-muted"
        >
          Une sélection de réalisations du salon. Survolez, ça bouge. La suite
          est sur Instagram.
        </Reveal>
      </div>

      <div className="grid auto-rows-[300px] grid-flow-dense grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-4">
        {tiles.map((t, i) => (
          <Reveal
            key={t.alt}
            n={(i % 3) + 1}
            className={`${rowSpan[t.rows]} ${colSpan[t.cols]}`}
          >
            <Tilt className="relative size-full overflow-hidden rounded-[24px] bg-surface">
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(min-width: 1440px) 480px, (min-width: 640px) 33vw, 100vw"
                className={`object-cover ${t.position ?? ""}`}
              />
            </Tilt>
          </Reveal>
        ))}
      </div>

      <Reveal n={1} className="self-center">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener"
          className="inline-block rounded-full bg-cream px-9 py-5 font-display text-[22px] uppercase tracking-[.04em] text-black transition-colors hover:bg-red hover:text-white"
        >
          Plus de sets sur Instagram ↗
        </a>
      </Reveal>
    </section>
  );
}
