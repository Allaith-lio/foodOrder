import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import LoginAndRegister from "./pages/LoginAndRegister";
import ResturantsDetalies from "./pages/ResturantsDetalies";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginAndRegister />} />
      <Route path="/register" element={<LoginAndRegister />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/restaurants/taza-041" element={<ResturantsDetalies />} />
        {/* teammates add their pages here */}
      </Route>
    </Routes>
  );
}

/*

Resturant Detalis and Login/Register page

*/
