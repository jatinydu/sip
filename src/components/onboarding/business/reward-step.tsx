"use client";

import { useState } from "react";
import { ArrowRight, Gift, Lightbulb, Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const QUICK_VISITS = [5, 10, 15, 20];

const RewardStep = () => {
  const [rewardName, setRewardName] = useState("Free Coffee");

  const [visits, setVisits] = useState(10);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div>
        <h1 className="heading-md">Reward your loyal customers</h1>

        <p className="body-md mt-3">
          Choose what customers unlock after earning enough visits.
        </p>
      </div>

      {/* Reward Name */}
      <div className="mt-8 space-y-2">
        <Label htmlFor="rewardName">What reward would you like to offer?</Label>

        <div className="relative">
          <Gift className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="rewardName"
            value={rewardName}
            onChange={(e) => setRewardName(e.target.value)}
            placeholder="e.g. Free Coffee"
            className="h-12 pl-10"
          />
        </div>
      </div>

      {/* Visits */}
      <div className="mt-8">
        <Label>After how many visits?</Label>

        <div className="mt-3 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setVisits((prev) => Math.max(1, prev - 1))}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
            >
              <Minus className="h-4 w-4" />
            </button>

            <div className="text-center">
              <p className="text-4xl font-semibold tracking-tight">{visits}</p>

              <p className="mt-1 text-xs text-muted-foreground">visits</p>
            </div>

            <button
              type="button"
              onClick={() => setVisits((prev) => prev + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Select */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {QUICK_VISITS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setVisits(value)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all",
                  visits === value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:bg-muted",
                )}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-4">
        <p className="text-center text-sm text-muted-foreground">
          Customers unlock
        </p>

        <p className="mt-2 text-center text-lg font-semibold">
          🎁 {rewardName || "Your Reward"}
        </p>

        <p className="mt-1 text-center text-sm text-muted-foreground">
          after{" "}
          <span className="font-medium text-foreground">{visits} visits</span>
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-10">
        <Button size="lg" className="h-12 w-full">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <button
          type="button"
          className="mt-4 w-full text-sm text-muted-foreground transition-opacity hover:opacity-80"
        >
          Skip for now
        </button>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-muted/30 p-4">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

          <p className="text-sm text-muted-foreground">
            You can create more rewards and advanced loyalty campaigns later
            from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RewardStep;
