"use client";
import { useWatchlistStore } from "@/app/store/watchlistStore";
import { Coin } from "@/app/types";
import { motion } from "framer-motion";
import { Star, TrendingUp, TrendingDown } from "lucide-react";
import { Sparkline } from "./parkline";


interface Props {
  coin: Coin;
  onClick: () => void;
  livePrice?: number;
}

export function PriceCard({ coin, onClick, livePrice }: Props) {
  const { toggle, isWatched } = useWatchlistStore();
  const price = livePrice ?? coin.current_price;
  const isUp = coin.price_change_percentage_24h >= 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
          <div>
            <p className="font-semibold text-sm dark:text-white">{coin.name}</p>
            <p className="text-xs text-gray-500 uppercase">{coin.symbol}</p>
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggle(coin.id); }}
          className="text-gray-400 hover:text-yellow-400 transition-colors"
        >
          <Star size={16} fill={isWatched(coin.id) ? "currentColor" : "none"} className={isWatched(coin.id) ? "text-yellow-400" : ""} />
        </button>
      </div>
      <p className="text-xl font-bold dark:text-white">${price.toLocaleString()}</p>
      <div className={`flex items-center gap-1 text-sm mt-1 ${isUp ? "text-green-500" : "text-red-500"}`}>
        {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
      </div>
      {coin.sparkline_in_7d?.price && (
        <Sparkline data={coin.sparkline_in_7d.price} isUp={isUp} />
      )}
    </motion.div>
  );
}
