import { useState } from "react";
import OrdersHeader from "../components/orders/OrdersHeader";
import OrderTabs from "../components/orders/OrderTabs";
import ActiveOrder from "../components/orders/ActiveOrder";
import PastOrders from "../components/orders/PastOrders";
import CancelledOrders from "../components/orders/CancelledOrders";
import SupportSection from "../components/orders/SupportSection";

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <OrdersHeader />

      <div className="mt-10">
        <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {activeTab === "active" && (
        <div className="mt-8">
          <ActiveOrder />
        </div>
      )}
      {activeTab === "past" && (
        <div className="mt-8">
          <PastOrders />
        </div>
      )}
      {activeTab === "cancelled" && (
        <div className="mt-8">
          <CancelledOrders />
        </div>
      )}
      <SupportSection />
    </div>
  );
}
