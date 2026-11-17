import { cancelledOrders, money, cardCls } from "./ordersData";

export default function CancelledOrders() {
  return (
    <section>
      <h2 className="text-2xl font-extrabold text-ink">Cancelled Orders</h2>
      <p className="mb-4 text-xs text-muted">
        Orders that were cancelled before delivery.
      </p>

      <div className="space-y-4">
        {cancelledOrders.map((o) => (
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
                <p className="text-lg font-extrabold text-muted line-through">
                  {money(o.total)}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}