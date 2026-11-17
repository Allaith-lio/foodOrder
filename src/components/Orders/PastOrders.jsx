
import { useState } from "react";
import { Check, Star, HelpCircle, Download, RotateCcw, ChevronDown } from "lucide-react";
import { pastOrders, money, cardCls } from "./ordersData";

export default function PastOrders() {
  const [visible, setVisible] = useState(pastOrders.length);

  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-ink">Past Orders</h2>
          <p className="text-xs text-muted">
            Review completed deliveries, reorder favorites, and download tax invoices.
          </p>
        </div>

        <label className="flex items-center gap-2 text-xs text-muted">
          Filter by:
          <select className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink outline-none">
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
        </label>
      </div>

      <div className="space-y-4">
        {pastOrders.slice(0, visible).map((o) => (
          <article key={o.id} className={`${cardCls} p-5`}>
            <div className="flex gap-4">
              <img
                src={o.img}
                alt={o.name}
                className="size-12 shrink-0 rounded-lg bg-page object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-2 font-bold text-ink">
                      {o.name}
                      <span className="flex items-center gap-1 rounded-full bg-tertiary/10 px-2 py-0.5 text-[10px] font-semibold text-tertiary">
                        <Check className="size-3" /> Delivered
                      </span>
                    </h3>
                    <p className="text-[11px] text-muted">
                      Delivered on {o.date} • Order {o.number} • {o.count} items
                    </p>
                    <p className="mt-1 text-[11px] text-muted">{o.summary}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-extrabold text-ink">{money(o.total)}</p>
                    <p className="text-[10px] text-muted">{o.paid}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 text-[11px] font-medium text-muted">
                {o.left === "review" ? (
                  <button className="flex items-center gap-1.5 font-semibold text-primary hover:underline">
                    <Star className="size-3.5" /> Rate &amp; Review
                  </button>
                ) : (
                  <button className="flex items-center gap-1.5 hover:text-ink">
                    <HelpCircle className="size-3.5" /> Help with Order
                  </button>
                )}
                <button className="flex items-center gap-1.5 hover:text-ink">
                  <Download className="size-3.5" /> Download Invoice
                </button>
              </div>

              <div className="flex gap-2">
                <button className="rounded-lg border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink hover:bg-page">
                  View Receipt
                </button>
                <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-hover">
                  <RotateCcw className="size-3.5" /> Reorder
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setVisible((v) => v + 2)}
          className="flex items-center gap-2 rounded-lg border border-line bg-surface px-6 py-2.5 text-xs font-semibold text-ink hover:bg-page"
        >
          Show More Past Orders <ChevronDown className="size-4" />
        </button>
      </div>
    </section>
  );
}
