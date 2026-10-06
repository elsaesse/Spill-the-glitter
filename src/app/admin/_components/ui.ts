export const cardClass =
  "rounded-[28px] border border-plum-line bg-plum p-5 shadow-[0_10px_40px_rgb(0_0_0/0.35)]";

export const fieldClass =
  "w-full rounded-2xl border border-plum-line bg-plum-field px-5 py-4 text-[17px] text-cream outline-none transition-colors placeholder:text-subtle focus:border-rose";

export const labelClass = "mb-2 block text-[15px] font-semibold text-blush/80";

export const primaryButtonClass =
  "w-full rounded-2xl bg-wine px-6 py-4 text-lg font-extrabold text-white shadow-[0_8px_24px_rgb(143_26_60/0.5)] transition-colors hover:bg-wine-hover disabled:opacity-60";

export function chipClass(selected: boolean) {
  return `inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[16px] transition-colors ${
    selected
      ? "border-rose bg-wine/60 text-white"
      : "border-plum-line bg-plum-field text-cream hover:border-rose/60"
  }`;
}
