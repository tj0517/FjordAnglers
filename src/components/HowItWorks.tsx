import { Search, Users, CalendarCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search",
    description:
      "Advanced filters by species, location, and technique. Find exactly the right guide for your adventure.",
  },
  {
    number: "02",
    icon: Users,
    title: "Connect",
    description:
      "Review verified profiles, read reviews from real anglers. Choose with confidence.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Book & Fish",
    description:
      "Secure payment and unforgettable fjord fishing experience. Your adventure starts here.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-copper mb-4">
            How It Works
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-navy leading-tight">
            Find Your Perfect
            <br />
            Fishing Guide in 3 Steps
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.title}
              className="relative bg-ice rounded-xl px-8 py-10 text-center"
            >
              {/* Background number */}
              <span className="absolute top-6 left-1/2 -translate-x-1/2 font-display text-7xl text-copper/20 leading-none select-none">
                {step.number}
              </span>
              {/* Icon */}
              <div className="relative z-10 flex justify-center mt-4">
                <step.icon className="h-12 w-12 text-navy" />
              </div>
              {/* Title */}
              <h3 className="mt-6 font-display text-2xl text-navy">
                {step.title}
              </h3>
              {/* Description */}
              <p className="mt-3 text-base text-stone-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
