"use client";

import { usePortfolioStore } from "@/app/store/portfolioStore";
import { Coin } from "@/app/types";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export function PortfolioSummary({ coins }: { coins: Coin[] }) {
  const items = usePortfolioStore((s) => s.items);
  const priceMap = Object.fromEntries(coins.map((c) => [c.id, c.current_price]));

  const stats = items.map((item) => {
    const current = priceMap[item.coinId] ?? item.avgBuyPrice;
    const value = item.holdings * current;
    const cost = item.holdings * item.avgBuyPrice;
    const pnl = value - cost;
    const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0;
    return { ...item, current, value, pnl, pnlPct };
  });

  const totalValue = stats.reduce((a, s) => a + s.value, 0);
  const totalPnl = stats.reduce((a, s) => a + s.pnl, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="font-semibold mb-4 dark:text-white">Portfolio</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <StatBox icon={<DollarSign size={18} />} label="Total Value" value={`$${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
        <StatBox
          icon={totalPnl >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
          label="Total P&L"
          value={`${totalPnl >= 0 ? "+" : ""}$${totalPnl.toFixed(2)}`}
          color={totalPnl >= 0 ? "text-green-500" : "text-red-500"}
        />
      </div>
      <div className="space-y-2">
        {stats.map((s) => (
          <div key={s.coinId} className="flex items-center justify-between text-sm">
            <span className="font-medium dark:text-white uppercase">{s.symbol}</span>
            <span className="text-gray-500 dark:text-gray-400">{s.holdings} @ ${s.avgBuyPrice.toFixed(2)}</span>
            <span className={s.pnl >= 0 ? "text-green-500" : "text-red-500"}>
              {s.pnl >= 0 ? "+" : ""}${s.pnl.toFixed(2)} ({s.pnlPct.toFixed(1)}%)
            </span>
          </div>
        ))}
        {!stats.length && <p className="text-gray-400 text-sm text-center py-4">No holdings yet</p>}
      </div>
    </div>
  );
}

function StatBox({ icon, label, value, color = "dark:text-white" }: { icon: React.ReactNode; label: string; value: string; color?: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">{icon}{label}</div>
      <p className={`font-bold text-lg ${color}`}>{value}</p>
    </div>
  );
}
