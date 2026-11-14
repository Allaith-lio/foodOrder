import { useState } from "react";
import { Search, Eye, Ban, ShieldCheck, Inbox, Info } from "lucide-react";
import { RiskBadge, StatusBadge } from "../../components/vendor/CustomerBadges";
import CustomerDetails from "../../components/vendor/CustomerDetails";
import ConfirmDialog from "../../components/vendor/ConfirmDialog";
import { customers as initialCustomers, initials } from "../../data/customersData";
import { money } from "../../data/ordersData";

// Does a customer belong in this tab?
const inTab = (customer, tab) => {
  if (tab === "active") return customer.status === "active";
  if (tab === "blocked") return customer.status === "blocked";
  if (tab === "suspicious") return customer.risk !== "low";
  return true; // "all"
};

const tabDefs = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "blocked", label: "Blocked" },
  { key: "suspicious", label: "Suspicious" },
];

// Vendor "Customers Management" page: see customers, check their purchases, block fake accounts.
export default function CustomersManagement() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null); // customer shown in the side panel
  const [blockId, setBlockId] = useState(null); // customer waiting for "Are you sure?"

  const setStatus = (id, status) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const confirmBlock = () => {
    setStatus(blockId, "blocked");
    setBlockId(null);
  };

  const tabs = tabDefs.map((t) => ({ ...t, count: customers.filter((c) => inTab(c, t.key)).length }));

  // Filter by tab, then by the search text (name, email, or customer id).
  const text = query.trim().toLowerCase();
  const visible = customers.filter((c) => {
    if (!inTab(c, tab)) return false;
    if (!text) return true;
    return (
      c.name.toLowerCase().includes(text) || c.email.toLowerCase().includes(text) || c.id.toLowerCase().includes(text)
    );
  });

  const selectedCustomer = customers.find((c) => c.id === selectedId);
  const customerToBlock = customers.find((c) => c.id === blockId);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Store operations</p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">Customer Management</h1>
        <p className="mt-1 text-sm text-muted">See your customers, check what they bought, and block fake accounts.</p>
      </header>

      <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-sm text-muted">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" />
        <p>
          Demo mode: blocking only changes the status on this page. A real block needs the backend to check the status
          when the customer logs in.
        </p>
      </div>

      <section className="rounded-card border border-line bg-surface shadow-card">
        {/* Tabs + search */}
        <div className="flex flex-col gap-4 border-b border-line p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                aria-pressed={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`flex cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                  tab === t.key ? "bg-ink text-surface" : "border border-line text-muted hover:text-ink"
                }`}
              >
                {t.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    tab === t.key ? "bg-surface/20" : "bg-page"
                  }`}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          <label className="relative block w-full lg:w-72">
            <span className="sr-only">Search customers</span>
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, or ID..."
              className="w-full rounded-xl border border-line bg-page py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted focus:border-primary"
            />
          </label>
        </div>

        {/* Customers table */}
        {visible.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
                  <th scope="col" className="px-5 py-3 font-semibold">Customer</th>
                  <th scope="col" className="hidden px-3 py-3 font-semibold lg:table-cell">Joined</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Orders / Spent</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Risk</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {visible.map((c) => {
                  const isBlocked = c.status === "blocked";
                  return (
                    <tr
                      key={c.id}
                      className={`transition-colors ${isBlocked ? "bg-red-500/5" : "hover:bg-page/60"}`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {initials(c.name)}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-semibold">{c.name}</p>
                            <p className="truncate text-xs text-muted">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden px-3 py-4 lg:table-cell">
                        <p>{c.joined}</p>
                        <p className="text-xs text-muted">{c.location}</p>
                      </td>
                      <td className="px-3 py-4">
                        <p className="font-bold">{money(c.spent)}</p>
                        <p className="text-xs text-muted">{c.orders} orders</p>
                      </td>
                      <td className="px-3 py-4">
                        <RiskBadge level={c.risk} />
                      </td>
                      <td className="px-3 py-4">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedId(c.id)}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-page"
                          >
                            <Eye className="size-3.5" />
                            View
                          </button>
                          {isBlocked ? (
                            <button
                              type="button"
                              onClick={() => setStatus(c.id, "active")}
                              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-tertiary/10 px-3 py-1.5 text-xs font-semibold text-tertiary transition-colors hover:bg-tertiary/20"
                            >
                              <ShieldCheck className="size-3.5" />
                              Unblock
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setBlockId(c.id)}
                              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-500/20"
                            >
                              <Ban className="size-3.5" />
                              Block
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-page text-muted">
              <Inbox className="size-6" />
            </span>
            <p className="font-bold">No customers found</p>
            <p className="text-sm text-muted">Try another tab or a different search.</p>
          </div>
        )}

        <p className="border-t border-line px-5 py-3 text-xs text-muted">
          Showing {visible.length} of {customers.length} customers
        </p>
      </section>

      {selectedCustomer && (
        <CustomerDetails
          customer={selectedCustomer}
          onClose={() => setSelectedId(null)}
          onBlock={setBlockId}
          onUnblock={(id) => setStatus(id, "active")}
        />
      )}

      {customerToBlock && (
        <ConfirmDialog
          title={`Block ${customerToBlock.name}?`}
          message="This account will be marked as blocked. You can unblock it again at any time."
          confirmLabel="Yes, block"
          onConfirm={confirmBlock}
          onCancel={() => setBlockId(null)}
        />
      )}
    </div>
  );
}
