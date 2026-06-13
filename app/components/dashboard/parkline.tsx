import { ResponsiveContainer, LineChart, Line } from "recharts";

export function Sparkline({ data, isUp }: { data: number[]; isUp: boolean }) {
  const chartData = data.slice(-24).map((v) => ({ v }));
  return (
    <div className="h-12 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="v" stroke={isUp ? "#22c55e" : "#ef4444"} dot={false} strokeWidth={1.5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
