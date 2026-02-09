import { Shield, Star, Users, Fish } from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "Verified Guides",
        description: "Every guide is vetted for licensing, safety certifications, and local expertise before joining our platform.",
    },
    {
        icon: Star,
        title: "5-Star Experiences",
        description: "Our guides maintain a 4.8+ average rating from thousands of verified angler reviews.",
    },
    {
        icon: Fish,
        title: "Local Knowledge",
        description: "Decades of combined experience in Scandinavia's best-kept fishing spots and seasonal patterns.",
    },
    {
        icon: Users,
        title: "Instant Booking",
        description: "Browse, compare, and book your guide in minutes. Free cancellation up to 48 hours before your trip.",
    },
];

export default function WhyChooseUs() {
    return (
        <section id="how-it-works" className="py-20 md:py-28 bg-navy">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-5xl text-ice leading-tight">
                        WHY NORDIC ANGLERS
                    </h2>
                    <p className="text-ice/60 mt-3 max-w-lg mx-auto">
                        We connect you with Scandinavia's finest fishing guides for an authentic, premium experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="text-center group">
                            <div className="w-16 h-16 rounded-2xl bg-copper/15 flex items-center justify-center mx-auto mb-5 group-hover:bg-copper/25 transition-colors">
                                <feature.icon size={28} className="text-copper" />
                            </div>
                            <h3 className="font-display text-xl text-ice mb-2">{feature.title}</h3>
                            <p className="text-ice/50 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}