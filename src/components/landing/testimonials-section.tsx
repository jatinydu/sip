import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Sip helped us increase repeat visits by 3X! Our customers love the rewards and we love the insights.",
    author: "Priya K.",
    role: "Cafe Owner, Mumbai",
    avatarColor: "bg-sip-orange-light text-sip-orange",
    initials: "PK",
  },
  {
    quote:
      "Super easy to use and the support team is amazing. We set up our loyalty program in under 10 minutes.",
    author: "Rahul M.",
    role: "Restaurant Manager, Delhi",
    avatarColor: "bg-blue-100 text-blue-600",
    initials: "RM",
  },
  {
    quote:
      "Finally, a loyalty program that's simple, effective and affordable. Our customer retention has improved significantly.",
    author: "Anita S.",
    role: "Salon Owner, Bangalore",
    avatarColor: "bg-green-100 text-green-600",
    initials: "AS",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            What businesses are saying
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-2xl border border-border bg-white p-6 md:p-8"
            >
              <div>
                <div className="mb-4 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="size-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`flex size-10 items-center justify-center rounded-full text-sm font-bold ${t.avatarColor}`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.author}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
