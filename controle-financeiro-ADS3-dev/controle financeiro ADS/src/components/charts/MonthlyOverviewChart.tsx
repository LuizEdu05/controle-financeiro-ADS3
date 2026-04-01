import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { Transaction } from "../../types";

interface MonthlyOverviewChartProps {
  transactions: Transaction[];
}

export function MonthlyOverviewChart({ transactions }: MonthlyOverviewChartProps) {
  const grouped = transactions.reduce<Record<string, { month: string; income: number; expense: number }>>(
    (acc, item) => {
      const month = item.date.slice(0, 7);

      if (!acc[month]) {
        acc[month] = { month, income: 0, expense: 0 };
      }

      if (item.type === "income") {
        acc[month].income += item.amount;
      } else {
        acc[month].expense += item.amount;
      }

      return acc;
    },
    {}
  );

  const data = Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div className="chart-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Tendencia</p>
          <h2>Fluxo mensal</h2>
        </div>
      </div>
      <div className="chart-area">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#bc4749" stopOpacity={0.55} />
                <stop offset="95%" stopColor="#bc4749" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dce5dc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="income" stroke="#2d6a4f" fill="url(#incomeGradient)" />
            <Area type="monotone" dataKey="expense" stroke="#bc4749" fill="url(#expenseGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
