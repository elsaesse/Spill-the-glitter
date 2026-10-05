import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/Tilt";
import elsa from "@/assets/photos/elsa.webp";
import { INSTAGRAM_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Elsa, prothésiste ongulaire à Saint-Étienne : gel, semi-permanent et nail art à main levée, dans le respect de l'ongle naturel.",
};

const values = [
  {
    n: "01",
    title: "Hygiène",
    text: "Matériel stérilisé, limes à usage unique et produits professionnels pour chaque cliente.",
    style: "bg-red text-cream",
  },
  {
    n: "02",
    title: "Sur-mesure",
    text: "Une inspiration, une photo, une envie : on construit votre set ensemble.",
    style: "bg-cream text-black",
  },
  {
    n: "03",
    title: "L'ongle naturel",
    text: "Une pose qui tient sans abîmer, et des conseils pour garder de beaux ongles entre deux rendez-vous.",
    style: "bg-surface text-cream",
  },
];

export default function AProposPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1440px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(40px,6vw,96px)] px-page pt-[clamp(130px,16vw,190px)] pb-[clamp(60px,8vw,100px)]">
        <div className="flex flex-col gap-7">
          <Reveal
            n={1}
            className="origin-left -rotate-4 font-script text-[clamp(40px,5vw,64px)] leading-none text-red-bright"
          >
            Hey, moi c&apos;est
          </Reveal>
          <Reveal
            n={2}
            as="h1"
            className="m-0 font-display text-[clamp(110px,18vw,260px)] font-normal uppercase leading-[.82]"
          >
            Elsa
          </Reveal>
          <Reveal
            n={3}
            as="p"
            className="m-0 max-w-[520px] text-[18px] leading-[1.7] text-pretty text-muted"
          >
            Prothésiste ongulaire à Saint-Étienne, j&apos;ai ouvert Spill the
            Glitter pour faire de chaque rendez-vous un vrai moment à vous.
            Formée au gel, au semi-permanent et au nail art à main levée,
            j&apos;aime les designs qui ont du caractère : french revisitée,
            léopard, pois, chrome, petits charms 3D.
          </Reveal>
          <Reveal
            n={3}
            as="p"
            className="m-0 max-w-[520px] text-[18px] leading-[1.7] text-pretty text-muted"
          >
            Ici, on prend le temps de discuter de vos envies, on soigne
            l&apos;ongle naturel, et on repart avec des mains qui donnent envie
            d&apos;être regardées.
          </Reveal>
          <Reveal n={4} className="self-start">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className="border-b-2 border-red pb-1 text-sm font-extrabold uppercase tracking-[.08em] transition-colors hover:text-red-bright"
            >
              @spill_the_glitter ↗
            </a>
          </Reveal>
        </div>

        <Reveal n={2} className="relative aspect-[4/5] w-full max-w-[560px] justify-self-center">
          <Tilt className="absolute inset-0 overflow-hidden rounded-[280px_280px_28px_28px] bg-surface">
            <Image
              src={elsa}
              alt="Portrait d'Elsa"
              fill
              priority
              sizes="(min-width: 1440px) 560px, (min-width: 900px) 40vw, 90vw"
              className="object-cover"
            />
          </Tilt>
        </Reveal>
      </section>

      <section className="mx-auto flex max-w-[1440px] flex-col gap-10 px-page pt-[clamp(40px,6vw,80px)] pb-[clamp(80px,10vw,140px)]">
        <Reveal
          as="h2"
          className="m-0 font-display text-[clamp(44px,6vw,88px)] font-normal uppercase leading-[.92]"
        >
          Ce qui compte{" "}
          <span className="font-script normal-case text-red-bright">
            pour moi
          </span>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
          {values.map((v, i) => (
            <Reveal key={v.n} n={i + 1} className="h-full">
              <Tilt
                className={`flex h-full min-h-[300px] flex-col gap-[18px] rounded-[28px] p-8 ${v.style}`}
              >
                <span className="font-display text-[72px] leading-none">
                  {v.n}
                </span>
                <span className="font-display text-[34px] uppercase leading-none">
                  {v.title}
                </span>
                <span className="text-base leading-[1.6] opacity-85">
                  {v.text}
                </span>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
