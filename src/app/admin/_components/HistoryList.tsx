"use client";

import { useState } from "react";
import { paymentMethodInfo, type Sale } from "@/lib/caisse/constants";
import { formatLongDate } from "@/lib/caisse/dates";
import { formatEuros } from "@/lib/caisse/format";
import { SaleRow } from "./Rows";
import { cardClass, fieldClass } from "./ui";

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
      <h2 className="text-[26px] font-extrabold text-white">Prestations</h2>
      <p className="mt-3 inline-block rounded-full border border-plum-line bg-plum-field px-4 py-2 text-[15px] text-muted">
        {filtered.length} prestation{filtered.length > 1 ? "s" : ""} ·{" "}
        <strong className="text-white">{formatEuros(total)}</strong>
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
        <p className="mt-6 text-center text-muted">
          {q ? "Aucun résultat." : "Aucune prestation ce mois-ci."}
        </p>
      ) : (
        <div className="mt-5 space-y-5">
          {[...days].map(([day, rows]) => (
            <div key={day}>
              <div className="mb-2 flex items-baseline justify-between px-1 text-[15px] font-bold">
                <h3 className="text-blush/80">{formatLongDate(day)}</h3>
                <span className="text-white">
                  {formatEuros(rows.reduce((s, r) => s + r.amount_cents, 0))}
                </span>
              </div>
              <ul className="space-y-2.5">
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
