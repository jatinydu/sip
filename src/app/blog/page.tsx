import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "Blog — Digital Loyalty Tips for Small Businesses",
  description:
    "Learn how to build customer loyalty, increase repeat visits, and grow your local business with digital loyalty cards and QR-based rewards programs.",
  openGraph: {
    title: "Blog — Digital Loyalty Tips for Small Businesses | SIP",
    description:
      "Tips and guides on customer loyalty for local businesses.",
    url: "/blog",
  },
};

const BLOG_POSTS = [
  {
    slug: "what-is-a-digital-loyalty-card",
    title:
      "What Is a Digital Loyalty Card? Complete Guide for Small Businesses",
    excerpt:
      "Digital loyalty cards are transforming how local businesses retain customers. Learn what they are, how they work, and why they outperform paper stamp cards.",
    date: "June 5, 2025",
    readTime: "8 min read",
  },
  {
    slug: "qr-code-loyalty-programs-explained",
    title: "QR Code Loyalty Programs Explained",
    excerpt:
      "QR code loyalty programs make it easy for customers to earn rewards without downloading an app. Here's how they work and why businesses are switching.",
    date: "June 2, 2025",
    readTime: "6 min read",
  },
  {
    slug: "increase-repeat-customers",
    title: "How Cafes, Restaurants and Salons Increase Repeat Customers",
    excerpt:
      "Customer retention is the most cost-effective growth strategy for local businesses. Discover proven tactics that keep customers coming back.",
    date: "May 28, 2025",
    readTime: "7 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="section-padding bg-background">
          <div className="section-container">
            {/* Header */}
            <div className="mb-12">
              <p className="section-label mb-3">BLOG</p>
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                The SIP Blog
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Tips and guides on customer loyalty for local businesses.
              </p>
            </div>

            {/* Article Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <article>
                    <div className="mb-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <time>{post.date}</time>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="mb-3 text-[15px] font-semibold leading-snug text-foreground group-hover:text-sip-orange">
                      {post.title}
                    </h2>

                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-1 text-sm font-medium text-sip-orange">
                      Read more
                      <ArrowRight className="size-3.5" />
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
