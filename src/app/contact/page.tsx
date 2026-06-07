import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

export const metadata: Metadata = {
  title: "Contact SIP — Get Help With Your Loyalty Program",
  description:
    "Have questions about digital loyalty cards for your business? Get in touch with the SIP team. We help cafes, restaurants, salons and local businesses set up loyalty programs.",
  openGraph: {
    title: "Contact SIP — Get Help With Your Loyalty Program",
    description:
      "Have questions about digital loyalty cards for your business? Get in touch with the SIP team. We help cafes, restaurants, salons and local businesses set up loyalty programs.",
    type: "website",
    url: "/contact",
  },
};

const BENEFITS = [
  {
    title: "Quick setup, no hardware needed",
    description:
      "Go live with your digital loyalty card in minutes. All your customers need is their phone.",
  },
  {
    title: "Built for local businesses",
    description:
      "SIP is designed specifically for cafes, salons, gyms, restaurants and other neighbourhood businesses.",
  },
  {
    title: "Free to get started",
    description:
      "Start with our free plan and upgrade as your customer base grows. No credit card required.",
  },
];

const INDUSTRIES = [
  "Cafes",
  "Restaurants",
  "Salons",
  "Barbershops",
  "Gyms",
  "Bakeries",
  "Juice Bars",
  "Pet Stores",
  "Spas",
  "Bookstores",
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero + Form Section */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <p className="section-label mb-4">Contact Us</p>
            <h1 className="heading-lg mb-3 text-foreground">Get in touch</h1>
            <p className="body-lg mb-12 max-w-xl">
              Whether you have a question about features, pricing, or anything
              else — our team is ready to help.
            </p>

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left — Contact Form */}
              <div>
                <form action="#" method="POST" className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-sip-orange focus:outline-none focus:ring-2 focus:ring-sip-orange/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-sip-orange focus:outline-none focus:ring-2 focus:ring-sip-orange/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="business"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="business"
                      name="business"
                      placeholder="Your business name"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-sip-orange focus:outline-none focus:ring-2 focus:ring-sip-orange/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-sip-orange focus:outline-none focus:ring-2 focus:ring-sip-orange/20"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Send message <span className="ml-1">→</span>
                  </Button>
                </form>
              </div>

              {/* Right — Info Panel */}
              <div className="flex flex-col justify-center">
                <h2 className="heading-md mb-6 text-foreground">
                  Why businesses choose SIP
                </h2>

                <ul className="space-y-6">
                  {BENEFITS.map((benefit) => (
                    <li key={benefit.title} className="flex gap-3">
                      <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-sip-orange-light">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-sip-orange"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {benefit.title}
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-xl border border-border bg-sip-orange-light/50 px-5 py-4">
                  <p className="text-sm font-medium text-foreground">
                    ⏱ We typically respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Businesses We Serve */}
        <section className="section-padding-sm border-t border-border bg-white">
          <div className="section-container">
            <h2 className="mb-4 text-center text-sm font-semibold text-foreground">
              Businesses we serve
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {INDUSTRIES.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* JSON-LD: ContactPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact SIP",
            description:
              "Have questions about digital loyalty cards for your business? Get in touch with the SIP team.",
            url: "https://www.sipsip.in/contact",
            mainEntity: {
              "@type": "Organization",
              name: "SIP",
              url: "https://www.sipsip.in",
              logo: "https://www.sipsip.in/sip-logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                availableLanguage: ["English", "Hindi"],
              },
            },
          }),
        }}
      />
    </div>
  );
}
