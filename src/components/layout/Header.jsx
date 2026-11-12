
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Utensils,
  MapPin,
  ChevronDown,
  ShoppingBag,
  Menu,
  X,
  UserRound,
  Navigation,
  MapPinned,
  Check,
  LocateFixed,
} from "lucide-react";

const navLinks = [
  { label: "Explore", to: "/", end: true },
  { label: "Offers", to: "/#offers" },
  { label: "Restaurants", to: "/#restaurants" },
  { label: "My Orders", to: "/orders" },
];

const cities = [
  "Latakia",
  "Damascus",
  "Aleppo",
  "Homs",
  "Hama",
  "Tartous",
  "Idlib",
  "Daraa",
  "Deir ez-Zor",
  "Raqqa",
  "Qamishli",
  "Sweida",
];

const defaultLocation = {
  city: "",
  area: "",
  street: "",
  details: "",
  latitude: null,
  longitude: null,
  gps: false,
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState("");

  const [location, setLocation] = useState(() => {
    try {
      const saved = localStorage.getItem("deliveryLocation");
      return saved ? { ...defaultLocation, ...JSON.parse(saved) } : defaultLocation;
    } catch {
      return defaultLocation;
    }
  });

  const [draft, setDraft] = useState(defaultLocation);

  const cartCount = 3; // TODO: Connect to cart store

  const openLocationModal = () => {
    setDraft({ ...location });
    setGpsError("");
    setShowLocation(true);
  };

  // Get current GPS coordinates
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGpsError("Your browser does not support location services.");
      return;
    }

    setGpsLoading(true);
    setGpsError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDraft((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          gps: true,
        }));

        setGpsLoading(false);
      },
      (error) => {
        const messages = {
          1: "Location permission was denied. Please allow location access.",
          2: "Unable to determine your location. Try again.",
          3: "Location request timed out. Please try again.",
        };

        setGpsError(
          messages[error.code] || "Something went wrong while getting your location."
        );

        setGpsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      }
    );
  };

  // Save delivery address
  const saveLocation = (e) => {
    e.preventDefault();

    const hasAddress = draft.city && draft.area;
    const hasGPS = draft.gps && draft.latitude !== null;

    if (!hasAddress && !hasGPS) {
      setGpsError("Please select your city and area, or use your current location.");
      return;
    }

    try {
      localStorage.setItem("deliveryLocation", JSON.stringify(draft));
      setLocation(draft);
      setShowLocation(false);
      setGpsError("");
    } catch {
      setGpsError("Unable to save your address. Please try again.");
    }
  };

  const locationLabel = location.area
    ? `${location.area}, ${location.city}`
    : location.city
      ? location.city
      : location.gps
        ? "Current Location"
        : "Choose your address";

  const linkStyle = ({ isActive }) =>
    `py-2 text-sm font-semibold transition-colors ${
      isActive ? "text-primary" : "text-muted hover:text-primary"
    }`;

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

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) =>
              link.end ? (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end
                  className={linkStyle}
                >
                  {link.label}
                </NavLink>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className="py-2 text-sm font-semibold text-muted transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            {/* Delivery Location */}
            <button
              type="button"
              onClick={openLocationModal}
              className="hidden max-w-52 items-center gap-2 rounded-xl px-2 py-2 text-left transition-colors hover:bg-page lg:flex"
            >
              <MapPin className="size-5 shrink-0 text-primary" />

              <span className="min-w-0 leading-tight">
                <span className="block text-[10px] font-medium text-muted">
                  Deliver to
                </span>

                <span className="block truncate text-xs font-bold text-ink">
                  {locationLabel}
                </span>
              </span>

              <ChevronDown className="size-4 shrink-0 text-muted" />
            </button>

            {/* Sign In */}
            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-page sm:flex"
            >
              <UserRound className="size-4" />
              <span>Sign In</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label={`Shopping cart, ${cartCount} items`}
              className="relative flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-ink transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              <ShoppingBag className="size-[21px]" strokeWidth={1.9} />

              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex size-[19px] items-center justify-center rounded-full border-2 border-surface bg-primary text-[10px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex size-11 items-center justify-center rounded-xl border border-line text-ink transition-colors hover:bg-page md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <nav className="border-t border-line bg-surface px-4 py-4 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">

              {/* Mobile Location */}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openLocationModal();
                }}
                className="mb-3 flex items-center gap-3 rounded-xl bg-page p-3 text-left"
              >
                <MapPin className="size-5 shrink-0 text-primary" />

                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-muted">
                    Deliver to
                  </span>
                  <span className="block truncate text-sm font-semibold text-ink">
                    {locationLabel}
                  </span>
                </span>

                <ChevronDown className="size-4 text-muted" />
              </button>

              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-ink transition-colors hover:bg-page hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-2 border-t border-line" />

              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-primary hover:bg-primary/5"
              >
                <UserRound className="size-4" />
                Sign In
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Location Modal */}
      {showLocation && (
        <div
          className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-stone-950/50 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setShowLocation(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-title"
            onClick={(e) => e.stopPropagation()}
            className="my-auto max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface shadow-xl"
          >

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-line px-5 py-4 ">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <MapPinned className="size-5 text-primary" />
                </div>

                <div>
                  <h3
                    id="location-title"
                    className="text-lg font-bold text-ink"
                  >
                    Delivery Location
                  </h3>
                  <p className="mt-0.5 text-xs text-muted">
                    Where should we deliver your food?
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowLocation(false)}
                className="rounded-lg p-2 text-muted transition-colors hover:bg-page hover:text-ink"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={saveLocation} className="space-y-5 p-5">

              {/* GPS Option */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
                    <LocateFixed className="size-5 text-primary" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-ink">
                      Use Current Location
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      Find your location automatically using GPS.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={gpsLoading}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Navigation className="size-4" />
                  {gpsLoading ? "Locating..." : "Detect My Location"}
                </button>

                {draft.gps && draft.latitude !== null && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-green-700">
                    <Check className="size-4" />
                    GPS location detected successfully
                  </p>
                )}
              </div>

              {/* Manual Address */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-ink">
                    Or enter your address manually
                  </h4>
                  <p className="mt-1 text-xs text-muted">
                    Select your city and enter your delivery details.
                  </p>
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-ink">
                    City
                  </label>

                  <select
                    value={draft.city}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        city: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-line bg-page px-3 py-3 text-sm text-ink outline-none transition-colors focus:border-primary"
                  >
                    <option value="">Select your city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Area */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-ink">
                    Area / Neighborhood
                  </label>

                  <input
                    type="text"
                    value={draft.area}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        area: e.target.value,
                      })
                    }
                    placeholder="e.g. Raml Al Shamali"
                    className="w-full rounded-xl border border-line bg-page px-3 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-primary"
                  />
                </div>

                {/* Street */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-ink">
                    Street / Building
                  </label>

                  <input
                    type="text"
                    value={draft.street}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        street: e.target.value,
                      })
                    }
                    placeholder="Street name or building number"
                    className="w-full rounded-xl border border-line bg-page px-3 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-primary"
                  />
                </div>

                {/* Additional Details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-ink">
                    Additional Details
                    <span className="ml-1 font-normal text-muted">
                      (Optional)
                    </span>
                  </label>

                  <input
                    type="text"
                    value={draft.details}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        details: e.target.value,
                      })
                    }
                    placeholder="Floor, apartment, nearby landmark..."
                    className="w-full rounded-xl border border-line bg-page px-3 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-primary"
                  />
                </div>
              </div>

              {/* Error */}
              {gpsError && (
                <p role="alert" className="rounded-lg bg-red-50 p-3 text-xs text-red-600">
                  {gpsError}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => setShowLocation(false)}
                  className="flex-1 rounded-xl border border-line px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-page"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-hover"
                >
                  <Check className="size-4" />
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
