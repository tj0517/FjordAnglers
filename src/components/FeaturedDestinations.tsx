import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const destinations = [
    {
        name: "Lofoten Islands",
        country: "Norway",
        image: "dest-lofoten.jpg",
        guides: 48,
        tag: "Most Popular",
    },
    {
        name: "Geirangerfjord",
        country: "Norway",
        image: "dest-fjord.jpg",
        guides: 32,
        tag: "Deep Sea",
    },
    {
        name: "Lapland Wilderness",
        country: "Sweden",
        image: "dest-lapland.jpg",
        guides: 27,
        tag: "Fly Fishing",
    },
    {
        name: "Mountain Rivers",
        country: "Norway",
        image: "dest-river.jpg",
        guides: 41,
        tag: "River Fishing",
    },
];

export default function FeaturedDestinations() {
    return (
        <section id="destinations" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
                    <div>
                        <h2 className="font-display text-4xl md:text-5xl text-navy leading-tight">
                            TOP DESTINATIONS
                        </h2>
                        <p className="text-stone-500 mt-2 max-w-md">
                            Explore Scandinavia's most sought-after fishing locations, handpicked by our expert guides.
                        </p>
                    </div>
                    <Link
                        href="#"
                        className="text-copper hover:text-copper-dark font-semibold text-sm flex items-center gap-1.5 transition-colors group"
                    >
                        View all destinations
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((dest) => (
                        <Link
                            key={dest.name}
                            href="#"
                            className="group relative rounded-2xl overflow-hidden aspect-[3/4] block cursor-pointer"
                        >
                            <Image
                                src={"/m_destinations/" + dest.image}
                                alt={`${dest.name}, ${dest.country}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div
                                className="absolute inset-0"
                                style={{ background: "linear-gradient(to top, rgba(10,46,77,0.85) 0%, transparent 60%)" }}
                            />

                            <span className="absolute top-4 left-4 bg-copper-light text-white text-xs font-medium px-3 py-1 rounded-full">
                                {dest.tag}
                            </span>

                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <h3 className="font-display text-2xl text-ice leading-tight">
                                    {dest.name}
                                </h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-ice/70 text-sm flex items-center gap-1">
                                        <MapPin size={14} />
                                        {dest.country}
                                    </span>
                                    <span className="text-copper text-sm font-medium">{dest.guides} guides</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}