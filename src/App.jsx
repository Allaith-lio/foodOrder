import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginAndRegister from "./pages/LoginAndRegister";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Wishlist from "./pages/Wishlist";
import Dashboard from "./pages/vendor/Dashboard";
import OrdersManagement from "./pages/vendor/OrdersManagement";
import CustomersManagement from "./pages/vendor/CustomersManagement";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import VendorLayout from "./layouts/VendorLayout";
import Restaurants from "./pages/Restaurants";
import RestaurantsDetails from "./pages/RestaurantsDetails";
// import CheckoutPage from "./pages/CheckoutPage";
import AboutUs from "./pages/AboutUs";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/taza-041" element={<RestaurantsDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/myCart" element={<Cart />} />
        <Route path="/myOrders" element={<MyOrders />} />
        {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
        <Route path="/aboutUs" element={<AboutUs />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginAndRegister />} />
        <Route path="/register" element={<LoginAndRegister />} />
      </Route>

      {/* Vendor area (sidebar layout) - Nour */}
      <Route path="/vendor" element={<VendorLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<OrdersManagement />} />
        <Route path="customers" element={<CustomersManagement />} />
      </Route>
    </Routes>
  );
}
