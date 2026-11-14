// Sample customers for the vendor "Customers" page.
// When the API is ready, replace `customers` with fetched data (same shape).

// status: "active" | "blocked"      risk: "low" | "medium" | "high"
export const customers = [
  {
    id: "CUST-9821",
    name: "Marcus Vance",
    email: "m.vance@example.com",
    phone: "+1 (555) 441-9238",
    location: "Financial District, NY",
    joined: "Jan 14, 2024",
    orders: 42,
    spent: 1840.5,
    risk: "low",
    riskNote: "Verified account with a long, clean order history.",
    status: "active",
    purchases: [
      { orderId: "#BN-9820", date: "Today, 7:02 PM", items: "1× Slow-Braised Bolognese, 1× San Pellegrino Aranciata", total: 32.99 },
      { orderId: "#BN-9644", date: "Nov 6", items: "2× Truffle Burrata Pizza", total: 50.99 },
      { orderId: "#BN-9512", date: "Oct 29", items: "1× Classic Cacio e Pepe, 1× Classic Tiramisu", total: 33.99 },
    ],
  },
  {
    id: "CUST-9822",
    name: "Sophia Chen",
    email: "sophia.chen@example.com",
    phone: "+1 (555) 782-3109",
    location: "Downtown Brooklyn, NY",
    joined: "Mar 2, 2024",
    orders: 12,
    spent: 612.4,
    risk: "low",
    riskNote: "Verified account. No disputes.",
    status: "active",
    purchases: [
      { orderId: "#BN-9821", date: "Today, 7:15 PM", items: "2× Truffle Burrata Pizza, 1× Classic Tiramisu", total: 62.49 },
      { orderId: "#BN-9703", date: "Nov 9", items: "1× Margherita Verace D.O.P.", total: 19.99 },
    ],
  },
  {
    id: "CUST-9823",
    name: "Elena Rostova",
    email: "elena@taqueriaelsol.com",
    phone: "+1 (555) 234-8910",
    location: "Park Slope, NY",
    joined: "May 20, 2023",
    orders: 18,
    spent: 905.2,
    risk: "low",
    riskNote: "Verified account. Pays on delivery most of the time.",
    status: "active",
    purchases: [
      { orderId: "#BN-9819", date: "Today, 6:48 PM", items: "1× Spicy Diavola & Hot Honey, 1× Quattro Formaggi Bianco", total: 44.99 },
      { orderId: "#BN-9588", date: "Nov 1", items: "2× Pan-Crisped Gnocchi Pesto", total: 41.49 },
    ],
  },
  {
    id: "CUST-9824",
    name: "Jordan Lee",
    email: "jordan.lee@creativestudio.co",
    phone: "+1 (555) 890-4421",
    location: "Williamsburg, NY",
    joined: "Aug 11, 2023",
    orders: 118,
    spent: 5420.8,
    risk: "low",
    riskNote: "VIP customer. Very high order volume, no issues.",
    status: "active",
    purchases: [
      { orderId: "#BN-9818", date: "Today, 6:30 PM", items: "3× Margherita Verace D.O.P., 2× Truffle Arancini Bites", total: 67.0 },
      { orderId: "#BN-9760", date: "Nov 10", items: "4× Handmade Pasta combo", total: 82.0 },
    ],
  },
  {
    id: "CUST-9825",
    name: "Tomás Ruiz",
    email: "tomas.ruiz882@fastmail.com",
    phone: "+1 (555) 629-5518",
    location: "Queens, NY",
    joined: "Sep 3, 2024",
    orders: 14,
    spent: 210.0,
    risk: "medium",
    riskNote: "Promo abuse: all 14 orders used a promo code.",
    status: "active",
    purchases: [
      { orderId: "#BN-9813", date: "Today, 3:05 PM", items: "2× Quattro Formaggi Bianco", total: 43.0 },
      { orderId: "#BN-9650", date: "Nov 7", items: "1× Classic Cacio e Pepe", total: 14.5 },
    ],
  },
  {
    id: "CUST-9826",
    name: "fastbuyer_77",
    email: "fastbuyer77@tempmail.io",
    phone: "+1 (555) 014-7788",
    location: "Newark, NJ",
    joined: "Nov 11, 2026",
    orders: 6,
    spent: 380.0,
    risk: "high",
    riskNote: "6 orders in 2 days from a brand new account using a disposable email.",
    status: "active",
    purchases: [
      { orderId: "#BN-9811", date: "Yesterday, 11:40 PM", items: "5× Truffle Burrata Pizza", total: 122.99 },
      { orderId: "#BN-9790", date: "Nov 12", items: "4× Slow-Braised Bolognese", total: 106.49 },
    ],
  },
  {
    id: "CUST-4109",
    name: "Samantha Price",
    email: "s.price9921_temp@mailhub.biz",
    phone: "+1 (555) 308-2291",
    location: "Miami, FL (proxy detected)",
    joined: "Oct 28, 2024",
    orders: 3,
    spent: 940.0,
    risk: "high",
    riskNote: "3 chargeback disputes. Stolen card match.",
    status: "blocked",
    purchases: [
      { orderId: "#BN-8120", date: "Oct 30, 2024", items: "10× Truffle Burrata Pizza", total: 310.0 },
      { orderId: "#BN-8133", date: "Oct 31, 2024", items: "12× Slow-Braised Bolognese", total: 330.0 },
      { orderId: "#BN-8147", date: "Nov 1, 2024", items: "11× Quattro Formaggi Bianco", total: 300.0 },
    ],
  },
  {
    id: "CUST-9827",
    name: "Kenji Sato",
    email: "k.sato@tokyokitchen.io",
    phone: "+1 (555) 782-1190",
    location: "Downtown Brooklyn, NY",
    joined: "Feb 18, 2025",
    orders: 7,
    spent: 288.3,
    risk: "low",
    riskNote: "Verified account. No disputes.",
    status: "active",
    purchases: [
      { orderId: "#BN-9817", date: "Today, 6:10 PM", items: "2× Classic Cacio e Pepe", total: 41.99 },
      { orderId: "#BN-9601", date: "Nov 3", items: "1× Margherita Verace D.O.P.", total: 19.99 },
    ],
  },
];

// Small helpers used by the Customers page.
export const averageOrder = (customer) => customer.spent / customer.orders;
export const initials = (name) =>
  name
    .split(/[\s_]+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
