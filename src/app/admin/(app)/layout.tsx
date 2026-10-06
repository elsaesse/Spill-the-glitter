import type { ReactNode } from "react";
import { AppHeader } from "../_components/AppHeader";
import { TabBar } from "../_components/TabBar";
import { formatLongDate, todayParis } from "@/lib/caisse/dates";
import { getSales } from "@/lib/caisse/queries";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const today = todayParis();
  const sales = await getSales(today, nextDay(today)).catch(() => []);

  return (
    <div className="mx-auto min-h-dvh max-w-2xl pb-32">
      <AppHeader
        date={formatLongDate(today)}
        todayCents={sales.reduce((sum, s) => sum + s.amount_cents, 0)}
        todayCount={sales.length}
      />
      <div className="space-y-4 px-4 pt-4">{children}</div>
      <TabBar />
    </div>
  );
}

function nextDay(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}
