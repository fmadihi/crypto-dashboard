"use client";
import { NewsItem } from "@/app/types";
import { Skeleton } from "@/app/ui/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";

const SENTIMENT_COLOR = {
  positive: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  negative: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  neutral: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
};

export function NewsFeed() {
  const { data, isLoading } = useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: () => fetch("/api/news").then((r) => r.json()),
    refetchInterval: 300_000,
  });

  if (isLoading) return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="font-semibold mb-4 dark:text-white">Crypto News</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {(data ?? []).map((item) => (<a key={item.id} href={item.url} target="_blank" rel="noreferrer"
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{item.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">{item.source}</span>
                {item.sentiment && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SENTIMENT_COLOR[item.sentiment]}`}>
                    {item.sentiment}
                  </span>
                )}
              </div>
            </div>
            <ExternalLink size={14} className="text-gray-400 shrink-0 mt-1" />
          </a>
        ))}
      </div>
    </div>
  );
}
