import { Zap, Navigation, ChefHat } from "lucide-react";
import { features } from "../../data/homeData";

const icons = { zap: Zap, navigation: Navigation, chef: ChefHat };

export default function FeaturesStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <div className="grid divide-line rounded-card border border-line bg-surface shadow-card md:grid-cols-3 md:divide-x">
        {features.map((item) => {
          const Icon = icons[item.icon];
          return (
            <div key={item.title} className="flex items-center gap-3 p-4">
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-control ${item.color}`}>
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="!text-sm">{item.title}</h3>
                <p className="text-xs text-muted">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
