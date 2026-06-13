import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WatchlistStore {
  ids: string[];
  toggle: (id: string) => void;
  isWatched: (id: string) => boolean;
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((i) => i !== id) : [...s.ids, id],
        })),
      isWatched: (id) => get().ids.includes(id),
    }),
    { name: "watchlist" }
  )
);
