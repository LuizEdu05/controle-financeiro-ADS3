import { useMemo, useState } from "react";
import { TransactionForm } from "../components/forms/TransactionForm";
import { TransactionsTable } from "../components/transactions/TransactionsTable";
import { EmptyState } from "../components/ui/EmptyState";
import { Modal } from "../components/ui/Modal";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { useTransactions } from "../hooks/useTransactions";
import type { Transaction, TransactionFormValues } from "../types";

export function TransactionsPage() {
  const { profile } = useAuth();
  const { showToast } = useToast();
  const { transactions, loading, create, update, remove } = useTransactions();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      return matchesQuery && matchesStatus && matchesType;
    });
  }, [query, statusFilter, transactions, typeFilter]);

  async function handleCreate(values: TransactionFormValues) {
    try {
      setSubmitting(true);
      await create(values);
      showToast("Movimentacao criada com sucesso.", "success");
      setIsCreateOpen(false);
    } catch {
      showToast("Nao foi possivel criar a movimentacao.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdate(values: TransactionFormValues) {
    if (!editingTransaction) return;

    try {
      setSubmitting(true);
      await update(editingTransaction.id, values);
      showToast("Movimentacao atualizada com sucesso.", "success");
      setEditingTransaction(null);
    } catch {
      showToast("Nao foi possivel atualizar a movimentacao.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(transaction: Transaction) {
    const confirmed = window.confirm(`Deseja excluir "${transaction.title}"?`);
    if (!confirmed) return;

    try {
      await remove(transaction.id);
      showToast("Movimentacao removida com sucesso.", "success");
    } catch {
      showToast("Nao foi possivel remover a movimentacao.", "error");
    }
  }

  return (
    <div className="page-grid">
      <div className="section-heading">
        <div>
          <p className="eyebrow">CRUD completo</p>
          <h2>Gerencie suas movimentacoes</h2>
        </div>
        <button className="primary-button" onClick={() => setIsCreateOpen(true)} type="button">
          Nova movimentacao
        </button>
      </div>

      <section className="toolbar">
        <input
          type="search"
          placeholder="Buscar por descricao ou categoria"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
          <option value="all">Todos os tipos</option>
          <option value="income">Receitas</option>
          <option value="expense">Despesas</option>
        </select>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">Todos os status</option>
          <option value="paid">Pagos</option>
          <option value="pending">Pendentes</option>
        </select>
      </section>

      {loading ? (
        <div className="panel">Carregando movimentacoes...</div>
      ) : filteredTransactions.length === 0 ? (
        <EmptyState
          title="Nenhum resultado encontrado"
          description="Ajuste seus filtros ou crie uma nova movimentacao para iniciar o controle."
        />
      ) : (
        <TransactionsTable
          currency={profile?.currency ?? "BRL"}
          items={filteredTransactions}
          onDelete={handleDelete}
          onEdit={setEditingTransaction}
        />
      )}

      {isCreateOpen && (
        <Modal title="Nova movimentacao" onClose={() => setIsCreateOpen(false)}>
          <TransactionForm submitting={submitting} onSubmit={handleCreate} />
        </Modal>
      )}

      {editingTransaction && (
        <Modal title="Editar movimentacao" onClose={() => setEditingTransaction(null)}>
          <TransactionForm
            initialValues={editingTransaction}
            submitting={submitting}
            onSubmit={handleUpdate}
          />
        </Modal>
      )}
    </div>
  );
}
