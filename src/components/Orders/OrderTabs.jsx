
const tabs = [
  { id: "active", label: "Active Order", count: 1 },
  { id: "past", label: "Past Orders", count: 14 },
  { id: "cancelled", label: "Cancelled" },
];

export default function OrderTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((t) => {
        const on = activeTab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition ${
              on
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
          >
            {t.label}
            {t.count !== undefined && (
              <span
                className={`grid min-w-5 place-items-center rounded-full px-1.5 text-[10px] font-bold ${
                  on ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {t.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}