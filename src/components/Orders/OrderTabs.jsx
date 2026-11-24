
const tabs = [
  { id: "active", label: "Active Order" },
  { id: "past", label: "Past Orders" },
  { id: "cancelled", label: "Cancelled" },
];

export default function OrderTabs({ activeTab, onTabChange, counts = {} }) {
  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((t) => {
        const on = activeTab === t.id;
        const count = counts[t.id];
        return (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition ${
              on
                ? "border-ink bg-ink text-surface"
                : "border-line bg-surface text-ink hover:border-primary"
            }`}
          >
            {t.label}
            {count !== undefined && (
              <span
                className={`grid min-w-5 place-items-center rounded-full px-1.5 text-[10px] font-bold ${
                  on ? "bg-primary text-white" : "bg-page text-muted"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}