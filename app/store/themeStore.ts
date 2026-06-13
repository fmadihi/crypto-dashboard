import { create } from "zustand";
import { getSetting, saveSetting } from "../lib/db";

type Theme = "light" | "dark" | "system";

interface ThemeStore {
  theme: Theme;
  setTheme: (t: Theme) => void;
  init: () => Promise<void>;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "system",
  setTheme: async (theme) => {
    set({ theme });
    await saveSetting("theme", theme);
    applyTheme(theme);
  },
  init: async () => {
    const saved = await getSetting<Theme>("theme");
    const theme = saved ?? "system";
    set({ theme });
    applyTheme(theme);
  },
}));

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else if (theme === "light") root.classList.remove("dark");
  else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", prefersDark);
  }
}
