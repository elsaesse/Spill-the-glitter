"use client";

import { useState } from "react";
import { paymentMethodInfo, type Sale } from "@/lib/caisse/constants";
import { formatLongDate } from "@/lib/caisse/dates";
import { formatEuros } from "@/lib/caisse/format";
import { SaleRow } from "./Rows";
import { cardClass, fieldClass, pillClass, scriptClass, titleClass } from "./ui";

export function HistoryList({ sales }: { sales: Sale[] }) {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = q
    ? sales.filter((s) =>
        [s.label, s.client_name ?? "", paymentMethodInfo(s.payment_method).label]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
    : sales;

  const total = filtered.reduce((sum, s) => sum + s.amount_cents, 0);

  const days = new Map<string, Sale[]>();
  for (const s of filtered) {
    days.set(s.sold_on, [...(days.get(s.sold_on) ?? []), s]);
  }

  return (
    <section className={cardClass}>
      <p className={scriptClass}>le détail</p>
      <h2 className={`${titleClass} mt-2`}>Prestations</h2>
      <p className={`${pillClass} mt-4`}>
        {filtered.length} prestation{filtered.length > 1 ? "s" : ""} ·{" "}
        <strong className="text-cream">{formatEuros(total)}</strong>
      </p>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔎 Chercher une cliente…"
        aria-label="Chercher une cliente ou une prestation"
        className={`${fieldClass} mt-4`}
      />

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-subtle">
          {q ? "Aucun résultat." : "Aucune prestation ce mois-ci."}
        </p>
      ) : (
        <div className="mt-6 space-y-7">
          {[...days].map(([day, rows]) => (
            <div key={day}>
              <div className="mb-2 flex items-baseline justify-between gap-3 px-1.5">
                <h3 className="origin-left -rotate-2 font-script text-[24px] leading-none text-red-bright">
                  {formatLongDate(day)}
                </h3>
                <span className="font-display text-[22px] text-cream">
                  {formatEuros(rows.reduce((s, r) => s + r.amount_cents, 0))}
                </span>
              </div>
              <ul className="border-t border-line">
                {rows.map((sale) => (
                  <SaleRow key={sale.id} sale={sale} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
