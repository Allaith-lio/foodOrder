import { Star, Plus } from "lucide-react";
import { dishes } from "../../data/homeData";
import SectionHeading from "./SectionHeading";
import FoodImage from "../ui/FoodImage";

export default function PopularDishes() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
      <SectionHeading label="CUSTOMER CRAVINGS" title="Most Popular Dishes">
        <a href="#" className="text-sm font-semibold text-primary hover:underline">
          See all dishes &rsaquo;
        </a>
      </SectionHeading>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {dishes.map((dish) => (
          <article key={dish.id} className="rounded-card border border-line bg-surface p-3 shadow-card transition hover:-translate-y-1 duration-300">
            <div className="relative">
              <FoodImage src={dish.image} alt={dish.name} className="h-40 w-full rounded-control" />
              <span className="absolute left-2 top-2 rounded bg-white px-2 py-0.5 text-[10px] font-semibold text-stone-700">
                {dish.kcal} kcal
              </span>
            </div>

            <div className="px-1 pt-3">
              <div className="flex items-center justify-between text-[11px] text-muted">
                <span className="flex items-center gap-1 font-semibold text-ink">
                  <Star className="size-3 fill-secondary text-secondary" /> {dish.rating}
                  <span className="font-normal text-muted">({dish.reviews})</span>
                </span>
                <span>{dish.restaurant}</span>
              </div>

              <h3 className="mt-2 !text-base">{dish.name}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-muted">{dish.text}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-base font-bold">{dish.price.toLocaleString("en-US")} SYP</span>
                <button className="btn btn-primary !gap-1 !px-3 !py-1.5 !text-xs">
                  <Plus className="size-3.5" /> Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
