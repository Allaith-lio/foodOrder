// Mock data + small helpers shared by the Orders components.
// Replace these with real API data (MongoDB) later.

export const activeOrder = {
  restaurant: "Bella Napoli Woodfired Bistro",
  tag: "Woodfired Italian",
  number: "#CW-98214",
  placedAt: "7:15 PM",
  eta: "7:45 PM",
  arriving: "Arriving in 18 mins",
  partner: "SwiftDelivery Express",
  speed: "28 km/h",
  distance: "1.2 miles away",
  destination: "742 Evergreen Terrace",
  note: "Please leave package by the front door, ring bell twice. Contactless delivery requested.",
  items: [
    { name: "Margherita D.O.P.", desc: "Extra basil, garlic crust drizzle", qty: 1, price: 18.5, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200" },
    { name: "Truffle Arancini Bites", desc: "4 pieces with smoked aioli", qty: 1, price: 12.0, img: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=200" },
    { name: "Classic Venetian Tiramisu", desc: "Single serving", qty: 1, price: 12.0, img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200" },
  ],
  subtotal: 42.5,
  fees: 4.25,
  total: 46.75,
  courier: { name: "Marcus D.", initials: "MD", rating: 4.9, vehicle: "Honda Motorcycle", plate: "#NY-882" },
  steps: [
    { label: "Order Confirmed", time: "7:15 PM", state: "done" },
    { label: "Kitchen Preparing", time: "7:24 PM", state: "done" },
    { label: "Out for Delivery", time: "Active • On Way", state: "active" },
    { label: "Delivered", time: "Est. 7:45 PM", state: "todo" },
  ],
};

export const pastOrders = [
  {
    id: 1,
    name: "Tokyo Sushi Bar",
    date: "Oct 24, 2025",
    number: "#CW-89102",
    count: 2,
    summary: "1x Dragon Roll Supreme, 1x Salmon Sashimi Combo (6 pcs), 1x Miso Soup",
    total: 38.5,
    paid: "Paid via Apple Pay",
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200",
    left: "review",
  },
  {
    id: 2,
    name: "El Taco Loco",
    date: "Oct 19, 2025",
    number: "#CW-86311",
    count: 3,
    summary: "3x Birria Street Tacos with Consomé, 1x Chips & Guacamole, 1x Mexican Coke",
    total: 24.9,
    paid: "Paid via Visa •••• 4092",
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200",
    left: "help",
  },
];

export const cancelledOrders = [
  {
    id: 3,
    name: "Burger Barn",
    date: "Oct 02, 2025",
    number: "#CW-80455",
    summary: "2x Double Smash Burger, 1x Large Fries",
    total: 21.0,
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200",
  },
];

export const money = (n) => `$${n.toFixed(2)}`;

// Shared card style
export const cardCls = "rounded-2xl border border-slate-200 bg-white";