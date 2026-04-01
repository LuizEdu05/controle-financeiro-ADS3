import type { DashboardSummary, Transaction } from "../types";

export function buildDashboardSummary(transactions: Transaction[]): DashboardSummary {
  const paid = transactions.filter((item) => item.status === "paid");
  const totalIncome = paid
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);
  const totalExpenses = paid
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);
  const pendingExpenses = transactions
    .filter((item) => item.type === "expense" && item.status === "pending")
    .reduce((total, item) => total + item.amount, 0);
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.max(0, (balance / totalIncome) * 100) : 0;

  return {
    balance,
    totalIncome,
    totalExpenses,
    pendingExpenses,
    savingsRate
  };
}
