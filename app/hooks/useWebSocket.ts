
import { useEffect, useRef } from "react";

// Binance WebSocket for real-time prices
export function useBinanceWS(symbols: string[], onPrice: (symbol: string, price: number) => void) {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!symbols.length) return;
    const streams = symbols.map((s) => `${s.toLowerCase()}usdt@miniTicker`).join("/");
    ws.current = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.data) {
        const symbol = data.data.s.replace("USDT", "").toLowerCase();
        onPrice(symbol, parseFloat(data.data.c));
      }
    };
    return () => ws.current?.close();
  }, [symbols.join(",")]);
}
