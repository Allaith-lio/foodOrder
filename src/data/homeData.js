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

export const restaurants = [
  {
    id: 1,
    name: "Abu Ali Shawarma",
    tag: "Syrian • Shawarma & Sandwiches",
    price: "250 - 650 SYP",
    rating: 4.9,
    reviews: "1.2k",
    time: "15-25 min",
    maxTime: 25,
    distance: "1.2 km away",
    freeDelivery: true,
    image: "/images/rest-shawarma.jpg",
  },
  {
    id: 2,
    name: "Abo Al Aiz",
    tag: "Damascene • Traditional Grills",
    price: "450 - 1200 SYP",
    rating: 4.8,
    reviews: "840",
    time: "25-35 min",
    maxTime: 35,
    distance: "2.5 km away",
    freeDelivery: true,
    image: "/images/rest-grills.jpg",
  },
  {
    id: 3,
    name: "Forn Al Balad",
    tag: "Syrian • Manakish & Bakery",
    price: "100 - 350 SYP",
    rating: 4.7,
    reviews: "950",
    time: "15-20 min",
    maxTime: 20,
    distance: "0.8 km away",
    freeDelivery: false,
    deliveryFee: "5,000 SYP Delivery",
    image: "/images/rest-bakery.webp",
  },
  {
    id: 4,
    name: "Beit Al Mouna",
    tag: "Syrian • Homemade Food",
    price: "300 - 850 SYP",
    rating: 4.9,
    reviews: "610",
    time: "20-30 min",
    maxTime: 30,
    distance: "1.5 km away",
    freeDelivery: true,
    image: "/images/rest-homemade.jpg",
  },
];

export const dishes = [
  {
    id: 1,
    name: "Chicken Shawarma Meal",
    kcal: 650,
    rating: 4.9,
    reviews: 340,
    restaurant: "Abu Ali Shawarma",
    text: "Juicy chicken shawarma served with crispy fries, garlic sauce, pickles and fresh bread.",
    price: 450,
    image: "/images/dish-shawarma.jpg",
  },
  {
    id: 2,
    name: "Aleppo Kibbeh",
    kcal: 580,
    rating: 4.8,
    reviews: 520,
    restaurant: "Beit Al Mouna",
    text: "Traditional Aleppine kibbeh stuffed with seasoned minced meat, onions and pine nuts.",
    price: 550,
    image: "/images/dish-kibbeh.jpg",
  },
  {
    id: 3,
    name: "Mixed Syrian Grill",
    kcal: 850,
    rating: 5.0,
    reviews: 680,
    restaurant: "Al Dar Al Dimashqi",
    text: "A delicious mix of shish tawook, lamb kebab, grilled vegetables, hummus and garlic sauce.",
    price: 950,
    image: "/images/dish-grill.jpg",
  },
  {
    id: 4,
    name: "Zaatar & Cheese Manakish",
    kcal: 490,
    rating: 4.9,
    reviews: 410,
    restaurant: "Forn Al Balad",
    text: "Freshly baked Syrian flatbread topped with aromatic zaatar, olive oil and melted cheese.",
    price: 220,
    image: "/images/dish-manakish.jpg",
  },
];

export const footerLinks = [
  { title: "Company", links: ["About Us", "Partner with Us", "Careers"] },
  { title: "Terms & Legal", links: ["Delivery Terms", "Privacy Policy", "Cookie Policy"] },
  { title: "Assistance", links: ["Help & Support", "Contact", "Live Courier Chat"] },
];
