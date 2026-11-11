import { DollarSign, Wallet, ShoppingBag, Users, TrendingUp, TrendingDown } from "lucide-react";

const icons = { sales: DollarSign, profit: Wallet, orders: ShoppingBag, users: Users };

// One number card (Total Sales, Net Profit, ...).
export default function StatCard({ icon, label, value, change, tone }) {
  const Icon = icons[icon];
  const isUp = change >= 0;
  const Trend = isUp ? TrendingUp : TrendingDown;

  return (
    <div className="rounded-card border border-line bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted">{label}</p>
        <span className={`flex size-10 items-center justify-center rounded-xl ${tone}`}>
          <Icon className="size-5" />
        </span>
      </div>

      <p className="mt-3 text-3xl font-extrabold tracking-tight">{value}</p>

      <div className="mt-3 flex items-center gap-2 text-xs text-muted">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold ${
            isUp ? "bg-tertiary/10 text-tertiary" : "bg-red-500/10 text-red-500"
          }`}
        >
          <Trend className="size-3" />
          {isUp ? "+" : ""}
          {change}%
        </span>
        vs last month
      </div>
    </div>
  );
}
