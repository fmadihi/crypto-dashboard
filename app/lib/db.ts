import { openDB, DBSchema, IDBPDatabase } from "idb";
import { Alert, PortfolioItem, Widget } from "../types";

interface CryptoDB extends DBSchema {
  portfolio: { key: string; value: PortfolioItem };
  alerts: { key: string; value: Alert };
  widgets: { key: string; value: Widget };
  settings: { key: string; value: unknown };
}

let db: IDBPDatabase<CryptoDB>;

export async function getDB() {
  if (!db) {
    db = await openDB<CryptoDB>("crypto-dashboard", 1, {
      upgrade(db) {
        db.createObjectStore("portfolio", { keyPath: "coinId" });
        db.createObjectStore("alerts", { keyPath: "id" });
        db.createObjectStore("widgets", { keyPath: "id" });
        db.createObjectStore("settings");
      },
    });
  }
  return db;
}

export async function saveSetting(key: string, value: unknown) {
  const db = await getDB();
  await db.put("settings", value, key);
}

export async function getSetting<T>(key: string): Promise<T | undefined> {
  const db = await getDB();
  return db.get("settings", key) as Promise<T | undefined>;
}
