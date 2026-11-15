
import { Search } from "lucide-react";

export default function OrdersHeader() {
  return (
    <header>
      <nav className="mb-3 flex items-center gap-2 text-xs text-slate-500">
        <a href="/" className="hover:text-slate-800">Home</a>
        <span>›</span>
        <span className="text-slate-800">Orders &amp; Tracking</span>
      </nav>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            My Orders &amp; Order History
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time GPS tracking, active culinary preparation, and past order archives.
          </p>
        </div>

        <label className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 sm:w-72">
          <Search className="size-4 text-orange-500" />
          <input
            placeholder="Search orders or dishes..."
            className="w-full bg-transparent py-2.5 text-xs outline-none placeholder:text-slate-400"
          />
        </label>
      </div>

      <hr className="mt-6 border-slate-200" />
    </header>
  );
}