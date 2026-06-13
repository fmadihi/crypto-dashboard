"use client";
import { LayoutDashboard, Briefcase, Bell, Star, Newspaper, BarChart2 } from "lucide-react";
import { clsx } from "clsx";

const links = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Briefcase, label: "Portfolio", id: "portfolio" },
  { icon: BarChart2, label: "Compare", id: "compare" },
  { icon: Star, label: "Watchlist", id: "watchlist" },
  { icon: Bell, label: "Alerts", id: "alerts" },
  { icon: Newspaper, label: "News", id: "news" },
];

export function Sidebar({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  return (
    <aside className="w-16 lg:w-56 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col py-6 gap-1 fixed left-0 top-0 z-40">
      <div className="px-4 mb-6 hidden lg:block">
        <span className="text-xl font-bold text-indigo-600">CryptoDash</span>
      </div>
      {links.map(({ icon: Icon, label, id }) => (
        <button
          key={id}
          onClick={() => onNav(id)}
          className={clsx(
            "flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-sm font-medium transition-colors",
            active === id
              ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <Icon size={20} />
          <span className="hidden lg:inline">{label}</span>
        </button>
      ))}
    </aside>
  );
}
