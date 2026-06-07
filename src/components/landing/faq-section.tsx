import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "What is a digital loyalty card?",
    answer:
      "A digital loyalty card is an electronic version of a traditional paper stamp card. Instead of carrying a physical card, customers scan a QR code at your store and their visits are tracked automatically. Once they reach the required number of visits, they unlock a reward.",
  },
  {
    question: "How does a QR code loyalty program work?",
    answer:
      "With SIP, you generate a unique QR code for your business. When a customer visits, they scan the QR code and a staff member verifies the visit. Each verified visit adds a \"Sip\" to their progress. Once they reach the target number of visits, they can claim their reward.",
  },
  {
    question: "Can customers use SIP without downloading an app?",
    answer:
      "Yes. SIP is fully web-based, so customers can scan your QR code and track their loyalty progress using their phone's browser. No app download is required, which means zero friction for your customers.",
  },
  {
    question: "How do loyalty programs increase repeat customers?",
    answer:
      "Loyalty programs give customers a reason to come back by offering tangible rewards for repeat visits. Studies show that customers enrolled in a loyalty program are significantly more likely to return. SIP makes this simple with automated visit tracking and easy reward redemption.",
  },
  {
    question: "Are digital loyalty cards better than paper loyalty cards?",
    answer:
      "Digital loyalty cards solve the biggest problems with paper cards — customers lose them, forget them, or never fill them out. With a digital loyalty card, progress is saved to their phone, it can't be lost, and businesses get real data on customer visits and retention.",
  },
  {
    question: "How much does a loyalty program cost?",
    answer:
      "SIP is free to get started. You can create your loyalty program, generate your QR code, and start rewarding customers at no cost. We offer paid plans for businesses that need advanced features like analytics, multiple locations, and custom branding.",
  },
  {
    question: "What businesses can use SIP?",
    answer:
      "SIP is built for any local business that wants to increase repeat visits — cafes, restaurants, bakeries, salons, gyms, retail stores, and more. If your business benefits from customers coming back regularly, SIP is for you.",
  },
  {
    question: "Can SIP support multiple locations?",
    answer:
      "Yes. SIP supports multi-location businesses, so you can manage loyalty programs across all your branches from a single dashboard. Customers can earn and redeem rewards at any of your locations.",
  },
  {
    question: "How do customer rewards programs work?",
    answer:
      "A customer rewards program incentivizes repeat purchases by offering something of value — like a free product or discount — after a set number of visits. SIP automates this process with QR-based visit tracking and one-tap reward redemption.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most businesses are up and running in under 5 minutes. You create an account, name your loyalty program, set the reward, and generate your QR code. Print the QR code or display it at your counter and you're ready to go.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="section-padding bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="section-label mb-3">FREQUENTLY ASKED QUESTIONS</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Got questions? We&apos;ve got answers.
          </h2>
        </div>

        {/* Accordion */}
        <div className="mx-auto max-w-3xl">
          <Accordion>
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
