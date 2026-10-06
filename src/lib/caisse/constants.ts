export const PAYMENT_METHODS = [
  { value: "cash", label: "Espèces", emoji: "💵" },
  { value: "card", label: "CB", emoji: "💳" },
  { value: "check", label: "Chèque", emoji: "🧾" },
  { value: "transfer", label: "Virement", emoji: "🏦" },
  { value: "other", label: "Autre", emoji: "📱" },
] as const;

export const EXPENSE_CATEGORIES = [
  { value: "products", label: "Produits", emoji: "🧴" },
  { value: "equipment", label: "Matériel", emoji: "🛠️" },
  { value: "hygiene", label: "Hygiène", emoji: "🧼" },
  { value: "rent", label: "Loyer & charges", emoji: "🏠" },
  { value: "training", label: "Formation", emoji: "🎓" },
  { value: "marketing", label: "Com & pub", emoji: "📣" },
  { value: "accounting", label: "Compta & assurances", emoji: "🧾" },
  { value: "other", label: "Autre", emoji: "🛍️" },
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]["value"];
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]["value"];

export function paymentMethodInfo(value: string) {
  return PAYMENT_METHODS.find((m) => m.value === value) ?? PAYMENT_METHODS[4];
}

export function expenseCategoryInfo(value: string) {
  return EXPENSE_CATEGORIES.find((c) => c.value === value) ?? EXPENSE_CATEGORIES[7];
}

export type Sale = {
  id: string;
  label: string;
  amount_cents: number;
  client_name: string | null;
  sold_on: string;
  payment_method: PaymentMethod;
};

export type Expense = {
  id: string;
  label: string;
  amount_cents: number;
  category: ExpenseCategory;
  spent_on: string;
  paid_by: string | null;
};

export type CatalogueService = {
  id: string;
  name: string;
  price_cents: number;
  price_is_from: boolean;
};

export type CatalogueCategory = {
  id: string;
  label: string;
  emoji: string | null;
  services: CatalogueService[];
};
