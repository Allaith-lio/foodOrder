
import { MapPin, Bike, Navigation } from "lucide-react";

export default function DeliveryMap() {
  return (
    <section className="border-t border-line p-6 sm:p-7">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-ink">
            Live Order Tracking
          </h3>
          <p className="mt-1 text-sm text-muted">
            Follow your order on its way to you.
          </p>
        </div>

        <span className="flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
          <span className="size-2 animate-pulse rounded-full bg-green-500" />
          Live tracking
        </span>
      </div>

      <div className="relative h-64 overflow-hidden rounded-2xl border border-line bg-[#eef2e8] sm:h-72">
        {/* Decorative roads */}
        <div className="absolute inset-0">
          <div className="absolute -left-10 top-20 h-8 w-[120%] rotate-12 bg-white" />
          <div className="absolute -left-10 top-44 h-7 w-[120%] -rotate-12 bg-white" />
          <div className="absolute left-1/4 -top-10 h-[130%] w-8 rotate-12 bg-white" />
          <div className="absolute right-1/4 -top-10 h-[130%] w-7 -rotate-12 bg-white" />
        </div>

        {/* Route */}
        <div className="absolute left-[18%] right-[18%] top-1/2 h-1 -translate-y-1/2 rounded-full border-t-4 border-dashed border-primary" />

        {/* Restaurant */}
        <div className="absolute left-[12%] top-[38%] flex flex-col items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-4 ring-white">
            <MapPin className="size-6" />
          </div>
          <span className="rounded-lg bg-white px-2 py-1 text-xs font-bold text-ink shadow">
            Restaurant
          </span>
        </div>

        {/* Driver */}
        <div className="absolute right-[12%] top-[38%] flex flex-col items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-full bg-ink text-white shadow-lg ring-4 ring-white">
            <Bike className="size-6" />
          </div>
          <span className="rounded-lg bg-white px-2 py-1 text-xs font-bold text-ink shadow">
            Delivery partner
          </span>
        </div>

        {/* Tracking label */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-ink shadow-md">
          <Navigation className="size-4 text-primary" />
          Your order is on its way
        </div>
      </div>

      <p className="mt-3 text-xs text-muted">
        Illustrative tracking preview — live map integration can be added later.
      </p>
    </section>
  );
}
