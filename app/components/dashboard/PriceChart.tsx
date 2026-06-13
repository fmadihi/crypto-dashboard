"use client";

import { Coin } from "@/app/types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function PriceChart({ coin }: { coin: Coin }) {
  const data = (coin.sparkline_in_7d?.price ?? []).map((price, i) => ({
    time: i,
    price: +price.toFixed(2),
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="font-semibold mb-4 dark:text-white">
        {coin.name} — 7 Day
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" hide />
          <YAxis domain={["auto", "auto"]} width={70} tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(v) => [`$${Number(v).toLocaleString()}`, "Price"]}
          />{" "}
          <Area
            type="monotone"
            dataKey="price"
            stroke="#6366f1"
            fill="url(#priceGrad)"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
