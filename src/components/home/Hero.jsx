import { Search, ArrowRight, Check, Flame } from "lucide-react";
import { cuisines } from "../../data/homeData";
import FoodImage from "../ui/FoodImage";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-linear-to-br from-[#4a0d0d] via-[#7a1a0a] to-[#b8330f] p-6 text-white md:p-8 lg:grid-cols-2 lg:p-12">
        {/* Text side */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
            <Flame className="size-3.5 text-secondary" />
            50% OFF your first order with code WELCOME50
          </span>

          <h1 className="mt-5 !text-4xl text-white md:!text-5xl">
            Craving something delicious delivered fast?
          </h1>

          <p className="mt-4 max-w-md text-sm text-white/80">
            Order from 1,200+ local chef-driven restaurants and urban favorites in Brooklyn with ultrafast
            contact-free delivery.
          </p>

          {/* Search box */}
          <div className="mt-6 flex max-w-lg items-center gap-2 rounded-card bg-white p-2 shadow-raised">
            <Search className="ml-2 size-4 shrink-0 text-muted" />
            <input
              type="text"
              placeholder="Search by food, craving, or restaurant name..."
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button className="btn btn-primary shrink-0">
              Find Food <ArrowRight className="size-4" />
            </button>
          </div>

          {/* Popular cuisines */}
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold text-white/70">Popular cuisines:</p>
            <div className="flex flex-wrap gap-2">
              {cuisines.map((c) => (
                <button
                  key={c.name}
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-800 transition-colors hover:bg-secondary"
                >
                  {c.emoji} {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Image side */}
        <div className="relative mx-auto w-full max-w-md rounded-card border-4 border-white/20 bg-white/10 p-1 shadow-raised">
          <FoodImage src="/images/hero-burger.jpg" emoji="🍔" alt="Burger and fries" className="h-72 w-full rounded-card md:h-80" />
          <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-control bg-surface p-3 text-ink shadow-card">
            <span className="flex size-9 items-center justify-center rounded-control bg-tertiary/15 text-tertiary">
              <Check className="size-4" />
            </span>
            <div>
              <p className="text-sm font-bold">22 mins average</p>
              <p className="text-xs text-muted">Fastest in Brooklyn heights</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
