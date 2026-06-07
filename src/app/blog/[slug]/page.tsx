import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

const BLOG_POSTS: Record<
  string,
  {
    title: string;
    description: string;
    date: string;
    dateISO: string;
    readTime: string;
    content: string[];
  }
> = {
  "what-is-a-digital-loyalty-card": {
    title:
      "What Is a Digital Loyalty Card? Complete Guide for Small Businesses",
    description:
      "Learn what a digital loyalty card is, how it works, and why small businesses are replacing paper stamp cards with digital loyalty card apps.",
    date: "June 5, 2025",
    dateISO: "2025-06-05",
    readTime: "8 min read",
    content: [
      "A digital loyalty card is an electronic version of the traditional paper stamp card that businesses have used for decades. Instead of giving customers a physical card to carry around, a digital loyalty card lives on their phone — accessible through a web browser or app. Every time a customer visits your business, their loyalty progress is updated automatically.",
      "For small businesses, digital loyalty cards solve the biggest frustrations with paper cards. Customers lose paper cards constantly — studies suggest that over 60% of paper loyalty cards are never redeemed. With a digital loyalty card, the customer's progress is saved to their phone and can't be lost, forgotten, or damaged. This means more customers actually complete their loyalty journey and claim their reward.",
      "A digital loyalty card app like SIP makes the process even simpler. Customers scan a QR code at your counter, a staff member verifies the visit, and the loyalty card updates instantly. There's no app download required — everything works through the phone's browser. This zero-friction approach means customers are far more likely to participate in your loyalty program.",
      "The data advantage of digital loyalty cards is significant. Unlike paper cards, digital versions give you real insights into customer behavior — how often they visit, when they tend to come in, and how close they are to earning a reward. This data helps you understand your customer retention patterns and make better business decisions.",
      "Getting started with digital loyalty cards is straightforward. With platforms like SIP, you can create your loyalty program, generate your QR code, and start rewarding customers in under five minutes. There's no technical expertise required, no expensive hardware to buy, and most platforms offer a free tier to get you started.",
    ],
  },
  "qr-code-loyalty-programs-explained": {
    title: "QR Code Loyalty Programs Explained",
    description:
      "How QR code loyalty programs work, why they're replacing paper stamp cards, and how to set one up for your business in minutes.",
    date: "June 2, 2025",
    dateISO: "2025-06-02",
    readTime: "6 min read",
    content: [
      "A QR code loyalty program is a type of digital loyalty system where customers earn rewards by scanning a QR code at your business. Instead of carrying a paper stamp card, customers simply use their phone's camera to scan a code displayed at your counter. Each scan is verified by a staff member and counts as one visit toward their reward.",
      "The beauty of a QR code loyalty program is its simplicity. There's no app for customers to download, no physical cards to print, and no complex technology to manage. You generate a QR code once, display it at your business, and customers can start earning rewards immediately. This makes QR-based loyalty programs one of the most accessible options for small businesses.",
      "Digital stamp cards powered by QR codes are quickly replacing traditional paper versions. A digital stamp card works the same way conceptually — earn a certain number of stamps (or visits) and unlock a reward — but the entire process is digital. Customers can check their progress anytime on their phone, and businesses can see real-time data on program participation.",
      "Setting up a QR code loyalty program takes just a few minutes with platforms like SIP. You create an account, define your reward (for example, a free coffee after 6 visits), and the platform generates your unique QR code. Print the code, display it prominently at your counter, and train your staff to verify scans. That's the entire setup process.",
      "The key advantage for business owners is the data. Every scan is logged, giving you insights into visit frequency, peak times, and reward redemption rates. This information helps you fine-tune your program and understand which customers are your most loyal — and which might need a nudge to come back.",
    ],
  },
  "increase-repeat-customers": {
    title: "How Cafes, Restaurants and Salons Increase Repeat Customers",
    description:
      "Proven customer retention strategies for local businesses. Learn how cafes, restaurants and salons use loyalty programs to increase repeat visits.",
    date: "May 28, 2025",
    dateISO: "2025-05-28",
    readTime: "7 min read",
    content: [
      "Customer retention is arguably the most important growth lever for any local business. Acquiring a new customer costs five to seven times more than retaining an existing one, and repeat customers tend to spend more per visit over time. For cafes, restaurants, and salons, even a small improvement in customer retention can have a significant impact on revenue.",
      "The most effective customer retention strategy for small businesses is a well-designed loyalty program. A loyalty program for small business doesn't need to be complicated — a simple 'visit X times, get Y free' model works remarkably well. The key is making participation effortless. If earning a reward feels like work, customers won't bother.",
      "Cafes have been early adopters of digital loyalty programs, and for good reason. A cafe's business model depends heavily on repeat customers — people who visit daily or several times a week. By offering a free coffee after every 6 or 8 visits, cafes create a clear incentive for customers to keep coming back to the same shop instead of trying a competitor.",
      "Restaurants and salons face a slightly different retention challenge. Visit frequency is typically lower — weekly or monthly rather than daily — which makes each visit more valuable. For these businesses, loyalty programs work best when the reward feels proportional to the commitment. A free dessert after 5 restaurant visits or a complimentary add-on service after 4 salon appointments creates meaningful value without cutting deeply into margins.",
      "The shift from paper to digital loyalty has been a game-changer for repeat customers. Digital programs remove the friction that killed paper card participation — no more lost cards, forgotten wallets, or incomplete stamps. Platforms like SIP let customers track their progress on their phone, which keeps the loyalty program visible and top of mind between visits. For business owners, the transition is simple and the results are measurable from day one.",
    ],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | SIP Blog`,
      description: post.description,
      type: "article",
      publishedTime: post.dateISO,
      url: `/blog/${slug}`,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <article className="section-padding bg-background">
          <div className="section-container">
            <div className="mx-auto max-w-3xl">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground"
                >
                  Home
                </Link>
                <ChevronRight className="size-3.5" />
                <Link
                  href="/blog"
                  className="transition-colors hover:text-foreground"
                >
                  Blog
                </Link>
                <ChevronRight className="size-3.5" />
                <span className="text-foreground">{post.title}</span>
              </nav>

              {/* Header */}
              <header className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {post.title}
                </h1>
                <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                  <time dateTime={post.dateISO}>{post.date}</time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </header>

              {/* Content */}
              <div className="space-y-5">
                {post.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sm leading-[1.8] text-foreground/80"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Back to blog */}
              <div className="mt-12 border-t border-border pt-8">
                <Link
                  href="/blog"
                  className="text-sm font-medium text-sip-orange transition-colors hover:text-sip-orange/80"
                >
                  ← Back to all articles
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />

      {/* Article + Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: post.title,
                description: post.description,
                datePublished: post.dateISO,
                dateModified: post.dateISO,
                author: {
                  "@type": "Organization",
                  name: "SIP",
                  url: "https://www.sipsip.in",
                },
                publisher: {
                  "@type": "Organization",
                  name: "SIP",
                  url: "https://www.sipsip.in",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://www.sipsip.in/sip-logo.png",
                  },
                },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://www.sipsip.in/blog/${slug}`,
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://www.sipsip.in",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Blog",
                    item: "https://www.sipsip.in/blog",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: post.title,
                    item: `https://www.sipsip.in/blog/${slug}`,
                  },
                ],
              },
            ],
          }),
        }}
      />
    </div>
  );
}
