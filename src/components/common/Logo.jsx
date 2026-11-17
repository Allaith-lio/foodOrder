import { Utensils } from "lucide-react";

export default function Logo({ className = "text-xl" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
        <Utensils className="size-5" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span
        className={`font-logo font-extrabold tracking-tight text-ink ${className}`}
      >
        Crave<span className="text-primary">Dash</span>
      </span>
    </span>
  );
}
