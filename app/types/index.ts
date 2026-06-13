export interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
  sparkline_in_7d?: { price: number[] };
}

export interface Transaction {
  id: string;
  // coinId: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  date: string;
}

export interface PortfolioItem {
  coinId: string;
  symbol: string;
  name: string;
  holdings: number;
  avgBuyPrice: number;
  transactions: Transaction[];
}

export interface Alert {
  id: string;
  coinId: string;
  type: "above" | "below";
  targetPrice: number;
  triggered: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  sentiment?: "positive" | "negative" | "neutral";
}

export interface Widget {
  id: string;
  type: "prices" | "portfolio" | "chart" | "news" | "alerts" | "watchlist" | "compare";
  order: number;
}
