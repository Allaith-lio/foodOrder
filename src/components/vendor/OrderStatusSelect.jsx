import { orderStatuses } from "../../data/ordersData";

// A colored dropdown that shows the order status and lets the vendor change it.
export default function OrderStatusSelect({ value, onChange, label }) {
  const current = orderStatuses.find((s) => s.key === value);

  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${current.badge}`}
    >
      {orderStatuses.map((s) => (
        <option key={s.key} value={s.key} className="bg-surface text-ink">
          {s.label}
        </option>
      ))}
    </select>
  );
}
