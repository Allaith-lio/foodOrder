import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ShoppingBag, Trash2, Plus, Minus, Utensils } from "lucide-react";
import FoodImage from "../ui/FoodImage";
import { useShoppingCart } from "../../hooks/CartContext";
import { formatPrice } from "../../utils/format";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    cartCount,
    subTotal,
    updateCartQuantity,
    RemoveItemFromCart,
    clearCart,
  } = useShoppingCart();

  const { pathname } = useLocation();
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Close when the page changes (links, browser back button...)
  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  // Esc to close, lock page scroll, keep focus inside the drawer
  useEffect(() => {
    if (!isCartOpen) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeCart();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        panelRef.current?.querySelectorAll(FOCUSABLE) ?? [],
      ).filter((el) => el.getClientRects().length > 0);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const isEmpty = cartItems.length === 0;

  return (
    <div className="fixed inset-0 z-70">
      {/* Backdrop */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 h-full w-full cursor-default bg-stone-950/50 backdrop-blur-sm"
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-surface shadow-raised"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <h2
              id="cart-title"
              className="font-heading text-lg font-bold text-ink"
            >
              Your Order{cartCount > 0 && ` (${cartCount})`}
            </h2>

            {!isEmpty && (
              <button
                type="button"
                onClick={clearCart}
                className="mt-0.5 cursor-pointer text-xs font-semibold text-muted transition-colors hover:text-primary"
              >
                Clear all
              </button>
            )}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="cursor-pointer rounded-lg p-2 text-muted transition-colors hover:bg-page hover:text-ink"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {isEmpty ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShoppingBag className="size-7" strokeWidth={1.8} />
              </span>

              <h3 className="font-heading text-lg font-semibold text-ink">
                Your cart is empty
              </h3>

              <p className="max-w-xs text-sm text-muted">
                Pick a restaurant and add something delicious.
              </p>

              <Link
                to="/restaurants"
                onClick={closeCart}
                className="btn btn-primary mt-2 no-underline"
              >
                Browse restaurants
              </Link>
            </div>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 border-b border-line py-4 last:border-0"
                >
                  <div className="size-20 shrink-0 overflow-hidden rounded-control bg-page">
                    {item.image ? (
                      <FoodImage
                        src={item.image}
                        alt={item.name}
                        className="size-full"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-muted">
                        <Utensils className="size-6" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="line-clamp-2 text-sm font-semibold text-ink">
                          {item.name}
                        </h3>

                        {item.restaurant && (
                          <p className="mt-0.5 truncate text-xs text-muted">
                            {item.restaurant}
                          </p>
                        )}
                      </div>

                      <span className="shrink-0 text-sm font-bold text-ink">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 rounded-control border border-line">
                        <button
                          type="button"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity - 1)
                          }
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="flex size-8 cursor-pointer items-center justify-center text-muted transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Minus className="size-4" />
                        </button>

                        <span className="min-w-6 text-center text-sm font-semibold text-ink">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1)
                          }
                          aria-label={`Increase quantity of ${item.name}`}
                          className="flex size-8 cursor-pointer items-center justify-center text-muted transition-colors hover:text-primary"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => RemoveItemFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="cursor-pointer rounded-lg p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="size-[18px]" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="shrink-0 border-t border-line bg-surface p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-ink">Subtotal</span>
              <span className="font-heading text-xl font-bold text-primary-text">
                {formatPrice(subTotal)}
              </span>
            </div>

            <p className="mt-1 text-xs text-muted">
              Delivery fee is calculated at checkout.
            </p>

            <Link
              to="/checkout"
              onClick={closeCart}
              className="btn btn-primary mt-4 w-full no-underline"
            >
              Checkout
            </Link>
            <Link
              to="/myCart"
              onClick={closeCart}
              className="btn btn-outline mt-3 w-full no-underline"
            >
              View Cart
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
