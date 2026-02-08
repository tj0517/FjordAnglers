import { Users } from "lucide-react";
import Image from "next/image";

interface Destination {
  name: string;
  country: string;
  description: string;
  guides: number;
  species: string;
  image: string;
}

const destinations: Destination[] = [
  {
    name: "Geirangerfjord",
    country: "Norway",
    description: "UNESCO World Heritage fjord with legendary salmon runs",
    guides: 42,
    species: "Salmon, Trout, Char",
    image:
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&h=600&fit=crop",
  },
  {
    name: "Vanern",
    country: "Sweden",
    description: "Europe's largest lake - trophy pike paradise",
    guides: 28,
    species: "Pike, Zander, Perch",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop",
  },
  {
    name: "Westfjords",
    country: "Iceland",
    description: "Remote Arctic waters with pristine wild fishing",
    guides: 15,
    species: "Arctic Char, Brown Trout",
    image:
      "https://images.unsplash.com/photo-1520769945061-0a448c463865?w=400&h=400&fit=crop",
  },
];

function DestinationCard({
  destination,
  large = false,
}: {
  destination: Destination;
  large?: boolean;
}) {
  return (
    <div
      className={`group relative rounded-2xl overflow-hidden ${
        large ? "h-[400px]" : "h-[300px]"
      }`}
    >
      {/* Background image */}
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        className="object-cover brightness-[0.8] group-hover:scale-105 transition-transform duration-500"
        sizes={large ? "50vw" : "25vw"}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,46,77,0.9), transparent 60%)",
        }}
      />

      {/* Country badge */}
      <span
        className="absolute top-4 left-4 rounded-lg px-3 py-1.5 text-xs font-semibold text-white"
        style={{ backgroundColor: "rgba(230,126,80,0.9)" }}
      >
        {destination.country}
      </span>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <h3
          className={`font-display text-white ${
            large ? "text-3xl" : "text-2xl"
          }`}
        >
          {destination.name}
        </h3>
        <p
          className={`mt-2 text-white/80 ${large ? "text-base" : "text-sm"}`}
        >
          {destination.description}
        </p>

        {/* Meta */}
        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-white/70">
          <Users className="h-4 w-4" />
          <span>{destination.guides} guides</span>
          <span>&bull;</span>
          <span>{destination.species}</span>
        </div>

        {/* Button */}
        <button className="mt-4 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:bg-copper hover:text-white transition-colors">
          Explore
        </button>
      </div>
    </div>
  );
}

export default function Destinations() {
  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-display text-4xl sm:text-5xl text-navy">
            Iconic Fishing Destinations
          </h2>
        </div>

        {/* Grid: 1 large + 2 small */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Large card */}
          <DestinationCard destination={destinations[0]} large />

          {/* Two small cards stacked */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <DestinationCard destination={destinations[1]} />
            <DestinationCard destination={destinations[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}
