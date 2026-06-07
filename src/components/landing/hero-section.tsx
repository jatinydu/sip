import Image from "next/image";
import { Heart, Building2, BarChart3, Gift } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TrustedBySection } from "./trusted-by-section";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="section-container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          {/* Left Content */}
          <div className="pt-10 pb-6 lg:pt-14 lg:pb-16">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2">
              <Heart className="size-3.5 text-red-500" fill="currentColor" />
              <span className="text-xs font-medium text-foreground">
                Built for local businesses
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[2.5rem] font-bold leading-[1.08] tracking-tight md:text-5xl">
              Turn first-time
              <br />
              visitors into
              <br />
              <span className="text-sip-orange">regulars.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Reward repeat visits, delight customers, and grow without paper
              loyalty cards.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button size="md">
                Start Free <span className="ml-1">→</span>
              </Button>

              <Button size="md" variant="secondary" className="gap-2">
                <span className="flex size-5 items-center justify-center rounded-full border border-foreground/30">
                  <svg
                    width="8"
                    height="10"
                    viewBox="0 0 8 10"
                    fill="currentColor"
                    className="ml-[1px]"
                  >
                    <path d="M0 0L8 5L0 10Z" />
                  </svg>
                </span>
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap items-center gap-6 md:gap-8">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-sip-orange-light">
                  <Building2 className="size-[18px] text-sip-orange" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground leading-tight">
                    120+
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Businesses
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-sip-orange-light">
                  <BarChart3 className="size-[18px] text-sip-orange" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground leading-tight">
                    18k+
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Visits Tracked
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-sip-orange-light">
                  <Gift className="size-[18px] text-sip-orange" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground leading-tight">
                    5k+
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Rewards Claimed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content — Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <Image
              src="/images/hero-phone-mockup.png"
              alt="Sip app showing loyalty program features"
              width={600}
              height={600}
              priority
              className="h-auto w-full max-w-[520px]"
            />
          </div>
        </div>
      </div>

      {/* Trusted By Categories */}
      <TrustedBySection />
    </section>
  );
}
