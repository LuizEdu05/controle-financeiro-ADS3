import { z } from "zod";

export const transactionSchema = z.object({
  title: z.string().min(3, "Informe uma descricao com ao menos 3 caracteres."),
  amount: z.coerce.number().positive("Informe um valor maior que zero."),
  type: z.enum(["income", "expense"]),
  category: z.string().min(2, "Selecione uma categoria."),
  paymentMethod: z.string().min(2, "Selecione um metodo de pagamento."),
  status: z.enum(["paid", "pending"]),
  date: z.string().min(1, "Informe a data da movimentacao."),
  notes: z.string().max(240, "Use no maximo 240 caracteres.").optional()
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
