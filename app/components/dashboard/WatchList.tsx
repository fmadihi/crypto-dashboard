"use client";
import { useWatchlistStore } from "@/app/store/watchlistStore";
import { Coin } from "@/app/types";
import { Star, TrendingUp, TrendingDown } from "lucide-react";

export function WatchList({ coins }: { coins: Coin[] }) {
  const { ids, toggle } = useWatchlistStore();
  const watched = coins.filter((c) => ids.includes(c.id));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="font-semibold mb-4 dark:text-white flex items-center gap-2"><Star size={18} className="text-yellow-400" />Watchlist</h3>
      {!watched.length ? (
        <p className="text-gray-400 text-sm text-center py-4">Star coins to add them here</p>
      ) : (
        <div className="space-y-2">
          {watched.map((c) => (
            <div key={c.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={c.image} alt={c.name} className="w-6 h-6 rounded-full" />
                <span className="text-sm font-medium dark:text-white">{c.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold dark:text-white">${c.current_price.toLocaleString()}</span>
                <span className={`text-xs flex items-center gap-0.5 ${c.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {c.price_change_percentage_24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {c.price_change_percentage_24h.toFixed(2)}%
                </span>
                <button onClick={() => toggle(c.id)} className="text-yellow-400 hover:text-gray-400 transition-colors"><Star size={14} fill="currentColor" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
