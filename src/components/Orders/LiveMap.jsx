import { MapPin } from "lucide-react";

export default function LiveMap({ destination }) {
  return (
    <div className="relative h-64 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
      {/* stylised street grid */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 400 260"
        preserveAspectRatio="none"
      >
        <rect width="400" height="260" fill="#eef1f4" />
        <rect x="300" width="100" height="260" fill="#cfe3f5" />
        {[40, 90, 140, 190, 240].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y + 20} stroke="#1e3a5f" strokeWidth="3" opacity="0.75" />
        ))}
        {[50, 110, 170, 230, 290].map((x) => (
          <line key={x} x1={x} y1="0" x2={x + 30} y2="260" stroke="#1e3a5f" strokeWidth="3" opacity="0.75" />
        ))}
        <polyline
          points="60,230 120,190 180,170 220,120 270,90 330,60"
          fill="none"
          stroke="#f97316"
          strokeWidth="4"
          strokeDasharray="8 6"
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1.5 text-[10px] text-slate-500 shadow">
        <p className="font-semibold text-slate-800">Out for Delivery</p>
        <p>Estimated Arrival: 11:42 AM</p>
      </div>

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-lg">
        <span className="size-2.5 rounded-full bg-red-500" />
        Marcus is 4 mins away
      </div>

      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">
        <MapPin className="size-3.5 text-orange-400" />
        {destination}
      </div>
    </div>
  );
}