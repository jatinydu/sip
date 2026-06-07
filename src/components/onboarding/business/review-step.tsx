"use client";

import Image from "next/image";
import { ArrowRight, Building2, Gift, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

const ReviewStep = () => {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div>
        <h1 className="heading-md">Almost done!</h1>

        <p className="body-md mt-3">
          Review your details before we create your account.
        </p>
      </div>

      {/* Summary Card */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        {/* Business Details */}
        <div className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Business details</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 text-muted-foreground" />

              <span className="text-sm">Brew House Cafe</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />

              <span className="text-sm">+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm">☕ Cafe</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Reward */}
        <div className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Reward</h3>

          <div className="flex items-start gap-3">
            <Gift className="mt-0.5 h-4 w-4 text-muted-foreground" />

            <div>
              <p className="text-sm font-medium">Free Coffee</p>

              <p className="text-sm text-muted-foreground">After 6 visits</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Logo */}
        <div className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Logo</h3>

          <div className="overflow-hidden rounded-xl border border-border flex justify-center items-center">
            <Image
              src="/sip-logo.png"
              alt="Business Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-cover"
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto pt-8">
        <Button size="lg" className="h-12 w-full">
          Create My Account
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
