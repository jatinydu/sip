import type { Metadata } from "next";

import { CTASection } from "@/components/landing/cta-section";
import { FAQSection } from "@/components/landing/faq-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { IndustriesSection } from "@/components/landing/industries-section";
import { LoyaltyBuilderSection } from "@/components/landing/loyalty-builder-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

export const metadata: Metadata = {
  title: "Digital Loyalty Cards for Small Businesses",
  description:
    "Turn first-time visitors into regulars with SIP. Create QR-based digital loyalty cards and customer loyalty programs for cafes, restaurants, salons, gyms and local businesses.",
  openGraph: {
    title: "Digital Loyalty Cards for Small Businesses | SIP",
    description:
      "Turn first-time visitors into regulars with SIP. Create QR-based digital loyalty cards and customer loyalty programs for local businesses.",
    type: "website",
    url: "/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <HeroSection />

        <HowItWorksSection />

        <FeaturesSection />

        <IndustriesSection />

        <LoyaltyBuilderSection />

        <TestimonialsSection />

        <FAQSection />

        <CTASection />
      </main>

      <Footer />

      {/* Organization + SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "SIP",
                url: "https://www.sipsip.in",
                logo: "https://www.sipsip.in/sip-logo.png",
                description:
                  "SIP is a digital loyalty platform that helps local businesses increase customer retention through QR-based loyalty programs and digital rewards.",
                sameAs: [],
              },
              {
                "@type": "SoftwareApplication",
                name: "SIP",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web",
                description:
                  "Digital loyalty card platform for small businesses. Create QR-based loyalty programs, track customer visits, and reward repeat customers.",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "INR",
                  description: "Free to get started",
                },
              },
              {
                "@type": "WebSite",
                name: "SIP",
                url: "https://www.sipsip.in",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
