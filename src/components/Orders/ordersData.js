// Shared helpers + view adapters for the Orders components.
// Orders themselves come from services/ordersService.js (localStorage).

export const money = (n) => `$${Number(n || 0).toFixed(2)}`;

// Shared card style
export const cardCls = "rounded-card border border-line bg-surface shadow-card";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200";

const fmtTime = (date) =>
  date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const itemCount = (items = []) =>
  items.reduce((sum, i) => sum + (i.qty || i.quantity || 1), 0);

const itemSummary = (items = []) =>
  items.map((i) => `${i.qty || i.quantity || 1}x ${i.name}`).join(", ");

const firstImage = (items = []) =>
  items[0]?.img || items[0]?.image || FALLBACK_IMG;

// Raw stored order -> view model for <ActiveOrder />
export function toActiveView(order) {
  const placed = new Date(order.placedAt);
  const eta = new Date(placed.getTime() + 25 * 60 * 1000);
  const isOutForDelivery = order.status === "active";
  const courierName = order.courier || "CraveDash Courier";
  const initials = courierName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return {
    id: order.id,
    restaurant: order.restaurant || "CraveDash Kitchen",
    tag: order.tag || "Food Delivery",
    number: order.number,
    placedAt: fmtTime(placed),
    eta: fmtTime(eta),
    arriving: isOutForDelivery ? "Arriving soon" : "Being prepared",
    partner: courierName,
    speed: "—",
    distance: "On the way",
    destination: order.address || "—",
    note: order.note || "Contactless delivery requested.",
    items: (order.items || []).map((i) => {
      const qty = i.qty || i.quantity || 1;
      return {
        name: i.name,
        desc: i.desc || i.description || "",
        qty,
        price: Number(i.price || 0) * qty,
        img: i.img || i.image || FALLBACK_IMG,
      };
    }),
    subtotal: order.subtotal,
    fees: order.taxes,
    deliveryFee: order.deliveryFee,
    total: order.total,
    courier: {
      name: courierName,
      initials,
      rating: "New",
      vehicle: "Delivery partner",
      plate: "—",
    },
    steps: [
      {
        label: "Order Confirmed",
        time: fmtTime(placed),
        state: "done",
      },
      {
        label: "Kitchen Preparing",
        time: isOutForDelivery ? fmtTime(placed) : "In progress",
        state: isOutForDelivery ? "done" : "active",
      },
      {
        label: "Out for Delivery",
        time: isOutForDelivery ? "Active • On Way" : "Pending",
        state: isOutForDelivery ? "active" : "todo",
      },
      {
        label: "Delivered",
        time: `Est. ${fmtTime(eta)}`,
        state: "todo",
      },
    ],
  };
}

// Raw stored order -> row model for <PastOrders />
export function toPastView(order) {
  return {
    id: order.id,
    raw: order,
    name: order.restaurant || "CraveDash Kitchen",
    date: fmtDate(order.placedAt),
    number: order.number,
    count: itemCount(order.items),
    summary: itemSummary(order.items),
    total: order.total,
    paid: `Paid via ${order.payment || "Card"}`,
    img: firstImage(order.items),
    left: "review",
  };
}

// Raw stored order -> row model for <CancelledOrders />
export function toCancelledView(order) {
  return {
    id: order.id,
    raw: order,
    name: order.restaurant || "CraveDash Kitchen",
    date: fmtDate(order.placedAt),
    number: order.number,
    summary: itemSummary(order.items),
    total: order.total,
    img: firstImage(order.items),
  };
}

// Stored order items -> cart items for the "Reorder" action.
export function orderToCartItems(order) {
  return (order.items || []).map((i, idx) => ({
    id: `${order.id}-${idx}`,
    name: i.name,
    price: Number(i.price || 0),
    image: i.img || i.image,
    restaurant: order.restaurant,
    quantity: i.qty || i.quantity || 1,
  }));
}

// Download a plain-text invoice for a stored order.
export function downloadInvoice(order) {
  const lines = [
    "CRAVEDASH - ORDER INVOICE",
    "=".repeat(32),
    `Order: ${order.number || order.id}`,
    `Restaurant: ${order.restaurant || "CraveDash Kitchen"}`,
    `Date: ${new Date(order.placedAt).toLocaleString()}`,
    `Customer: ${order.customer || "Guest"}`,
    `Payment: ${order.payment || "Card"}`,
    "-".repeat(32),
    ...(order.items || []).map(
      (i) =>
        `${i.qty || i.quantity || 1}x ${i.name}  ${money(
          Number(i.price || 0) * (i.qty || i.quantity || 1),
        )}`,
    ),
    "-".repeat(32),
    `Subtotal: ${money(order.subtotal)}`,
    `Delivery fee: ${order.deliveryFee ? money(order.deliveryFee) : "FREE"}`,
    `Taxes & fees: ${money(order.taxes)}`,
    `Total: ${money(order.total)}`,
    "=".repeat(32),
    "Thank you for ordering with CraveDash!",
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `invoice-${order.number || order.id}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
