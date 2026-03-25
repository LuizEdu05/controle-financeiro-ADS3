import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DEFAULT_CATEGORIES, PAYMENT_METHODS } from "../../constants/finance";
import type { Transaction, TransactionFormValues } from "../../types";
import { transactionSchema, type TransactionSchema } from "../../validators/transactionSchema";

interface TransactionFormProps {
  initialValues?: Transaction | null;
  submitting: boolean;
  onSubmit: (values: TransactionFormValues) => Promise<void>;
}

export function TransactionForm({ initialValues, submitting, onSubmit }: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialValues
      ? {
          title: initialValues.title,
          amount: initialValues.amount,
          type: initialValues.type,
          category: initialValues.category,
          paymentMethod: initialValues.paymentMethod,
          status: initialValues.status,
          date: initialValues.date,
          notes: initialValues.notes ?? ""
        }
      : {
          title: "",
          amount: 0,
          type: "expense",
          category: DEFAULT_CATEGORIES[0],
          paymentMethod: PAYMENT_METHODS[0],
          status: "paid",
          date: new Date().toISOString().slice(0, 10),
          notes: ""
        }
  });

  return (
    <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Descricao
        <input type="text" placeholder="Ex.: Mercado do mes" {...register("title")} />
        {errors.title && <span className="field-error">{errors.title.message}</span>}
      </label>

      <label>
        Valor
        <input type="number" min="0" step="0.01" {...register("amount")} />
        {errors.amount && <span className="field-error">{errors.amount.message}</span>}
      </label>

      <label>
        Tipo
        <select {...register("type")}>
          <option value="income">Receita</option>
          <option value="expense">Despesa</option>
        </select>
      </label>

      <label>
        Categoria
        <select {...register("category")}>
          {DEFAULT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        Pagamento
        <select {...register("paymentMethod")}>
          {PAYMENT_METHODS.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </label>

      <label>
        Status
        <select {...register("status")}>
          <option value="paid">Pago</option>
          <option value="pending">Pendente</option>
        </select>
      </label>

      <label>
        Data
        <input type="date" {...register("date")} />
        {errors.date && <span className="field-error">{errors.date.message}</span>}
      </label>

      <label>
        Observacoes
        <textarea rows={4} placeholder="Contexto opcional" {...register("notes")} />
        {errors.notes && <span className="field-error">{errors.notes.message}</span>}
      </label>

      <button className="primary-button" disabled={submitting} type="submit">
        {submitting ? "Salvando..." : initialValues ? "Atualizar movimentacao" : "Adicionar movimentacao"}
      </button>
    </form>
  );
}
