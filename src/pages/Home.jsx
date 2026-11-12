
import { useState } from "react";

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

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

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
    </>
  );
}
