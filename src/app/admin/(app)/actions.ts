"use server";

import { revalidatePath } from "next/cache";
import { isAdminEmail } from "@/lib/admin";
import {
  EXPENSE_CATEGORIES,
  PAYMENT_METHODS,
} from "@/lib/caisse/constants";
import { isValidDate } from "@/lib/caisse/dates";
import { parseEuros } from "@/lib/caisse/format";
import { createClient } from "@/lib/supabase/server";

export type ActionResult = { error?: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Le proxy protège déjà /admin ; on revérifie ici car une action est un
// endpoint POST à part entière.
async function requireAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!isAdminEmail(data?.claims?.email)) throw new Error("Non autorisé");
  return supabase;
}

function refresh() {
  revalidatePath("/admin", "layout");
}

const text = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export type SaleInput = {
  serviceId: string | null;
  label: string;
  price: string;
  client: string;
  date: string;
  method: string;
};

export async function addSale(input: SaleInput): Promise<ActionResult> {
  const supabase = await requireAdmin();

  const label = text(input.label, 120);
  const amount = parseEuros(String(input.price ?? ""));
  const method = PAYMENT_METHODS.find((m) => m.value === input.method);

  if (!label) return { error: "Choisis ou écris une prestation." };
  if (!amount) return { error: "Indique un prix valide." };
  if (!isValidDate(input.date)) return { error: "La date est invalide." };
  if (!method) return { error: "Choisis un moyen de paiement." };

  const { error } = await supabase.from("sales").insert({
    service_id: input.serviceId && UUID.test(input.serviceId) ? input.serviceId : null,
    label,
    amount_cents: amount,
    client_name: text(input.client, 80) || null,
    sold_on: input.date,
    payment_method: method.value,
  });
  if (error) return { error: "Impossible d'enregistrer, réessaie." };

  refresh();
  return {};
}

export async function deleteSale(id: string): Promise<ActionResult> {
  const supabase = await requireAdmin();
  if (!UUID.test(id)) return { error: "Identifiant invalide." };
  const { error } = await supabase.from("sales").delete().eq("id", id);
  if (error) return { error: "Impossible de supprimer." };
  refresh();
  return {};
}

export type ExpenseInput = {
  label: string;
  amount: string;
  category: string;
  date: string;
  paidBy: string;
};

export async function addExpense(input: ExpenseInput): Promise<ActionResult> {
  const supabase = await requireAdmin();

  const label = text(input.label, 120);
  const amount = parseEuros(String(input.amount ?? ""));
  const category = EXPENSE_CATEGORIES.find((c) => c.value === input.category);

  if (!label) return { error: "Décris la dépense." };
  if (!amount) return { error: "Indique un montant valide." };
  if (!category) return { error: "Choisis une catégorie." };
  if (!isValidDate(input.date)) return { error: "La date est invalide." };

  const { error } = await supabase.from("expenses").insert({
    label,
    amount_cents: amount,
    category: category.value,
    spent_on: input.date,
    paid_by: text(input.paidBy, 80) || null,
  });
  if (error) return { error: "Impossible d'enregistrer, réessaie." };

  refresh();
  return {};
}

export async function deleteExpense(id: string): Promise<ActionResult> {
  const supabase = await requireAdmin();
  if (!UUID.test(id)) return { error: "Identifiant invalide." };
  const { error } = await supabase.from("expenses").delete().eq("id", id);
  if (error) return { error: "Impossible de supprimer." };
  refresh();
  return {};
}
