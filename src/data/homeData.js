// All home page data lives here.
// When the API is ready, replace these arrays with fetched data (same shape).
// Put your food photos in /public/images and use the path in `image`,
// e.g. "/images/burger.jpg". If the image is missing, an emoji is shown.

export const features = [
  { icon: "zap", title: "Fast 30-min Delivery", text: "Hot meals dispatching immediately", color: "bg-primary/10 text-primary" },
  { icon: "navigation", title: "Live Order Tracking", text: "Real-time GPS from cook to stop", color: "bg-tertiary/10 text-tertiary" },
  { icon: "chef", title: "Curated Quality Kitchens", text: "Strict culinary health & taste vetting", color: "bg-secondary/15 text-secondary" },
];

export const cuisines = [
  { name: "Burgers", emoji: "🍔" },
  { name: "Pizza", emoji: "🍕" },
  { name: "Sushi", emoji: "🍣" },
  { name: "Mexican", emoji: "🌮" },
  { name: "Healthy", emoji: "🥗" },
  { name: "Desserts", emoji: "🍰" },
  { name: "Asian", emoji: "🍜" },
];

export const offers = [
  {
    id: 1,
    badge: "Ends in 02:45:10",
    badgeColor: "bg-primary",
    tag: "BUY 1 GET 1 FREE",
    tagColor: "bg-primary/10 text-primary",
    side: "Min order $25",
    title: "Bella Forno Pizzeria",
    text: "Authentic sourdough pizzas and garlic-herb knots crafted daily.",
    info: "Free Delivery",
    infoIcon: "truck",
    image: "/images/offer-pizza.jpg",
    emoji: "🍕",
  },
  {
    id: 2,
    badge: "Ends in 05:12:00",
    badgeColor: "bg-secondary",
    tag: "30% OFF COMBO",
    tagColor: "bg-secondary/15 text-secondary",
    side: "Promo Code: SUSHI30",
    title: "Kura Omakase & Bento",
    text: "Sustainably sourced wild salmon, bluefin tuna & specialty rolls.",
    info: "Free Delivery over $30",
    infoIcon: "truck",
    image: "/images/offer-sushi.jpg",
    emoji: "🍣",
  },
  {
    id: 3,
    badge: "Today only",
    badgeColor: "bg-tertiary",
    tag: "$5 OFF LUNCH",
    tagColor: "bg-tertiary/10 text-tertiary",
    side: "Orders 11am - 2pm",
    title: "Prime Patty Craft Burgers",
    text: "Fresh smashed black angus patties with homemade brioche.",
    info: "15-25 min",
    infoIcon: "clock",
    image: "/images/offer-burger.jpg",
    emoji: "🍔",
  },
];

export const restaurantFilters = ["All", "Top Rated (4.8+)", "Fastest (Under 25m)", "Free Delivery"];

export const restaurants = [
  { id: 1, name: "Trattoria Il Sasso", tag: "Italian • Woodfired Pizza", price: "$$", rating: 4.9, reviews: "1.2k", time: "20-30 min", maxTime: 30, distance: "0.8 miles away", freeDelivery: true, image: "/images/rest-italian.jpg", emoji: "🍝" },
  { id: 2, name: "Tokyo Kitchen Bar", tag: "Japanese • Ramen & Bowls", price: "$$$", rating: 4.8, reviews: "840", time: "15-25 min", maxTime: 25, distance: "1.2 miles away", freeDelivery: true, image: "/images/rest-japanese.jpg", emoji: "🍜" },
  { id: 3, name: "Taqueria El Sol", tag: "Mexican • Street Tacos", price: "$", rating: 4.7, reviews: "950", time: "20-35 min", maxTime: 35, distance: "1.5 miles away", freeDelivery: false, deliveryFee: "$1.99 Delivery", image: "/images/rest-mexican.jpg", emoji: "🌮" },
  { id: 4, name: "Green Roots Botanica", tag: "Healthy • Vegan Bowls", price: "$$", rating: 4.9, reviews: "610", time: "15-20 min", maxTime: 20, distance: "0.5 miles away", freeDelivery: true, image: "/images/rest-healthy.jpg", emoji: "🥗" },
];

export const dishes = [
  { id: 1, name: "Double Truffle Smash", kcal: 680, rating: 4.9, reviews: 340, restaurant: "Prime Patty", text: "Black Angus beef, melted aged cheddar, smoked bacon, caramelized onion and...", price: 14.99, image: "/images/dish-burger.jpg", emoji: "🍔" },
  { id: 2, name: "Tonkotsu Ramen Bowl", kcal: 720, rating: 4.8, reviews: 520, restaurant: "Tokyo Kitchen", text: "Rich 16-hour pork broth, handmade wavy noodles, bamboo shoots, and molten yolk...", price: 16.5, image: "/images/dish-ramen.jpg", emoji: "🍜" },
  { id: 3, name: "Margherita Di Bufala", kcal: 850, rating: 5.0, reviews: 680, restaurant: "Bella Forno", text: "San Marzano D.O.P. tomatoes, fresh buffalo mozzarella, virgin olive oil and sweet basil.", price: 18.0, image: "/images/dish-pizza.jpg", emoji: "🍕" },
  { id: 4, name: "Spicy Ahi Tuna Poke", kcal: 540, rating: 4.9, reviews: 410, restaurant: "Green Roots", text: "Yellowfin sashimi, ginger rice, shredded nori, pickled cucumbers, and spicy sriracha...", price: 15.75, image: "/images/dish-poke.jpg", emoji: "🥗" },
];

export const footerLinks = [
  { title: "Company", links: ["About Us", "Partner with Us", "Careers"] },
  { title: "Terms & Legal", links: ["Delivery Terms", "Privacy Policy", "Cookie Policy"] },
  { title: "Assistance", links: ["Help & Support", "Contact", "Live Courier Chat"] },
];
