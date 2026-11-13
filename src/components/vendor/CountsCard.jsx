import { Store, Users } from "lucide-react";

const icons = { restaurants: Store, customers: Users };

// Shows how many restaurants and customers are on the platform.
export default function CountsCard({ items }) {
  return (
    <section className="rounded-card border border-line bg-surface p-5 shadow-card">
      <h3 className="text-base font-bold">Platform at a glance</h3>
      <p className="mt-0.5 text-xs text-muted">Restaurants and customers on the platform</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {items.map((item) => {
          const Icon = icons[item.key];
          return (
            <div key={item.key} className="rounded-xl bg-page p-4">
              <span className="flex size-9 items-center justify-center rounded-lg bg-surface text-primary shadow-card">
                <Icon className="size-4" />
              </span>
              <p className="mt-3 text-2xl font-extrabold tracking-tight">{item.value}</p>
              <p className="text-xs font-medium text-muted">{item.label}</p>
              <p className="mt-1 text-[11px] font-semibold text-tertiary">{item.note}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
