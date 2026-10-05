import type { Metadata } from "next";
import { PrestationsList } from "@/components/PrestationsList";
import { Reveal } from "@/components/Reveal";
import { PLANITY_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prestations",
  description:
    "La carte et les tarifs de Spill the Glitter à Saint-Étienne : mains, pieds, nail art, press-on et make up. Réservation sur Planity.",
};

export default function PrestationsPage() {
  return (
    <section className="mx-auto flex max-w-[1180px] flex-col gap-11 px-page pt-[clamp(130px,16vw,190px)] pb-[clamp(80px,10vw,140px)]">
      <div className="flex flex-col gap-3">
        <Reveal
          n={1}
          className="origin-left -rotate-4 font-script text-[clamp(36px,4.5vw,56px)] leading-none text-red-bright"
        >
          la carte
        </Reveal>
        <Reveal
          n={2}
          as="h1"
          className="m-0 font-display text-[clamp(72px,12vw,180px)] font-normal uppercase leading-[.84]"
        >
          Prestations
        </Reveal>
      </div>

      <Reveal n={3} className="flex flex-col gap-11">
        <PrestationsList />
      </Reveal>

      <Reveal
        n={1}
        className="flex flex-wrap items-center justify-between gap-5 rounded-[28px] bg-red px-8 py-7"
      >
        <span className="max-w-[520px] text-base font-semibold">
          Tarifs donnés à titre indicatif. Le détail et les créneaux
          disponibles sont sur Planity.
        </span>
        <a
          href={PLANITY_URL}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-black px-7 py-4 font-display text-xl uppercase tracking-[.04em] text-white"
        >
          Réserver ce soin →
        </a>
      </Reveal>
    </section>
  );
}
