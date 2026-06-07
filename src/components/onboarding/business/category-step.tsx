"use client";

import {
  Coffee,
  UtensilsCrossed,
  Scissors,
  Dumbbell,
  ShoppingBag,
  Stethoscope,
  Sparkles,
  Store,
} from "lucide-react";

import { cn } from "@/lib/utils";

const categories = [
  {
    id: "cafe",
    name: "Cafe",
    icon: Coffee,
  },
  {
    id: "restaurant",
    name: "Restaurant",
    icon: UtensilsCrossed,
  },
  {
    id: "salon",
    name: "Salon",
    icon: Scissors,
  },
  {
    id: "gym",
    name: "Gym",
    icon: Dumbbell,
  },
  {
    id: "retail",
    name: "Retail Store",
    icon: ShoppingBag,
  },
  {
    id: "clinic",
    name: "Clinic",
    icon: Stethoscope,
  },
  {
    id: "spa",
    name: "Spa",
    icon: Sparkles,
  },
  {
    id: "other",
    name: "Other",
    icon: Store,
  },
];

const CategoryStep = () => {
  const selectedCategory = "cafe";

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div>
        <h1 className="heading-md">What type of business do you run?</h1>

        <p className="body-md mt-3">
          Choose the category that best describes your business.
        </p>
      </div>

      {/* Categories */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;

          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              className={cn(
                "flex flex-col items-center justify-center rounded-xl border bg-card p-5 text-center transition-all",
                isSelected
                  ? "border-primary bg-accent"
                  : "border-border hover:border-primary/30 hover:bg-accent/50",
              )}
            >
              <Icon className="mb-3 h-6 w-6" />

              <span className="text-sm font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-10">
        <button
          className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary px-4 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
          disabled={!selectedCategory}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CategoryStep;
