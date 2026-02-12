import { Target, Eye, Users, TrendingUp } from "lucide-react";

const points = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Make Scandinavian fishing accessible to everyone. We connect passionate anglers with experienced local guides who know the waters like no one else.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "Become the go-to platform for fishing experiences in the Nordics — a trusted marketplace where guides grow their business and anglers find unforgettable trips.",
  },
  {
    icon: Users,
    title: "For Guides",
    description:
      "Get discovered by thousands of anglers searching for exactly what you offer. No upfront costs — we only succeed when you do.",
  },
  {
    icon: TrendingUp,
    title: "Early Access",
    description:
      "We're onboarding our first 50 guides now. Join early to shape the platform, get a founding-guide badge, and lock in the best commission rates.",
  },
];

export default function MissionVision() {
  return (
    <section className="bg-ice py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-copper mb-3">
            Why FjordAnglers
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-navy">
            Built by anglers, for anglers
          </h2>
          <p className="mt-4 text-base text-stone-500 leading-relaxed">
            We believe the best fishing experiences start with the right guide.
            Our platform is designed to showcase your expertise and fill your
            calendar.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {points.map((point) => (
            <div
              key={point.title}
              className="rounded-2xl bg-white p-6 sm:p-8"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy">
                <point.icon className="h-6 w-6 text-copper" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-navy">
                {point.title}
              </h3>
              <p className="mt-2 text-base text-stone-500 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
