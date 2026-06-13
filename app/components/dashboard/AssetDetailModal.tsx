"use client";
import { PriceChart } from "./PriceChart";

import { useState } from "react";
import { usePortfolioStore } from "@/app/store/portfolioStore";
import { Coin } from "@/app/types";
import { Modal } from "@/app/ui/Modal";

interface Props {
  coin: Coin | null;
  onClose: () => void;
}

export function AssetDetailModal({ coin, onClose }: Props) {
  const addTransaction = usePortfolioStore((s) => s.addTransaction);
  const [form, setForm] = useState({ type: "buy" as "buy" | "sell", amount: "", price: "" });

  if (!coin) return null;

  const handleAdd = () => {
    if (!form.amount || !form.price) return;
    addTransaction(coin.id, coin.symbol, coin.name, {
      type: form.type,
      amount: parseFloat(form.amount),
      price: parseFloat(form.price),
      date: new Date().toISOString(),
    });
    setForm({ type: "buy", amount: "", price: "" });
  };

  return (
    <Modal open={!!coin} onClose={onClose} title={`${coin.name} (${coin.symbol.toUpperCase()})`}>
      <PriceChart coin={coin} />
      <div className="mt-4">
        <p className="text-sm font-medium dark:text-white mb-2">Add Transaction</p>
        <div className="flex gap-2 flex-wrap">
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as "buy" | "sell" }))}
            className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            className="w-28 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white"
          />
          <input
            type="number"
            placeholder={`Price (${coin.current_price})`}
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            className="w-36 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white"
          />
          <button onClick={handleAdd} className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
}
