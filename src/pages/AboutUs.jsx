import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  Banknote,
  BadgeCheck,
  Bike,
  CheckCircle2,
  ChefHat,
  ChevronRight,
  Flame,
  Handshake,
  HeartHandshake,
  Leaf,
  Recycle,
  Rocket,
  ShieldCheck,
  Store,
  Thermometer,
  TreePine,
  Truck,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import Reveal from "../components/common/Reveal";


const BRAND = "CraveDash";

const heroStats = [
  { value: "1,200+", label: "Partner Kitchens", color: "text-primary-text" },
  { value: "4.8M+", label: "Meals Delivered", color: "text-ink" },
  { value: "22 Min", label: "Avg Delivery", color: "text-secondary-hover" },
  { value: "99.4%", label: "On-Time Rate", color: "text-tertiary" },
];

const milestones = [
  {
    year: "2021 — The Spark",
    title: "Tackling the Lukewarm Crisis",
    text: "We partnered with 12 brave neighborhood chefs in Brooklyn to test custom heated delivery pods and strict 2.5-mile radiuses. The result? 98% customer satisfaction and dishes that arrived with restaurant-grade crust and steam intact.",
    Icon: UtensilsCrossed,
    proofIcon: CheckCircle2,
    proof: "Proof of thermal containment",
  },
  {
    year: "2023 — The Fair Pact",
    title: "Chef-First Economics",
    text: "While mega-aggregators squeezed 30%+ margins from mom-and-pop eateries, we launched a transparent, capped-commission model alongside marketing subsidies. Over 500 family-run dining spots joined within six months.",
    Icon: Handshake,
    proofIcon: Store,
    proof: "Sustainable kitchen growth",
    badge: "Turning Point",
  },
  {
    year: "2025 — Today & Beyond",
    title: "Hyper-Local Culinary Tech",
    text: "With 1,200+ kitchen partners across 14 metropolitan centers, our automated dispatch algorithms predict kitchen firing times to the second, synchronizing courier handoffs so food never waits on counters.",
    Icon: Rocket,
    proofIcon: Zap,
    proof: "Sub-25 min delivery citywide",
  },
];

const values = [
  {
    Icon: ChefHat,
    title: "Chef-First Economics",
    text: "Keeping commissions low and predictable so independent culinary entrepreneurs thrive, retain staff, and keep recipe quality uncompromised.",
    tag: "Fair Partnership",
  },
  {
    Icon: Truck,
    title: "Obsessive Freshness & Speed",
    text: "Proprietary thermal bags and micro-radius algorithmic routing guarantee your meal arrives bubbling hot and crisp, just as the chef intended.",
    tag: "Thermal Tested",
  },
  {
    Icon: Leaf,
    title: "Community & Sustainability",
    text: "Zero-emission e-bike couriers across urban centers and 100% compostable, sugarcane-pulp packaging subsidies for our partner kitchens.",
    tag: "Eco Standard",
  },
  {
    Icon: ShieldCheck,
    title: "Transparency & Trust",
    text: "Zero hidden checkout fees, real-time kitchen camera checks, open tracking, and our 100% money-back freshness guarantee on every meal.",
    tag: "Zero Hidden Fees",
  },
];

