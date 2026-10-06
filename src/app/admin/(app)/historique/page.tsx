import { HistoryList } from "../../_components/HistoryList";
import { MonthNav } from "../../_components/MonthNav";
import {
  currentMonth,
  formatMonth,
  isValidMonth,
  monthRange,
  shiftMonth,
} from "@/lib/caisse/dates";
import { getSales } from "@/lib/caisse/queries";

export default async function HistoriquePage({
  searchParams,
}: {
  searchParams: Promise<{ m?: string }>;
}) {
  const { m } = await searchParams;
  const month = isValidMonth(m) ? m : currentMonth();
  const sales = await getSales(...monthRange(month));

  return (
    <>
      <MonthNav
        label={formatMonth(month)}
        prevHref={`/admin/historique?m=${shiftMonth(month, -1)}`}
        nextHref={`/admin/historique?m=${shiftMonth(month, 1)}`}
      />
      {/* key : repart d'une recherche vide quand on change de mois */}
      <HistoryList key={month} sales={sales} />
    </>
  );
}
