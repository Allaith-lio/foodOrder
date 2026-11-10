import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Utensils, MapPin, ChevronDown, Search, Bell, Heart, ShoppingBag, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Explore", to: "/" },
  { label: "Offers", to: "/#offers" },
  { label: "Restaurants", to: "/#restaurants" },
  { label: "My Orders", to: "/orders" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const cartCount = 3; // TODO: connect to the cart store later

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Utensils className="size-5 text-primary" />
          <span className="logo-gradient font-logo text-xl font-extrabold">CraveDash</span>
        </Link>

        {/* Location */}
        <button className="hidden items-center gap-2 rounded-full border border-line bg-page px-3 py-1.5 text-left lg:flex">
          <MapPin className="size-4 text-primary" />
          <span className="text-[11px] leading-tight text-muted">
            Deliver to:
            <strong className="block text-xs text-ink">Downtown, Brooklyn - 11201</strong>
          </span>
          <ChevronDown className="size-4 text-muted" />
        </button>

        {/* Links (desktop) */}
        <nav className="ml-2 hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `border-b-2 py-5 transition-colors ${isActive ? "border-primary text-primary" : "border-transparent hover:text-ink"}`
            }
          >
            Explore
          </NavLink>
          {navLinks.slice(1).map((link) => (
            <Link key={link.label} to={link.to} className="transition-colors hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="ml-auto hidden items-center gap-2 rounded-full border border-line bg-page px-3 py-2 xl:flex">
          <Search className="size-4 text-muted" />
          <input
            type="text"
            placeholder="Search dishes & places..."
            className="w-44 bg-transparent text-xs outline-none placeholder:text-muted"
          />
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1 xl:ml-0">
          <button className="rounded-full p-2 text-muted hover:bg-page hover:text-ink" aria-label="Notifications">
            <Bell className="size-5" />
          </button>
          <button className="hidden rounded-full p-2 text-muted hover:bg-page hover:text-ink sm:block" aria-label="Favorites">
            <Heart className="size-5" />
          </button>

          <Link to="/cart" className="btn btn-primary ml-1 !px-3 !py-2">
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Cart ({cartCount})</span>
            <span className="sm:hidden">{cartCount}</span>
          </Link>

          <Link to="/login" className="ml-2 hidden items-center gap-2 sm:flex">
            <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-slate-950">
              A
            </span>
            <span className="text-xs font-medium text-muted">Sign In</span>
          </Link>

          <button className="ml-1 rounded-full p-2 text-ink md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-4 py-3 text-sm font-medium md:hidden">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} onClick={() => setOpen(false)} className="rounded-control px-3 py-2 hover:bg-page">
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
