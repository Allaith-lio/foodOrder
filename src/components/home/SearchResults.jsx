
import {
  SearchX,
  X,
  Star,
  Clock,
  MapPin,
  Utensils,
} from "lucide-react";
import FoodImage from "../ui/FoodImage";

export default function SearchResults({
  query,
  dishes = [],
  restaurants = [],
  onClear,
}) {
  const totalResults = dishes.length + restaurants.length;

  const formatPrice = (price) => {
    if (typeof price !== "number") return price;
    return `${price.toLocaleString("en-US")} SYP`;
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
            <Utensils className="size-4" />
            Search Results
          </div>

          <h2 className="text-2xl font-bold text-ink md:text-3xl">
            Results for "{query}"
          </h2>

          <p className="mt-2 text-sm text-muted">
            {totalResults} {totalResults === 1 ? "result" : "results"} found
          </p>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 rounded-control border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
        >
          <X className="size-4" />
          Clear Search
        </button>
      </div>

      {/* Empty State */}
      {totalResults === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface px-5 py-16 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <SearchX className="size-8 text-primary" />
          </div>

          <h3 className="text-xl font-bold text-ink">
            No results found
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            We couldn't find any dishes or restaurants matching
            "{query}". Try another food or restaurant name.
          </p>

          <button
            type="button"
            onClick={onClear}
            className="btn btn-primary mt-6"
          >
            Explore All Food
          </button>
        </div>
      ) : (
        <div className="space-y-12">

          {/* Restaurants */}
          {restaurants.length > 0 && (
            <div>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-ink">
                  Restaurants
                </h3>
                <span className="text-sm text-muted">
                  {restaurants.length} found
                </span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {restaurants.map((restaurant) => (
                  <article
                    key={restaurant.id}
                    className="group overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-primary/30"
                  >
                    <div className="relative overflow-hidden">
                      <FoodImage
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <span className="absolute bottom-3 left-3 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-stone-800 shadow-sm">
                        {restaurant.price}
                      </span>
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-ink">
                        {restaurant.name}
                      </h4>

                      <p className="mt-1 text-xs text-muted">
                        {restaurant.tag}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3 text-xs">
                        <span className="flex items-center gap-1 font-semibold text-ink">
                          <Star className="size-3.5 fill-secondary text-secondary" />
                          {restaurant.rating}
                          <span className="font-normal text-muted">
                            ({restaurant.reviews})
                          </span>
                        </span>

                        <span className="flex items-center gap-1 text-muted">
                          <Clock className="size-3.5" />
                          {restaurant.time}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                        <MapPin className="size-3.5 text-primary" />
                        {restaurant.distance || restaurant.deliveryFee || "Delivery available"}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Dishes */}
          {dishes.length > 0 && (
            <div>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-ink">
                  Dishes
                </h3>
                <span className="text-sm text-muted">
                  {dishes.length} found
                </span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {dishes.map((dish) => (
                  <article
                    key={dish.id}
                    className="group overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-primary/30"
                  >
                    <div className="overflow-hidden">
                      <FoodImage
                        src={dish.image}
                        alt={dish.name}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-ink">
                          {dish.name}
                        </h4>

                        <span className="shrink-0 text-xs font-bold text-primary">
                          {formatPrice(dish.price)}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-muted">
                        {dish.restaurant}
                      </p>

                      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted">
                        {dish.text}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs">
                        <span className="flex items-center gap-1 font-semibold text-ink">
                          <Star className="size-3.5 fill-secondary text-secondary" />
                          {dish.rating}
                          <span className="font-normal text-muted">
                            ({dish.reviews})
                          </span>
                        </span>

                        <span className="text-muted">
                          {dish.kcal} kcal
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
