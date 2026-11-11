import { useRef } from "react";
import { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Bike,
  Check,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

const restaurantLocation = [35.5317, 35.7901];

const favoriteDishes = [
  {
    name: "Taza Signature Shawarma",
    description: "Slow-roasted chicken, garlic toum, and warm saj.",
    price: "450 SYP",
    image: "photo-1626700051175-6818013e1d4f",
    label: "A local favorite",
  },
  {
    name: "Crispy Chicken Meal",
    description: "Golden, crunchy chicken with seasoned fries.",
    price: "680 SYP",
    image: "photo-1626082927389-6cd097cdc6ec",
    label: "Crowd pleaser",
  },
  {
    name: "Smash Beef Burger",
    description: "Juicy beef, melted cheese, and Taza sauce.",
    price: "720SYP",
    image: "photo-1568901346375-23c9450c58cd",
    label: "Must try",
  },
  {
    name: "Loaded Taza Fries",
    description: "Crispy fries with cheese and house seasoning.",
    price: "380 SYP",
    image: "photo-1573080496219-bb080dd4f877",
    label: "Perfect to share",
  },
];

const menuCategories = [
  {
    id: "shawarma",
    name: "Shawarma",
    items: [
      {
        name: "Chicken Shawarma Wrap",
        detail: "Chicken, garlic sauce, pickles, and fries in saj bread.",
        price: "350 SYP",
        badge: "POPULAR",
      },
      {
        name: "Taza Signature Shawarma",
        detail: "Slow-roasted chicken with extra toum and house spices.",
        price: "450 SYP",
        badge: "CHEF'S PICK",
      },
      {
        name: "Beef Shawarma Plate",
        detail: "Tender beef, fresh salad, hummus, and warm bread.",
        price: "780 SYP",
      },
    ],
  },
  {
    id: "burgers",
    name: "Burgers & Chicken",
    items: [
      {
        name: "Smash Beef Burger",
        detail: "Double smashed beef, cheddar, lettuce, and Taza sauce.",
        price: "720 SYP",
      },
      {
        name: "Crispy Chicken Burger",
        detail: "Buttermilk-marinated chicken, slaw, and a little kick.",
        price: "580 SYP",
      },
      {
        name: "Crispy Chicken Meal",
        detail: "Crispy chicken, golden fries, and your choice of dip.",
        price: "680 SYP",
      },
    ],
  },
  {
    id: "sides",
    name: "Sides & Drinks",
    items: [
      {
        name: "Loaded Taza Fries",
        detail: "Crispy fries with cheese, herbs, and signature seasoning.",
        price: "380 SYP",
      },
      {
        name: "Garden Fattoush",
        detail: "Seasonal greens, crisp pita, sumac, and pomegranate molasses.",
        price: "320 SYP",
      },
      {
        name: "Fresh Lemon Mint",
        detail: "Freshly squeezed lemon, mint, and a touch of sweetness.",
        price: "180 SYP",
      },
    ],
  },
];

const reviews = [
  {
    name: "Rana H.",
    initials: "RH",
    date: "2 days ago",
    text: "The shawarma was so fresh and full of flavor. Everything arrived warm, and the garlic sauce is incredible.",
  },
  {
    name: "Omar K.",
    initials: "OK",
    date: "5 days ago",
    text: "Great portions, quick delivery, and the crispy chicken was perfectly seasoned. Ordering again soon.",
  },
  {
    name: "Maya A.",
    initials: "MA",
    date: "1 week ago",
    text: "Really lovely food and friendly service. The Taza signature wrap is my new favorite lunch.",
  },
];

function FoodPhoto({ image, alt, className = "" }) {
  return (
    <img
      src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=85`}
      alt={alt}
      loading="lazy"
      className={className}
    />
  );
}

function RestaurantMap() {
  const markerIcon = divIcon({
    className: "taza-map-pin",
    html: '<span class="taza-map-pin__outer"><span class="taza-map-pin__inner"></span></span>',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });

  return (
    <div className="taza-map-frame">
      <MapContainer
        center={restaurantLocation}
        zoom={14}
        scrollWheelZoom={false}
        zoomControl={false}
        className="taza-map"
        aria-label="Map showing Taza 041 in Latakia, Syria"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={restaurantLocation} icon={markerIcon}>
          <Popup>
            <strong>Taza 041</strong>
            <br />
            Latakia, Syria
          </Popup>
        </Marker>
        <MapZoomControls />
      </MapContainer>
      <div className="taza-map-label">
        <span className="flex size-9 items-center justify-center rounded-full bg-primary text-white shadow-md">
          <MapPin className="size-4" />
        </span>
        <span>
          <strong className="block text-xs text-ink">Taza 041</strong>
          <span className="text-[11px] text-muted">Latakia, Syria</span>
        </span>
      </div>
      <a
        href="https://www.openstreetmap.org/?mlat=35.5317&mlon=35.7901#map=15/35.5317/35.7901"
        target="_blank"
        rel="noreferrer"
        className="taza-map-directions"
      >
        <ArrowRight className="size-3.5" /> Directions
      </a>
    </div>
  );
}

function MapZoomControls() {
  const map = useMap();

  return (
    <div className="taza-map-controls" aria-label="Map zoom controls">
      <button type="button" onClick={() => map.zoomIn()} aria-label="Zoom in">
        <Plus className="size-4" />
      </button>
      <button type="button" onClick={() => map.zoomOut()} aria-label="Zoom out">
        <Minus className="size-4" />
      </button>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, id, action }) {
  return (
    <div id={id} className="mb-5 scroll-mt-24">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-1.5 !text-2xl sm:!text-[1.7rem]">{title}</h2>
        </div>
        {action}
      </div>
      {description && (
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          {description}
        </p>
      )}
    </div>
  );
}

function RatingCard() {
  const ratingBars = [
    { stars: 5, width: "w-[88%]" },
    { stars: 4, width: "w-[9%]" },
    { stars: 3, width: "w-[3%]" },
  ];

  return (
    <section
      id="reviews"
      className="scroll-mt-24 rounded-[1.4rem] border border-line bg-white p-5 shadow-card sm:p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary">
            Loved by locals
          </p>
          <h2 className="mt-1.5 !text-xl">Guest ratings</h2>
        </div>
        <span className="flex size-10 items-center justify-center rounded-full bg-amber-50 text-amber-500">
          <Heart className="size-[18px] fill-current" />
        </span>
      </div>

      <div className="mt-5 flex items-center gap-4 rounded-xl bg-[#fff9ed] p-4">
        <span className="text-4xl font-extrabold tracking-tight text-ink">
          4.9
        </span>
        <div>
          <div
            className="flex gap-0.5 text-amber-500"
            aria-label="Rated 4.9 out of 5"
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} className="size-3.5 fill-current" />
            ))}
          </div>
          <p className="mt-1 text-[11px] text-muted">320+ happy customers</p>
        </div>
      </div>

      <div className="mt-4 space-y-2.5" aria-label="Rating distribution">
        {ratingBars.map((bar) => (
          <div
            key={bar.stars}
            className="flex items-center gap-2 text-[10px] text-muted"
          >
            <span className="w-7">{bar.stars} star</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f0eee9]">
              <span
                className={`block h-full rounded-full bg-amber-400 ${bar.width}`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["Fresh & tasty", "Generous portions", "Quick delivery"].map(
          (item) => (
            <span
              key={item}
              className="flex items-center gap-1 rounded-full bg-[#f3f7f1] px-2.5 py-1 text-[10px] font-semibold text-[#52704e]"
            >
              <Check className="size-3" /> {item}
            </span>
          ),
        )}
      </div>
      <a
        href="#guest-stories"
        className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary no-underline hover:text-primary-hover"
      >
        Read guest stories <ArrowRight className="size-3.5" />
      </a>
    </section>
  );
}

function LocationCard() {
  return (
    <section
      id="location"
      className="scroll-mt-24 overflow-hidden rounded-[1.4rem] border border-line bg-white shadow-card"
    >
      <div className="flex items-center justify-between px-5 pb-3 pt-5 sm:px-6">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary">
            Around the corner
          </p>
          <h2 className="mt-1.5 !text-xl">Come find us</h2>
        </div>
        <span className="flex size-9 items-center justify-center rounded-full bg-[#eef5ed] text-[#52704e]">
          <MapPin className="size-4" />
        </span>
      </div>
      <div className="px-3">
        <RestaurantMap />
      </div>
      <div className="px-5 pb-5 pt-4 sm:px-6">
        <p className="text-sm font-bold">Latakia, Syria</p>
        <p className="mt-1 text-xs leading-5 text-muted">
          Serving our neighbors in the heart of Latakia.
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs">
          <span className="flex items-center gap-1.5 text-muted">
            <Clock3 className="size-3.5 text-primary" /> Open daily
          </span>
          <span className="font-semibold">10:00 AM – 11:00 PM</span>
        </div>
      </div>
    </section>
  );
}

function TeamCard() {
  return (
    <section
      id="team"
      className="scroll-mt-24 rounded-[1.4rem] border border-line bg-white p-5 shadow-card sm:p-6"
    >
      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary">
        A little about us
      </p>
      <h2 className="mt-1.5 !text-xl">Good food takes a good team</h2>
      <p className="mt-2 text-xs leading-5 text-muted">
        From the first sizzle in our kitchen to a friendly hand-off at your
        door, our crew makes every order with care.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-[#fbf5ef] p-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-[#f2dfd1] text-[#965e3b]">
            <UtensilsCrossed className="size-4" />
          </span>
          <p className="mt-2 text-xs font-bold">Kitchen crew</p>
          <p className="mt-0.5 text-[10px] leading-4 text-muted">
            Fresh, made to order
          </p>
        </div>
        <div className="rounded-xl bg-[#f2f7f1] p-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-[#dcebd8] text-[#52704e]">
            <Bike className="size-4" />
          </span>
          <p className="mt-2 text-xs font-bold">Delivery crew</p>
          <p className="mt-0.5 text-[10px] leading-4 text-muted">
            Carefully on the way
          </p>
        </div>
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-[#52704e]">
        <ShieldCheck className="size-3.5" /> Always prepared with care
      </p>
    </section>
  );
}

function PopularSlider() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    sliderRef.current?.scrollBy({ left: direction * 290, behavior: "smooth" });
  };

  const sliderAction = (
    <div className="flex gap-1.5">
      <button
        type="button"
        onClick={() => scroll(-1)}
        className="flex size-8 items-center justify-center rounded-full border border-line bg-white text-muted transition hover:border-primary hover:text-primary"
        aria-label="Previous popular dishes"
      >
        <ArrowLeft className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        className="flex size-8 items-center justify-center rounded-full border border-line bg-white text-muted transition hover:border-primary hover:text-primary"
        aria-label="Next popular dishes"
      >
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  );

  return (
    <section>
      <SectionHeading
        eyebrow="A few local favorites"
        title="The dishes everyone loves"
        description="Made fresh, full of flavor, and worth coming back for."
        id="popular"
        action={sliderAction}
      />
      <div
        ref={sliderRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {favoriteDishes.map((dish) => (
          <article
            key={dish.name}
            className="w-[min(74vw,15.5rem)] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white"
          >
            <div className="relative h-36 overflow-hidden bg-[#f0e9df]">
              <FoodPhoto
                image={dish.image}
                alt={dish.name}
                className="size-full object-cover transition duration-500 hover:scale-105"
              />
              <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold text-ink shadow-sm">
                {dish.label}
              </span>
            </div>
            <div className="p-3.5">
              <h3 className="!text-sm">{dish.name}</h3>
              <p className="mt-1.5 min-h-9 text-[11px] leading-4 text-muted">
                {dish.description}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <span className="text-xs font-bold">{dish.price}</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
                  <Star className="size-3 fill-current" /> 4.9
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MenuSection() {
  return (
    <section id="menu" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Fresh from our kitchen"
        title="Something for everyone"
        description="Take a look around. We’ll make it fresh when you order."
      />
      <nav
        aria-label="Menu categories"
        className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]"
      >
        {menuCategories.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="shrink-0 rounded-full border border-line bg-white px-3.5 py-2 text-[11px] font-bold text-muted no-underline transition hover:border-primary hover:text-primary"
          >
            {category.name}
          </a>
        ))}
      </nav>
      <div className="space-y-3">
        {menuCategories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="scroll-mt-28 rounded-2xl border border-line bg-white p-4 sm:p-5"
          >
            <div className="mb-2 flex items-center gap-2 border-b border-line pb-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#fff2e9] text-primary">
                <UtensilsCrossed className="size-3.5" />
              </span>
              <h3 className="!text-base">{category.name}</h3>
            </div>
            <div>
              {category.items.map((item) => (
                <article
                  key={item.name}
                  className="flex items-start justify-between gap-3 border-b border-line/70 py-3 last:border-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xs font-bold">{item.name}</h4>
                      {item.badge && (
                        <span className="rounded-full bg-[#fff2e9] px-2 py-0.5 text-[8px] font-extrabold tracking-wide text-primary">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] leading-4 text-muted">
                      {item.detail}
                    </p>
                  </div>
                  <span className="shrink-0 pt-0.5 text-[11px] font-bold">
                    {item.price}
                  </span>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-3 text-[10px] leading-4 text-muted">
        Have an allergy or dietary question? Let our team know when you order.
      </p>
    </section>
  );
}

function GuestStories() {
  return (
    <section id="guest-stories" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Kind words from our guests"
        title="A little love from Latakia"
        description="We’re grateful for every neighbor who shares a meal with us."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {reviews.map((review) => (
          <article
            key={review.name}
            className="rounded-2xl border border-line bg-white p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-full bg-[#f7e9df] text-[10px] font-extrabold text-[#79452d]">
                  {review.initials}
                </span>
                <div>
                  <h3 className="!text-xs">{review.name}</h3>
                  <p className="mt-0.5 text-[10px] text-muted">{review.date}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600">
                <Star className="size-3 fill-current" /> 5.0
              </span>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted">
              &ldquo;{review.text}&rdquo;
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ResturantsDetalies() {
  return (
    <main className="min-h-screen bg-[#f8f6f1] pb-10">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-5 sm:px-6 lg:pt-7">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-2 text-[11px] text-muted"
        >
          <a href="/" className="text-muted no-underline hover:text-primary">
            Explore
          </a>
          <span aria-hidden="true">/</span>
          <span>Restaurants</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-bold text-ink">
            Taza 041
          </span>
        </nav>

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(19rem,0.82fr)] lg:gap-6">
          <div className="min-w-0 space-y-7 sm:space-y-8">
            <section className="overflow-hidden rounded-[1.6rem] border border-[#eee5d9] bg-white shadow-card">
              <div className="grid md:grid-cols-[1.04fr_0.96fr]">
                <div className="flex flex-col justify-center p-5 sm:p-7 lg:p-8">
                  <span className="mb-4 flex w-fit items-center gap-1.5 rounded-full bg-[#eef5ed] px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-[#52704e]">
                    <span className="size-1.5 rounded-full bg-[#69a86a]" /> OPEN
                    NOW
                    <span className="font-medium text-[#7b8c76]">
                      · until 11 PM
                    </span>
                  </span>

                  <h1 className="mt-2 !text-4xl !leading-[1.05] text-[#29382c] sm:!text-5xl">
                    Taza 041
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    Bold, comforting flavors made fresh every day. From our
                    signature shawarma to crispy favorites, there&apos;s always
                    something worth sharing.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#f8f4ec] px-3 py-1.5 text-[10px] font-semibold text-[#6f675b]">
                      Syrian favorites
                    </span>
                    <span className="rounded-full bg-[#f8f4ec] px-3 py-1.5 text-[10px] font-semibold text-[#6f675b]">
                      Made fresh
                    </span>
                    <span className="rounded-full bg-[#f8f4ec] px-3 py-1.5 text-[10px] font-semibold text-[#6f675b]">
                      Family friendly
                    </span>
                  </div>
                  <a
                    href="#menu"
                    className="btn btn-primary mt-6 w-fit !rounded-full !px-5"
                  >
                    Explore our menu <ArrowDown className="size-4" />
                  </a>
                </div>
                <div className="relative min-h-60 overflow-hidden bg-[#e8d8c8] md:min-h-[330px]">
                  <FoodPhoto
                    image="photo-1555939594-58d7cb561ad1"
                    alt="A table filled with freshly grilled food"
                    className="absolute inset-0 size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-3 py-2 text-[10px] font-bold text-[#3d493b] shadow-sm backdrop-blur">
                    <Sparkles className="size-3.5 text-primary" /> Good food,
                    good mood
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 border-t border-line bg-[#fffdfa]">
                <div className="px-3 py-3.5 text-center sm:px-5">
                  <p className="flex items-center justify-center gap-1 text-xs font-extrabold">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />{" "}
                    4.9
                  </p>
                  <p className="mt-1 text-[9px] text-muted sm:text-[10px]">
                    320+ reviews
                  </p>
                </div>
                <div className="border-x border-line px-3 py-3.5 text-center sm:px-5">
                  <p className="flex items-center justify-center gap-1 text-xs font-extrabold">
                    <Clock3 className="size-3.5 text-primary" /> 20–35 min
                  </p>
                  <p className="mt-1 text-[9px] text-muted sm:text-[10px]">
                    Estimated delivery
                  </p>
                </div>
                <div className="px-3 py-3.5 text-center sm:px-5">
                  <p className="flex items-center justify-center gap-1 text-xs font-extrabold">
                    <Bike className="size-3.5 text-primary" /> 10,000 SYP
                  </p>
                  <p className="mt-1 text-[9px] text-muted sm:text-[10px]">
                    Delivery from
                  </p>
                </div>
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[1.4rem] bg-[#2e4838] p-5 text-white shadow-card sm:flex sm:items-center sm:justify-between sm:gap-4 sm:px-6">
              <div
                className="absolute -right-7 -top-14 size-36 rounded-full border-[20px] border-white/[0.06]"
                aria-hidden="true"
              />
              <div className="relative">
                <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#c8dfb8]">
                  <Sparkles className="size-3.5" /> A little something extra
                </p>
                <h2 className="mt-2 !text-xl text-white">
                  Lunch tastes better with 15% off
                </h2>
                <p className="mt-1.5 text-xs leading-5 text-white/70">
                  Enjoy a little treat on us. Minimum order 100,000 SYP.
                </p>
              </div>
              <div className="relative mt-4 flex items-center gap-3 sm:mt-0 sm:shrink-0">
                <span className="rounded-lg border border-dashed border-white/45 bg-white/10 px-4 py-2 font-mono text-base font-bold tracking-[0.16em]">
                  TAZA15
                </span>
                <span className="text-[10px] leading-4 text-white/70">
                  Use at
                  <br />
                  checkout
                </span>
              </div>
            </section>

            <PopularSlider />
            <MenuSection />
            <GuestStories />
          </div>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-24">
            <RatingCard />
            <LocationCard />
            <TeamCard />
            <div className="flex items-center gap-3 rounded-2xl border border-[#e7e9de] bg-[#eef3e9] p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#67815c]">
                <MessageCircle className="size-4" />
              </span>
              <p className="text-[11px] leading-5 text-[#52644b]">
                <strong className="block text-xs">We’re happy to help</strong>
                Questions about your order? Our team is here for you.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl bg-[#253b32] px-5 py-5 text-center text-white sm:flex-row sm:px-7 sm:text-left">
          <div>
            <p className="text-sm font-bold">Hungry? Your table is waiting.</p>
            <p className="mt-1 text-xs text-white/65">
              Fresh favorites, made for sharing in Latakia.
            </p>
          </div>
          <a
            href="#menu"
            className="btn !rounded-full !bg-white !px-5 !text-[#253b32] hover:!bg-white/90"
          >
            Browse the menu <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </main>
  );
}
