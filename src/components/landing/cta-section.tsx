import { Gift } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section id="cta" className="section-padding-sm bg-background">
      <div className="section-container">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-[#1a1a2e] px-8 py-8 md:flex-row md:items-center md:justify-between md:px-12 md:py-8">
          {/* Left — Icon + Text */}
          <div className="flex flex-col items-center gap-5 text-center md:flex-row md:text-left">
            <div className="hidden shrink-0 items-center justify-center rounded-xl bg-white/10 p-3 md:flex">
              <Gift className="size-6 text-sip-orange" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Ready to turn more visitors into regulars?
              </h3>
              <p className="mt-1 text-sm text-white/60">
                Start your loyalty program today. It&apos;s free and takes
                minutes.
              </p>
            </div>
          </div>

          {/* Right — CTA Button */}
          <Button size="md" className="shrink-0 whitespace-nowrap">
            Get Started Free <span className="ml-1">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
