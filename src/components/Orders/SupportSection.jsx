import { Headphones, ShieldCheck, Inbox, ArrowRight } from "lucide-react";
import { cardCls } from "./ordersData";

export default function SupportSection() {
  return (
    <section className="mt-16 grid gap-5 md:grid-cols-3">
      {/* Help */}
      <div className={`${cardCls} flex gap-4 p-6`}>
        <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Headphones className="size-6" />
        </div>
        <div>
          <h3 className="font-bold text-ink">Need Help With an Order?</h3>
          <p className="mt-1 text-xs text-muted">
            Our dedicated delivery concierge is online 24/7 to resolve delays,
            substitutions, or refunds.
          </p>
          <button className="mt-3 flex items-center gap-1 text-xs font-bold text-primary hover:underline">
            Start Live Chat <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Guarantee */}
      <div className={`${cardCls} flex gap-4 p-6`}>
        <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-tertiary/10 text-tertiary">
          <ShieldCheck className="size-6" />
        </div>
        <div>
          <h3 className="font-bold text-ink">CraveDash Fresh Guarantee</h3>
          <p className="mt-1 text-xs text-muted">
            Meals delivered piping hot or icy cold, exactly as prepared by kitchen
            chefs, backed by credits.
          </p>
          <button className="mt-3 flex items-center gap-1 text-xs font-bold text-ink hover:underline">
            Learn About Policy <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Demo card */}
      <div className="flex gap-4 rounded-2xl border border-dashed border-line bg-page p-6">
        <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-surface text-ink shadow-sm">
          <Inbox className="size-6" />
        </div>
        <div>
          <span className="rounded bg-surface px-2 py-0.5 text-[10px] font-semibold text-muted">
            Demo Indicator
          </span>
          <h3 className="mt-1.5 font-bold text-ink">No Active Orders State</h3>
          <p className="mt-1 text-xs text-muted">
            When tracking completes, this area defaults to custom chef
            recommendations &amp; reorder shortcuts.
          </p>
          <a
            href="/restaurants"
            className="mt-3 flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            Browse Restaurants <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}