// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { Search, Zap } from "lucide-react";
import { Virtuoso } from "react-virtuoso";
import { Coin, Widget } from "./types";
import { useDebounce } from "./hooks/useDebounce";
import { useThemeStore } from "./store/themeStore";
import { useCoins } from "./hooks/usePrices";
import { useAlertChecker } from "./hooks/useAlerts";
import { useBinanceWS } from "./hooks/useWebSocket";
import { PortfolioSummary } from "./components/dashboard/PortfolioSummary";
import { CompareChart } from "./components/dashboard/CompareChart";
import { AlertPanel } from "./components/dashboard/AlertPanel";
import { PriceCard } from "./components/dashboard/PriceCard";
import { Skeleton } from "./ui/Skeleton";
import { WatchList } from "./components/dashboard/WatchList";
import { NewsFeed } from "./components/dashboard/NewsFeed";
import { DraggableWidgetGrid } from "./components/dashboard/DraggableWidgetGrid";
import { AssetDetailModal } from "./components/dashboard/AssetDetailModal";
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";

const PAGE_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  portfolio: "Portfolio",
  compare: "Compare",
  watchlist: "Watchlist",
  alerts: "Alerts",
  news: "News",
};

const DEFAULT_WIDGETS: Widget[] = [
  { id: "portfolio", type: "portfolio", order: 0 },
  { id: "compare", type: "compare", order: 1 },
  { id: "alerts", type: "alerts", order: 2 },
];

export default function Home() {
  const [tab, setTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});
  const debouncedSearch = useDebounce(search, 400);
  const { init } = useThemeStore();

  useEffect(() => { init(); }, []);

  const { data: coins = [], isLoading } = useCoins(1, debouncedSearch);
  useAlertChecker(coins);

  const topSymbols = coins.slice(0, 10).map((c) => c.symbol.toUpperCase());
  useBinanceWS(topSymbols, (symbol, price) => {
    setLivePrices((p) => ({ ...p, [symbol.toLowerCase()]: price }));
  });

  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case "portfolio": return <PortfolioSummary coins={coins} />;
      case "compare": return <CompareChart coins={coins.slice(0, 5)} />;
      case "alerts": return <AlertPanel coins={coins} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar active={tab} onNav={setTab} />
      <div className="ml-16 lg:ml-56">
        <Topbar title={PAGE_TITLES[tab]} />
        <main className="p-6">
          {tab === "dashboard" && (
            <>
              <div className="relative mb-6">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search coins..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full max-w-sm pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {Object.keys(livePrices).length > 0 && (
                  <span className="ml-3 inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <Zap size={12} className="animate-pulse" />Live</span>
                )}
              </div>
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-40" />)}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {coins.map((coin) => (
                    <PriceCard
                      key={coin.id}
                      coin={coin}
                      livePrice={livePrices[coin.symbol.toLowerCase()]}
                      onClick={() => setSelectedCoin(coin)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
          {tab === "portfolio" && <PortfolioSummary coins={coins} />}
          {tab === "compare" && (
            <div className="max-w-4xl">
              <CompareChart coins={coins.slice(0, 5)} />
            </div>
          )}
          {tab === "watchlist" && <WatchList coins={coins} />}
          {tab === "alerts" && <AlertPanel coins={coins} />}
          {tab === "news" && <NewsFeed />}{tab === "dashboard" && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DraggableWidgetGrid widgets={DEFAULT_WIDGETS} renderWidget={renderWidget} />
              </div>
              <div className="space-y-4">
                <WatchList coins={coins} />
                <NewsFeed />
              </div>
            </div>
          )}
        </main>
      </div>
      <AssetDetailModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
    </div>
  );
}
