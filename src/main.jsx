import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./hooks/ThemeContext.jsx";
import CartContextProvider from "./hooks/CartContext.jsx";
import WishlistProvider from "./hooks/WishlistContext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CartContextProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
