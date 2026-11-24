import { Check, Bike, Home } from "lucide-react";

export default function OrderStepper({ steps }) {
  return (
    <div className="grid grid-cols-4 px-2 py-8 sm:px-6">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <div key={s.label} className="relative flex flex-col items-center text-center">
            {/* line to the right */}
            {!last && (
              <span
                className={`absolute left-1/2 top-5 h-0.5 w-full ${
                  s.state === "done" ? "bg-primary" : "bg-line"
                }`}
              />
            )}
            {/* line to the left */}
            {i > 0 && (
              <span
                className={`absolute right-1/2 top-5 h-0.5 w-1/2 ${
                  steps[i - 1].state === "done" ? "bg-primary" : "bg-line"
                }`}
              />
            )}

            <span
              className={`relative z-10 grid size-10 place-items-center rounded-full ${
                s.state === "done"
                  ? "bg-tertiary text-white"
                  : s.state === "active"
                  ? "bg-primary text-white ring-4 ring-primary/20 animate-pulse-ring"
                  : "bg-page text-muted"
              }`}
            >
              {s.state === "done" ? (
                <Check className="size-5" />
              ) : s.state === "active" ? (
                <Bike className="size-5" />
              ) : (
                <Home className="size-5" />
              )}
            </span>

            <p
              className={`mt-2 text-xs font-semibold ${
                s.state === "active" ? "text-primary" : "text-ink"
              }`}
            >
              {s.label}
              {s.state === "active" && (
                <span className="ml-1 animate-pulse text-primary">●</span>
              )}
            </p>
            <p
              className={`text-[11px] ${
                s.state === "active" ? "text-primary" : "text-muted"
              }`}
            >
              {s.time}
            </p>
          </div>
        );
      })}
    </div>
  );
}