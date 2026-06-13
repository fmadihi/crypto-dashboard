import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import { Alert } from "../types";

interface AlertStore {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, "id" | "triggered">) => void;
  removeAlert: (id: string) => void;
  checkAlerts: (prices: Record<string, number>) => void;
}

export const useAlertStore = create<AlertStore>()(
  persist(
    (set, get) => ({
      alerts: [],
      addAlert: (alert) =>
        set((s) => ({
          alerts: [...s.alerts, { ...alert, id: Math.random().toString(36).slice(2), triggered: false }],
        })),
      removeAlert: (id) => set((s) => ({ alerts: s.alerts.filter((a) => a.id !== id) })),
      checkAlerts: (prices) => {
        set((s) => ({
          alerts: s.alerts.map((alert) => {
            const price = prices[alert.coinId];
            if (!price || alert.triggered) return alert;
            const triggered =
              (alert.type === "above" && price >= alert.targetPrice) ||
              (alert.type === "below" && price <= alert.targetPrice);
            if (triggered) {
              toast.success(`🚨 ${alert.coinId} is ${alert.type} $${alert.targetPrice}!`);
            }
            return triggered ? { ...alert, triggered } : alert;
          }),
        }));
      },
    }),
    { name: "alerts" }
  )
);
