import { useQuery } from "@tanstack/react-query";
import { Coin } from "../types";

export function useCoins(page = 1, search = "") {
  return useQuery<Coin[]>({
    queryKey: ["coins", page, search],
    queryFn: async () => {
      const res = await fetch(`/api/prices?page=${page}&search=${encodeURIComponent(search)}`);
      if (!res.ok) throw new Error("Failed to fetch prices");
      return res.json();
    },
    refetchInterval: 60_000,
  });
}
