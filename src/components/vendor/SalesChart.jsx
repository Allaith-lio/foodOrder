import { useState } from "react";

const ranges = [
  { key: "week", label: "This week" },
  { key: "month", label: "This month" },
];

// Picks a "round" top value for the chart so the grid lines look clean (e.g. 600, 1200, 1800, 2400).
function niceScale(max, intervals = 4) {
  const rawStep = max / intervals;
  const pow = 10 ** Math.floor(Math.log10(rawStep));
  const multiplier = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 7.5, 10].find((m) => m * pow >= rawStep);
  const step = multiplier * pow;
  return { step, top: step * intervals };
}

const money = (v) => `$${v.toLocaleString("en-US")}`;
const short = (v) => (v >= 1000 ? `$${+(v / 1000).toFixed(1)}k` : `$${v}`);

// Bar chart with a week / month switch. The busiest bar is highlighted.
export default function SalesChart({ data }) {
  const [range, setRange] = useState("week");

  const points = data[range];
  const max = Math.max(...points.map((p) => p.value));
  const { step, top } = niceScale(max);
  const ticks = Array.from({ length: 5 }, (_, i) => i * step);
  const peak = points.find((p) => p.value === max);
  const total = points.reduce((sum, p) => sum + p.value, 0);

  return (
    <section className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Sales Performance</h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted">
            Find your busiest days
            <span className="inline-flex items-center gap-1.5 text-xs">
              <span className="size-2.5 rounded-full bg-secondary" /> Peak
            </span>
          </p>
        </div>

        {/* Week / Month switch */}
        <div className="inline-flex rounded-xl border border-line bg-page p-1">
          {ranges.map((r) => (
            <button
              key={r.key}
              type="button"
              aria-pressed={range === r.key}
              onClick={() => setRange(r.key)}
              className={`cursor-pointer rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${
                range === r.key ? "bg-surface text-ink shadow-card" : "text-muted hover:text-ink"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 flex">
        {/* Y axis (money) */}
        <div className="relative mr-3 h-64 w-11 shrink-0" aria-hidden="true">
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute right-0 translate-y-1/2 text-[11px] text-muted"
              style={{ bottom: `${(t / top) * 100}%` }}
            >
              {short(t)}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          {/* Plot area */}
          <div className="relative h-64">
            {ticks.map((t) => (
              <div
                key={t}
                className="absolute inset-x-0 border-t border-dashed border-line"
                style={{ bottom: `${(t / top) * 100}%` }}
              />
            ))}

            <div className="absolute inset-0 flex items-end gap-2 px-1 sm:gap-4">
              {points.map((p) => {
                const isPeak = p.value === max;
                return (
                  <div key={p.label} className="group relative flex h-full flex-1 items-end">
                    <div
                      role="img"
                      aria-label={`${p.label}: ${money(p.value)}`}
                      className={`relative w-full rounded-t-lg transition-all duration-300 ${
                        isPeak ? "bg-secondary" : "bg-primary/70 group-hover:bg-primary"
                      }`}
                      style={{ height: `${(p.value / top) * 100}%` }}
                    >
                      <span
                        className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[11px] font-bold text-surface transition-opacity group-hover:opacity-100 ${
                          isPeak ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {money(p.value)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* X axis (days) */}
          <div className="mt-2 flex gap-2 px-1 sm:gap-4">
            {points.map((p) => (
              <span key={p.label} className="flex-1 text-center text-xs font-medium text-muted">
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
        Total <strong className="text-ink">{money(total)}</strong> · Busiest:{" "}
        <strong className="text-ink">
          {peak.label} ({money(peak.value)})
        </strong>
      </p>
    </section>
  );
}
