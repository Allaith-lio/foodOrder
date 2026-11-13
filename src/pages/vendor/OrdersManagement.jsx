import { useState } from "react";
import { Search, Eye, Inbox } from "lucide-react";
import OrderStatusSelect from "../../components/vendor/OrderStatusSelect";
import OrderDetails from "../../components/vendor/OrderDetails";
import { orders as initialOrders, orderStatuses, money, orderTotal } from "../../data/ordersData";

// Vendor "Orders Management" page: see incoming orders and change their status.
export default function OrdersManagement() {
  const [orders, setOrders] = useState(initialOrders);
  const [tab, setTab] = useState("all"); // "all" or a status key
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // Change the status of one order. Everything on the page updates right away.
  const changeStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const tabs = [
    { key: "all", label: "All", count: orders.length },
    ...orderStatuses.map((s) => ({
      key: s.key,
      label: s.label,
      count: orders.filter((o) => o.status === s.key).length,
    })),
  ];

  // Filter by tab, then by the search text (order number, customer, or dish).
  const text = query.trim().toLowerCase();
  const visible = orders.filter((o) => {
    if (tab !== "all" && o.status !== tab) return false;
    if (!text) return true;
    return (
      o.id.toLowerCase().includes(text) ||
      o.customer.toLowerCase().includes(text) ||
      o.items.some((i) => i.name.toLowerCase().includes(text))
    );
  });

  const selectedOrder = orders.find((o) => o.id === selectedId);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Store operations</p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">Order Management</h1>
        <p className="mt-1 text-sm text-muted">See incoming orders and move them from processing to delivered.</p>
      </header>

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
            <span className="sr-only">Search orders</span>
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search order, customer, or dish..."
              className="w-full rounded-xl border border-line bg-page py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted focus:border-primary"
            />
          </label>
        </div>

        {/* Orders table */}
        {visible.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
                  <th scope="col" className="px-5 py-3 font-semibold">Order</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Customer</th>
                  <th scope="col" className="hidden px-3 py-3 font-semibold lg:table-cell">Items</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Total</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {visible.map((order) => (
                  <tr key={order.id} className="transition-colors hover:bg-page/60">
                    <td className="px-5 py-4">
                      <p className="font-bold">{order.id}</p>
                      <p className="text-xs text-muted">{order.placedAt}</p>
                    </td>
                    <td className="px-3 py-4">
                      <p className="font-semibold">{order.customer}</p>
                      <p className="text-xs text-muted">{order.area}</p>
                    </td>
                    <td className="hidden px-3 py-4 text-muted lg:table-cell">
                      {order.items[0].qty}× {order.items[0].name}
                      {order.items.length > 1 && ` +${order.items.length - 1} more`}
                    </td>
                    <td className="px-3 py-4 font-bold">{money(orderTotal(order))}</td>
                    <td className="px-3 py-4">
                      <OrderStatusSelect
                        value={order.status}
                        label={`Status of order ${order.id}`}
                        onChange={(status) => changeStatus(order.id, status)}
                      />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedId(order.id)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-page"
                      >
                        <Eye className="size-3.5" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-page text-muted">
              <Inbox className="size-6" />
            </span>
            <p className="font-bold">No orders found</p>
            <p className="text-sm text-muted">Try another tab or a different search.</p>
          </div>
        )}

        <p className="border-t border-line px-5 py-3 text-xs text-muted">
          Showing {visible.length} of {orders.length} orders
        </p>
      </section>

      {selectedOrder && (
        <OrderDetails order={selectedOrder} onClose={() => setSelectedId(null)} onStatusChange={changeStatus} />
      )}
    </div>
  );
}
