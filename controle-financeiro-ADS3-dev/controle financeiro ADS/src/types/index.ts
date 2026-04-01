export type TransactionType = "income" | "expense";
export type TransactionStatus = "paid" | "pending";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  paymentMethod: string;
  status: TransactionStatus;
  date: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionFormValues {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  paymentMethod: string;
  status: TransactionStatus;
  date: string;
  notes?: string;
}

export interface DashboardSummary {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  pendingExpenses: number;
  savingsRate: number;
}
