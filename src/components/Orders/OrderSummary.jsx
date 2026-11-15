
import {
  ReceiptText,
  CreditCard,
  ShoppingBag,
  Tag,
} from "lucide-react";

const defaultOrder = {
  items: [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Large · Extra cheese",
      quantity: 1,
      price: 14.99,
      emoji: "🍕",
    },
    {
      id: 2,
      name: "Chicken Alfredo Pasta",
      description: "Regular",
      quantity: 2,
      price: 12.5,
      emoji: "🍝",
    },
  ],
  deliveryFee: 2.5,
  tax: 2.4,
  discount: 0,
};

export default function OrderSummary({ order }) {
    const currentOrder = order || defaultOrder;

const items = currentOrder.items;
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = currentOrder.deliveryFee;
const tax = currentOrder.tax;
const discount = currentOrder.discount;

const total = subtotal + deliveryFee + tax - discount;
  return (
    <section className="border-t border-line p-6 sm:p-7">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-ink">
            Order Details
          </h3>
          <p className="mt-1 text-sm text-muted">
            Review the items in your order.
          </p>
        </div>

        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShoppingBag className="size-5" />
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-page/30 p-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-surface text-3xl">
                {item.emoji}
              </div>

              <div className="min-w-0">
                <h4 className="truncate text-sm font-bold text-ink">
                  {item.name}
                </h4>

                <p className="mt-1 text-xs text-muted">
                  {item.description}
                </p>

                <p className="mt-1 text-xs font-medium text-muted">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>

            <p className="shrink-0 text-sm font-bold text-ink">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="mt-6 rounded-2xl border border-line p-5">
        <div className="mb-4 flex items-center gap-2">
          <ReceiptText className="size-5 text-primary" />
          <h4 className="font-bold text-ink">
            Price Summary
          </h4>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-muted">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-muted">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-muted">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-green-700">
            <span className="flex items-center gap-2">
              <Tag className="size-4" />
              Discount
            </span>
          <span>${discount.toFixed(2)}</span>
          </div>

          <div className="border-t border-dashed border-line pt-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink">
                Total Amount
              </span>

              <span className="text-xl font-extrabold text-primary">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-page/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CreditCard className="size-5" />
          </div>

          <div>
            <p className="text-sm font-bold text-ink">
              Payment Method
            </p>
            <p className="mt-1 text-xs text-muted">
              Visa ending in 4242
            </p>
          </div>
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
          Paid
        </span>
      </div>
    </section>
  );
}
