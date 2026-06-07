import React from "react";
import { QrCode, Coffee, Gift, Star } from "lucide-react";

const steps = [
  {
    icon: QrCode,
    number: "1",
    title: "Scan QR",
    description: "Customers scan your store QR code.",
  },
  {
    icon: Coffee,
    number: "2",
    title: "Collect Visits",
    description: "Every verified visit adds a Sip to their progress.",
  },
  {
    icon: Gift,
    number: "3",
    title: "Unlock Reward",
    description: "Once they reach the target, the reward is unlocked.",
  },
  {
    icon: Star,
    number: "4",
    title: "Claim Reward",
    description: "They redeem the reward and come back again.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="section-label mb-3">HOW IT WORKS</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Loyalty in four simple steps.
          </h2>
        </div>

        {/* Steps */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-0">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Column */}
              <div className="flex flex-col items-center text-center md:flex-1">
                {/* Number Badge */}
                <div className="flex size-8 items-center justify-center rounded-full bg-sip-orange text-sm font-bold text-white">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mt-6 flex size-14 items-center justify-center rounded-2xl bg-sip-orange-light text-sip-orange">
                  <step.icon className="size-6" strokeWidth={1.5} />
                </div>

                {/* Text */}
                <h3 className="mt-4 text-[15px] font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-[180px] text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* Dashed Arrow Connector */}
              {index < steps.length - 1 && (
                <div className="hidden shrink-0 pt-3 md:flex md:w-10 lg:w-14">
                  <svg
                    width="100%"
                    height="8"
                    viewBox="0 0 56 8"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <line
                      x1="0"
                      y1="4"
                      x2="48"
                      y2="4"
                      stroke="#ff7a00"
                      strokeOpacity="0.35"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                    <polygon
                      points="48,0 56,4 48,8"
                      fill="#ff7a00"
                      fillOpacity="0.35"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
