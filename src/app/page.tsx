import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { BookSticker } from "@/components/BookSticker";
import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";
import logo from "@/assets/logo-charm.webp";
import frenchRose from "@/assets/photos/french-rose.webp";
import salon from "@/assets/photos/salon.webp";
import setsColores from "@/assets/photos/sets-colores.webp";
import setsPois from "@/assets/photos/sets-pois.webp";
import { INSTAGRAM_URL, PLANITY_URL, SITE_NAME } from "@/lib/site";

const teasers: {
  href: string;
  tag: string;
  title: string;
  img: StaticImageData;
}[] = [
  { href: "/a-propos", tag: "À propos", title: "Qui est Elsa ?", img: salon },
  { href: "/realisations", tag: "Réalisations", title: "Les sets", img: setsColores },
  {
    href: "/prestations",
    tag: "Prestations",
    title: "La carte & tarifs",
    img: frenchRose,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  name: SITE_NAME,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Saint-Étienne",
    postalCode: "42000",
    addressCountry: "FR",
  },
  sameAs: [INSTAGRAM_URL, PLANITY_URL],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-red px-page pt-[120px] pb-12">
        <Parallax
          speed={0.25}
          className="pointer-events-none absolute top-[12%] right-[clamp(-120px,-4vw,-40px)] aspect-square w-[clamp(300px,46vw,680px)]"
        >
          <Image
            src={logo}
            alt="Charm Spill the Glitter"
            priority
            sizes="(min-width: 1480px) 680px, 46vw"
            className="size-full rounded-full shadow-[0_40px_120px_-20px_rgba(0,0,0,.6)]"
          />
        </Parallax>

        <div className="relative z-2 flex flex-col gap-2">
          <h1 className="m-0 font-display text-[clamp(84px,17vw,280px)] font-normal uppercase leading-[.84] tracking-[-.01em] text-black">
            <Reveal n={2} as="span" className="block">
              Spill the
            </Reveal>
            <Reveal n={3} as="span" className="block text-cream">
              Glitter
            </Reveal>
          </h1>
          <Reveal n={4} className="mt-7 flex flex-wrap items-center gap-3.5">
            <a
              href={PLANITY_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-3 rounded-full bg-black px-8 py-5 text-[15px] font-extrabold uppercase tracking-[.06em] text-cream transition-colors hover:text-white"
            >
              Prendre rendez-vous ✦
            </a>
            <Link
              href="/prestations"
              className="inline-flex items-center rounded-full border-2 border-black px-8 py-5 text-[15px] font-extrabold uppercase tracking-[.06em] text-black transition-colors hover:bg-black hover:text-cream"
            >
              Les prestations
            </Link>
          </Reveal>
        </div>

        <div className="absolute right-[clamp(18px,5vw,80px)] bottom-12 z-3 size-[88px] sm:bottom-[clamp(160px,22vh,240px)] sm:size-[150px]">
          <BookSticker />
        </div>
      </section>

      {/* Bienvenue au club */}
      <section className="mx-auto flex max-w-[1440px] flex-col gap-12 px-page py-section">
        <Reveal
          as="h2"
          className="m-0 font-display text-[clamp(48px,7vw,104px)] font-normal uppercase leading-[.92]"
        >
          Bienvenue au{" "}
          <span className="font-script text-[1.05em] normal-case text-red-bright">
            club
          </span>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
          {teasers.map((t, i) => (
            <Reveal key={t.href} n={i + 1} className="h-full">
              <Link
                href={t.href}
                className="relative flex h-full min-h-[440px] flex-col justify-between gap-6 overflow-hidden rounded-[28px] bg-surface p-7 text-white"
              >
                <Image
                  src={t.img}
                  alt=""
                  fill
                  sizes="(min-width: 1440px) 460px, (min-width: 900px) 33vw, 100vw"
                  className="object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/0 from-30% to-black/85" />
                <span className="relative self-start rounded-full bg-red px-3.5 py-2 font-display text-[15px] uppercase tracking-[.1em]">
                  {t.tag}
                </span>
                <div className="relative flex items-end justify-between gap-4">
                  <span className="font-display text-[clamp(40px,4vw,56px)] uppercase leading-[.95]">
                    {t.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex size-14 flex-none items-center justify-center rounded-full bg-cream text-[22px] font-extrabold text-black"
                  >
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Press On */}
      <section className="px-page pb-[clamp(80px,10vw,140px)]">
        <Reveal className="mx-auto grid max-w-[1440px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-[clamp(32px,5vw,72px)] rounded-[32px] bg-cream bg-size-[22px_22px] bg-position-[0_0] p-[clamp(32px,5vw,72px)] text-black [background-image:radial-gradient(#0e0a0b_2.2px,transparent_2.6px)]">
          <div className="flex flex-col gap-5 rounded-[20px] bg-cream p-[clamp(20px,3vw,36px)]">
            <div className="font-script text-[44px] leading-none text-red">
              Press On
            </div>
            <h3 className="m-0 font-display text-[clamp(40px,5vw,72px)] font-normal uppercase leading-[.92]">
              Des sets faits main, à poser chez vous
            </h3>
            <p className="m-0 max-w-[460px] text-[17px] leading-relaxed text-on-cream">
              Envie de nail art sans rendez-vous ? Chaque set est créé sur
              mesure à vos tailles et réutilisable.
            </p>
            <Link
              href="/prestations?cat=press-on"
              className="self-start border-b-2 border-red pb-1 text-sm font-extrabold uppercase tracking-[.08em] text-black transition-colors hover:text-red"
            >
              Voir les tarifs →
            </Link>
          </div>
          <div className="relative aspect-square w-full max-w-[520px] justify-self-center">
            <div className="absolute inset-0 overflow-hidden rounded-full border-[6px] border-black">
              <Image
                src={setsPois}
                alt="Set de nail art léopard et pois"
                fill
                sizes="(min-width: 900px) 520px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
