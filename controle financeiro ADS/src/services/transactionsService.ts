import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { db } from "./firebase";
import type { Transaction, TransactionFormValues } from "../types";

function getTransactionsCollection(userId: string) {
  return collection(db, "users", userId, "transactions");
}

export function subscribeToTransactions(
  userId: string,
  callback: (transactions: Transaction[]) => void
) {
  const q = query(getTransactionsCollection(userId), orderBy("date", "desc"));

  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((item) => {
      const data = item.data();

      return {
        id: item.id,
        userId,
        title: data.title,
        amount: Number(data.amount),
        type: data.type,
        category: data.category,
        paymentMethod: data.paymentMethod,
        status: data.status,
        date: data.date,
        notes: data.notes,
        createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString()
      } satisfies Transaction;
    });

    callback(items);
  });
}

export async function createTransaction(userId: string, values: TransactionFormValues) {
  await addDoc(getTransactionsCollection(userId), {
    ...values,
    amount: Number(values.amount),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export async function updateTransaction(
  userId: string,
  transactionId: string,
  values: TransactionFormValues
) {
  await updateDoc(doc(db, "users", userId, "transactions", transactionId), {
    ...values,
    amount: Number(values.amount),
    updatedAt: serverTimestamp()
  });
}

export async function removeTransaction(userId: string, transactionId: string) {
  await deleteDoc(doc(db, "users", userId, "transactions", transactionId));
}
