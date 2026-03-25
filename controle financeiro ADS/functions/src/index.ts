import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { HttpsError, onCall } from "firebase-functions/v2/https";

initializeApp();

export const getDashboardSummary = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be authenticated.");
  }

  const snapshot = await getFirestore()
    .collection("users")
    .doc(request.auth.uid)
    .collection("transactions")
    .get();

  const summary = snapshot.docs.reduce(
    (acc, item) => {
      const data = item.data();
      const amount = Number(data.amount ?? 0);

      if (data.type === "income" && data.status === "paid") acc.totalIncome += amount;
      if (data.type === "expense" && data.status === "paid") acc.totalExpenses += amount;
      if (data.type === "expense" && data.status === "pending") acc.pendingExpenses += amount;

      return acc;
    },
    {
      totalIncome: 0,
      totalExpenses: 0,
      pendingExpenses: 0
    }
  );

  return {
    ...summary,
    balance: summary.totalIncome - summary.totalExpenses
  };
});
