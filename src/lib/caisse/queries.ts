import "server-only";
import { createClient } from "@/lib/supabase/server";
import type {
  CatalogueCategory,
  Expense,
  Sale,
} from "./constants";

type Page<T> = PromiseLike<{ data: T[] | null; error: { message: string } | null }>;

/** Supabase plafonne à 1000 lignes par requête : on pagine. */
async function fetchAll<T>(page: (from: number, to: number) => Page<T>) {
  const size = 1000;
  const rows: T[] = [];
  for (let from = 0; ; from += size) {
    const { data, error } = await page(from, from + size - 1);
    if (error) throw new Error(error.message);
    rows.push(...(data ?? []));
    if (!data || data.length < size) return rows;
  }
}

const SALE_COLS = "id,label,amount_cents,client_name,sold_on,payment_method";
const EXPENSE_COLS = "id,label,amount_cents,category,spent_on,paid_by";

export async function getSales(from: string, to: string) {
  const supabase = await createClient();
  return fetchAll<Sale>((a, b) =>
    supabase
      .from("sales")
      .select(SALE_COLS)
      .gte("sold_on", from)
      .lt("sold_on", to)
      .order("sold_on", { ascending: false })
      .order("created_at", { ascending: false })
      .range(a, b),
  );
}

export async function getExpenses(from: string, to: string) {
  const supabase = await createClient();
  return fetchAll<Expense>((a, b) =>
    supabase
      .from("expenses")
      .select(EXPENSE_COLS)
      .gte("spent_on", from)
      .lt("spent_on", to)
      .order("spent_on", { ascending: false })
      .order("created_at", { ascending: false })
      .range(a, b),
  );
}

export async function getCatalogue(): Promise<CatalogueCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("service_categories")
    .select(
      "id,label,emoji,position,services(id,name,price_cents,price_is_from,position,active)",
    )
    .order("position")
    .order("position", { referencedTable: "services" });
  if (error) throw new Error(error.message);

  return (data ?? []).map((c) => ({
    id: c.id,
    label: c.label,
    emoji: c.emoji,
    services: (c.services ?? [])
      .filter((s) => s.active)
      .map(({ id, name, price_cents, price_is_from }) => ({
        id,
        name,
        price_cents,
        price_is_from,
      })),
  }));
}
