
import {
  Phone,
  MessageCircle,
  Bike,
  Star,
  ShieldCheck,
} from "lucide-react";

export default function DriverInfo() {
  return (
    <section className="border-t border-line p-6 sm:p-7">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-ink">
          Your Delivery Partner
        </h3>
        <p className="mt-1 text-sm text-muted">
          Your order is in safe hands.
        </p>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-page/40 p-5 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Driver Information */}
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-extrabold text-primary ring-4 ring-primary/5">
            MA
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-bold text-ink">
                Michael Anderson
              </h4>

              <ShieldCheck className="size-4 text-green-600" />
            </div>

            <p className="mt-1 text-sm text-muted">
              Delivery Partner
            </p>

            <div className="mt-2 flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-ink">
                4.9
              </span>
              <span className="text-xs text-muted">
                (120 deliveries)
              </span>
            </div>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary sm:flex-none"
          >
            <MessageCircle className="size-4" />
            Message
          </button>

          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover sm:flex-none"
          >
            <Phone className="size-4" />
            Call
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-muted">
        <Bike className="size-4 text-primary" />
        <span>Your delivery partner is handling your order.</span>
      </div>
    </section>
  );
}
