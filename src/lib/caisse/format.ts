const eur = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function formatEuros(cents: number): string {
  return eur.format(cents / 100);
}

/** "65", "65,5" ou "65.50 €" → centimes ; null si invalide. */
export function parseEuros(input: string): number | null {
  const clean = input.replace(/[\s€]/g, "").replace(",", ".");
  if (!/^\d{1,6}(\.\d{1,2})?$/.test(clean)) return null;
  return Math.round(parseFloat(clean) * 100);
}

/** Centimes → valeur pour un champ de saisie ("65" ou "65,50"). */
export function centsToInput(cents: number): string {
  const s = (cents / 100).toFixed(2).replace(".", ",");
  return s.endsWith(",00") ? s.slice(0, -3) : s;
}

/** "65 €", "25,50 €" ou "dès 85 €" : sans les centimes inutiles. */
export function formatPrice(cents: number, isFrom = false): string {
  return `${isFrom ? "dès " : ""}${formatEuros(cents).replace(",00", "")}`;
}