const team = [
  {
    name: "Elena Rostova",
    role: "Chief Executive Officer",
    badge: "Co-Founder",
    roleColor: "text-primary-text",
    bio: "Former restaurant owner and logistics strategist. Passionate about empowering local food entrepreneurship through humane tech.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBokb0rrVRT3Iv6HYEP4-BFrOrBc-i0QOo34Zvv5vmTP7aMb1EXc2_kEUDFD6lnU9LA6Eb7fUmM33KUIofg1T-gME0ValKex_g5N2xrgLV8UML5E-9f8f-2lg8Y2-KUhpr8nFfOzxUF-rrwLiehK9Yk68gfNE1__Q73q5u7skemR1bhTHoPDjE1BvOvKziHf7pKXXLVz-MRGeU4DHJERvmosbCQwnUWBiULaf7Hsunr",
  },
  {
    name: "Chef Marco Rossi",
    role: "Head of Culinary Partnerships",
    badge: "Culinary Council",
    roleColor: "text-secondary-hover",
    bio: "20 years of kitchen leadership across Europe and New York. Oversees kitchen packaging standards and temperature retention testing.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_v4ZSnvVvbS6pfj8xZJbyrifAmxm3OGMSQtbuqOxl0ZlxD0Ejwcz0tUA7oRI_NhMnZ6qXqS7itGA8TZ4oq4fjVCFOoWZ3Mw8PdQ0PnfDepjeyIn2igW8FLp5vaM7O3IBmVcWqIYMU8ZVd3sTrQJ0uNC2N2YePA-hVCia5HfmthAx1uP4nFxPZec-82vKFgTnfg3T4qiKuT4W1PCaIiqq2D0JlkHccHho8E-4lI-sd",
  },
  {
    name: "Tariq Mansour",
    role: "VP of Logistics & Tech",
    badge: "Logistics",
    roleColor: "text-tertiary",
    bio: `Architect of ${BRAND}'s sub-second hyper-local routing algorithm and predictive order heatmaps for couriers.`,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6vlWf7GuyT4wjtAgpR67d_EvM8QNj_5SIHtDSAGJVXrnDk9y0uD90LUalSMh6popdUZbwsYVxrx7IQSXPZDQkoMte9z9FKWxbcwch-ok8jf24Dl-0HaLCfa4saKAUhlkXiKjtzLLaGY72q1ekemIFb-NzDNHkJ3fUZdjKkbC66H8ece7WSx8Xnvr-cQramPXREWJNTrNF2sebXev0um2MmW9r7Uj3qjZhi8glKvFg",
  },
  {
    name: "Sarah Jenkins",
    role: "Chief Customer Experience Officer",
    badge: "Customer Trust",
    roleColor: "text-primary-text",
    bio: `Champions the ${BRAND} 100% Freshness Guarantee and leads our 24/7 dedicated local concierge support team.`,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqC8dvinOadfdwz27En1MTLxTuFjNZPMv2rQoEXalTqiLF4qkShq8O2sa-EAPIZUG0tsX0kxvZsGnoZNfA24FRpOti3aPeFD1ctb2zejYXCh09KFSTFecdY6Ry-0e7Kjmzi-NynMmqLqLwAyQNabVRXsxVYz0D5vkuZxAtLwKTILA4N-desAg-Q5C_nTPQm2yAIr-u6CCnYNoiP-Q3ZVKfTyyAvy_wHu764qvmP7bG",
  },
];

const impact = [
  { Icon: Banknote, value: "$45M+", label: "Paid to Partners", note: "Directly into local kitchens" },
  { Icon: Recycle, value: "85%+", label: "Zero-Plastic", note: "Sugarcane pulp container use" },
  { Icon: TreePine, value: "340 Tons", label: "CO₂ Prevented", note: "Through 100% e-bike routing" },
];

function scrollToId(id) {
  return (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <span className="text-xs font-bold uppercase tracking-widest text-primary-text">
        {eyebrow}
      </span>
      <h2 className="mt-3">{title}</h2>
      {text && <p className="mt-4 text-base leading-7 text-muted">{text}</p>}
    </div>
  );
}

