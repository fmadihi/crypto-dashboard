"use client";
import { Coin } from "@/app/types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

export function CompareChart({ coins }: { coins: Coin[] }) {
  const maxLen = Math.max(...coins.map((c) => c.sparkline_in_7d?.price.length ?? 0));
  const data = Array.from({ length: maxLen }, (_, i) => {
    const point: Record<string, number> = { i };
    coins.forEach((c) => {
      const prices = c.sparkline_in_7d?.price ?? [];
      const base = prices[0] || 1;
      point[c.symbol] = +((((prices[i] || prices[prices.length - 1]) - base) / base) * 100).toFixed(2);
    });
    return point;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="font-semibold mb-4 dark:text-white">Comparative Performance (% Change)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="i" hide />
          <YAxis tickFormatter={(v) => `${v}%`} width={55} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, "Price"]} /><Legend />
          {coins.map((c, i) => (
            <Line key={c.id} type="monotone" dataKey={c.symbol} stroke={COLORS[i % COLORS.length]} dot={false} strokeWidth={2} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
