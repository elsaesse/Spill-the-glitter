import { ExpenseForm } from "../../_components/ExpenseForm";
import { MonthNav } from "../../_components/MonthNav";
import { ExpenseRow, listClass } from "../../_components/Rows";
import {
  cardClass,
  pillClass,
  scriptClass,
  titleClass,
} from "../../_components/ui";
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
        <p className={scriptClass}>ce qui sort</p>
        <h2 className={`${titleClass} mt-2`}>Dépenses</h2>
        <p className={`${pillClass} mt-4`}>
          {expenses.length} dépense{expenses.length > 1 ? "s" : ""} ·{" "}
          <strong className="text-cream">{formatEuros(total)}</strong>
        </p>
        {expenses.length === 0 ? (
          <p className="mt-8 text-center text-subtle">Aucune dépense ce mois-ci.</p>
        ) : (
          <ul className={`${listClass} mt-5`}>
            {expenses.map((expense) => (
              <ExpenseRow key={expense.id} expense={expense} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
