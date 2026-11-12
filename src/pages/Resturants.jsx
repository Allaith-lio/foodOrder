import { useEffect, useMemo, useRef, useState } from "react";
import {
    ArrowUp,
    Check,
    ChevronLeft,
    ChevronRight,
    Search,
    MapPin,
    Star,
    Utensils,
    X,
} from "lucide-react";
import ResturantCard from "../components/ResturantCard.jsx";

export const restaurants = [
    {
        id: 1,
        name: "Burger House",
        cuisine: "Fast Food",
        location: "Downtown",
        rating: 4.8,
        deliveryFee: 0,
        deliveryTime: "20 - 30 min",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&q=85",
    },
    {
        id: 2,
        name: "Roma Pizza",
        cuisine: "Italian",
        location: "Al-Rawda",
        rating: 4.6,
        deliveryFee: 2.5,
        deliveryTime: "30 - 45 min",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=85",
    },
    {
        id: 3,
        name: "Sushi Master",
        cuisine: "Asian",
        location: "District 7",
        rating: 4.9,
        deliveryFee: 3.0,
        deliveryTime: "35 - 50 min",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&q=85",
    },
    {
        id: 4,
        name: "Shawarma Zaman",
        cuisine: "Middle Eastern",
        location: "Downtown",
        rating: 4.5,
        deliveryFee: 1.0,
        deliveryTime: "15 - 25 min",
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=900&q=85",
    },
    {
        id: 5,
        name: "Taco Mexico",
        cuisine: "Mexican",
        location: "Al-Ziraa",
        rating: 4.3,
        deliveryFee: 2.0,
        deliveryTime: "25 - 40 min",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=900&q=85",
    },
    {
        id: 6,
        name: "Ocean Catch",
        cuisine: "Seafood",
        location: "Corniche",
        rating: 4.7,
        deliveryFee: 3.5,
        deliveryTime: "40 - 60 min",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&q=85",
    },
    {
        id: 7,
        name: "Cafe de Paris",
        cuisine: "Desserts & Drinks",
        location: "Al-Rawda",
        rating: 4.4,
        deliveryFee: 1.5,
        deliveryTime: "20 - 35 min",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=85",
    },
    {
        id: 8,
        name: "WoodFire Grills",
        cuisine: "Middle Eastern",
        location: "District 7",
        rating: 4.8,
        deliveryFee: 2.0,
        deliveryTime: "30 - 45 min",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=85",
    },
    {
        id: 9,
        name: "Pasta & Inferno",
        cuisine: "Italian",
        location: "Downtown",
        rating: 4.2,
        deliveryFee: 2.0,
        deliveryTime: "25 - 35 min",
        image: "https://img.magnific.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg?semt=ais_hybrid&w=740&q=80",
    },
];

const cuisines = [
    "All",
    "Fast Food",
    "Italian",
    "Middle Eastern",
    "Asian",
    "Mexican",
    "Seafood",
    "Desserts & Drinks",
];

const locations = [
    "All",
    "Downtown",
    "Al-Rawda",
    "District 7",
    "Al-Ziraa",
    "Corniche",
];

// Shared look for the pill fields in the filter bar
const fieldClass =
    "h-12 w-full cursor-pointer appearance-none rounded-full border border-line bg-surface pl-11 pr-10 text-sm font-medium text-ink shadow-card outline-none transition focus:ring-4 focus:ring-primary/20";
const arrowClass =
    "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 border-x-[5px] border-t-[6px] border-x-transparent";

