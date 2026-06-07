import type { Metadata } from "next";
import Link from "next/link";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the SIP terms of service. Understand the terms and conditions for using our digital loyalty card platform for your business.",
  openGraph: {
    title: "Terms of Service | SIP",
    description:
      "Terms and conditions for using the SIP digital loyalty platform.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Terms of Service
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Last updated: June 1, 2025
              </p>

              <div className="mt-10 space-y-8">
                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    By accessing or using SIP, you agree to be bound by these
                    Terms of Service. If you do not agree to these terms, please
                    do not use our platform. These terms apply to all users,
                    including business owners and their customers.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    2. Description of Service
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    SIP provides a digital loyalty card management platform that
                    enables businesses to create and manage loyalty programs.
                    This includes QR code generation, visit tracking, reward
                    management, and customer analytics. The service is provided
                    &quot;as is&quot; and may be updated from time to time.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    3. Account Registration
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    To use SIP as a business owner, you must create an account
                    and provide accurate, complete information about yourself and
                    your business. You are responsible for maintaining the
                    security of your account credentials and for all activity
                    that occurs under your account.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    4. Acceptable Use
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    You agree not to use SIP for any fraudulent, illegal, or
                    abusive purposes. This includes but is not limited to:
                    creating fake visits, manipulating loyalty program data,
                    impersonating another business, or attempting to gain
                    unauthorized access to other accounts or our systems.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    5. Intellectual Property
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    SIP and its content, features, and functionality are owned by
                    SIP and are protected by copyright and other intellectual
                    property laws. You retain ownership of all data you input
                    into the platform, including your business information and
                    customer data.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    6. Limitation of Liability
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    SIP shall not be liable for any indirect, incidental,
                    special, or consequential damages arising out of your use of
                    the platform. Our total liability shall not exceed the amount
                    you have paid us in the twelve months preceding the claim.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    7. Termination
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Either party may terminate this agreement at any time. You
                    can delete your account through your dashboard settings. We
                    reserve the right to suspend or terminate accounts that
                    violate these terms. Upon termination, your data will be
                    retained for 30 days before permanent deletion.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    8. Changes to Terms
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We may update these terms from time to time. If we make
                    material changes, we will notify you via email or through a
                    prominent notice on our website. Continued use of SIP after
                    changes constitutes acceptance of the updated terms.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold text-foreground">
                    9. Contact
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    If you have any questions about these terms, please contact
                    us at{" "}
                    <Link
                      href="mailto:legal@sipsip.in"
                      className="text-sip-orange hover:underline"
                    >
                      legal@sipsip.in
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
