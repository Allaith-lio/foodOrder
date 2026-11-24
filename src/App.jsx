import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Logo from "./components/common/Logo";

import Home from "./pages/Home";

const LoginAndRegister = lazy(() => import("./pages/LoginAndRegister"));
const Cart = lazy(() => import("./pages/Cart"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Dashboard = lazy(() => import("./pages/vendor/Dashboard"));
const OrdersManagement = lazy(() => import("./pages/vendor/OrdersManagement"));
const CustomersManagement = lazy(
  () => import("./pages/vendor/CustomersManagement"),
);
const Restaurants = lazy(() => import("./pages/Restaurants"));
const RestaurantsDetails = lazy(() => import("./pages/RestaurantsDetails"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const UserProfile = lazy(() => import("./pages/UserProfile"));

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import VendorLayout from "./layouts/VendorLayout";

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
      <div className="animate-pulse">
        <Logo className="text-2xl" />
      </div>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-2 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
      <p className="text-xs font-medium tracking-wide text-muted">
        Loading your taste...
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route
            path="/restaurants/taza-041"
            element={<RestaurantsDetails />}
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/myCart" element={<Cart />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/aboutUs" element={<AboutUs />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginAndRegister />} />
          <Route path="/register" element={<LoginAndRegister />} />
        </Route>

        <Route path="/vendor" element={<VendorLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="customers" element={<CustomersManagement />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
