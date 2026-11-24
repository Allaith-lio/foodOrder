import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "sofra-cart";
const MAX_QUANTITY = 99;

const CartContext = createContext(null);

// A cart item is a snapshot, so the drawer can render it without a lookup:
// { id, name, price (number), image?, restaurant?, quantity }
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(saved)) return [];

    return saved
      .filter(
        (item) =>
          item &&
          item.id != null &&
          typeof item.price === "number" &&
          item.quantity > 0,
      )
      .map((item) => ({
        ...item,
        // Older carts stored the picture as "img"; unify on "image".
        image: item.image || item.img,
      }));
  } catch {
    return [];
  }
}

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Keep the cart after a refresh
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // storage is full or blocked: the cart still works in memory
    }
  }, [cartItems]);

  // Drawer open / close (stable functions, safe to use in effects)
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  // Get product quantity
  const getItemQuantity = (id) =>
    cartItems.find((item) => item.id === id)?.quantity || 0;

  // Add a dish (or increase its quantity if it is already in the cart)
  // item = { id, name, price, image?, restaurant? }
  const addToCart = (item, quantity = 1) => {
    setCartItems((currItems) => {
      const existing = currItems.find((i) => i.id === item.id);

      if (!existing) {
        return [...currItems, { ...item, quantity }];
      }

      return currItems.map((i) =>
        i.id === item.id
          ? { ...i, quantity: Math.min(MAX_QUANTITY, i.quantity + quantity) }
          : i,
      );
    });
  };

  // Increase quantity of an item already in the cart
  const increaseCartQuantity = (id) => {
    setCartItems((currItems) =>
      currItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + 1) }
          : item,
      ),
    );
  };

  // Decrease quantity (removes the item when it reaches 0)
  const decreaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      const item = currItems.find((i) => i.id === id);
      if (!item) return currItems;

      if (item.quantity === 1) {
        return currItems.filter((i) => i.id !== id);
      }

      return currItems.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  };

  // Update quantity directly
  const updateCartQuantity = (id, quantity) => {
    if (quantity < 1) return;

    setCartItems((currItems) =>
      currItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(MAX_QUANTITY, quantity) }
          : item,
      ),
    );
  };

  // Remove product
  const RemoveItemFromCart = (id) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  // Clear the whole cart
  const clearCart = () => setCartItems([]);

  // Derived values
  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const subTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subTotal,
        isCartOpen,
        openCart,
        closeCart,
        getItemQuantity,
        addToCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        updateCartQuantity,
        RemoveItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useShoppingCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useShoppingCart must be used inside <CartContextProvider>");
  }

  return context;
};
