import { deleteExpense, deleteSale } from "../(app)/actions";
import {
  expenseCategoryInfo,
  paymentMethodInfo,
  type Expense,
  type Sale,
} from "@/lib/caisse/constants";
import { formatEuros } from "@/lib/caisse/format";
import { DeleteButton } from "./DeleteButton";

const rowClass =
  "flex items-center gap-3 rounded-[22px] border border-plum-line bg-plum-field py-3 pr-3 pl-5";

export function SaleRow({ sale }: { sale: Sale }) {
  const method = paymentMethodInfo(sale.payment_method);
  return (
    <li className={rowClass}>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-extrabold text-white">{sale.label}</p>
        <p className="text-[15px] text-muted">
          {sale.client_name && <>👤 {sale.client_name} · </>}
          {method.emoji} {method.label}
        </p>
      </div>
      <p className="shrink-0 text-lg font-extrabold text-mint">
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
        <p className="text-lg font-extrabold text-white">
          {expense.label}
        </p>
        <p className="text-[15px] text-muted">
          {category.emoji} {category.label}
          {expense.paid_by && <> · payé par {expense.paid_by}</>}
        </p>
      </div>
      <p className="shrink-0 text-lg font-extrabold text-blush">
        −{formatEuros(expense.amount_cents)}
      </p>
      <DeleteButton id={expense.id} action={deleteExpense} what={expense.label} />
    </li>
  );
}
