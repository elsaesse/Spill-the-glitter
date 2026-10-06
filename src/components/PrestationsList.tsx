"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import type { PublicCategory } from "@/lib/catalogue";

function indexFromSlug(
  categories: PublicCategory[],
  slug: string | null | undefined,
) {
  const i = categories.findIndex((c) => c.slug === slug);
  return i === -1 ? 0 : i;
}

function Tabs({
  categories,
  initial,
}: {
  categories: PublicCategory[];
  initial: number;
}) {
  const [tab, setTab] = useState(initial);
  const [shown, setShown] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const select = (i: number) => {
    if (i === tab) return;
    setShown(false);
    window.history.replaceState(null, "", `?cat=${categories[i].slug}`);
    clearTimeout(timer.current);
    // La liste sort (200ms), puis les nouvelles lignes entrent en cascade.
    timer.current = setTimeout(() => {
      setTab(i);
      requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    }, 200);
  };

  const category = categories[tab];

  return (
    <>
      <div
        role="tablist"
        aria-label="Catégories de prestations"
        className="flex flex-wrap gap-2"
      >
        {categories.map((c, i) => {
          const active = i === tab;
          return (
            <button
              key={c.slug}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => select(i)}
              className={`cursor-pointer rounded-full border-[1.5px] px-5.5 py-3 font-display text-lg uppercase tracking-[.04em] text-cream transition-[translate,rotate,scale,background-color] duration-250 ease-[cubic-bezier(.3,1.6,.5,1)] motion-reduce:transition-none ${
                active
                  ? "border-red bg-red -rotate-3 scale-[1.06] motion-reduce:rotate-0 motion-reduce:scale-100"
                  : "border-chip bg-transparent"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="flex flex-col border-t border-line"
      >
        {category.items.map((it, i) => (
          <div
            key={it.id}
            style={{ transitionDelay: shown ? `${i * 0.07}s` : "0s" }}
            className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 border-b border-line px-1.5 py-[22px] transition-[opacity,transform,background-color] duration-500 hover:bg-surface motion-reduce:transition-none ${
              shown
                ? "opacity-100"
                : "-translate-x-[30px] -rotate-1 opacity-0 motion-reduce:translate-x-0 motion-reduce:rotate-0 motion-reduce:opacity-100"
            }`}
          >
            <div className="font-display text-[clamp(26px,3vw,38px)] uppercase leading-[1.05]">
              {it.name}
            </div>
            <div className="font-display text-[clamp(26px,3vw,38px)] whitespace-nowrap text-red-bright">
              {it.price}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function TabsFromUrl({ categories }: { categories: PublicCategory[] }) {
  const cat = useSearchParams().get("cat");
  // `key` : si on arrive d'un lien « ?cat=… » alors qu'on est déjà sur la page.
  return (
    <Tabs
      key={cat}
      categories={categories}
      initial={indexFromSlug(categories, cat)}
    />
  );
}

export function PrestationsList({
  categories,
}: {
  categories: PublicCategory[];
}) {
  if (categories.length === 0) {
    return (
      <p className="border-t border-line pt-8 text-subtle">
        La carte arrive bientôt. En attendant, tous les soins et les créneaux
        disponibles sont sur Planity.
      </p>
    );
  }

  return (
    <Suspense fallback={<Tabs categories={categories} initial={0} />}>
      <TabsFromUrl categories={categories} />
    </Suspense>
  );
}
