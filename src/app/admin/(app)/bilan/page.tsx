import Link from "next/link";
import { MonthNav } from "../../_components/MonthNav";
import { cardClass } from "../../_components/ui";
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

  return (
    <>
      <div className="grid grid-cols-2 gap-1 rounded-[24px] border border-plum-line bg-plum p-1.5 text-center text-xl font-bold">
        <Link
          href={href("mois", isYear ? (year === nowMonth.slice(0, 4) ? nowMonth : `${year}-01`) : period)}
          className={`rounded-[18px] py-3.5 ${!isYear ? "bg-plum-field text-white" : "text-muted"}`}
        >
          Mois
        </Link>
        <Link
          href={href("annee", year)}
          className={`rounded-[18px] py-3.5 ${isYear ? "bg-plum-field text-white" : "text-muted"}`}
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
        <p className="text-xl font-bold text-blush">💰 Encaissé</p>
        <p className="mt-1 text-[40px] leading-tight font-extrabold text-white">
          {formatEuros(revenue)}
        </p>
        <p className="text-[17px] text-muted">
          {sales.length} prestation{sales.length > 1 ? "s" : ""} · panier moyen{" "}
          {formatEuros(basket)}
        </p>
      </section>

      <section className={cardClass}>
        <p className="text-xl font-bold text-blush">🛍️ Dépenses</p>
        <p className="mt-1 text-[40px] leading-tight font-extrabold text-white">
          {formatEuros(spent)}
        </p>
        <p className="text-[17px] text-muted">
          {expenses.length} dépense{expenses.length > 1 ? "s" : ""}
        </p>
      </section>

      <section className="zebra rounded-[28px] p-5 shadow-[0_10px_40px_rgb(0_0_0/0.35)]">
        <p className="text-xl font-bold text-white">✨ Résultat</p>
        <p className="mt-1 text-[44px] leading-tight font-extrabold text-white">
          {formatEuros(result)}
        </p>
        <p className="text-[17px] text-white/85">Encaissé − dépenses</p>
      </section>

      {isYear && (
        <section className={cardClass}>
          <h2 className="text-[22px] font-extrabold text-white">Mois par mois</h2>
          <ul className="mt-4 space-y-3">
            {months.map((m) => (
              <li key={m.key}>
                <div className="flex items-baseline justify-between text-[16px]">
                  <span className="font-bold text-white">{formatMonthShort(m.key)}</span>
                  <span className={m.result < 0 ? "text-blush" : "text-mint"}>
                    {formatEuros(m.result)}
                  </span>
                </div>
                <Bar value={m.revenue} max={maxMonth} className="bg-mint" />
                <Bar value={m.spent} max={maxMonth} className="bg-rose" />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            <span className="text-mint">■</span> encaissé ·{" "}
            <span className="text-rose">■</span> dépenses
          </p>
        </section>
      )}

      {byMethod.length > 0 && (
        <section className={cardClass}>
          <h2 className="text-[22px] font-extrabold text-white">Par moyen de paiement</h2>
          <ul className="mt-4 space-y-3">
            {byMethod.map((m) => (
              <li key={m.value}>
                <div className="flex justify-between text-[16px]">
                  <span>{m.emoji} {m.label}</span>
                  <span className="font-bold text-white">{formatEuros(m.cents)}</span>
                </div>
                <Bar value={m.cents} max={revenue} className="bg-mint" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {byCategory.length > 0 && (
        <section className={cardClass}>
          <h2 className="text-[22px] font-extrabold text-white">Dépenses par catégorie</h2>
          <ul className="mt-4 space-y-3">
            {byCategory.map((c) => (
              <li key={c.value}>
                <div className="flex justify-between text-[16px]">
                  <span>{c.emoji} {c.label}</span>
                  <span className="font-bold text-white">{formatEuros(c.cents)}</span>
                </div>
                <Bar value={c.cents} max={spent} className="bg-rose" />
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
    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-plum-field">
      <div className={`h-full rounded-full ${className}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
