import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { useAuth } from "./AuthContext";
import { buildDashboardSummary } from "../lib/dashboard";
import {
  createTransaction,
  removeTransaction,
  subscribeToTransactions,
  updateTransaction
} from "../services/transactionsService";
import type { Transaction, TransactionFormValues } from "../types";

interface TransactionsContextValue {
  transactions: Transaction[];
  loading: boolean;
  summary: ReturnType<typeof buildDashboardSummary>;
  create: (values: TransactionFormValues) => Promise<void>;
  update: (transactionId: string, values: TransactionFormValues) => Promise<void>;
  remove: (transactionId: string) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextValue | undefined>(undefined);

export function TransactionsProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToTransactions(user.uid, (items) => {
      setTransactions(items);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const value = useMemo<TransactionsContextValue>(
    () => ({
      transactions,
      loading,
      summary: buildDashboardSummary(transactions),
      create: async (values) => {
        if (!user) return;
        await createTransaction(user.uid, values);
      },
      update: async (transactionId, values) => {
        if (!user) return;
        await updateTransaction(user.uid, transactionId, values);
      },
      remove: async (transactionId) => {
        if (!user) return;
        await removeTransaction(user.uid, transactionId);
      }
    }),
    [loading, transactions, user]
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactionsContext() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error("useTransactionsContext must be used within TransactionsProvider");
  }

  return context;
}
