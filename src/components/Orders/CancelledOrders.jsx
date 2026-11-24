import { useNavigate } from "react-router-dom";
import { PackageX, RotateCcw } from "lucide-react";
import {
  toCancelledView,
  money,
  cardCls,
  orderToCartItems,
} from "./ordersData";
import { useShoppingCart } from "../../hooks/CartContext";

export default function CancelledOrders({ orders = [] }) {
  const rows = orders.map(toCancelledView);
  const { addToCart } = useShoppingCart();
  const navigate = useNavigate();

  const reorder = (order) => {
    orderToCartItems(order).forEach((item) =>
      addToCart(item, item.quantity),
    );
    navigate("/cart");
  };

  return (
    <section>
      <h2 className="text-2xl font-extrabold text-ink">Cancelled Orders</h2>
      <p className="mb-4 text-xs text-muted">
        Orders that were cancelled before delivery.
      </p>

      {rows.length === 0 ? (
        <div className={`${cardCls} flex flex-col items-center gap-3 px-6 py-14 text-center`}>
          <span className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
            <PackageX className="size-7" />
          </span>
          <div>
            <p className="font-bold text-ink">No cancelled orders</p>
            <p className="mt-1 text-sm text-muted">
              Nothing to worry about — cancelled orders will appear here if
              you ever need to review one.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((o) => (
            <article key={o.id} className={`${cardCls} flex gap-4 p-5`}>
              <img
                src={o.img}
                alt={o.name}
                className="size-12 shrink-0 rounded-lg bg-page object-cover grayscale"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="flex items-center gap-2 font-bold text-ink">
                      {o.name}
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        Cancelled
                      </span>
                    </h3>
                    <p className="text-[11px] text-muted">
                      {o.date} • Order {o.number}
                    </p>
                    <p className="mt-1 text-[11px] text-muted">{o.summary}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <p className="text-lg font-extrabold text-muted line-through">
                      {money(o.total)}
                    </p>
                    <button
                      onClick={() => reorder(o.raw)}
                      className="flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:bg-page"
                    >
                      <RotateCcw className="size-3.5" /> Reorder
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
