import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Utensils,
  MapPin,
  ChevronDown,
  ShoppingBag,
  Heart,
  Menu,
  X,
  UserRound,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../hooks/ThemeContext";
import { useShoppingCart } from "../../hooks/CartContext";
import { useWishlist } from "../../hooks/WishlistContext";
import { useDeliveryLocation } from "../../hooks/useDeliveryLocation";
import LocationModal from "./LocationModal";

const navLinks = [
  { label: "Explore", to: "/", end: true },
  { label: "Offers", to: "/offers" },
  { label: "Restaurants", to: "/restaurants" },
  { label: "My Orders", to: "/orders" },
];

// Same look for theme / wishlist / cart buttons
const iconButton =
  "relative flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-line bg-surface text-ink transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary";

const desktopLinkStyle = ({ isActive }) =>
  `py-2 text-sm font-semibold transition-colors ${
    isActive ? "text-primary" : "text-muted hover:text-primary"
  }`;

const mobileLinkStyle = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors hover:bg-page hover:text-primary ${
    isActive ? "bg-primary/5 text-primary" : "text-ink"
  }`;

function CountBadge({ count }) {
  if (!count) return null;

  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full border-2 border-surface bg-primary px-1 text-[10px] font-bold text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { cartCount, openCart } = useShoppingCart();
  const { wishlistCount } = useWishlist();
  const { location, locationLabel, saveLocation } = useDeliveryLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleSaveLocation = (nextLocation) => {
    saveLocation(nextLocation);
    setShowLocation(false);
  };

  const themeLabel = isDarkMode ? "Switch to light mode" : "Switch to dark mode";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-white">
              <Utensils className="size-5" strokeWidth={2.5} />
            </div>

            <span className="font-logo text-2xl font-extrabold tracking-tight text-ink">
              Sofra<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={desktopLinkStyle}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Delivery location (desktop) */}
            <button
              type="button"
              onClick={() => setShowLocation(true)}
              className="hidden max-w-52 cursor-pointer items-center gap-2 rounded-xl px-2 py-2 text-left transition-colors hover:bg-page lg:flex"
            >
              <MapPin className="size-5 shrink-0 text-primary" />

              <span className="min-w-0 leading-tight">
                <span className="block text-[10px] font-medium text-muted">Deliver to</span>
                <span className="block truncate text-xs font-bold text-ink">
                  {locationLabel}
                </span>
              </span>

              <ChevronDown className="size-4 shrink-0 text-muted" />
            </button>

            {/* Sign in (desktop) */}
            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-page sm:flex"
            >
              <UserRound className="size-4" />
              <span>Sign In</span>
            </Link>

            {/* Theme toggle (on mobile it lives inside the menu) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={themeLabel}
              className={`${iconButton} hidden sm:flex`}
            >
              {isDarkMode ? (
                <Sun className="size-[21px] text-amber-400" strokeWidth={1.9} />
              ) : (
                <Moon className="size-[21px]" strokeWidth={1.9} />
              )}
            </button>

            {/* Wishlist (on mobile it lives inside the menu) */}
            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlistCount} restaurants`}
              className={`${iconButton} hidden sm:flex`}
            >
              <Heart className="size-[21px]" strokeWidth={1.9} />
              <CountBadge count={wishlistCount} />
            </Link>

            {/* Cart */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${cartCount} items`}
              aria-haspopup="dialog"
              className={iconButton}
            >
              <ShoppingBag className="size-[21px]" strokeWidth={1.9} />
              <CountBadge count={cartCount} />
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="flex size-11 cursor-pointer items-center justify-center rounded-xl border border-line text-ink transition-colors hover:bg-page md:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-line bg-surface px-4 py-4 md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {/* Location */}
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  setShowLocation(true);
                }}
                className="mb-3 flex cursor-pointer items-center gap-3 rounded-xl bg-page p-3 text-left"
              >
                <MapPin className="size-5 shrink-0 text-primary" />

                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-muted">Deliver to</span>
                  <span className="block truncate text-sm font-semibold text-ink">
                    {locationLabel}
                  </span>
                </span>

                <ChevronDown className="size-4 text-muted" />
              </button>

              {/* Pages */}
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={closeMenu}
                  className={mobileLinkStyle}
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="my-2 border-t border-line" />

              {/* Wishlist */}
              <NavLink to="/wishlist" onClick={closeMenu} className={mobileLinkStyle}>
                <Heart className="size-4" />
                <span>Wishlist</span>

                {wishlistCount > 0 && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </NavLink>

              {/* Theme */}
              <button
                type="button"
                onClick={toggleTheme}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-ink transition-colors hover:bg-page hover:text-primary"
              >
                {isDarkMode ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4" />}
                <span>{isDarkMode ? "Light mode" : "Dark mode"}</span>
              </button>

              {/* Sign in */}
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                <UserRound className="size-4" />
                Sign In
              </Link>
            </div>
          </nav>
        )}
      </header>

      {showLocation && (
        <LocationModal
          location={location}
          onSave={handleSaveLocation}
          onClose={() => setShowLocation(false)}
        />
      )}
    </>
  );
}
