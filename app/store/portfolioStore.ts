import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { v4 as uuid } from "crypto";
import { PortfolioItem, Transaction } from "../types";

interface PortfolioStore {
  items: PortfolioItem[];
  addTransaction: (coinId: string, symbol: string, name: string, tx: Omit<Transaction, "id">) => void;
  removeItem: (coinId: string) => void;
  exportJSON: () => string;
  importJSON: (json: string) => void;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      items: [],
      addTransaction: (coinId, symbol, name, tx) => {
        const id = Math.random().toString(36).slice(2);
        set((s) => {
          const existing = s.items.find((i) => i.coinId === coinId);
          const newTx: Transaction = { ...tx, id };
          if (existing) {
            const transactions = [...existing.transactions, newTx];
            const totalCost = transactions
              .filter((t) => t.type === "buy")
              .reduce((acc, t) => acc + t.amount * t.price, 0);
            const totalBought = transactions
              .filter((t) => t.type === "buy")
              .reduce((acc, t) => acc + t.amount, 0);
            const holdings = transactions.reduce(
              (acc, t) => acc + (t.type === "buy" ? t.amount : -t.amount),
              0
            );
            return {
              items: s.items.map((i) =>
                i.coinId === coinId
                  ? { ...i, transactions, holdings, avgBuyPrice: totalCost / totalBought }
                  : i
              ),
            };
          }
          return {
            items: [
              ...s.items,
              { coinId, symbol, name, holdings: tx.amount, avgBuyPrice: tx.price, transactions: [newTx] },
            ],
          };
        });
      },
      removeItem: (coinId) => set((s) => ({ items: s.items.filter((i) => i.coinId !== coinId) })),
      exportJSON: () => JSON.stringify(get().items, null, 2),
      importJSON: (json) => {
        try {
          const items = JSON.parse(json);
          set({ items });
        } catch {}
      },
    }),
    { name: "portfolio" }
  )
);
