import { MapPin, Utensils } from "lucide-react";
import StatCard from "../../components/vendor/StatCard";
import SalesChart from "../../components/vendor/SalesChart";
import RankList from "../../components/vendor/RankList";
import CountsCard from "../../components/vendor/CountsCard";
import { stats, salesData, topLocations, topCategories, platformCounts } from "../../data/vendorData";

// Vendor "Dashboard Overview" page.
export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Store operations</p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-muted">A quick look at how your store is doing.</p>
      </header>

      {/* 4 number cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.key} icon={s.key} label={s.label} value={s.value} change={s.change} tone={s.tone} />
        ))}
      </section>

      {/* Sales chart (week / month) */}
      <SalesChart data={salesData} />

      {/* Locations, categories, counts */}
      <section className="grid gap-4 lg:grid-cols-3">
        <RankList
          title="Most requested locations"
          subtitle="Share of orders by area"
          icon={MapPin}
          items={topLocations}
        />
        <RankList
          title="Most requested categories"
          subtitle="Share of orders by food type"
          icon={Utensils}
          items={topCategories}
        />
        <CountsCard items={platformCounts} />
      </section>
    </div>
  );
}
