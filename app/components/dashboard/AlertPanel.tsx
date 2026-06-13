"use client";
import { useState } from "react";
import { Bell, Trash2, Plus } from "lucide-react";
import { Coin } from "@/app/types";
import { useAlertStore } from "@/app/store/alertStore";


export function AlertPanel({ coins }: { coins: Coin[] }) {
  const { alerts, addAlert, removeAlert } = useAlertStore();
  const [form, setForm] = useState({ coinId: "", type: "above" as "above" | "below", price: "" });

  const handleAdd = () => {
    if (!form.coinId || !form.price) return;
    addAlert({ coinId: form.coinId, type: form.type, targetPrice: parseFloat(form.price) });
    setForm({ coinId: "", type: "above", price: "" });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="font-semibold mb-4 dark:text-white flex items-center gap-2"><Bell size={18} />Price Alerts</h3>
      <div className="flex gap-2 mb-4 flex-wrap">
        <select
          value={form.coinId}
          onChange={(e) => setForm((f) => ({ ...f, coinId: e.target.value }))}
          className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select coin</option>
          {coins.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select
          value={form.type}
          onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as "above" | "below" }))}
          className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="above">Above</option>
          <option value="below">Below</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          className="w-28 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 dark:text-white"
        />
        <button onClick={handleAdd} className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus size={16} />
        </button>
      </div><div className="space-y-2 max-h-48 overflow-y-auto">
        {alerts.map((a) => (
          <div key={a.id} className={`flex items-center justify-between text-sm p-2 rounded-lg ${a.triggered ? "bg-green-50 dark:bg-green-900/20" : "bg-gray-50 dark:bg-gray-700/50"}`}>
            <span className="dark:text-white">{a.coinId} {a.type} ${a.targetPrice.toLocaleString()}</span>
            {a.triggered && <span className="text-xs text-green-600 dark:text-green-400">✓ Triggered</span>}
            <button onClick={() => removeAlert(a.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        ))}
        {!alerts.length && <p className="text-gray-400 text-sm text-center py-2">No alerts set</p>}
      </div>
    </div>
  );
}
