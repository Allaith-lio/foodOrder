
import { useEffect, useState } from "react";

import FeaturesStrip from "../components/home/FeaturesStrip";
import Hero from "../components/home/Hero";
import SpecialOffers from "../components/home/SpecialOffers";
import TopRestaurants from "../components/home/TopRestaurants";
import PopularDishes from "../components/home/PopularDishes";
import AppBanner from "../components/home/AppBanner";
import SearchResults from "../components/home/SearchResults";

import {
  dishes,
  restaurants,
} from "../data/homeData";
import { ArrowUp } from "lucide-react";

export default function Home() {
  const [showTop, setShowTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const normalize = (value = "") =>
    String(value).toLowerCase().trim();

  // Filter dishes
  const filteredDishes = dishes.filter((dish) => {
    const search = normalize(searchQuery);

    return (
      normalize(dish.name).includes(search) ||
      normalize(dish.restaurant).includes(search) ||
      normalize(dish.text).includes(search)
    );
  });

  // Filter restaurants
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const search = normalize(searchQuery);

    return (
      normalize(restaurant.name).includes(search) ||
      normalize(restaurant.tag).includes(search)
    );
  });

  // Handle search
  const handleSearch = (value) => {
    setSearchQuery(value.trim());
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <FeaturesStrip />

      <Hero onSearch={handleSearch} />

      {searchQuery ? (
        <SearchResults
          query={searchQuery}
          dishes={filteredDishes}
          restaurants={filteredRestaurants}
          onClear={clearSearch}
        />
      ) : (
        <>
          <SpecialOffers />
          <TopRestaurants />
          <PopularDishes />
        </>
      )}

      <AppBanner />
      {showTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
            document.body.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-6 right-6 z-50 grid size-12 cursor-pointer place-items-center rounded-full bg-primary text-white shadow-raised outline-none transition-transform duration-200 hover:scale-110 hover:bg-primary-hover focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}
