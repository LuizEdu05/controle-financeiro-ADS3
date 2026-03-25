import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { Transaction } from "../../types";

const COLORS = ["#1b4332", "#2d6a4f", "#40916c", "#52796f", "#d62828", "#bc6c25"];

interface ExpensesByCategoryChartProps {
  transactions: Transaction[];
}

export function ExpensesByCategoryChart({ transactions }: ExpensesByCategoryChartProps) {
  const data = Object.values(
    transactions
      .filter((item) => item.type === "expense")
      .reduce<Record<string, { name: string; value: number }>>((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = { name: item.category, value: 0 };
        }

        acc[item.category].value += item.amount;
        return acc;
      }, {})
  );

  return (
    <div className="chart-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Analise</p>
          <h2>Despesas por categoria</h2>
        </div>
      </div>

      <div className="chart-area">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={68} outerRadius={100}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toLocaleString("pt-BR")} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
