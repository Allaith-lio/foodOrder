import { useEffect } from "react";
import { X, Mail, Phone, MapPin, Ban, ShieldCheck, ShieldAlert } from "lucide-react";
import { RiskBadge, StatusBadge } from "./CustomerBadges";
import { money } from "../../data/ordersData";
import { averageOrder, initials } from "../../data/customersData";

// Side panel with a short profile of one customer and their recent purchases.
export default function CustomerDetails({ customer, onClose, onBlock, onUnblock }) {
  // Close with the Escape key (but not when the "Are you sure?" window is open on top).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !document.querySelector('[role="alertdialog"]')) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isBlocked = customer.status === "blocked";

  const stats = [
    { label: "Orders", value: customer.orders },
    { label: "Total spent", value: money(customer.spent) },
    { label: "Avg. order", value: money(averageOrder(customer)) },
    { label: "Joined", value: customer.joined },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="customer-details-title"
        className="relative h-full w-full max-w-md overflow-y-auto bg-surface p-6 shadow-raised"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
              {initials(customer.name)}
            </span>
            <div className="min-w-0">
              <h2 id="customer-details-title" className="truncate text-xl font-extrabold">
                {customer.name}
              </h2>
              <p className="text-xs text-muted">{customer.id}</p>
            </div>
          </div>
          <button
            type="button"
            autoFocus
            aria-label="Close details"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-2 text-muted transition-colors hover:bg-page hover:text-ink"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Status + block / unblock */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-page p-4">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={customer.status} />
            <RiskBadge level={customer.risk} />
          </div>
          {isBlocked ? (
            <button type="button" onClick={() => onUnblock(customer.id)} className="btn btn-tertiary">
              <ShieldCheck className="size-4" />
              Unblock
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onBlock(customer.id)}
              className="btn border-red-500/30 bg-red-500/10 text-red-500 transition-colors hover:bg-red-500/20"
            >
              <Ban className="size-4" />
              Block account
            </button>
          )}
        </div>

        {/* Why the account looks risky */}
        {customer.risk !== "low" && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm">
            <ShieldAlert className="mt-0.5 size-4 shrink-0 text-red-500" />
            <p>
              <span className="font-semibold">Why it was flagged: </span>
              {customer.riskNote}
            </p>
          </div>
        )}

        {/* Contact */}
        <ul className="mt-6 space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 size-4 shrink-0 text-muted" />
            <span className="break-all">{customer.email}</span>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-muted" />
            <span>{customer.phone}</span>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-muted" />
            <span>{customer.location}</span>
          </li>
        </ul>

        {/* Numbers */}
        <dl className="mt-6 grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-line p-3">
              <dt className="text-xs text-muted">{s.label}</dt>
              <dd className="mt-1 text-lg font-extrabold">{s.value}</dd>
            </div>
          ))}
        </dl>

        {/* Recent purchases */}
        <h3 className="mt-7 text-base font-bold">Recent purchases</h3>
        <ul className="mt-3 divide-y divide-line rounded-xl border border-line">
          {customer.purchases.map((p) => (
            <li key={p.orderId} className="px-4 py-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="font-bold">{p.orderId}</span>
                <span className="font-semibold">{money(p.total)}</span>
              </div>
              <p className="mt-0.5 text-muted">{p.items}</p>
              <p className="mt-0.5 text-xs text-muted">{p.date}</p>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
