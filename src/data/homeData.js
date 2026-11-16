// All home page data lives here.
// Local Syrian restaurants and dishes.
// Prices are demo prices in Syrian Pounds (SYP).
// Place food photos inside /public/images.

export const features = [
  {
    icon: "zap",
    title: "Fast Delivery",
    text: "Fresh Syrian meals delivered to your door",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: "navigation",
    title: "Live Order Tracking",
    text: "Follow your order from kitchen to doorstep",
    color: "bg-tertiary/10 text-tertiary",
  },
  {
    icon: "chef",
    title: "Authentic Syrian Taste",
    text: "Traditional recipes made with fresh ingredients",
    color: "bg-secondary/20 text-yellow-700",
  },
];

export const cuisines = [
  { name: "Shawarma" },
  { name: "Grills"},
  { name: "Manakish" },
  { name: "Syrian Food" },
  { name: "Fast Food" },
  { name: "Sweets" },
  { name: "Breakfast" },
];

export const offers = [
  {
    id: 1,
    badge: "Limited Offer",
    badgeColor: "bg-primary text-white",
    tag: "BUY 1 GET 1 FREE",
    tagColor: "bg-primary/10 text-primary",
    side: "Minimum order 500 SYP",
    title: "Abu Ali Shawarma",
    text: "Fresh chicken shawarma, crispy potatoes, garlic sauce and pickles.",
    info: "Free Delivery",
    infoIcon: "truck",
    image: "/images/offer-shawarma.webp",
  },
  {
    id: 2,
    badge: "Weekend Special",
    badgeColor: "bg-secondary text-stone-900",
    tag: "20% OFF FAMILY MEAL",
    tagColor: "bg-secondary/20 text-yellow-700",
    side: "Save up to 300 SYP",
    title: "Al Dar Al Dimashqi",
    text: "Enjoy traditional Syrian grills, kebab, shish tawook, muhammara bread and hummus.",
    info: "Free Delivery over 1,000 SYP",
    infoIcon: "truck",
    image: "/images/offer-grills.webp",
  },
  {
    id: 3,
    badge: "Today Only",
    badgeColor: "bg-tertiary text-white",
    tag: "150 SYP OFF",
    tagColor: "bg-tertiary/10 text-tertiary",
    side: "Orders before 2 PM",
    title: "Forn Al Balad",
    text: "Freshly baked zaatar, cheese and muhammara manakish every morning.",
    info: "15-25 min",
    infoIcon: "clock",
    image: "/images/offer-manakish.jpg",
  },
];

export const restaurantFilters = [
  "All",
  "Top Rated (4.8+)",
  "Fastest (Under 25m)",
  "Free Delivery",
];

export const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Restaurants", to: "/restaurants" },
      { label: "About Us", to: "/aboutUs" },
    ],
  },
  {
    title: "My Account",
    links: [
      { label: "My Orders", to: "/myOrders" },
      { label: "Wishlist", to: "/wishlist" },
      { label: "Cart", to: "/myCart" },
      { label: "Sign In", to: "/login" },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Create Account", to: "/register" },
      { label: "Track Your Order", to: "/myOrders" },
      { label: "Browse Restaurants", to: "/restaurants" },
    ],
  },
];
