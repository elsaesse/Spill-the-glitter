import { deleteExpense, deleteSale } from "../(app)/actions";
import {
  expenseCategoryInfo,
  paymentMethodInfo,
  type Expense,
  type Sale,
} from "@/lib/caisse/constants";
import { formatEuros } from "@/lib/caisse/format";
import { DeleteButton } from "./DeleteButton";

export const listClass = "border-t border-line";

const rowClass =
  "flex items-center gap-3 border-b border-line px-1.5 py-5 transition-colors hover:bg-black/40";

const labelClass =
  "font-display text-[clamp(22px,5.5vw,28px)] uppercase leading-[1.05]";

export function SaleRow({ sale }: { sale: Sale }) {
  const method = paymentMethodInfo(sale.payment_method);
  return (
    <li className={rowClass}>
      <div className="min-w-0 flex-1">
        <p className={labelClass}>{sale.label}</p>
        <p className="mt-1.5 text-[15px] text-subtle">
          {sale.client_name && <>👤 {sale.client_name} · </>}
          {method.emoji} {method.label}
        </p>
      </div>
      <p className="shrink-0 font-display text-[clamp(22px,5.5vw,28px)] text-gold">
        +{formatEuros(sale.amount_cents)}
      </p>
      <DeleteButton id={sale.id} action={deleteSale} what={sale.label} />
    </li>
  );
}

export function ExpenseRow({ expense }: { expense: Expense }) {
  const category = expenseCategoryInfo(expense.category);
  return (
    <li className={rowClass}>
      <div className="min-w-0 flex-1">
        <p className={labelClass}>{expense.label}</p>
        <p className="mt-1.5 text-[15px] text-subtle">
          {category.emoji} {category.label}
          {expense.paid_by && <> · payé par {expense.paid_by}</>}
        </p>
      </div>
      <p className="shrink-0 font-display text-[clamp(22px,5.5vw,28px)] text-red-bright">
        −{formatEuros(expense.amount_cents)}
      </p>
      <DeleteButton id={expense.id} action={deleteExpense} what={expense.label} />
    </li>
  );
}
