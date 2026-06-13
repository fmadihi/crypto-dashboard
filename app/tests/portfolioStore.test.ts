import { describe, it, expect, beforeEach } from "vitest";
import { usePortfolioStore } from "../store/portfolioStore";

describe("portfolioStore", () => {
  beforeEach(() => usePortfolioStore.setState({ items: [] }));

  it("adds a buy transaction", () => {
    usePortfolioStore.getState().addTransaction("bitcoin", "btc", "Bitcoin", {
      type: "buy", amount: 0.5, price: 60000, date: "2024-01-01",
    });
    const { items } = usePortfolioStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].holdings).toBe(0.5);
    expect(items[0].avgBuyPrice).toBe(60000);
  });

  it("exports and imports JSON", () => {
    usePortfolioStore.getState().addTransaction("ethereum", "eth", "Ethereum", {
      type: "buy", amount: 2, price: 3000, date: "2024-01-01",
    });
    const json = usePortfolioStore.getState().exportJSON();
    usePortfolioStore.setState({ items: [] });
    usePortfolioStore.getState().importJSON(json);
    expect(usePortfolioStore.getState().items).toHaveLength(1);
  });
});
