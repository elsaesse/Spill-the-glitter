// Styles partagés de l'admin, alignés sur la vitrine : Anton en capitales,
// script Yellowtail penché, pastilles à bordure fine, cartes `surface`.

export const cardClass = "rounded-[28px] bg-surface p-6";

export const titleClass =
  "font-display text-[clamp(32px,7vw,44px)] uppercase leading-[.95]";

/** Petit mot en script rouge, penché, au-dessus d'un titre. */
export const scriptClass =
  "origin-left -rotate-3 font-script text-[34px] leading-none text-red-bright";

export const fieldClass =
  "w-full rounded-2xl border border-line bg-black px-5 py-4 text-[17px] text-cream [color-scheme:dark] outline-none transition-colors placeholder:text-subtle focus:border-red-bright";

export const labelClass =
  "mb-2.5 block text-[13px] font-extrabold uppercase tracking-[.12em] text-subtle";

export const primaryButtonClass =
  "w-full cursor-pointer rounded-full bg-red px-8 py-5 font-display text-xl uppercase tracking-[.06em] text-white transition-colors hover:bg-red-hover disabled:opacity-60";

export const pillClass =
  "inline-block rounded-full border-[1.5px] border-chip px-4 py-2 text-[14px] font-semibold text-muted";

/** Pastille : celle sélectionnée s'incline comme les onglets de la vitrine. */
export function chipClass(selected: boolean) {
  return `inline-flex cursor-pointer items-center gap-2 rounded-full border-[1.5px] px-5 py-2.5 font-display text-[17px] uppercase tracking-[.04em] text-cream transition-[translate,rotate,scale,background-color,border-color] duration-250 ease-[cubic-bezier(.3,1.6,.5,1)] motion-reduce:transition-none ${
    selected
      ? "-rotate-2 scale-[1.05] border-red bg-red motion-reduce:rotate-0 motion-reduce:scale-100"
      : "border-chip bg-transparent hover:border-red-bright"
  }`;
}
