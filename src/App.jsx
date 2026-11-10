import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      {/* Header + Footer wrap every page */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {/* teammates add their pages here */}
      </Route>
    </Routes>
  );
}
