import type { Metadata } from "next";
import Link from "next/link";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the SIP privacy policy. Learn how we collect, use, and protect your data when you use our digital loyalty card platform.",
  openGraph: {
    title: "Privacy Policy | SIP",
    description:
      "How SIP collects, uses, and protects your data.",
    url: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Privacy Policy
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Last updated: June 1, 2025
              </p>

              <div className="mt-10 space-y-8">
                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    1. Information We Collect
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    When you create an account, we collect your name, email
                    address, phone number, and business information such as your
                    business name, category, and location. For customers using
                    loyalty programs, we collect visit data and reward redemption
                    history.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    2. How We Use Your Information
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We use the information we collect to provide and improve our
                    services, process loyalty transactions, send you important
                    updates about your account, and communicate about new
                    features. We do not use your data for advertising purposes.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    3. Data Sharing
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We do not sell your personal information to third parties. We
                    may share data with trusted service providers who help us
                    operate our platform, such as hosting providers and analytics
                    services. These providers are contractually bound to protect
                    your data.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    4. Data Security
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We use industry-standard encryption and secure servers to
                    protect your data. All data is transmitted over HTTPS and
                    stored in encrypted databases. We regularly review our
                    security practices to ensure your information remains safe.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    5. Your Rights
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    You have the right to access, correct, or delete your
                    personal information at any time. You can update your account
                    information through your dashboard or contact us directly to
                    request data deletion.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    6. Cookies
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We use minimal cookies to maintain your session and remember
                    your preferences. We do not use tracking cookies or
                    third-party advertising cookies. You can disable cookies in
                    your browser settings at any time.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    7. Changes to This Policy
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We may update this privacy policy from time to time. If we
                    make significant changes, we will notify you via email or
                    through a notice on our website. We encourage you to review
                    this policy periodically.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    8. Contact Us
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    If you have any questions about this privacy policy or how we
                    handle your data, please contact us at{" "}
                    <Link
                      href="mailto:privacy@sipsip.in"
                      className="text-sip-orange hover:underline"
                    >
                      privacy@sipsip.in
                    </Link>
                    .
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
