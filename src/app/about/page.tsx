import type { Metadata } from "next";
import {
  Coffee,
  UtensilsCrossed,
  Scissors,
  Dumbbell,
  Store,
  CakeSlice,
  QrCode,
  Gift,
  BarChart3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "About SIP — The Digital Loyalty Platform for Local Businesses",
  description:
    "Learn why we built SIP — a digital loyalty card platform helping cafes, restaurants, salons, gyms and local businesses increase repeat customers with QR-based loyalty programs.",
  openGraph: {
    title: "About SIP — The Digital Loyalty Platform for Local Businesses",
    description:
      "Learn why we built SIP — a digital loyalty card platform helping local businesses increase repeat customers.",
    url: "/about",
  },
};

const industries = [
  { name: "Cafes & Coffee Shops", icon: Coffee },
  { name: "Restaurants & Eateries", icon: UtensilsCrossed },
  { name: "Bakeries & Dessert Shops", icon: CakeSlice },
  { name: "Salons & Spas", icon: Scissors },
  { name: "Gyms & Fitness Studios", icon: Dumbbell },
  { name: "Retail & Local Shops", icon: Store },
];

const steps = [
  {
    icon: QrCode,
    title: "Create your program",
    description:
      "Sign up, name your loyalty program, and set the reward customers earn.",
  },
  {
    icon: Gift,
    title: "Generate your QR code",
    description:
      "SIP generates a unique QR code for your business. Print it or display it at your counter.",
  },
  {
    icon: BarChart3,
    title: "Reward your customers",
    description:
      "Customers scan, earn visits, and redeem rewards. You track everything from your dashboard.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Why We Built SIP */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="mx-auto max-w-3xl">
              <p className="section-label mb-3">ABOUT SIP</p>
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Why we built SIP
              </h1>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Local businesses are the backbone of every community. The cafe
                  you visit every morning, the salon you trust with your hair,
                  the restaurant where you celebrate birthdays — these businesses
                  thrive on repeat customers.
                </p>
                <p>
                  But keeping customers coming back is harder than ever.
                  Competition is intense, attention spans are short, and most
                  small businesses don&apos;t have the budget for expensive
                  marketing tools. We built SIP because we believe every local
                  business deserves a simple, affordable way to build customer
                  loyalty.
                </p>
                <p>
                  SIP is a customer retention platform designed specifically for
                  small businesses. No complex software, no expensive plans —
                  just a straightforward digital loyalty card that works.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem With Paper Loyalty Cards */}
        <section className="section-padding-sm bg-white">
          <div className="section-container">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                The problem with paper loyalty cards
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Paper loyalty cards have been around for decades, but they come
                  with serious problems. Customers lose them, forget them at
                  home, or never bother to fill them out. Businesses print
                  hundreds of cards with no way to track how many were actually
                  redeemed.
                </p>
                <p>
                  Paper cards give you zero data. You don&apos;t know how often
                  a customer visits, when they last came in, or whether your
                  loyalty program is actually working. There&apos;s no way to
                  follow up with a customer who hasn&apos;t visited in weeks.
                </p>
                <p>
                  Digital loyalty cards solve all of these problems. Progress is
                  saved to the customer&apos;s phone, it can&apos;t be lost, and
                  you get real data on every visit and reward.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="section-padding-sm bg-background">
          <div className="section-container">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Our mission
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Our mission is to make digital loyalty simple and accessible
                  for every local business. We believe that a great loyalty
                  program shouldn&apos;t require a big budget, technical
                  expertise, or a dedicated marketing team.
                </p>
                <p>
                  SIP is a digital loyalty platform that any business owner can
                  set up in minutes. We handle the technology so you can focus on
                  what matters — serving your customers and growing your
                  business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How SIP Works */}
        <section className="section-padding-sm bg-white">
          <div className="section-container">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-10 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                How SIP works
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {steps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-sip-orange-light text-sip-orange">
                      <step.icon className="size-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="mb-2 text-[15px] font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="section-padding-sm bg-background">
          <div className="section-container">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Industries we serve
              </h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {industries.map((industry) => (
                  <div
                    key={industry.name}
                    className="flex items-center gap-3 rounded-xl border border-border bg-white p-4"
                  >
                    <industry.icon
                      className="size-5 shrink-0 text-sip-orange"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {industry.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-white">
          <div className="section-container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Start building loyalty today
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                Join hundreds of local businesses using SIP to turn first-time
                visitors into loyal regulars.
              </p>
              <div className="mt-6">
                <Button size="md">
                  <a href="#">
                    Get Started Free <span className="ml-1">→</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SIP",
            url: "https://www.sipsip.in",
            logo: "https://www.sipsip.in/sip-logo.png",
            description:
              "SIP is a digital loyalty platform that helps local businesses increase customer retention through QR-based loyalty programs and digital rewards.",
          }),
        }}
      />
    </div>
  );
}
