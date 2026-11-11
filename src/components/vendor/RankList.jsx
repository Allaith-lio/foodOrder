const barColors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-sky-500", "bg-muted"];

// A card with a ranked list and progress bars (used for locations and categories).
export default function RankList({ title, subtitle, icon: Icon, items }) {
  return (
    <section className="rounded-card border border-line bg-surface p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold">{title}</h3>
          <p className="mt-0.5 text-xs text-muted">{subtitle}</p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
      </div>

      <ul className="mt-5 space-y-4">
        {items.map((item, index) => (
          <li key={item.name}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-medium">
                <span className="mr-2 text-muted">{index + 1}</span>
                {item.name}
              </span>
              <span className="font-bold">{item.share}%</span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-page"
              role="progressbar"
              aria-label={item.name}
              aria-valuenow={item.share}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={`h-full rounded-full ${barColors[index % barColors.length]}`}
                style={{ width: `${item.share}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
