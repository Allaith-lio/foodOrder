
import {
  Check,
  ChefHat,
  Bike,
  PackageCheck,
} from "lucide-react";

const steps = [
  {
    label: "Order Confirmed",
    description: "Your order has been received",
    icon: Check,
  },
  {
    label: "Preparing",
    description: "The restaurant is preparing your food",
    icon: ChefHat,
  },
  {
    label: "On the Way",
    description: "Your order is on its way",
    icon: Bike,
  },
  {
    label: "Delivered",
    description: "Enjoy your meal!",
    icon: PackageCheck,
  },
];

export default function OrderProgress({ currentStep = 1 }) {
  return (
    <div className="border-t border-line bg-page/30 p-6 sm:p-7">
      <div className="mb-8">
        <h3 className="text-lg font-bold text-ink">
          Order Progress
        </h3>

        <p className="mt-1 text-sm text-muted">
          Your food is being prepared with care.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const completed = index < currentStep;
          const active = index === currentStep;

          return (
            <div key={step.label} className="min-w-0 text-center">
              <div className="mb-4 flex items-center">
                {index !== 0 && (
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      completed || active
                        ? "bg-primary"
                        : "bg-line"
                    }`}
                  />
                )}

                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full transition ${
                    completed
                      ? "bg-primary text-white"
                      : active
                        ? "bg-primary text-white ring-4 ring-primary/15"
                        : "bg-surface text-muted ring-1 ring-line"
                  }`}
                >
                  <Icon className="size-5" />
                </div>

                {index !== steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      completed ? "bg-primary" : "bg-line"
                    }`}
                  />
                )}
              </div>

              <p
                className={`text-xs font-bold sm:text-sm ${
                  completed || active
                    ? "text-primary"
                    : "text-muted"
                }`}
              >
                {step.label}
              </p>

              <p className="mt-1 hidden text-xs leading-5 text-muted sm:block">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
