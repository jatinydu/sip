import {
  TrendingUp,
  Clock,
  Gift,
  Heart,
  Coffee,
  ChevronDown,
} from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-sip-orange">
            <Heart className="size-3.5 fill-sip-orange text-sip-orange" />
            BENEFITS
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Why businesses choose SIP
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Everything you need to turn occasional visitors into loyal
            customers.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[1fr_1fr]">
          {/* Top Left — +32% stat */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-gradient-to-br from-[#fff7f0] to-[#ffebd6] p-7">
            <div className="mb-8 flex size-12 items-center justify-center rounded-2xl border border-sip-orange/20 bg-white">
              <TrendingUp className="size-6 text-sip-orange" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[2.75rem] font-bold leading-none text-sip-orange">
                +32%
              </p>
              <h3 className="mt-2 text-lg font-bold text-foreground">
                Increase repeat visits
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                without changing how your business operates.
              </p>
            </div>
          </div>

          {/* Center — Phone Mockup (spans 2 rows) */}
          <div className="relative row-span-2 overflow-hidden rounded-2xl border border-border bg-white">
            {/* Phone positioned at bottom, overflowing */}
            <div className="flex h-full min-h-[560px] items-end justify-center md:min-h-0">
              {/* Phone Device */}
              <div className="relative w-[280px] shrink-0 translate-y-8 md:w-[300px]">
                {/* Phone outer shell */}
                <div className="overflow-hidden rounded-[40px] border-[8px] border-[#1a1a2e] bg-white shadow-2xl">
                  {/* Notch / Dynamic Island */}
                  <div className="relative bg-white px-5 pt-2.5 pb-1.5">
                    <div className="mx-auto h-[22px] w-[76px] rounded-full bg-[#1a1a2e]" />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-foreground">
                        9:41
                      </span>
                      <div className="flex items-center gap-1">
                        <svg
                          width="14"
                          height="10"
                          viewBox="0 0 14 10"
                          fill="currentColor"
                          className="text-foreground"
                        >
                          <rect x="0" y="6" width="2.5" height="4" rx="0.5" />
                          <rect x="3.5" y="4" width="2.5" height="6" rx="0.5" />
                          <rect x="7" y="2" width="2.5" height="8" rx="0.5" />
                          <rect
                            x="10.5"
                            y="0"
                            width="2.5"
                            height="10"
                            rx="0.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="bg-white px-5 pt-3 pb-14">
                    {/* Greeting */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[15px] font-bold text-foreground">
                          Hi, Arjun 👋
                        </p>
                        <div className="flex items-center gap-0.5">
                          <span className="text-[11px] font-medium text-muted-foreground">
                            Brew House
                          </span>
                          <ChevronDown className="size-3 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex size-9 items-center justify-center rounded-full border border-border">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-foreground"
                        >
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                      </div>
                    </div>

                    {/* Progress Card */}
                    <div className="mt-5 rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                            Your Progress
                          </p>
                          <p className="mt-1 text-xl font-bold text-foreground">
                            4 / 6 Visits
                          </p>
                          <p className="mt-1 text-[9px] text-muted-foreground">
                            2 more to unlock reward
                          </p>
                        </div>
                        <div className="flex size-10 items-center justify-center rounded-xl bg-sip-orange-light">
                          <Gift
                            className="size-5 text-sip-orange"
                            strokeWidth={2}
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex gap-1.5">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div
                            key={i}
                            className={`h-2 flex-1 rounded-full ${
                              i <= 4 ? "bg-sip-orange" : "bg-border"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Reward Card */}
                    <div className="mt-4 rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sip-orange-light">
                          <Coffee
                            className="size-5 text-sip-orange"
                            strokeWidth={1.5}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-[9px] font-medium text-muted-foreground">
                            Reward
                          </p>
                          <p className="text-[13px] font-bold text-foreground">
                            FREE COFFEE
                          </p>
                          <p className="text-[9px] text-muted-foreground">
                            Any drink of your choice
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 rounded-lg bg-sip-orange px-3 py-2 text-center text-[10px] font-bold text-white">
                        2 Visits to go
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right — 5 minute setup */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-white p-7">
            <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-sip-orange-light">
              <Clock className="size-6 text-sip-orange" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                5 minute setup
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Create your loyalty program, generate your QR code, and start
                rewarding customers.
              </p>
            </div>
          </div>

          {/* Bottom Left — Customers love rewards */}
          <div className="flex flex-col justify-end rounded-2xl border border-border bg-white p-7">
            {/* Gift box illustrations */}
            <div className="mb-5 flex items-end gap-3">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-sip-orange-light shadow-sm">
                <Gift className="size-7 text-sip-orange" strokeWidth={1.5} />
              </div>
              <div className="flex size-11 items-center justify-center rounded-xl bg-sip-orange-light/70 shadow-sm">
                <Gift
                  className="size-5 text-sip-orange/70"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex size-8 items-center justify-center rounded-lg bg-sip-orange-light/50">
                <Gift
                  className="size-4 text-sip-orange/50"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Customers love rewards.
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Delight your customers and build relationships that last.
            </p>
          </div>

          {/* Bottom Right — Get started CTA */}
          <div className="flex items-center justify-center rounded-2xl border border-border bg-white p-7">
            <div className="rounded-xl border-2 border-dashed border-border px-6 py-5">
              <p className="text-center text-lg font-semibold text-foreground">
                Get started in minutes,
                <br />
                not hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
