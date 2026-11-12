import { useState } from "react";
import { Star, Clock, Truck } from "lucide-react";
import { restaurants, restaurantFilters } from "../../data/homeData";
import SectionHeading from "./SectionHeading";
import FoodImage from "../ui/FoodImage";

// decide which restaurants to show for each filter button
function applyFilter(list, filter) {
  if (filter === "Top Rated (4.8+)") return list.filter((r) => r.rating >= 4.8);
  if (filter === "Fastest (Under 25m)") return list.filter((r) => r.maxTime <= 25);
  if (filter === "Free Delivery") return list.filter((r) => r.freeDelivery);
  return list;
}

export default function TopRestaurants() {
  const [filter, setFilter] = useState("All");
  const visible = applyFilter(restaurants, filter);

  return (
    <section id="restaurants" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-14 sm:px-6">
      <SectionHeading label="HANDPICKED FAVORITES" title="Top Rated Restaurants">
        <div className="flex flex-wrap gap-2">
          {restaurantFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                filter === f ? "border-ink bg-ink text-surface" : "border-line bg-surface text-muted hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </SectionHeading>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ">
        {visible.map((r) => (
          <article key={r.id} className="overflow-hidden rounded-card border border-line bg-surface shadow-card transition hover:-translate-y-1 duration-300">
            <div className="relative">
              <FoodImage src={r.image} alt={r.name} className="h-32 w-full" />
              <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                {r.tag}
              </span>
            </div>

            <div className="p-4">
              <h3 className="!text-sm">{r.name}</h3>
              <p className="mt-0.5 text-[11px] text-muted">{r.price}</p>

              <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                <span className="flex items-center gap-1 font-semibold text-ink">
                  <Star className="size-3.5 fill-secondary text-secondary" /> {r.rating}
                  <span className="font-normal text-muted">({r.reviews})</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" /> {r.time}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px]">
                {r.freeDelivery ? (
                  <span className="flex items-center gap-1 font-medium text-tertiary">
                    <Truck className="size-3.5" /> Free Delivery
                  </span>
                ) : (
                  <span className="text-muted">{r.deliveryFee}</span>
                )}
                <span className="text-muted">{r.distance}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 && <p className="py-8 text-center text-sm text-muted">No restaurants match this filter.</p>}
    </section>
  );
}
