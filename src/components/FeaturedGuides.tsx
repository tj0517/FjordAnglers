import GuideCard from "./GuideCard";

const guides = [
  {
    name: "Olav Hansen",
    location: "Geirangerfjord, Norway",
    species: ["Salmon", "Trout", "Char"],
    price: 200,
    rating: 5.0,
    trips: 24,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
  },
  {
    name: "Erik Larsson",
    location: "Vanern, Sweden",
    species: ["Pike", "Zander", "Perch"],
    price: 150,
    rating: 4.9,
    trips: 31,
    image:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop",
  },
  {
    name: "Jon Thorsson",
    location: "Westfjords, Iceland",
    species: ["Arctic Char", "Brown Trout"],
    price: 250,
    rating: 5.0,
    trips: 18,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
  },
];

export default function FeaturedGuides() {
  return (
    <section id="guides" className="py-20 bg-navy">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-display text-4xl sm:text-5xl text-white">
            Meet Our Expert Guides
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
            Vetted local experts with decades of Norwegian fjord experience
          </p>
        </div>

        {/* Guide cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <GuideCard key={guide.name} guide={guide} />
          ))}
        </div>
      </div>
    </section>
  );
}
