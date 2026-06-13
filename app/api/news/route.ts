import { analyzeSentiment } from "@/app/lib/sentiment";
import { NewsItem } from "@/app/types";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const res = await fetch(
      "https://cryptopanic.com/api/v1/posts/?auth_token=public&public=true&kind=news",
      { next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error();
    const data = await res.json();
    const news: NewsItem[] = (data.results || []).slice(0, 20).map((item: { id: number; title: string; url: string; source: { title: string }; published_at: string }) => ({
      id: String(item.id),
      title: item.title,
      url: item.url,
      source: item.source?.title || "Unknown",
      publishedAt: item.published_at,
      sentiment: analyzeSentiment(item.title),
    }));
    return NextResponse.json(news);
  } catch {
    return NextResponse.json([]);
  }
}
