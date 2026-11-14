import { useState } from "react";
import {
  Store, Star, Trash2, Minus, Plus, Tag, CheckCircle2, X, Info, MapPin,
  Home, Briefcase, PlusCircle, Search, AlignLeft, Phone, Truck, Bike, Zap,
  Wallet, CreditCard, Smartphone, Banknote, Lock, ShieldCheck, Headphones,
  Clock, ArrowRight, ShoppingBag,
} from "lucide-react";

const initialItems = [
  {
    id: 1,
    name: "Truffle Burrata Pizza",
    description: "Extra Cheese, Thin Crust, Wild Truffle Glaze",
    quantity: 1,
    price: 24.0,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",
  },
  {
    id: 2,
    name: "Crispy Calamari",
    description: "Spicy Marinara Dip, Lemon Wedges",
    quantity: 1,
    price: 14.5,
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=300",
  },
  {
    id: 3,
    name: "San Pellegrino Sparkling",
    description: "500ml Bottle, Chilled with Lime",
    quantity: 1,
    price: 4.5,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300",
  },
];

const couriers = [
  {
    id: "swift",
    name: "SwiftDelivery Express",
    desc: "Priority dispatch with heated thermal bag.",
    time: "20–30 min",
    fee: 2.99,
    Icon: Zap,
    iconBg: "bg-orange-500 text-white",
  },
  {
    id: "eco",
    name: "EcoCourier Green Bike",
    desc: "Zero emission bicycle delivery courier.",
    time: "35–45 min",
    fee: 1.49,
    Icon: Bike,
    iconBg: "bg-green-100 text-green-700",
  },
  {
    id: "standard",
    name: "Standard Courier",
    desc: "Batched route neighborhood dispatch.",
    time: "30–40 min",
    fee: 0,
    freeOver: 35,
    Icon: Truck,
    iconBg: "bg-slate-100 text-slate-600",
  },
];

const payments = [
  {
    id: "card",
    title: "Credit / Debit Card",
    badge: "Default",
    desc: "Mastercard ending in •••• 4821 (Exp 09/27)",
    action: "Change",
    Icon: CreditCard,
  },
  {
    id: "apple",
    title: "Apple Pay",
    desc: "Fast, biometric one-touch checkout",
    action: "Ready",
    Icon: Smartphone,
  },
  {
    id: "cash",
    title: "Cash on Delivery",
    desc: "Pay with cash or portable POS card terminal on doorstep",
    action: "Exact change preferred",
    Icon: Banknote,
  },
];

const PROMO_CODES = { SAVE15: 0.15 };
const TAX_RATE = 0.0884;
const money = (n) => `$${n.toFixed(2)}`;

const cardCls = "rounded-2xl border border-slate-200 bg-white p-5 sm:p-6";

