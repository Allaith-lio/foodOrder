import FeaturesStrip from "../components/home/FeaturesStrip";
import Hero from "../components/home/Hero";
import SpecialOffers from "../components/home/SpecialOffers";
import TopRestaurants from "../components/home/TopRestaurants";
import PopularDishes from "../components/home/PopularDishes";
import AppBanner from "../components/home/AppBanner";

export default function Home() {
  return (
    <>
      <FeaturesStrip />
      <Hero />
      <SpecialOffers />
      <TopRestaurants />
      <PopularDishes />
      <AppBanner />
    </>
  );
}
