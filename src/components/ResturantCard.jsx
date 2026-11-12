import { Star, MapPin, Utensils, Clock, Heart, ShoppingCart } from "lucide-react";

const RestaurantCard = ({
  restaurant,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onViewDetails,
}) => {
  const { name, cuisine, location, rating, deliveryFee, deliveryTime, image } =
    restaurant;

  return (
    <article className="group relative h-80 cursor-pointer overflow-hidden rounded-card bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-raised focus-within:-translate-y-1 focus-within:shadow-raised">
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-surface/90 px-2.5 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur-md">
        <Star className="size-3.5 fill-secondary text-secondary" />
        <span>{rating}</span>
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />

      <button
        type="button"
        onClick={() => onToggleFavorite(restaurant)}
        aria-label="Toggle favorite"
        className="absolute left-3 top-3 z-30 flex size-8 items-center justify-center rounded-full bg-surface/90 shadow-sm backdrop-blur-md cursor-pointer hover:bg-[#fff]"
      >
        <Heart
          className={`size-4 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-ink"
          }`}
        />
      </button>

      <div className="absolute inset-x-0 bottom-0 z-20 p-5 text-white">
        <h3 className="text-xl font-bold leading-tight text-white">{name}</h3>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-200">
          <span className="flex items-center gap-1.5">
            <Utensils className="size-3.5 shrink-0 text-secondary" />
            {cuisine}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0 text-secondary" />
            {location}
          </span>
        </div>

        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100">
          <div className="overflow-hidden">
            <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-3 text-sm">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Clock className="size-4 shrink-0 text-secondary" />
                {deliveryTime}
              </span>
              <span className="font-bold text-secondary">
                {deliveryFee === 0
                  ? "Free delivery"
                  : `$${deliveryFee.toFixed(2)} delivery`}
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => onViewDetails?.(restaurant)}
                className="flex flex-1 items-center justify-center rounded-full border border-white/40 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/10 cursor-pointer"
              >
                View Details
              </button>

              <button
                type="button"
                onClick={() => onAddToCart?.(restaurant)}
                className="flex flex-1 items-center justify-center gap-1 rounded-full px-3 py-2 text-xs font-bold text-black btn-secondary hover:bg-secondary-hover cursor-pointer"
              >
                <ShoppingCart className="size-3.5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RestaurantCard;