const Resturants = () => {
    const [search, setSearch] = useState("");
    const [cuisine, setCuisine] = useState("All");
    const [location, setLocation] = useState("All");
    const [minRating, setMinRating] = useState("0");
    const [sort, setSort] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem("wishlist"));
            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    });
    const [toast, setToast] = useState("");
    const toastTimer = useRef(null);
    const [showTop, setShowTop] = useState(false);
    const itemsPerPage = 8;

    useEffect(() => {
        const handleScroll = () => setShowTop(window.scrollY > 400);

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const showToast = (message) => {
        setToast(message);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(""), 2000);
    };

    const filteredRestaurants = useMemo(() => {
        const query = search.trim().toLowerCase();

        const results = restaurants.filter((item) => {
            const matchesSearch =
                !query ||
                item.name.toLowerCase().includes(query) ||
                item.cuisine.toLowerCase().includes(query) ||
                item.location.toLowerCase().includes(query);

            const matchesCuisine = cuisine === "All" || item.cuisine === cuisine;
            const matchesLocation = location === "All" || item.location === location;
            const matchesRating = item.rating >= parseFloat(minRating);

            return matchesSearch && matchesCuisine && matchesLocation && matchesRating;
        });

        return [...results].sort((a, b) => {
            if (sort === "rating-high") return b.rating - a.rating;
            if (sort === "delivery-low") return a.deliveryFee - b.deliveryFee;
            if (sort === "name") return a.name.localeCompare(b.name);
            return a.id - b.id;
        });
    }, [search, cuisine, location, minRating, sort]);

    const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);
    const currentRestaurants = filteredRestaurants.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const sortLabels = {
        "rating-high": "Highest rated",
        "delivery-low": "Lowest delivery fee",
        name: "Alphabetical",
    };

    const activeFilters = [
        search && { label: `"${search}"`, clear: () => setSearch("") },
        cuisine !== "All" && { label: cuisine, clear: () => setCuisine("All") },
        location !== "All" && { label: location, clear: () => setLocation("All") },
        minRating !== "0" && {
            label: `${minRating}+ rating`,
            clear: () => setMinRating("0"),
        },
        sort !== "default" && {
            label: sortLabels[sort],
            clear: () => setSort("default"),
        },
    ].filter(Boolean);

    const hasActiveFilters =
        search || cuisine !== "All" || location !== "All" || minRating !== "0" || sort !== "default";

    const clearFilters = () => {
        setSearch("");
        setCuisine("All");
        setLocation("All");
        setMinRating("0");
        setSort("default");
        setCurrentPage(1);
    };

    const toggleFavorite = (restaurant) => {
        const isAdding = !favorites.includes(restaurant.id);
        const updated = isAdding
            ? [...favorites, restaurant.id]
            : favorites.filter((id) => id !== restaurant.id);

        setFavorites(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        window.dispatchEvent(new Event("wishlistChanged"));
        showToast(isAdding ? "Added to wishlist" : "Removed from wishlist");
    };

    const handleAddToCart = (restaurant) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        localStorage.setItem("cart", JSON.stringify([...cart, restaurant.id]));
        window.dispatchEvent(new Event("cartChanged"));
        showToast(`${restaurant.name} added to cart`);
    };

    const getPageNumbers = () =>
        Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="min-h-screen bg-page px-4 pb-16 sm:px-6 lg:px-8">
            <section className="mx-auto max-w-2xl py-8 text-center md:py-20">
                <h1 className="mt-6 text-ink">
                    Explore Best{" "}
                    <span className="font-logo logo-gradient text-[1.3em]">
                        Restaurants
                    </span>{" "}
                    Near You
                </h1>
            </section>

            {/* Filters */}
            <div className="p-3 sm:p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    <div className="relative flex-1">
                        <span className="pointer-events-none absolute left-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-primary text-white">
                            <Search size={18} />
                        </span>
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search by name, cuisine or area..."
                            className="h-12 w-full rounded-full border border-line bg-surface pl-14 pr-5 text-sm text-ink shadow-card outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/20"
                        />
                    </div>

                    <div className="relative lg:w-48">
                        <Utensils
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                            size={17}
                        />
                        <select
                            value={cuisine}
                            onChange={(e) => {
                                setCuisine(e.target.value);
                                setCurrentPage(1);
                            }}
                            className={fieldClass}
                        >
                            {cuisines.map((item) => (
                                <option key={item} value={item}>
                                    {item === "All" ? "All Cuisines" : item}
                                </option>
                            ))}
                        </select>
                        <span className={`${arrowClass} border-t-primary`} />
                    </div>

                    <div className="relative lg:w-48">
                        <MapPin
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                            size={17}
                        />
                        <select
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                                setCurrentPage(1);
                            }}
                            className={fieldClass}
                        >
                            {locations.map((item) => (
                                <option key={item} value={item}>
                                    {item === "All" ? "All Locations" : item}
                                </option>
                            ))}
                        </select>
                        <span className={`${arrowClass} border-t-primary`} />
                    </div>

                    <div className="relative lg:w-48">
                        <select
                            value={sort}
                            onChange={(e) => {
                                setSort(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="h-12 w-full cursor-pointer appearance-none rounded-full bg-secondary pl-5 pr-10 text-sm font-bold text-slate-950 shadow-card outline-none transition hover:bg-secondary-hover focus:ring-4 focus:ring-secondary/30"
                        >
                            <option value="default">Sort by default</option>
                            <option value="rating-high">Highest rated</option>
                            <option value="delivery-low">Lowest delivery fee</option>
                            <option value="name">Alphabetical</option>
                        </select>
                        <span className={`${arrowClass} border-t-slate-950`} />
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-semibold text-ink">
                            Minimum rating
                        </span>
                        <div className="inline-flex rounded-full border border-line bg-surface p-1 shadow-card">
                            {["0", "4.0", "4.5"].map((rate) => (
                                <button
                                    key={rate}
                                    type="button"
                                    onClick={() => {
                                        setMinRating(rate);
                                        setCurrentPage(1);
                                    }}
                                    className={`flex cursor-pointer items-center gap-1 rounded-full px-4 py-1.5 text-xs font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-primary ${
                                        minRating === rate
                                            ? "bg-primary text-white shadow"
                                            : "text-muted hover:text-ink"
                                    }`}
                                >
                                    <Star className="size-3 fill-current" />
                                    {rate === "0" ? "All" : `${rate}+`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="cursor-pointer text-sm font-semibold text-primary-text underline-offset-4 hover:underline"
                        >
                            Clear filters
                        </button>
                    )}
                </div>

                {activeFilters.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {activeFilters.map(({ label, clear }) => (
                            <button
                                key={label}
                                type="button"
                                onClick={() => {
                                    clear();
                                    setCurrentPage(1);
                                }}
                                aria-label={`Remove filter ${label}`}
                                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-slate-950 transition hover:bg-secondary-hover"
                            >
                                {label}
                                <X className="size-3" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {filteredRestaurants.length > 0 ? (
                <>
                    <p className="mt-6 text-sm font-medium text-muted">
                        {filteredRestaurants.length}{" "}
                        {filteredRestaurants.length === 1 ? "restaurant" : "restaurants"} found
                    </p>

                    <div className="mt-3 grid grid-cols-1 gap-5 min-[451px]:grid-cols-2 min-[791px]:grid-cols-3 min-[1024px]:grid-cols-4">
                        {currentRestaurants.map((restaurant) => (
                            <ResturantCard
                                key={restaurant.id}
                                restaurant={restaurant}
                                isFavorite={favorites.includes(restaurant.id)}
                                onToggleFavorite={toggleFavorite}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <nav
                            aria-label="Pagination"
                            className="mt-12 flex items-center justify-center gap-2"
                        >
                            <button
                                type="button"
                                aria-label="Previous page"
                                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                                disabled={currentPage === 1}
                                className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-full border-2 border-line bg-surface px-4 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
                            >
                                <ChevronLeft size={18} />
                                <span className="hidden sm:inline">Previous</span>
                            </button>

                            <div className="flex items-center gap-1.5 overflow-x-auto px-1 py-1">
                                {getPageNumbers().map((page) => (
                                    <button
                                        key={page}
                                        type="button"
                                        aria-label={`Page ${page}`}
                                        aria-current={currentPage === page ? "page" : undefined}
                                        onClick={() => setCurrentPage(page)}
                                        className={`h-11 min-w-11 cursor-pointer rounded-full px-3 text-sm font-bold transition ${
                                            currentPage === page
                                                ? "bg-primary text-white shadow-card"
                                                : "border-2 border-line bg-surface text-ink hover:border-primary hover:text-primary"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                aria-label="Next page"
                                onClick={() =>
                                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                                }
                                disabled={currentPage === totalPages}
                                className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-full border-2 border-line bg-surface px-4 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
                            >
                                <span className="hidden sm:inline">Next</span>
                                <ChevronRight size={18} />
                            </button>
                        </nav>
                    )}
                </>
            ) : (
                <div className="mt-5 px-4 py-16 text-center">
                    <Search className="mx-auto text-primary" size={32} />
                    <h2 className="mt-4 text-xl text-ink">No restaurants found</h2>
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-5 cursor-pointer rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-card transition hover:bg-primary-hover"
                    >
                        Clear filters
                    </button>
                </div>
            )}

            {showTop && (
                <button
                    type="button"
                    aria-label="Back to top"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-6 right-6 z-40 grid size-12 cursor-pointer place-items-center rounded-full bg-primary text-white shadow-raised outline-none transition hover:bg-primary-hover focus-visible:ring-4 focus-visible:ring-primary/30"
                >
                    <ArrowUp size={20} />
                </button>
            )}

            <div
                aria-live="polite"
                className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
            >
                {toast && (
                    <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink shadow-raised">
                        <Check className="size-4 text-tertiary" />
                        {toast}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Resturants;