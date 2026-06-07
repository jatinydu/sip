import {
  Coffee,
  UtensilsCrossed,
  Scissors,
  Dumbbell,
  Store,
  CakeSlice,
} from "lucide-react";

export function TrustedBySection() {
  const categories = [
    { name: "Cafes", icon: Coffee },
    { name: "Restaurants", icon: UtensilsCrossed },
    { name: "Salons", icon: Scissors },
    { name: "Gyms", icon: Dumbbell },
    { name: "Retail Stores", icon: Store },
    { name: "Bakeries", icon: CakeSlice },
  ];

  return (
    <div className="section-container py-8">
      <div className="rounded-2xl border border-border bg-white px-6 py-5 md:rounded-full md:px-12">
        <div className="flex items-center justify-center gap-8 overflow-x-auto scrollbar-none md:gap-14">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex shrink-0 flex-col items-center gap-2.5"
            >
              <category.icon
                className="size-6 text-foreground/50"
                strokeWidth={1.5}
              />
              <span className="whitespace-nowrap text-xs font-medium text-foreground/70">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
