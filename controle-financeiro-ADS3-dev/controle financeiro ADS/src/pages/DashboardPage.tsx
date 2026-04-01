import { useMemo } from "react";
import { ExpensesByCategoryChart } from "../components/charts/ExpensesByCategoryChart";
import { MonthlyOverviewChart } from "../components/charts/MonthlyOverviewChart";
import { EmptyState } from "../components/ui/EmptyState";
import { StatCard } from "../components/ui/StatCard";
import { useAuth } from "../contexts/AuthContext";
import { useTransactions } from "../hooks/useTransactions";
import { formatCurrency } from "../lib/currency";
import { formatDate } from "../lib/date";

export function DashboardPage() {
  const { profile } = useAuth();
  const { transactions, summary, loading } = useTransactions();
  const recentTransactions = useMemo(() => transactions.slice(0, 5), [transactions]);
  const currency = profile?.currency ?? "BRL";

  if (loading) {
    return <div className="panel">Carregando dados financeiros...</div>;
  }

  return (
    <div className="page-grid">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Painel</p>
          <h2>Resumo financeiro</h2>
        </div>
      </div>

      <section className="stats-grid">
        <StatCard
          label="Saldo atual"
          value={formatCurrency(summary.balance, currency)}
          tone={summary.balance >= 0 ? "success" : "danger"}
          helper="Resultado das entradas e saidas pagas"
        />
        <StatCard
          label="Receitas"
          value={formatCurrency(summary.totalIncome, currency)}
          tone="success"
          helper="Movimentacoes de entrada"
        />
        <StatCard
          label="Despesas"
          value={formatCurrency(summary.totalExpenses, currency)}
          tone="danger"
          helper="Saidas confirmadas"
        />
        <StatCard
          label="Pendencias"
          value={formatCurrency(summary.pendingExpenses, currency)}
          helper={`Taxa de poupanca: ${summary.savingsRate.toFixed(1)}%`}
        />
      </section>

      {transactions.length === 0 ? (
        <EmptyState
          title="Nenhuma movimentacao encontrada"
          description="Comece cadastrando receitas e despesas para visualizar indicadores e graficos."
        />
      ) : (
        <>
          <section className="dashboard-columns">
            <MonthlyOverviewChart transactions={transactions} />
            <ExpensesByCategoryChart transactions={transactions} />
          </section>

          <section className="table-card">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Ultimos registros</p>
                <h2>Movimentacoes recentes</h2>
              </div>
            </div>
            <div className="recent-list">
              {recentTransactions.map((item) => (
                <article key={item.id} className="recent-item">
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.category}</span>
                  </div>
                  <div>
                    <strong>{formatCurrency(item.amount, currency)}</strong>
                    <span>{formatDate(item.date)}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
