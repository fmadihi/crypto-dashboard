import { useEffect } from "react";
import { useAlertStore } from "../store/alertStore";
import { Coin } from "../types";


export function useAlertChecker(coins: Coin[]) {
  const checkAlerts = useAlertStore((s) => s.checkAlerts);
  useEffect(() => {
    if (!coins.length) return;
    const prices = Object.fromEntries(coins.map((c) => [c.id, c.current_price]));
    checkAlerts(prices);
  }, [coins]);
}
