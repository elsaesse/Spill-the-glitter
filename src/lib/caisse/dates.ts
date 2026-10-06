// Toutes les dates métier sont des "YYYY-MM-DD" / "YYYY-MM" en heure de Paris.

const TZ = "Europe/Paris";

export function todayParis(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
}

export function currentMonth(): string {
  return todayParis().slice(0, 7);
}

export function isValidDate(s: unknown): s is string {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

export function isValidMonth(s: unknown): s is string {
  return typeof s === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(s);
}

export function isValidYear(s: unknown): s is string {
  return typeof s === "string" && /^\d{4}$/.test(s);
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function fmt(iso: string, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("fr-FR", { ...opts, timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

/** "Lundi 28 septembre" */
export function formatLongDate(iso: string): string {
  return cap(fmt(iso, { weekday: "long", day: "numeric", month: "long" }));
}

/** "Septembre 2026" */
export function formatMonth(month: string): string {
  return cap(fmt(`${month}-01`, { month: "long", year: "numeric" }));
}

/** "Sept." */
export function formatMonthShort(month: string): string {
  return cap(fmt(`${month}-01`, { month: "short" }));
}

export function shiftMonth(month: string, delta: number): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return d.toISOString().slice(0, 7);
}

/** Bornes [début, fin[ d'un mois, pour `.gte().lt()`. */
export function monthRange(month: string): [string, string] {
  return [`${month}-01`, `${shiftMonth(month, 1)}-01`];
}

export function yearRange(year: string): [string, string] {
  return [`${year}-01-01`, `${Number(year) + 1}-01-01`];
}
