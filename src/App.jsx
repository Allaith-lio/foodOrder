import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import LoginAndRegister from "./pages/LoginAndRegister";
import ResturantsDetalies from "./pages/ResturantsDetalies";
import Resturants from "./Pages/Resturants";
import Wishlist from "./Pages/Wishlist";
import VendorLayout from "./components/vendor/VendorLayout";
import Dashboard from "./pages/vendor/Dashboard";
import OrdersManagement from "./pages/vendor/OrdersManagement";
import CustomersManagement from "./pages/vendor/CustomersManagement";
import MyOrders from "./pages/MyOrders";
import Cart from "./pages/Cart";
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginAndRegister />} />
      <Route path="/register" element={<LoginAndRegister />} />
      <Route path="/restaurants" element={<Resturants />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/restaurants/taza-041" element={<ResturantsDetalies />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/cart" element={<Cart />} />
        {/* teammates add their pages here */}
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

/*

Resturant Detalis and Login/Register page

*/
