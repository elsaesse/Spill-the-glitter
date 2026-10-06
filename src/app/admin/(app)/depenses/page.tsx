import { ExpenseForm } from "../../_components/ExpenseForm";
import { MonthNav } from "../../_components/MonthNav";
import { ExpenseRow } from "../../_components/Rows";
import { cardClass } from "../../_components/ui";
import {
  currentMonth,
  formatMonth,
  isValidMonth,
  monthRange,
  shiftMonth,
  todayParis,
} from "@/lib/caisse/dates";
import { formatEuros } from "@/lib/caisse/format";
import { getExpenses } from "@/lib/caisse/queries";

export default async function DepensesPage({
  searchParams,
}: {
  searchParams: Promise<{ m?: string }>;
}) {
  const { m } = await searchParams;
  const month = isValidMonth(m) ? m : currentMonth();
  const expenses = await getExpenses(...monthRange(month));
  const total = expenses.reduce((sum, e) => sum + e.amount_cents, 0);

  return (
    <>
      <ExpenseForm today={todayParis()} />

      <MonthNav
        label={formatMonth(month)}
        prevHref={`/admin/depenses?m=${shiftMonth(month, -1)}`}
        nextHref={`/admin/depenses?m=${shiftMonth(month, 1)}`}
      />

      <section className={cardClass}>
        <h2 className="text-[26px] font-extrabold text-white">Dépenses</h2>
        <p className="mt-3 inline-block rounded-full border border-plum-line bg-plum-field px-4 py-2 text-[15px] text-muted">
          {expenses.length} dépense{expenses.length > 1 ? "s" : ""} ·{" "}
          <strong className="text-white">{formatEuros(total)}</strong>
        </p>
        {expenses.length === 0 ? (
          <p className="mt-5 text-center text-muted">Aucune dépense ce mois-ci.</p>
        ) : (
          <ul className="mt-5 space-y-2.5">
            {expenses.map((expense) => (
              <ExpenseRow key={expense.id} expense={expense} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
