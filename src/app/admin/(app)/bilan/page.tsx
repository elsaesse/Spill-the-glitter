import Link from "next/link";
import { MonthNav } from "../../_components/MonthNav";
import {
  cardClass,
  chipClass,
  scriptClass,
  titleClass,
} from "../../_components/ui";
import {
  EXPENSE_CATEGORIES,
  PAYMENT_METHODS,
} from "@/lib/caisse/constants";
import {
  currentMonth,
  formatMonth,
  formatMonthShort,
  isValidMonth,
  isValidYear,
  monthRange,
  shiftMonth,
  yearRange,
} from "@/lib/caisse/dates";
import { formatEuros } from "@/lib/caisse/format";
import { getExpenses, getSales } from "@/lib/caisse/queries";

type SP = { view?: string; p?: string };

export default async function BilanPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const nowMonth = currentMonth();
  const isYear = sp.view === "annee";

  const period = isYear
    ? isValidYear(sp.p) ? sp.p : nowMonth.slice(0, 4)
    : isValidMonth(sp.p) ? sp.p : nowMonth;

  const [from, to] = isYear ? yearRange(period) : monthRange(period);
  const [sales, expenses] = await Promise.all([
    getSales(from, to),
    getExpenses(from, to),
  ]);

  const revenue = sum(sales.map((s) => s.amount_cents));
  const spent = sum(expenses.map((e) => e.amount_cents));
  const result = revenue - spent;
  const basket = sales.length ? Math.round(revenue / sales.length) : 0;

  const byMethod = PAYMENT_METHODS.map((m) => ({
    ...m,
    cents: sum(sales.filter((s) => s.payment_method === m.value).map((s) => s.amount_cents)),
  })).filter((m) => m.cents > 0);

  const byCategory = EXPENSE_CATEGORIES.map((c) => ({
    ...c,
    cents: sum(expenses.filter((e) => e.category === c.value).map((e) => e.amount_cents)),
  })).filter((c) => c.cents > 0);

  const months = isYear
    ? Array.from({ length: 12 }, (_, i) => {
        const key = `${period}-${String(i + 1).padStart(2, "0")}`;
        const r = sum(sales.filter((s) => s.sold_on.startsWith(key)).map((s) => s.amount_cents));
        const d = sum(expenses.filter((e) => e.spent_on.startsWith(key)).map((e) => e.amount_cents));
        return { key, revenue: r, spent: d, result: r - d };
      })
    : [];
  const maxMonth = Math.max(1, ...months.map((m) => Math.max(m.revenue, m.spent)));

  const href = (view: "mois" | "annee", p: string) =>
    `/admin/bilan?view=${view}&p=${p}`;
  const year = period.slice(0, 4);

  const monthHref = href(
    "mois",
    isYear ? (year === nowMonth.slice(0, 4) ? nowMonth : `${year}-01`) : period,
  );

  return (
    <>
      <div role="tablist" aria-label="Période du bilan" className="flex gap-2">
        <Link
          href={monthHref}
          role="tab"
          aria-selected={!isYear}
          className={`${chipClass(!isYear)} flex-1 justify-center`}
        >
          Mois
        </Link>
        <Link
          href={href("annee", year)}
          role="tab"
          aria-selected={isYear}
          className={`${chipClass(isYear)} flex-1 justify-center`}
        >
          Année
        </Link>
      </div>

      <MonthNav
        label={isYear ? period : formatMonth(period)}
        prevHref={href(isYear ? "annee" : "mois", isYear ? String(Number(period) - 1) : shiftMonth(period, -1))}
        nextHref={href(isYear ? "annee" : "mois", isYear ? String(Number(period) + 1) : shiftMonth(period, 1))}
      />

      <section className={cardClass}>
        <p className={scriptClass}>encaissé</p>
        <p className="mt-3 font-display text-[clamp(56px,17vw,88px)] leading-[.9] text-cream">
          {formatEuros(revenue)}
        </p>
        <p className="mt-3 text-[16px] text-subtle">
          {sales.length} prestation{sales.length > 1 ? "s" : ""} · panier moyen{" "}
          {formatEuros(basket)}
        </p>
      </section>

      <section className={cardClass}>
        <p className={scriptClass}>dépenses</p>
        <p className="mt-3 font-display text-[clamp(56px,17vw,88px)] leading-[.9] text-cream">
          {formatEuros(spent)}
        </p>
        <p className="mt-3 text-[16px] text-subtle">
          {expenses.length} dépense{expenses.length > 1 ? "s" : ""}
        </p>
      </section>

      <section className="rounded-[28px] bg-red p-6">
        <p className="origin-left -rotate-3 font-script text-[34px] leading-none text-black">
          résultat
        </p>
        <p className="mt-3 font-display text-[clamp(64px,19vw,104px)] leading-[.88] text-cream">
          {formatEuros(result)}
        </p>
        <p className="mt-3 text-[16px] font-semibold text-black">
          Encaissé − dépenses
        </p>
      </section>

      {isYear && (
        <section className={cardClass}>
          <h2 className={titleClass}>Mois par mois</h2>
          <ul className="mt-5 border-t border-line">
            {months.map((m) => (
              <li key={m.key} className="border-b border-line px-1.5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[22px] tracking-[.04em] uppercase">
                    {formatMonthShort(m.key)}
                  </span>
                  <span
                    className={`font-display text-[22px] ${m.result < 0 ? "text-red-bright" : "text-gold"}`}
                  >
                    {formatEuros(m.result)}
                  </span>
                </div>
                <Bar value={m.revenue} max={maxMonth} className="bg-gold" />
                <Bar value={m.spent} max={maxMonth} className="bg-red" />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-subtle">
            <span className="text-gold">■</span> encaissé ·{" "}
            <span className="text-red-bright">■</span> dépenses
          </p>
        </section>
      )}

      {byMethod.length > 0 && (
        <section className={cardClass}>
          <h2 className={titleClass}>Par moyen de paiement</h2>
          <ul className="mt-5 space-y-4">
            {byMethod.map((m) => (
              <li key={m.value}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[16px] text-muted">
                    {m.emoji} {m.label}
                  </span>
                  <span className="font-display text-[22px] text-cream">
                    {formatEuros(m.cents)}
                  </span>
                </div>
                <Bar value={m.cents} max={revenue} className="bg-gold" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {byCategory.length > 0 && (
        <section className={cardClass}>
          <h2 className={titleClass}>Dépenses par catégorie</h2>
          <ul className="mt-5 space-y-4">
            {byCategory.map((c) => (
              <li key={c.value}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[16px] text-muted">
                    {c.emoji} {c.label}
                  </span>
                  <span className="font-display text-[22px] text-cream">
                    {formatEuros(c.cents)}
                  </span>
                </div>
                <Bar value={c.cents} max={spent} className="bg-red" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function sum(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}

function Bar({
  value,
  max,
  className,
}: {
  value: number;
  max: number;
  className: string;
}) {
  const pct = max > 0 ? Math.max(value > 0 ? 2 : 0, (value / max) * 100) : 0;
  return (
    <div className="mt-2 h-2 overflow-hidden rounded-full bg-black">
      <div className={`h-full rounded-full ${className}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
