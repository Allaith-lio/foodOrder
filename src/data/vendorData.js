// All vendor dashboard data lives here (sample data for now).
// When the API is ready, replace these with fetched data (same shape).

// The 4 cards at the top of the dashboard.
// `change` is the % change vs last month (negative = went down).
export const stats = [
  { key: "sales", label: "Total Sales", value: "$48,250", change: 12.5, tone: "bg-primary/10 text-primary" },
  { key: "profit", label: "Net Profit", value: "$12,840", change: 8.2, tone: "bg-tertiary/10 text-tertiary" },
  { key: "orders", label: "New Orders", value: "126", change: -3.4, tone: "bg-secondary/15 text-secondary" },
  { key: "users", label: "Registered Users", value: "1,893", change: 5.1, tone: "bg-sky-500/10 text-sky-500" },
];

// Sales chart. Same shape for both ranges: [{ label, value }].
// The month values add up to the "Total Sales" card ($48,250).
export const salesData = {
  week: [
    { label: "Mon", value: 1420 },
    { label: "Tue", value: 1640 },
    { label: "Wed", value: 1310 },
    { label: "Thu", value: 1850 },
    { label: "Fri", value: 2380 },
    { label: "Sat", value: 2100 },
    { label: "Sun", value: 1780 },
  ],
  month: [
    { label: "1-5", value: 6800 },
    { label: "6-10", value: 7900 },
    { label: "11-15", value: 7350 },
    { label: "16-20", value: 9100 },
    { label: "21-25", value: 10500 },
    { label: "26-30", value: 6600 },
  ],
};

// Most requested delivery locations (share of orders, %).
export const topLocations = [
  { name: "Downtown Brooklyn", share: 44 },
  { name: "Financial District", share: 28 },
  { name: "Park Slope", share: 18 },
  { name: "Williamsburg", share: 10 },
];

// Most requested food categories (share of orders, %).
export const topCategories = [
  { name: "Pizza", share: 36 },
  { name: "Pasta", share: 24 },
  { name: "Burgers", share: 18 },
  { name: "Desserts", share: 12 },
  { name: "Drinks", share: 10 },
];

// Number of restaurants and customers on the platform.
export const platformCounts = [
  { key: "restaurants", label: "Restaurants", value: "48", note: "+3 this month" },
  { key: "customers", label: "Customers", value: "1,893", note: "+5.1% this month" },
];
