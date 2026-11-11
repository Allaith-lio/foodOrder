import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Users, Store, LogOut, Moon, Sun, Menu, X, Utensils } from "lucide-react";

// Sidebar links. Add a new vendor page here (and a <Route> in App.jsx).
const navItems = [
  { label: "Overview", to: "/vendor", icon: LayoutDashboard, end: true },
  { label: "Orders", to: "/vendor/orders", icon: ShoppingBag },
  { label: "Customers", to: "/vendor/customers", icon: Users },
];

// Wraps every vendor page: sidebar on the left, top bar, and the page itself in the middle.
export default function VendorLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // only used on phones
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("vendor-theme") === "dark";
    } catch {
      return false;
    }
  });

  // Dark mode: the theme file already has [data-theme="dark"] colors.
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem("vendor-theme", dark ? "dark" : "light");
    } catch {
      /* storage not available, ignore */
    }
  }, [dark]);

  // Leaving the vendor area goes back to the normal (light) site.
  useEffect(() => () => document.documentElement.removeAttribute("data-theme"), []);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-dvh bg-page">
      {/* Dark background behind the sidebar on phones */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-ink/40 lg:hidden" onClick={closeSidebar} />}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-surface p-4 transition-transform duration-200 lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/vendor" onClick={closeSidebar} className="flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Utensils className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="logo-gradient block font-logo text-lg font-extrabold">CraveDash</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-muted">Partner</span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeSidebar}
            className="cursor-pointer rounded-lg p-1.5 text-muted hover:bg-page lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="mb-2 mt-8 px-3 text-[11px] font-bold uppercase tracking-widest text-muted">Menu</p>
        <nav className="space-y-1">
          {navItems.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted hover:bg-page hover:text-ink"
                }`
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom buttons */}
        <div className="mt-auto space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-page"
          >
            <Store className="size-4 text-muted" />
            Back to store
          </Link>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/20"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Right side: top bar + page */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-surface/95 px-4 backdrop-blur sm:px-8">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
            className="cursor-pointer rounded-lg p-2 text-ink hover:bg-page lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setDark((d) => !d)}
              className="flex size-9 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-page hover:text-ink"
            >
              {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </button>

            <div className="flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-3">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                A
              </span>
              <span className="text-sm font-semibold">Admin</span>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
