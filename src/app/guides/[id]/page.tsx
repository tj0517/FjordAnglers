import Image from "next/image";
import { Star, MapPin, Calendar, Users, Fish, MessageCircle, Globe, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data
const guide = {
    id: "1",
    name: "Erik Lindström",
    location: "Lofoten, Norway",
    country: "Norway",
    bio: "With over 15 years of experience guiding in the pristine waters of Lofoten, I specialize in salmon and halibut fishing. My intimate knowledge of the local fjords ensures unforgettable experiences for anglers of all skill levels. Whether you're a beginner looking to learn or an experienced angler seeking trophy fish, I'll help you create memories that last a lifetime.",
    species: ["Salmon", "Halibut", "Cod", "Sea Trout"],
    techniques: ["Fly Fishing", "Trolling", "Spinning"],
    waterTypes: ["Fjord", "Ocean"],
    languages: ["English", "Norwegian", "German"],
    yearsExperience: 15,
    seasonStart: "March",
    seasonEnd: "October",
    pricePerDay: 320,
    tier: "bookable",
    rating: 4.9,
    reviewCount: 47,
    photos: [
        "/guides/guide-1.jpg",
        "/guides/guide-2.jpg",
        "/guides/guide-3.jpg",
        "/guides/guide-4.jpg"
    ]
};

const reviews = [
    {
        name: "Thomas M.",
        date: "August 2025",
        rating: 5,
        comment: "Erik is an exceptional guide. Caught my first salmon thanks to his expertise and patience. The scenery was breathtaking!"
    },
    {
        name: "Anna K.",
        date: "July 2025",
        rating: 5,
        comment: "Amazing experience in the fjords. Erik knows exactly where the fish are. Highly recommend to anyone visiting Lofoten!"
    },
    {
        name: "Michael S.",
        date: "June 2025",
        rating: 4,
        comment: "Great day on the water. Erik's knowledge of local waters is impressive. Will definitely book again."
    }
];

export default function GuidePage() {
    return (
        <main className="min-h-screen bg-ice">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px]">
                <Image
                    src="/guides/hero-guide.jpg"
                    alt={guide.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to top, rgba(10,46,77,0.8), rgba(10,46,77,0.2))"
                    }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${guide.tier === "bookable"
                                    ? "bg-copper text-white"
                                    : "bg-white/20 text-white backdrop-blur-sm"
                                }`}>
                                {guide.tier}
                            </span>
                            <div className="flex items-center gap-1 text-white">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                <span className="font-semibold">{guide.rating}</span>
                                <span className="text-white/70">({guide.reviewCount} reviews)</span>
                            </div>
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
                            {guide.name}
                        </h1>
                        <div className="flex items-center gap-2 text-white/90">
                            <MapPin className="h-5 w-5" />
                            <span className="text-lg">{guide.location}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 lg:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                        {/* Left Column - Guide Info */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Bio */}
                            <div>
                                <h2 className="font-display text-2xl text-navy mb-4">About</h2>
                                <p className="text-stone-700 leading-relaxed">{guide.bio}</p>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                {/* Experience */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-copper/10">
                                        <Award className="h-5 w-5 text-copper" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500">Experience</p>
                                        <p className="font-semibold text-navy">{guide.yearsExperience} years</p>
                                    </div>
                                </div>

                                {/* Season */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-copper/10">
                                        <Calendar className="h-5 w-5 text-copper" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500">Season</p>
                                        <p className="font-semibold text-navy">{guide.seasonStart} - {guide.seasonEnd}</p>
                                    </div>
                                </div>

                                {/* Languages */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-copper/10">
                                        <Globe className="h-5 w-5 text-copper" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500">Languages</p>
                                        <p className="font-semibold text-navy">{guide.languages.join(", ")}</p>
                                    </div>
                                </div>

                                {/* Water Types */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-copper/10">
                                        <Fish className="h-5 w-5 text-copper" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500">Water Types</p>
                                        <p className="font-semibold text-navy">{guide.waterTypes.join(", ")}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Species */}
                            <div>
                                <h3 className="font-semibold text-navy mb-3">Target Species</h3>
                                <div className="flex flex-wrap gap-2">
                                    {guide.species.map((species) => (
                                        <span
                                            key={species}
                                            className="px-3 py-1.5 rounded-full bg-navy/10 text-navy text-sm font-medium"
                                        >
                                            {species}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Techniques */}
                            <div>
                                <h3 className="font-semibold text-navy mb-3">Fishing Techniques</h3>
                                <div className="flex flex-wrap gap-2">
                                    {guide.techniques.map((technique) => (
                                        <span
                                            key={technique}
                                            className="px-3 py-1.5 rounded-full bg-copper/10 text-copper text-sm font-medium"
                                        >
                                            {technique}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Gallery */}
                            <div>
                                <h3 className="font-semibold text-navy mb-3">Gallery</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-stone-200">
                                            <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                                                Photo {i}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-display text-2xl text-navy">Reviews</h2>
                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                                        <span className="font-semibold text-navy">{guide.rating}</span>
                                        <span className="text-stone-500">({guide.reviewCount})</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {reviews.map((review, index) => (
                                        <div key={index} className="p-5 rounded-xl bg-white shadow-sm">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <p className="font-semibold text-navy">{review.name}</p>
                                                    <p className="text-sm text-stone-500">{review.date}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < review.rating
                                                                    ? "fill-amber-400 text-amber-400"
                                                                    : "text-stone-300"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-stone-700">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Booking Widget */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 p-6 rounded-2xl bg-white shadow-lg">
                                <div className="mb-6">
                                    <p className="text-stone-500 text-sm">Starting from</p>
                                    <p className="text-3xl font-display text-navy">
                                        €{guide.pricePerDay}
                                        <span className="text-lg font-sans text-stone-500"> / day</span>
                                    </p>
                                </div>

                                {/* Date Selection */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-navy mb-1.5">
                                            Select Dates
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Choose dates"
                                                readOnly
                                                className="w-full h-12 rounded-lg border border-gray-200 pl-4 pr-10 text-navy placeholder:text-stone-400 cursor-default"
                                            />
                                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-navy mb-1.5">
                                            Number of Guests
                                        </label>
                                        <div className="relative">
                                            <select className="w-full h-12 rounded-lg border border-gray-200 pl-4 pr-10 text-navy appearance-none">
                                                <option>1 guest</option>
                                                <option>2 guests</option>
                                                <option>3 guests</option>
                                                <option>4 guests</option>
                                            </select>
                                            <Users className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                                        </div>
                                    </div>
                                </div>

                                {/* Price Summary */}
                                <div className="border-t border-gray-100 pt-4 mb-6">
                                    <div className="flex justify-between text-stone-600 mb-2">
                                        <span>€{guide.pricePerDay} × 1 day</span>
                                        <span>€{guide.pricePerDay}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-navy text-lg">
                                        <span>Total</span>
                                        <span>€{guide.pricePerDay}</span>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                {guide.tier === "bookable" ? (
                                    <button className="w-full h-12 rounded-lg bg-copper text-white font-semibold hover:bg-copper-dark hover:-translate-y-0.5 transition-all">
                                        Request to Book
                                    </button>
                                ) : (
                                    <button className="w-full h-12 rounded-lg bg-navy text-white font-semibold hover:bg-navy-light transition-all flex items-center justify-center gap-2">
                                        <MessageCircle className="h-5 w-5" />
                                        Contact Guide
                                    </button>
                                )}

                                <p className="text-center text-sm text-stone-500 mt-3">
                                    You won&apos;t be charged yet
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
