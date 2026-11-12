import { useRef } from "react";
import { Heart, Truck, Clock, ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { offers } from "../../data/homeData";
import SectionHeading from "./SectionHeading";
import FoodImage from "../ui/FoodImage";

const infoIcons = { truck: Truck, clock: Clock };

export default function SpecialOffers() {
  const listRef = useRef(null);

  // scroll the cards left / right
  const scroll = (amount) => listRef.current?.scrollBy({ left: amount, behavior: "smooth" });

  return (
    <section id="offers" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-14 sm:px-6">
      <SectionHeading label="FLASH PROMOTIONS" title="Special Offers & Deals">
        <div className="flex gap-2 lg:hidden">
          <button onClick={() => scroll(-400)} className="btn btn-outline p-2!" aria-label="Previous">
            <ChevronLeft className="size-4" />
          </button>
          <button onClick={() => scroll(400)} className="btn btn-outline p-2!" aria-label="Next">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </SectionHeading>

      <div ref={listRef} className="flex snap-x gap-5 overflow-x-auto pb-2 scrollbar-none">
        {offers.map((offer) => {
          const InfoIcon = infoIcons[offer.infoIcon];
          return (
            <article
              key={offer.id}
              className="w-80 shrink-0 snap-start overflow-hidden rounded-card border border-line bg-surface shadow-card md:w-auto md:flex-1 transition hover:-translate-y-1 duration-300"
            >
              <div className="relative ">
                <FoodImage src={offer.image} alt={offer.title} className="h-45 w-full" />
                <span className={`absolute left-3 top-3 flex gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${offer.badgeColor}`}>
                  <Flame className="size-3.5 text-white" /> {offer.badge}
                </span>
                <button className="absolute right-3 top-3 rounded-full bg-white p-1.5 text-stone-500 hover:text-primary" aria-label="Save">
                  <Heart className="size-4" />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between text-[11px]">
                  <span className={`rounded px-2 py-0.5 font-bold ${offer.tagColor}`}>{offer.tag}</span>
                  <span className="text-muted">{offer.side}</span>
                </div>
                <h3 className="mt-3 text-base!">{offer.title}</h3>
                <p className="mt-1 text-xs text-muted">{offer.text}</p>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-tertiary">
                    <InfoIcon className="size-3.5" /> {offer.info}
                  </span>
                  <button className="font-semibold text-primary hover:underline">Claim Offer</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
