import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search") || "";
  const page = req.nextUrl.searchParams.get("page") || "1";

  const url = new URL("https://api.coingecko.com/api/v3/coins/markets");
  url.searchParams.set("vs_currency", "usd");
  url.searchParams.set("order", "market_cap_desc");
  url.searchParams.set("per_page", "50");
  url.searchParams.set("page", page);
  url.searchParams.set("sparkline", "true");

  const res = await fetch(url.toString(), { next: { revalidate: 30 } });
  if (!res.ok) return NextResponse.json({ error: "CoinGecko error" }, { status: 502 });

  const data = await res.json();
  const filtered = search
    ? data.filter(
        (c: { name: string; symbol: string }) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.symbol.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return NextResponse.json(filtered);
}
