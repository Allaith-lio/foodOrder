import { useEffect, useMemo, useState } from "react";
import OrdersHeader from "../components/orders/OrdersHeader";
import OrderTabs from "../components/orders/OrderTabs";
import ActiveOrder from "../components/orders/ActiveOrder";
import PastOrders from "../components/orders/PastOrders";
import CancelledOrders from "../components/orders/CancelledOrders";
import SupportSection from "../components/orders/SupportSection";
import Reveal from "../components/common/Reveal";
import { Trash2 } from "lucide-react";
import {
  getCustomerOrders,
  clearCompletedOrders,
  ORDERS_KEY,
} from "../services/ordersService";

const normalize = (value = "") => String(value).toLowerCase().trim();

const matchesQuery = (order, query) => {
  const q = normalize(query);
  if (!q) return true;

  const haystack = [
    order.restaurant,
    order.number,
    ...(order.items || []).map((i) => i.name),
  ]
    .filter(Boolean)
    .join(" ");

  return normalize(haystack).includes(q);
};

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState("active");
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState(getCustomerOrders);

  useEffect(() => {
    const reload = () => setOrders(getCustomerOrders());
    const onStorage = (e) => {
      if (e.key === ORDERS_KEY) reload();
    };
    window.addEventListener("orderschange", reload);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("orderschange", reload);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const filtered = useMemo(
    () => orders.filter((o) => matchesQuery(o, query)),
    [orders, query],
  );

  const isInFlight = (o) => o.status === "preparing" || o.status === "active";

  const activeOrder = filtered.find(isInFlight) || null;
  const pastOrders = filtered.filter((o) => o.status === "delivered");
  const cancelledOrders = filtered.filter((o) => o.status === "cancelled");

  const tabCounts = {
    active: filtered.filter(isInFlight).length,
    past: pastOrders.length,
    cancelled: cancelledOrders.length,
  };

  const hasHistory = pastOrders.length + cancelledOrders.length > 0;

  const handleClearHistory = () => {
    if (
      !window.confirm(
        "Delete all delivered and cancelled orders? Active orders are kept.",
      )
    )
      return;
    clearCompletedOrders();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <OrdersHeader query={query} onQuery={setQuery} />

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <OrderTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={tabCounts}
        />
        {hasHistory && (
          <button
            type="button"
            onClick={handleClearHistory}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-surface px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-primary hover:text-primary"
          >
            <Trash2 className="size-3.5" />
            Clear old orders
          </button>
        )}
      </div>

      <Reveal key={activeTab}>
        <div className="mt-8">
          {activeTab === "active" && <ActiveOrder order={activeOrder} />}
          {activeTab === "past" && <PastOrders orders={pastOrders} />}
          {activeTab === "cancelled" && (
            <CancelledOrders orders={cancelledOrders} />
          )}
        </div>
        <SupportSection />
      </Reveal>
    </div>
  );
}
