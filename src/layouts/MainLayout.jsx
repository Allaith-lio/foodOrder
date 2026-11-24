import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CartDrawer from "../components/layout/CartDrawer";
// Public site layout: Header + page + Footer.
// Used by Home, Restaurants, Restaurant details, Wishlist, ...
export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1" key={location.pathname}>
        <div className="page-enter h-full">
          <Outlet />
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