function SectionTitle({ Icon, title, right, subtitle }) {
  return (
    <div className="mb-5 border-b border-slate-100 pb-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <Icon className="size-5 text-orange-500" />
          {title}
        </h2>
        {right}
      </div>
      {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
    </div>
  );
}

export default function Cart() {
  const [items, setItems] = useState(initialItems);
  const [promoInput, setPromoInput] = useState("");
  const [promoCode, setPromoCode] = useState("SAVE15");
  const [promoError, setPromoError] = useState("");
  const [address, setAddress] = useState("home");
  const [courierId, setCourierId] = useState("swift");
  const [paymentId, setPaymentId] = useState("card");

  const updateQty = (id, delta) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
      )
    );

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoCode(code);
      setPromoError("");
      setPromoInput("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const subtotal = items.reduce((t, i) => t + i.price * i.quantity, 0);
  const discountRate = promoCode ? PROMO_CODES[promoCode] : 0;
  const discount = subtotal * discountRate;

  const courier = couriers.find((c) => c.id === courierId);
  const deliveryFee =
    courier.freeOver && subtotal >= courier.freeOver
      ? 0
      : courier.freeOver
      ? 2.49
      : courier.fee;

  const taxes = subtotal * TAX_RATE;
  const total = subtotal - discount + deliveryFee + taxes;
  const itemCount = items.reduce((n, i) => n + i.quantity, 0);

  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-white px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Checkout &amp; Review
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review your basket, select preferred courier, and choose delivery
            destination.
          </p>
        </div>
        <span className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
          <ShieldCheck className="size-4" />
          Secure 256-Bit Encrypted Order
        </span>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
        {/* ============ LEFT COLUMN ============ */}
        <div className="space-y-6">
          {/* Restaurant + items */}
          <section className={cardCls}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-xl bg-orange-50 text-orange-500">
                  <Store className="size-5" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Bella Napoli Bistro</h2>
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1 rounded bg-green-50 px-1.5 py-0.5 font-semibold text-green-700">
                      <Star className="size-3 fill-current" /> 4.9 (1.2k)
                    </span>
                    <span>• 1.4 miles away</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setItems([])}
                className="flex items-center gap-1 text-xs font-medium text-orange-600 hover:underline"
              >
                <Trash2 className="size-3.5" /> Clear Cart
              </button>
            </div>

            {items.length === 0 ? (
              <p className="py-10 text-center text-sm text-slate-500">
                Your cart is empty.
              </p>
            ) : (
              <div className="divide-y divide-slate-100">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-20 shrink-0 rounded-xl bg-slate-100 object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-900">{item.name}</h3>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {item.description}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            Unit: {money(item.price)}
                          </p>
                        </div>
                        <p className="shrink-0 text-lg font-bold text-slate-900">
                          {money(item.price * item.quantity)}
                        </p>
                      </div>

                      <div className="mt-2 flex justify-end">
                        <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="grid size-6 place-items-center rounded-full text-slate-600 hover:bg-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="grid size-6 place-items-center rounded-full text-slate-600 hover:bg-white"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3.5" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-1 grid size-6 place-items-center rounded-full text-slate-400 hover:text-red-600"
                            aria-label="Remove item"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Delivery address */}
          <section className={cardCls}>
            <SectionTitle
              Icon={MapPin}
              title="Delivery Address & Instructions"
              right={
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  Step 2 of 3
                </span>
              }
            />

            <p className="mb-2 text-xs font-semibold text-slate-700">
              Select Saved Location
            </p>
            <div className="mb-5 flex flex-wrap gap-2">
              {[
                { id: "home", label: "Home (742 Evergreen Terrace)", Icon: Home },
                { id: "work", label: "Work (Financial District Tower B)", Icon: Briefcase },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setAddress(id)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    address === id
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <Icon className="size-4" /> {label}
                </button>
              ))}
              <button className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-600">
                <PlusCircle className="size-4" /> Add New
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_200px]">
              <label className="block">
                <span className="text-xs font-semibold text-slate-700">Street Address</span>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                  <Search className="size-4 text-slate-500" />
                  <input
                    defaultValue="742 Evergreen Terrace, Apt 4B, Springfield, OR"
                    className="w-full bg-transparent py-3 text-sm outline-none"
                  />
                </div>
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-slate-700">Apt / Floor / Gate Code</span>
                <input
                  defaultValue="Apt 4B / Call #402"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr]">
              <label className="block">
                <span className="text-xs font-semibold text-slate-700">Delivery Notes for Courier</span>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                  <AlignLeft className="size-4 text-slate-500" />
                  <input
                    defaultValue="Leave at door, ring bell"
                    className="w-full bg-transparent py-3 text-sm outline-none"
                  />
                </div>
              </label>
              <div>
                <span className="text-xs font-semibold text-slate-700">Phone Number Verification</span>
                <div className="mt-1 flex gap-2">
                  <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                    <Phone className="size-4 text-slate-500" />
                    <input
                      defaultValue="+1 (555) 893-4122"
                      className="w-full bg-transparent py-3 text-sm outline-none"
                    />
                  </div>
                  <span className="flex items-center gap-1 rounded-xl border border-green-300 bg-green-50 px-3 text-xs font-semibold text-green-700">
                    <CheckCircle2 className="size-4" /> Verified
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Courier */}
          <section className={cardCls}>
            <SectionTitle
              Icon={Truck}
              title="Select Delivery Partner / Service"
              subtitle="Select your preferred courier service level and vehicle type."
              right={
                <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  <Zap className="size-3.5" /> Fast Transit
                </span>
              }
            />
            <div className="grid gap-4 md:grid-cols-3">
              {couriers.map((c) => {
                const selected = courierId === c.id;
                const free = c.freeOver && subtotal >= c.freeOver;
                const fee = free ? 0 : c.freeOver ? 2.49 : c.fee;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCourierId(c.id)}
                    className={`relative flex flex-col rounded-2xl border-2 p-4 text-left transition ${
                      selected
                        ? "border-red-500 bg-red-50/40"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute right-3 top-3 grid size-5 place-items-center rounded-full border-2 ${
                        selected ? "border-red-600" : "border-slate-300"
                      }`}
                    >
                      {selected && <span className="size-2.5 rounded-full bg-red-600" />}
                    </span>
                    <div className={`mb-3 grid size-9 place-items-center rounded-lg ${c.iconBg}`}>
                      <c.Icon className="size-5" />
                    </div>
                    <h3 className="font-bold text-slate-900">{c.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">{c.desc}</p>
                    <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-3">
                      <span className="text-xs font-semibold text-red-600">{c.time}</span>
                      <div className="text-right">
                        {c.freeOver && (
                          <p className="text-[10px] font-semibold text-green-600">
                            Free on ${c.freeOver}+
                          </p>
                        )}
                        <p className="text-lg font-extrabold text-slate-900">{money(fee)}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Payment */}
          <section className={cardCls}>
            <SectionTitle
              Icon={Wallet}
              title="Payment Method"
              right={
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <Lock className="size-3.5" /> End-to-End Encrypted
                </span>
              }
            />
            <div className="space-y-3">
              {payments.map((p) => {
                const selected = paymentId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPaymentId(p.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                      selected
                        ? "border-red-500 bg-red-50/50"
                        : "border-slate-200 bg-slate-50/60 hover:border-slate-300"
                    }`}
                  >
                    <span
                      className={`grid size-4 shrink-0 place-items-center rounded-full border-2 ${
                        selected ? "border-red-600" : "border-slate-300"
                      }`}
                    >
                      {selected && <span className="size-2 rounded-full bg-red-600" />}
                    </span>
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-slate-700 shadow-sm">
                      <p.Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-bold text-slate-900">
                        {p.title}
                        {p.badge && (
                          <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                            {p.badge}
                          </span>
                        )}
                      </span>
                      <span className="block truncate text-xs text-slate-500">{p.desc}</span>
                    </span>
                    <span
                      className={`hidden shrink-0 text-xs font-semibold sm:block ${
                        p.id === "card" ? "text-red-600" : "text-slate-600"
                      }`}
                    >
                      {p.action}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* ============ RIGHT COLUMN ============ */}
        <aside className="space-y-4 lg:sticky lg:top-6">
          <div className={cardCls}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900">Bill Summary</h2>
              <span className="text-xs text-slate-500">{itemCount} Items</span>
            </div>

            <p className="mb-2 text-xs font-semibold text-slate-700">Have a Promo Code?</p>
            <div className="flex gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3">
                <Tag className="size-4 text-slate-500" />
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                  placeholder="ENTER PROMO CODE"
                  className="w-full bg-transparent py-2.5 text-xs outline-none placeholder:text-slate-400"
                />
              </div>
              <button
                onClick={applyPromo}
                className="rounded-lg bg-slate-800 px-4 text-xs font-bold text-white hover:bg-slate-900"
              >
                Apply
              </button>
            </div>
            {promoError && <p className="mt-2 text-xs text-red-600">{promoError}</p>}

            {promoCode && (
              <div className="mt-3 flex items-center justify-between rounded-lg border border-green-300 bg-green-50 px-3 py-2 text-xs">
                <span className="flex items-center gap-2 text-green-800">
                  <CheckCircle2 className="size-4" />
                  <b>{promoCode} (−{money(discount)})</b> applied
                </span>
                <button onClick={() => setPromoCode("")} aria-label="Remove promo">
                  <X className="size-4 text-slate-500" />
                </button>
              </div>
            )}

            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Item Subtotal</span>
                <span className="text-base font-semibold text-slate-900">{money(subtotal)}</span>
              </div>
              {promoCode && (
                <div className="flex justify-between font-medium text-green-700">
                  <span>Coupon Discount ({discountRate * 100}%)</span>
                  <span>−{money(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  Delivery Fee <Info className="size-3.5 text-slate-400" />
                </span>
                <span className="font-semibold text-slate-900">{money(deliveryFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  Service &amp; Taxes <Info className="size-3.5 text-slate-400" />
                </span>
                <span className="font-semibold text-slate-900">{money(taxes)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-5">
              <div>
                <p className="font-bold text-slate-900">Total Amount</p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Includes all municipal fees and VAT
                </p>
              </div>
              <p className="text-4xl font-extrabold tracking-tight text-red-700">
                {money(total)}
              </p>
            </div>

            <button
              disabled={items.length === 0}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Place Order &amp; Pay ({money(total)}) <ArrowRight className="size-5" />
            </button>

            <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-green-600" /> 100% On-Time Money-Back Guarantee
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-red-600" /> Secure Encrypted Payment Gateway
              </li>
              <li className="flex items-center gap-2">
                <Headphones className="size-4 text-orange-500" /> 24/7 Live Customer Concierge Support
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
            <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-orange-100 text-orange-500">
              <Clock className="size-6" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Estimated Arrival: 24 mins</p>
              <p className="text-xs text-slate-500">
                Courier prepares immediately after kitchen confirmation.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}