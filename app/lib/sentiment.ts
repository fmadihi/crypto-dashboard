// Lightweight rule-based sentiment (simulates ML scoring for resume purposes)
const POSITIVE_KEYWORDS = ["surge", "bullish", "gain", "rally", "pump", "high", "record", "growth", "adoption"];
const NEGATIVE_KEYWORDS = ["crash", "drop", "bear", "loss", "dump", "low", "hack", "ban", "fear"];

export function analyzeSentiment(text: string): "positive" | "negative" | "neutral" {
  const lower = text.toLowerCase();
  const pos = POSITIVE_KEYWORDS.filter((w) => lower.includes(w)).length;
  const neg = NEGATIVE_KEYWORDS.filter((w) => lower.includes(w)).length;
  if (pos > neg) return "positive";
  if (neg > pos) return "negative";
  return "neutral";
}

// Simulated sentiment score 0-1 (like an ML model output)
export function sentimentScore(text: string): number {
  const lower = text.toLowerCase();
  const pos = POSITIVE_KEYWORDS.filter((w) => lower.includes(w)).length;
  const neg = NEGATIVE_KEYWORDS.filter((w) => lower.includes(w)).length;
  const total = pos + neg || 1;
  return pos / total;
}
