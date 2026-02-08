import { SlidersHorizontal, ShieldCheck, Lock, Heart } from "lucide-react";

const valueProps = [
  {
    icon: SlidersHorizontal,
    title: "Advanced Filters",
    description:
      "Search by species, technique, water type, skill level, and language. Find exactly the guide you need.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Guides",
    description:
      "Every guide is vetted for experience, licensing, and local knowledge. Book with confidence.",
  },
  {
    icon: Lock,
    title: "Secure Booking",
    description:
      "Stripe-protected payments, transparent pricing, money-back guarantee. Your trip is protected.",
  },
  {
    icon: Heart,
    title: "Best Price Guarantee",
    description:
      "Book direct with guides. No hidden fees, fair commission, best value for your adventure.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-ice">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-display text-4xl sm:text-5xl text-navy">
            Why Choose FjordAnglers?
          </h2>
        </div>

        {/* 2x2 grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {valueProps.map((prop) => (
            <div
              key={prop.title}
              className="bg-white rounded-xl p-8 text-center"
            >
              <prop.icon className="mx-auto h-12 w-12 text-copper" />
              <h3 className="mt-4 font-display text-xl text-navy">
                {prop.title}
              </h3>
              <p className="mt-3 text-[15px] text-stone-500 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
