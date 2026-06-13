"use client";
import { usePortfolioStore } from "@/app/store/portfolioStore";
import { useThemeStore } from "@/app/store/themeStore";
import { Sun, Moon, Monitor, Download, Upload } from "lucide-react";
import { useRef } from "react";

export function Topbar({ title }: { title: string }) {
  const { theme, setTheme } = useThemeStore();
  const { exportJSON, importJSON } = usePortfolioStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const blob = new Blob([exportJSON()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "portfolio.json";
    a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => importJSON(ev.target?.result as string);
    reader.readAsText(file);
  };

  const themeIcons = [
    { icon: Sun, value: "light" },
    { icon: Moon, value: "dark" },
    { icon: Monitor, value: "system" },
  ] as const;

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-30">
      <h1 className="text-lg font-semibold dark:text-white">{title}</h1>
      <div className="flex items-center gap-2">
        <button onClick={handleExport} title="Export Portfolio" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
          <Download size={18} />
        </button>
        <button onClick={() => fileRef.current?.click()} title="Import Portfolio" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
          <Upload size={18} />
        </button>
        <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-1">
          {themeIcons.map(({ icon: Icon, value }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`p-1.5 rounded-md transition-colors ${theme === value ? "bg-white dark:bg-gray-700 shadow-sm" : "text-gray-500"}`}
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
