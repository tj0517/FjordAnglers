import { Users, MapPin, Star, Shield } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Anglers",
    subtext: "Joined in 2025",
  },
  {
    icon: MapPin,
    value: "100+",
    label: "Guides",
    subtext: "Norway, Sweden, Iceland",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Rating",
    subtext: "From 200+ trips",
  },
  {
    icon: Shield,
    value: "Verified",
    label: "Secure Booking",
    subtext: "Stripe protected",
  },
];

export default function TrustBar() {
  return (
    <section className="py-12 bg-ice">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <stat.icon className="h-8 w-8 text-copper" />
              <span className="font-display text-4xl text-navy">
                {stat.value}
              </span>
              <span className="text-base font-bold text-stone-900">
                {stat.label}
              </span>
              <span className="text-sm text-stone-500">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
