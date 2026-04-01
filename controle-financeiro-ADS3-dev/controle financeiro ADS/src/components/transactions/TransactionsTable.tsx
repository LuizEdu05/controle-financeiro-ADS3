import { formatCurrency } from "../../lib/currency";
import { formatDate } from "../../lib/date";
import type { Transaction } from "../../types";

interface TransactionsTableProps {
  currency: string;
  items: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export function TransactionsTable({
  currency,
  items,
  onEdit,
  onDelete
}: TransactionsTableProps) {
  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Descricao</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Status</th>
            <th>Valor</th>
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <strong>{item.title}</strong>
                <span>{item.paymentMethod}</span>
              </td>
              <td>{item.category}</td>
              <td>{formatDate(item.date)}</td>
              <td>
                <span className={`badge badge--${item.status}`}>{item.status}</span>
              </td>
              <td className={item.type === "income" ? "value-positive" : "value-negative"}>
                {item.type === "income" ? "+" : "-"} {formatCurrency(item.amount, currency)}
              </td>
              <td>
                <div className="table-actions">
                  <button className="ghost-button" onClick={() => onEdit(item)} type="button">
                    Editar
                  </button>
                  <button className="ghost-button danger" onClick={() => onDelete(item)} type="button">
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
