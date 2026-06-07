import {
  Coffee,
  UtensilsCrossed,
  Scissors,
  Dumbbell,
  Store,
  CakeSlice,
} from "lucide-react";

const industries = [
  {
    icon: Coffee,
    name: "Cafes & Coffee Shops",
    description:
      "Create a digital loyalty card for your cafe and reward regulars who keep coming back for their morning coffee. Replace paper stamp cards with a seamless QR-based loyalty program that customers actually use.",
  },
  {
    icon: UtensilsCrossed,
    name: "Restaurants & Eateries",
    description:
      "Boost customer retention with a restaurant loyalty program that rewards repeat diners. Track visits automatically and offer personalized rewards to keep tables full.",
  },
  {
    icon: CakeSlice,
    name: "Bakeries & Dessert Shops",
    description:
      "Reward loyal customers with a digital rewards program for your bakery. From free pastries to birthday treats, create offers that make customers choose you every time.",
  },
  {
    icon: Scissors,
    name: "Salons & Spas",
    description:
      "Build a loyalty program for your salon that increases repeat bookings. Reward clients for every visit and turn first-time appointments into long-term relationships.",
  },
  {
    icon: Dumbbell,
    name: "Gyms & Fitness Studios",
    description:
      "Keep members engaged with a gym loyalty program that rewards consistent attendance. Digital loyalty cards motivate members and reduce churn.",
  },
  {
    icon: Store,
    name: "Retail & Local Shops",
    description:
      "Launch a customer loyalty program for your retail store in minutes. Digital loyalty cards help small businesses compete with big chains by rewarding every purchase.",
  },
];

export function IndustriesSection() {
  return (
    <section id="industries" className="section-padding bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="section-label mb-3">INDUSTRIES WE SERVE</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Built for every local business.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Whether you run a cafe, restaurant, salon, or gym — SIP gives you a
            simple digital loyalty card that keeps customers coming back.
          </p>
        </div>

        {/* Industry Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <article
              key={industry.name}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-sip-orange-light text-sip-orange">
                <industry.icon className="size-5" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-foreground">
                {industry.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {industry.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
