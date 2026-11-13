import { useEffect } from "react";
import { X, User, Phone, MapPin, Truck, CreditCard, StickyNote, ArrowRight } from "lucide-react";
import OrderStatusSelect from "./OrderStatusSelect";
import { orderStatuses, money, orderSubtotal, orderTotal } from "../../data/ordersData";

// Side panel with all the details of one order.
export default function OrderDetails({ order, onClose, onStatusChange }) {
  // Close with the Escape key.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // The next step in the flow (Processing -> Shipping -> Delivered).
  const nextStatus = orderStatuses[orderStatuses.findIndex((s) => s.key === order.status) + 1];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-details-title"
        className="relative h-full w-full max-w-md overflow-y-auto bg-surface p-6 shadow-raised"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="order-details-title" className="text-xl font-extrabold">
              Order {order.id}
            </h2>
            <p className="mt-0.5 text-sm text-muted">Placed {order.placedAt}</p>
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

        {/* Status */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-page p-4">
          <div>
            <p className="text-xs font-semibold text-muted">Status</p>
            <div className="mt-1.5">
              <OrderStatusSelect
                value={order.status}
                label={`Status of order ${order.id}`}
                onChange={(status) => onStatusChange(order.id, status)}
              />
            </div>
          </div>
          {nextStatus && (
            <button
              type="button"
              onClick={() => onStatusChange(order.id, nextStatus.key)}
              className="btn btn-primary"
            >
              Mark as {nextStatus.label}
              <ArrowRight className="size-4" />
            </button>
          )}
        </div>

        {/* Customer + delivery info */}
        <ul className="mt-6 space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <User className="mt-0.5 size-4 shrink-0 text-muted" />
            <span className="font-semibold">{order.customer}</span>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-muted" />
            <span>{order.phone}</span>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-muted" />
            <span>
              {order.address}
              <span className="block text-xs text-muted">{order.area}</span>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Truck className="mt-0.5 size-4 shrink-0 text-muted" />
            <span>{order.courier}</span>
          </li>
          <li className="flex items-start gap-3">
            <CreditCard className="mt-0.5 size-4 shrink-0 text-muted" />
            <span>{order.payment}</span>
          </li>
        </ul>

        {order.note && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-secondary/30 bg-secondary/10 p-3 text-sm">
            <StickyNote className="mt-0.5 size-4 shrink-0 text-secondary" />
            <p>
              <span className="font-semibold">Customer note: </span>
              {order.note}
            </p>
          </div>
        )}

        {/* Items */}
        <h3 className="mt-7 text-base font-bold">Items</h3>
        <ul className="mt-3 divide-y divide-line rounded-xl border border-line">
          {order.items.map((item) => (
            <li key={item.name} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
              <span>
                <span className="mr-2 font-bold text-primary">{item.qty}×</span>
                {item.name}
              </span>
              <span className="font-semibold">{money(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>

        {/* Totals */}
        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between text-muted">
            <dt>Subtotal</dt>
            <dd>{money(orderSubtotal(order))}</dd>
          </div>
          <div className="flex justify-between text-muted">
            <dt>Delivery fee</dt>
            <dd>{order.deliveryFee === 0 ? "Free" : money(order.deliveryFee)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3 text-base font-extrabold">
            <dt>Total</dt>
            <dd>{money(orderTotal(order))}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