export default function AboutUs() {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-page pb-20 pt-12">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-bold text-primary-text">
            <Flame size={14} aria-hidden="true" />
            The {BRAND} Story
          </div>

          <div className="mt-6 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="text-ink">
                Connecting <span className="text-primary-text">Neighborhood Flavors</span>{" "}
                with Hungry Hearts.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
                Founded in 2021, {BRAND} was built to empower passionate neighborhood
                chefs, independent family-owned kitchens, and diners seeking
                restaurant-grade culinary craft brought straight to their
                doorstep: uncompromised, steaming hot, and delivered in minutes.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#origin" onClick={scrollToId("origin")} className="btn btn-primary px-6 py-3">
                  Read Our Journey
                  <ArrowDown size={16} aria-hidden="true" />
                </a>
                <a href="#impact" onClick={scrollToId("impact")} className="btn btn-outline px-6 py-3">
                  <Leaf size={16} aria-hidden="true" />
                  Our Community Impact
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-card border border-line bg-surface p-5 shadow-card"
                  >
                    <div className={`text-2xl font-extrabold sm:text-3xl ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collage */}
            <div className="relative grid grid-cols-2 gap-4 lg:col-span-5">
              <div
                className="pointer-events-none absolute -right-10 -top-10 size-64 rounded-full bg-primary/15 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative space-y-4">
                <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK9dP6QxsNCLYN_OB9-FB9YZ3XUISGyrTsGsW1JbE-LlaQ_MzoBpeb2egtRdHxe8TUWMh3kKnxAY9_NUg0cjhjKQ-fZQ3ViORtcbscd87O7YI_ak4VxOCTQOtgcbLcpbWQMAcF_rB911xlY5eChm7Zbxtuu0R9V-47J7xwR4X6_Z6inGmXQYpEl2xQwA7pQfvZTMe8TbIunA6ccruTXpV78GxfCmyTe7nn2UyBHYIT"
                    alt="Chef plating a fresh pasta dish in a busy kitchen"
                    className="h-56 w-full object-cover sm:h-64"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-tertiary">
                      <BadgeCheck size={14} aria-hidden="true" />
                      Artisanal Quality Certified
                    </span>
                    <p className="mt-1 font-bold text-ink">Chef-Crafted Daily</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-card border border-line bg-surface p-4 shadow-card">
                  <span className="inline-flex size-10 items-center justify-center rounded-control bg-tertiary/10 text-tertiary">
                    <Bike size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">100% Eco-Fleets</p>
                    <p className="text-xs text-muted">Zero-emission e-bikes</p>
                  </div>
                </div>
              </div>

              <div className="relative space-y-4 pt-8">
                <div className="rounded-card bg-primary p-4 text-white shadow-raised">
                  <div className="flex items-center justify-between">
                    <Thermometer size={20} aria-hidden="true" />
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold">
                      Thermal Lock
                    </span>
                  </div>
                  <div className="mt-3 text-lg font-extrabold">145°F Guaranteed</div>
                  <p className="text-xs text-white/80">Served as hot as the kitchen pass</p>
                </div>
                <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf1VTxPWXUIWNj2-XvYuO0uOB4TKTkfwe0v5kWsdtNw8ERpuwQ14rgGdxEtnXpsZt75sghe8r9Pd6-2B3LXBLgjiH2XG9avt1dsabssPqk8WMDfhg20_ndtA9taGexrqpsvXWNnF1i7RwFjgG66vpM-lCdAFKrMqCrj0xBE3B7vFly4cRyh-0s7z7s_DXpFc7hbm3V2YKwRsyt89H66HNs5FPunPS40OVlf-RV5phy"
                    alt="Fresh dough, tomatoes and herbs on a counter"
                    className="h-56 w-full object-cover sm:h-64"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <p className="text-[11px] font-bold text-muted">Local Sourcing</p>
                    <p className="mt-1 font-bold text-ink">Farm-to-Door Fresh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ORIGIN / TIMELINE */}
      <Reveal>
      <section id="origin" className="scroll-mt-24 border-y border-line bg-surface py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="Our Journey"
            title="From a Single Cloud Kitchen to a Culinary Movement"
            text={`We saw master cooks pour heart and soul into recipes, only to watch cold delivery drivers stack their delicate food alongside lukewarm cardboard. ${BRAND} set out to reinvent delivery physics, partnership ethics, and neighborhood hospitality.`}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {milestones.map(({ year, title, text, Icon, proofIcon: ProofIcon, proof, badge }) => (
              <article
                key={year}
                className="relative flex flex-col justify-between rounded-card border border-line bg-page p-6 shadow-card transition-shadow hover:shadow-raised"
              >
                {badge && (
                  <span className="absolute -top-3 right-5 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-stone-900">
                    {badge}
                  </span>
                )}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-primary-text">{year}</span>
                    <span className="inline-flex size-10 items-center justify-center rounded-control bg-primary/10 text-primary-text">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-4">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 border-t border-line pt-4 text-xs font-semibold text-tertiary">
                  <ProofIcon size={16} aria-hidden="true" />
                  {proof}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      {/* 3. CORE VALUES */}
      <Reveal delay={60}>
      <section className="py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Our Four Guiding Commitments"
            text="Every decision we engineer balances three constituents: the culinary artisan crafting the recipe, the dedicated courier on the streets, and the hungry diner at home."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text, tag }) => (
              <article
                key={title}
                className="group flex flex-col rounded-card border border-line bg-surface p-6 shadow-card transition hover:border-primary/40 hover:shadow-raised"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-control bg-primary/10 text-primary-text transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">{text}</p>
                <div className="mt-5 flex items-center justify-between text-xs font-bold text-primary-text">
                  {tag}
                  <ChevronRight size={16} aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      {/* 4. TEAM */}
      <Reveal delay={60}>
      <section className="border-y border-line bg-surface py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="The People Behind The Plate"
            title="Leadership & Culinary Council"
            text="A team uniting Michelin-starred kitchen veterans, routing engineers, and community advocates dedicated to transforming urban dining."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <article
                key={member.name}
                className="group overflow-hidden rounded-card border border-line bg-page shadow-card transition hover:border-primary/40"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    className="size-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 rounded-lg border border-line bg-surface/90 px-3 py-1 text-[11px] font-bold text-ink backdrop-blur-md">
                    {member.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg">{member.name}</h3>
                  <p className={`mt-1 text-xs font-semibold ${member.roleColor}`}>{member.role}</p>
                  <p className="mt-3 text-sm leading-6 text-muted">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      {/* 5. IMPACT */}
      <Reveal delay={60}>
      <section id="impact" className="scroll-mt-24 bg-primary/5 py-16">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <div className="grid items-center gap-10 rounded-card border border-line bg-surface p-8 shadow-card lg:grid-cols-2 lg:p-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-text">
                <HeartHandshake size={16} aria-hidden="true" />
                Measurable Community Impact
              </div>
              <h3 className="mt-4 text-2xl sm:text-3xl">
                Reinvesting in the Neighborhoods We Serve
              </h3>
              <p className="mt-4 text-base leading-7 text-muted">
                Food delivery should foster neighborhood sustainability, not drain
                it. Through low commissions, green fleets, and local culinary
                subsidies, we keep dining cultures alive.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {impact.map(({ Icon, value, label, note }) => (
                <div key={label} className="rounded-card border border-line bg-page p-5">
                  <span className="inline-flex size-10 items-center justify-center rounded-control bg-tertiary/10 text-tertiary">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div className="mt-4 text-2xl font-extrabold text-ink">{value}</div>
                  <div className="text-sm font-bold text-ink">{label}</div>
                  <p className="mt-1 text-xs text-muted">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      {/* 6. DUAL CTA */}
      <Reveal delay={60}>
      <section className="py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-card bg-primary p-8 text-white shadow-raised sm:p-10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
                  <UtensilsCrossed size={16} aria-hidden="true" />
                  For Food Lovers
                </div>
                <h3 className="mt-4 text-2xl sm:text-3xl">Hungry for something extraordinary?</h3>
                <p className="mt-3 text-sm leading-6 text-white/85 sm:text-base">
                  Explore hundreds of top-rated neighborhood kitchens, artisanal
                  bakeries, and chef pop-ups delivered at peak freshness.
                </p>
              </div>
              <Link
                to="/restaurants"
                className="btn mt-8 self-start bg-white px-6 py-3 text-primary-hover hover:bg-stone-100"
              >
                Order Now
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-card border border-line bg-surface p-8 shadow-card sm:p-10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-text">
                  <Store size={16} aria-hidden="true" />
                  For Kitchen Owners
                </div>
                <h3 className="mt-4 text-2xl text-ink sm:text-3xl">
                  Own a restaurant or cloud kitchen?
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
                  Partner with {BRAND} and keep your profits. Enjoy capped
                  commissions, insulated fleets, and full culinary control.
                </p>
              </div>
              <Link to="/register" className="btn btn-outline mt-8 self-start px-6 py-3">
                Join as a Partner
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      </Reveal>
    </>
  );
}
