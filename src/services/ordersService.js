// Customer orders persisted in localStorage (demo backend).
// Dispatches "orderschange" so pages can react to new/cancelled orders.

export const ORDERS_KEY = "customerOrders";

function readOrders() {
  try {
    const saved = JSON.parse(localStorage.getItem(ORDERS_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function writeOrders(list) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
  } catch {
    // storage full/blocked: orders still work in memory for this session
  }
  window.dispatchEvent(new Event("orderschange"));
}

export function getCustomerOrders() {
  return readOrders();
}

// Customer-facing statuses: preparing -> active (out for delivery)
// -> delivered. The vendor dashboard maps its own labels onto these.
export const CUSTOMER_STATUSES = [
  "preparing",
  "active",
  "delivered",
  "cancelled",
];

// Vendor dashboard status -> customer order status
export const VENDOR_TO_CUSTOMER_STATUS = {
  processing: "preparing",
  shipping: "active",
  delivered: "delivered",
};

// Customer order status -> vendor dashboard status
export const CUSTOMER_TO_VENDOR_STATUS = {
  preparing: "processing",
  active: "shipping",
  delivered: "delivered",
};

// order: { restaurant, items, subtotal, discount, deliveryFee, taxes, total,
//          address, phone, note, courier, payment }
export function placeOrder(order) {
  const orders = readOrders();

  // A new order means previous in-flight ones are on their way / done.
  const settled = orders.map((o) =>
    o.status === "preparing" || o.status === "active"
      ? { ...o, status: "delivered" }
      : o,
  );

  const record = {
    id: `ord-${Date.now()}`,
    number: `CW-${Date.now().toString(36).toUpperCase()}`,
    status: "preparing",
    placedAt: new Date().toISOString(),
    ...order,
  };

  writeOrders([record, ...settled]);
  return record;
}

export function updateOrderStatus(id, status) {
  writeOrders(
    readOrders().map((o) => (o.id === id ? { ...o, status } : o)),
  );
}

// Remove delivered + cancelled orders, keep in-flight ones.
export function clearCompletedOrders() {
  writeOrders(
    readOrders().filter(
      (o) => o.status === "preparing" || o.status === "active",
    ),
  );
}

export function cancelOrder(id) {
  writeOrders(
    readOrders().map((o) =>
      o.id === id ? { ...o, status: "cancelled" } : o,
    ),
  );
}
