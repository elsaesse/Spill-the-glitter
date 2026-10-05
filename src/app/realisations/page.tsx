import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/Tilt";
import post1 from "@/assets/post-1.webp";
import post2 from "@/assets/post-2.webp";
import post3 from "@/assets/post-3.webp";
import post4 from "@/assets/post-4.webp";
import { INSTAGRAM_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Une sélection de sets réalisés au salon Spill the Glitter à Saint-Étienne : french, léopard, pois, chrome, charms 3D.",
};

type Tile = {
  label: string;
  /** Photo à fournir : tant que `src` est absent, la tuile affiche son libellé. */
  src?: StaticImageData;
  rows: 1 | 2;
  cols: 1 | 2;
};

const tiles: Tile[] = [
  { label: "Set french & pois", src: post2, rows: 2, cols: 1 },
  { label: "Set léopard & pois", src: post3, rows: 1, cols: 1 },
  { label: "Chrome étoiles", src: post4, rows: 1, cols: 2 },
  { label: "Le salon", src: post1, rows: 1, cols: 1 },
  { label: "IMG_2700", rows: 1, cols: 1 },
  { label: "IMG_2754", rows: 2, cols: 1 },
  { label: "IMG_2800", rows: 1, cols: 1 },
  { label: "IMG_2857", rows: 1, cols: 2 },
  { label: "IMG_2915", rows: 1, cols: 1 },
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
            key={t.label}
            n={(i % 3) + 1}
            className={`${rowSpan[t.rows]} ${colSpan[t.cols]}`}
          >
            <Tilt className="relative size-full overflow-hidden rounded-[24px] bg-surface">
              {t.src ? (
                <Image
                  src={t.src}
                  alt={t.label}
                  fill
                  sizes="(min-width: 1440px) 480px, (min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              ) : (
                // TODO: remplacer par la photo HD (fichier HEIC à convertir en WebP).
                <div className="flex size-full items-center justify-center p-6 text-center font-script text-3xl text-subtle">
                  {t.label}
                </div>
              )}
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
