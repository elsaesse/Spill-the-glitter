"use client";

import { useState, useTransition } from "react";
import { addExpense } from "../(app)/actions";
import {
  EXPENSE_CATEGORIES,
  type ExpenseCategory,
} from "@/lib/caisse/constants";
import {
  cardClass,
  chipClass,
  fieldClass,
  labelClass,
  primaryButtonClass,
} from "./ui";

export function ExpenseForm({ today }: { today: string }) {
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory | null>(null);
  const [date, setDate] = useState(today);
  const [paidBy, setPaidBy] = useState("");
  const [error, setError] = useState<string>();
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);
    setSaved(false);
    startTransition(async () => {
      const res = await addExpense({
        label,
        amount,
        category: category ?? "",
        date,
        paidBy,
      });
      if (res.error) return setError(res.error);
      setLabel("");
      setAmount("");
      setCategory(null);
      setPaidBy("");
      setSaved(true);
    });
  }

  return (
    <form onSubmit={submit} className={cardClass}>
      <h2 className="text-[26px] font-extrabold text-white">Nouvelle dépense</h2>

      <div className="mt-5 space-y-5">
        <label className="block">
          <span className={labelClass}>Dépense</span>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="ex. Gel builder, lampe, loyer…"
            maxLength={120}
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className={labelClass}>Montant</span>
          <div className="relative">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="decimal"
              placeholder="0,00"
              className={`${fieldClass} pr-12 text-[26px] font-extrabold`}
            />
            <span className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-2xl font-extrabold text-blush/70">
              €
            </span>
          </div>
        </label>

        <fieldset>
          <legend className={labelClass}>Catégorie</legend>
          <div className="flex flex-wrap gap-2.5">
            {EXPENSE_CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                aria-pressed={category === c.value}
                onClick={() => setCategory(c.value)}
                className={chipClass(category === c.value)}
              >
                <span aria-hidden>{c.emoji}</span> {c.label}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className={labelClass}>Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className={`${fieldClass} text-center`}
          />
        </label>

        <label className="block">
          <span className={labelClass}>Payé par (facultatif)</span>
          <input
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            placeholder="ex. CB pro, espèces…"
            maxLength={80}
            className={fieldClass}
          />
        </label>

        {error && (
          <p role="alert" className="text-[15px] text-blush">
            {error}
          </p>
        )}
        {saved && (
          <p role="status" className="text-[15px] text-mint">
            Dépense enregistrée ✨
          </p>
        )}

        <button type="submit" disabled={pending} className={primaryButtonClass}>
          {pending ? "Enregistrement…" : "Ajouter la dépense"}
        </button>
      </div>
    </form>
  );
}
