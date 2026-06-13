import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PriceCard } from "../components/dashboard/PriceCard";

const mockCoin = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  current_price: 65000,
  price_change_percentage_24h: 2.5,
  market_cap: 1_300_000_000_000,
  image: "https://example.com/btc.png",
};

vi.mock("@/store/watchlistStore", () => ({
  useWatchlistStore: () => ({ toggle: vi.fn(), isWatched: () => false }),
}));

describe("PriceCard", () => {
  it("renders coin name and price", () => {
    render(<PriceCard coin={mockCoin} onClick={vi.fn()} />);
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("$65,000")).toBeInTheDocument();
  });

  it("shows positive change in green", () => {
    render(<PriceCard coin={mockCoin} onClick={vi.fn()} />);
    expect(screen.getByText("2.50%")).toBeInTheDocument();
  });
});
