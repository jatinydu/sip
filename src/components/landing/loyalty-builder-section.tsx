import { CheckCircle, Gift, Coffee } from "lucide-react";

export function LoyaltyBuilderSection() {
  return (
    <section id="everything-you-need" className="section-padding bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="section-label mb-3">BUILT FOR BUSY BUSINESS OWNERS</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Everything you need, in one place.
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Customer Progress */}
          <div className="rounded-2xl border border-border bg-background p-5">
            <div className="mb-5 rounded-xl border border-border bg-white p-4">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    Your Progress
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-foreground">
                      4 / 6
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      Visits
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    2 more to unlock reward
                  </p>
                </div>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sip-orange-light">
                  <Gift className="size-4 text-sip-orange" strokeWidth={2} />
                </div>
              </div>
              <div className="flex gap-1.5">
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
            <h3 className="mb-1 text-[15px] font-semibold text-foreground">
              Customer Progress
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Keep customers motivated with simple and beautiful progress
              tracking.
            </p>
          </div>

          {/* Reward Redemption */}
          <div className="rounded-2xl border border-border bg-background p-5">
            <div className="mb-5 rounded-xl border border-border bg-white p-4">
              <div className="flex items-center gap-4">
                {/* Left - Claim info */}
                <div className="flex-1 text-center">
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    Reward Claimed
                  </p>
                  <div className="mx-auto mb-2 flex size-9 items-center justify-center rounded-full bg-sip-green-light">
                    <CheckCircle className="size-5 text-sip-green" />
                  </div>
                  <p className="text-sm font-bold text-foreground">
                    Thank you!
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    You&apos;ve claimed
                  </p>
                  <p className="text-xs font-bold text-sip-orange">
                    FREE COFFEE
                  </p>
                </div>
                {/* Right - Gift icon */}
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-sip-orange-light">
                  <Gift
                    className="size-7 text-sip-orange"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>
            <h3 className="mb-1 text-[15px] font-semibold text-foreground">
              Reward Redemption
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Easy redemption with unique QR code and instant validation.
            </p>
          </div>

          {/* Activity History */}
          <div className="rounded-2xl border border-border bg-background p-5">
            <div className="mb-5 rounded-xl border border-border bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  Recent Activity
                </span>
                <span className="text-[10px] font-semibold text-sip-orange">
                  View all
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {/* Visit 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-6 items-center justify-center rounded-full bg-sip-orange-light">
                      <Coffee
                        className="size-3 text-sip-orange"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-foreground">
                        Visit added
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        Today, 9:20 AM
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-sip-orange">
                    +1 Sip
                  </span>
                </div>

                {/* Visit 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-6 items-center justify-center rounded-full bg-sip-orange-light">
                      <Coffee
                        className="size-3 text-sip-orange"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-foreground">
                        Visit added
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        Fri, 6:45 PM
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-sip-orange">
                    +1 Sip
                  </span>
                </div>

                {/* Reward claimed */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-6 items-center justify-center rounded-full bg-sip-purple-light">
                      <Gift
                        className="size-3 text-sip-purple"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-foreground">
                        Reward claimed
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        Thu, 1:12 PM
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-sip-purple">
                    -6 Sips
                  </span>
                </div>
              </div>
            </div>
            <h3 className="mb-1 text-[15px] font-semibold text-foreground">
              Activity History
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              See all visits, rewards and customer activity in one simple
              timeline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
