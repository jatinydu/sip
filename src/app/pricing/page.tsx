import type { Metadata } from "next";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

export const metadata: Metadata = {
  title: "Pricing — Simple Loyalty Program Plans for Small Businesses",
  description:
    "SIP is free to get started. Create your digital loyalty card, generate your QR code, and start rewarding customers today. Upgrade for analytics and advanced features.",
  openGraph: {
    title: "Pricing — Simple Loyalty Program Plans for Small Businesses | SIP",
    description:
      "SIP is free to get started. Create your digital loyalty card, generate your QR code, and start rewarding customers today. Upgrade for analytics and advanced features.",
    type: "website",
    url: "/pricing",
  },
};

const STARTER_FEATURES = [
  "1 location",
  "1 loyalty program",
  "QR code generation",
  "Up to 100 active customers",
  "Basic visit tracking",
];

const GROWTH_FEATURES = [
  "Unlimited locations",
  "Unlimited programs",
  "Advanced analytics",
  "Custom branding",
  "Priority support",
  "Unlimited customers",
];

const PRICING_FAQS = [
  {
    question: "Is SIP really free?",
    answer:
      "Yes. The Starter plan is completely free with no hidden charges. You can create your loyalty program, generate a QR code, and start rewarding customers at zero cost.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. There are no long-term contracts. If you upgrade to a paid plan, you can cancel anytime and your account will revert to the Starter plan.",
  },
  {
    question: "Do I need a credit card to start?",
    answer:
      "No. You can sign up and use the Starter plan without entering any payment information.",
  },
  {
    question: "What happens when I hit 100 customers on Starter?",
    answer:
      "Your existing customers keep their progress. To add new customers beyond the limit, you can upgrade to the Growth plan when it becomes available.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="section-padding bg-background">
          <div className="section-container text-center">
            <p className="section-label mb-3">PRICING</p>
            <h1 className="heading-xl text-foreground">
              Simple, transparent pricing.
            </h1>
            <p className="body-lg mx-auto mt-4 max-w-xl">
              Start free. Upgrade when you need more.
            </p>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="section-padding-sm bg-background">
          <div className="section-container">
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              {/* Starter */}
              <div className="flex flex-col rounded-2xl border border-border bg-card p-8">
                <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Starter
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    Free
                  </span>
                  <span className="text-muted-foreground">forever</span>
                </div>
                <p className="body-md mt-3">
                  Everything you need to launch your first loyalty program.
                </p>

                <ul className="mt-8 flex flex-col gap-3">
                  {STARTER_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-5 shrink-0 text-sip-green" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Button variant="secondary" size="lg" className="w-full">
                    Get started free
                  </Button>
                </div>
              </div>

              {/* Growth */}
              <div className="relative flex flex-col rounded-2xl bg-sip-orange p-8 text-white">
                {/* Coming Soon badge */}
                <span className="absolute right-6 top-6 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                  Coming Soon
                </span>

                <p className="text-sm font-bold uppercase tracking-wide text-white/80">
                  Growth
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">₹999</span>
                  <span className="text-white/70">/mo</span>
                </div>
                <p className="mt-3 text-white/80">
                  For growing businesses that want deeper insights and more
                  flexibility.
                </p>

                <ul className="mt-8 flex flex-col gap-3">
                  {GROWTH_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-5 shrink-0 text-white" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full border-white/20 bg-white text-sip-orange hover:bg-white/90"
                    disabled
                  >
                    Coming soon
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="mx-auto max-w-3xl">
              <h2 className="heading-md mb-10 text-center text-foreground">
                Frequently asked questions
              </h2>

              <dl className="grid gap-8 md:grid-cols-2">
                {PRICING_FAQS.map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-base font-semibold text-foreground">
                      {faq.question}
                    </dt>
                    <dd className="body-md mt-2">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
