"use client";

import { useState, useTransition } from "react";
import { addSale } from "../(app)/actions";
import {
  PAYMENT_METHODS,
  type CatalogueCategory,
  type CatalogueService,
  type PaymentMethod,
} from "@/lib/caisse/constants";
import { centsToInput, formatEuros } from "@/lib/caisse/format";
import {
  cardClass,
  chipClass,
  fieldClass,
  labelClass,
  primaryButtonClass,
} from "./ui";

type Picked = { id: string; label: string };

export function SaleForm({
  catalogue,
  today,
}: {
  catalogue: CatalogueCategory[];
  today: string;
}) {
  const [picked, setPicked] = useState<Picked | null>(null);
  const [label, setLabel] = useState("");
  const [price, setPrice] = useState("");
  const [client, setClient] = useState("");
  const [date, setDate] = useState(today);
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [error, setError] = useState<string>();
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  // Un nom présent dans plusieurs catégories (ex. « Glow ») est précisé.
  const nameCount = new Map<string, number>();
  for (const c of catalogue)
    for (const s of c.services)
      nameCount.set(s.name, (nameCount.get(s.name) ?? 0) + 1);

  function pick(category: CatalogueCategory, service: CatalogueService) {
    const short = category.label.split("·")[0].trim();
    const full =
      (nameCount.get(service.name) ?? 0) > 1
        ? `${service.name} · ${short}`
        : service.name;
    setPicked({ id: service.id, label: full });
    setLabel(full);
    setPrice(centsToInput(service.price_cents));
    setSaved(false);
  }

  function onLabelChange(value: string) {
    setLabel(value);
    // Texte modifié à la main : ce n'est plus la prestation du catalogue.
    if (picked && value !== picked.label) setPicked(null);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);
    setSaved(false);
    startTransition(async () => {
      const res = await addSale({
        serviceId: picked?.id ?? null,
        label,
        price,
        client,
        date,
        method: method ?? "",
      });
      if (res.error) return setError(res.error);
      setPicked(null);
      setLabel("");
      setPrice("");
      setClient("");
      setMethod(null);
      setSaved(true);
    });
  }

  return (
    <form onSubmit={submit} className={cardClass}>
      <h2 className="text-[26px] font-extrabold text-white">Nouvelle prestation</h2>

      <div className="mt-5 space-y-5">
        <div>
          <span className={labelClass}>Prestation</span>
          <div className="space-y-4">
            {catalogue.map((category) => (
              <fieldset key={category.id}>
                <legend className="mb-2 flex items-center gap-2 text-[15px] font-bold tracking-wide text-muted uppercase">
                  <span aria-hidden>{category.emoji}</span> {category.label}
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {category.services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      aria-pressed={picked?.id === service.id}
                      onClick={() => pick(category, service)}
                      className={chipClass(picked?.id === service.id)}
                    >
                      {service.name} ·{" "}
                      {service.price_is_from && "dès "}
                      {formatEuros(service.price_cents).replace(",00", "")}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        <input
          value={label}
          onChange={(e) => onLabelChange(e.target.value)}
          placeholder="Ou écris une autre prestation…"
          aria-label="Prestation"
          maxLength={120}
          className={fieldClass}
        />

        <label className="block">
          <span className={labelClass}>Prix</span>
          <div className="relative">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputMode="decimal"
              placeholder="0,00"
              className={`${fieldClass} pr-12 text-[26px] font-extrabold`}
            />
            <span className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-2xl font-extrabold text-blush/70">
              €
            </span>
          </div>
        </label>

        <label className="block">
          <span className={labelClass}>Cliente / client</span>
          <input
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="Prénom ou nom"
            maxLength={80}
            className={fieldClass}
          />
        </label>

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

        <fieldset>
          <legend className={labelClass}>Paiement</legend>
          <div className="flex flex-wrap gap-2.5">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.value}
                type="button"
                aria-pressed={method === m.value}
                onClick={() => setMethod(m.value)}
                className={chipClass(method === m.value)}
              >
                <span aria-hidden>{m.emoji}</span> {m.label}
              </button>
            ))}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="text-[15px] text-blush">
            {error}
          </p>
        )}
        {saved && (
          <p role="status" className="text-[15px] text-mint">
            Prestation encaissée ✨
          </p>
        )}

        <button type="submit" disabled={pending} className={primaryButtonClass}>
          {pending ? "Enregistrement…" : "Encaisser ✨"}
        </button>
      </div>
    </form>
  );
}
